const { NstrumentaClient } = require("nstrumenta");
const ws = require("ws");

const gpiop = require('rpi-gpio').promise;

const pins = require('./pinMap');

const timeout = 1000; // retry connection
const pin = 3;

const context = {
  apiKey: "",
  wsUrl: "ws://localhost:8088",
  projectId: "",
};

const nst = new NstrumentaClient(context);

nst.addListener("open", () => {
  console.log('set pin watchers');
  for (const [index, io] of pins) {
    if (!io.input) {
      continue;
    }
    console.log('set watcher', index);
    io.input.watch((err, value) => {
      if (err) {
        throw err;
      }

      console.log(`[io]<${io.get('input')}> ${value}`);
      // led.writeSync(value);
    });
  }
  process.on('SIGINT', _ => {
    console.log(`saw sigint`);
    for (const [id, io] of pins) {
      console.log(`unexport GPIO ${id}`)
      if (io.input) {
        io.input.unexport();
      }
    }
    process.exit();
  })

  console.log(`read [open], let's subscribe`)
  nst.subscribe("gpio-rpi", async (message) => {
    console.log(message);

    switch (message) {
      case "1":
        await gpiop.write(pin, true);
        nst.send('gpio', { date: Date.now(), id: pin, value: 1 })
        break;
      case "0":
        await gpiop.write(pin, false);
        nst.send('gpio', { date: Date.now(), id: pin, value: 0 })
        break;
    }
  });

  nst.subscribe('gpio-command', async (message) => {
    console.log('received command for gpio', message);
    // Check if we're receiving an instruction to modify the pins
    if (typeof message === 'object') {
      const { pin, direction, value } = message;
      if (direction) {
        try {
          pins[pin].gpio.setDirection(direction);
        } catch (err) {
          console.log(`Error setting direction of pin ${pin}`, err);
        }
        return;
      }

      try {
        pins[pin].gpio.send(value);
      } catch (err) {
        console.log(`Error sending ${value} to pin ${pin}`, err);
      }
      return;
    }
  })
});

start().then(() => {
  console.log(`setup pin ${pin}`)
  gpiop.setup(pin, gpiop.DIR_OUT).then(() => {
    console.log('set to DIR_OUT');
    return gpiop.write(pin, true)
  }).then(() => {
    console.log('set high')
    nst.send('gpio', { date: Date.now(), id: pin, value: 1 })
  }).catch((err) => {
    console.log('Error: ', err.toString())
  })
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

