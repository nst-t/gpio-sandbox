const { Gpio } = require("onoff");

const pins = new Map([
  { name: 'pow3v3', type: 'ground' },
  { name: 'pow5v', type: 'power' },
  { name: 'gpio 2', type: 'io' },
  { name: 'pow5v', type: 'power' },
  { name: 'gpio 3', type: 'io' },
  { name: 'gnd', type: 'ground' },
  { name: 'gpio 4', type: 'io' },
  { name: 'gpio 14', type: 'io' },
  { name: 'gnd', type: 'ground' },
  { name: 'gpio 15', type: 'io' },
  { name: 'gpio 17', type: 'io' },
  { name: 'gpio 18', type: 'io' },
  { name: 'gpio 27', type: 'io' },
  { name: 'gnd', type: 'ground' },
  { name: 'gpio 22', type: 'io' },
  { name: 'gpio 23', type: 'io' },
  { name: 'pow3v3', type: 'power' },
  { name: 'gpio 24', type: 'io' },
  { name: 'gpio 10', type: 'io' },
  { name: 'gnd', type: 'io' },
  { name: 'gpio 9', type: 'io' },
  { name: 'gpio 25', type: 'io' },
  { name: 'gpio 11', type: 'io' },
  { name: 'gpio 8', type: 'io' },
  { name: 'gnd', type: 'ground' },
  { name: 'gpio 7', type: 'io' },
  { name: 'gpio 0', type: 'io' },
  { name: 'gpio 1', type: 'io' },
  { name: 'gpio 5', type: 'io' },
  { name: 'gnd', type: 'ground' },
  { name: 'gpio 6', type: 'io' },
  // { name: 'gpio 12', type: 'io' },
  // { name: 'gpio 13', type: 'io' },
  // { name: 'gnd', type: 'ground' },
  // { name: 'gpio 19', type: 'io' },
  // { name: 'gpio 16', type: 'io' },
  // { name: 'gpio 26', type: 'io' },
  // { name: 'gpio 20', type: 'io' },
  // { name: 'gnd', type: 'ground' },
  // { name: 'gpio 21', type: 'io' },
].map(
  // Create a map of the pins
  (value, index) => {
    // The GPIO pins start at 1, the js array starts at 0, so...
    const gpioIndex = index + 1;
    // Basic pin info
    const pin = [gpioIndex, { ...value }]
    // Add interrupt detection for io pins
    if (pin[1].type === 'io') {
      console.log('pin:', pin)
      pin[1].input = new Gpio(gpioIndex, 'in', 'both'); // 'both' detects both rising and falling values
      // pin[1].output = new Gpio(gpioIndex + 1, 'out');
      pin[1].value = null; // This can be used to store the last value
    }

    return pin;
  }));


module.exports = pins;
