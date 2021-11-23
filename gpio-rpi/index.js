const { NstrumentaClient } = require("nstrumenta");
const ws = require("ws");

const gpiop = require('rpi-gpio').promise;

const pins = require('./pinMap');

const timeout = 1000; // retry connection

const context = {
  apiKey: "",
  wsUrl: "ws://localhost:8088",
  projectId: "",
};

const nst = new NstrumentaClient(context);

const onRead = (id, value) => {
  try {
    console.log(`apparently we've read pin ${id} > ${value}, now show off in the gpio channel`);
    nst.send('gpio', { action: 'read', date: Date.now(), id: id, value });
  } catch (err) {
    console.log('error sending to gpio')
  }
};

const onWriteMessage = async (id, value) => {
  nst.send('gpio', { id, value })
  console.log(`wrote pin ${id}: ${value}`);
}

const setPinToOutput = async (id) => {
  const index = id - 1;
  try {
    console.log(`set pin ${id} to ${gpiop.DIR_OUT}`);
    await gpiop.setup(id, gpiop.DIR_OUT, gpiop.EDGE_BOTH);
    pins[index].direction = 'out';
  } catch (err) {
    console.log(`caught no!`, err);
  }
}

const setPinToInput = async (id) => {
  const index = id - 1;
  try {
    console.log(`set pin ${id} to ${gpiop.DIR_IN}`);
    await gpiop.setup(id, gpiop.DIR_IN);
    pins[index].direction = 'in';
    let value;
    try {
      console.log(`... pin ${id} is now input, so read value`)
      value = await gpiop.read(index);
    } catch (err) {
      console.log('err setting value', err)
    }
    console.log(`pin ${id} value: ${value}`);
    onRead(id, value);
  } catch (err) {
    console.warn(`caught no?`, err);
  }
}


nst.addListener("open", () => {
  process.on('SIGINT', _ => {
    console.log(`saw sigint`);
    gpiop.destroy();
    process.exit();
  })

  gpiop.on('change', (pin, value) => {
    console.log(`>> detected change on pin ${pin}: ${value}`);
    onRead(pin, value);
  });

  // This is just for testing onRead, as if we read from the gpio
  nst.subscribe("gpio-rpi", async (message) => {
    console.log(message);

    switch (message) {
      case "1":
        onRead(3, 1);
        break;
      case "0":
        onRead(3, 0);
        break;
    }
  });

  nst.subscribe('gpio-command', async (message) => {
    console.log('received command', message);
    try {
      const { action, id, direction, value } = message;
      const index = id - 1;
      const pin = pins[index];
      console.log('[subscription:gpio]', action, id, direction, value, pin)

      switch (action) {
        case 'set':
          if (pins[index].type !== 'io') {
            return;
          }

          if (direction !== pins[index].direction) {
            console.log(`pin ${id} is not already ${direction}`);
            return direction === 'in' ? setPinToInput(id) : setPinToOutput(id);
          }
          break;
        case 'write':
          console.log(`set ${pin.name} to ${Boolean(value)}`);
          await gpiop.write(id, Boolean(value));
          onWriteMessage(id, Boolean(value));
        case 'read':
          const readValue = await gpiop.read(id);
          onRead(id, readValue);
      }
    } catch (e) {
      console.warn('problem with message', e);
      throw e;
    }
  })
});

start().then((result) => {
  console.log(`connection ${result}`);
});

async function start() {
  console.log(`try connecting to ${context.wsUrl}`);
  let success = false;
  try {
    success = await nst.init(ws);
  } catch (e) {
    console.log(`problem connecting, retry in ${timeout} ms`);
    setTimeout(start, timeout);
  }

  return success;
}

