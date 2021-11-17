const { NstrumentaClient } = require("nstrumenta");
const ws = require("ws");

const gpiop = require('rpi-gpio').promise;

const pin = 37;

const nst = new NstrumentaClient({
    apiKey: "",
    wsUrl: "ws://localhost:8088",
    projectId: "",
});

nst.addListener("open", () => {
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
});

//@ts-ignore
nst.init(ws);

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