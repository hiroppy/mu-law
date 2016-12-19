'use strict';

/**
 * @param {int16_t} num - input
 * @return {int8_t} - output
 */
const encode = (number) => {
  const num = number;

  const MULAW_MAX  = 0x1FFF;
  const MULAW_BIAS = 33;

  let lsb      = 0;
  let mask     = 0x1000;
  let sign     = 0;
  let position = 12;

  if (number < 0) {
    number = -number;
    sign = 0x80;
  }

  number += MULAW_BIAS;

  if (number > MULAW_MAX) {
    number = MULAW_MAX;
  }

  for(; ((number & mask) !== mask && position > 5); mask >>= 1, position--);

  lsb = (number >> (position - 4)) & 0x0f;

  return (~(sign | ((position - 5) << 4) | lsb));
};

module.exports = encode;
