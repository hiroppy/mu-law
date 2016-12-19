'use strict';

/**
 * @param {int6_t} num - input
 * @return {int816t} - output
 */

const decode = (number) => {
  const MULAW_BIAS = 33;

  let num = number;

  let sign = 0;
  let position = 0;
  let decoded = 0;

  num = ~num;

  if (num & 0x80) {
    num &= ~(1 << 7);
    sign = -1;
  }

  position = ((num & 0xf0) >> 4) + 5;
  decoded = (
    (1 << position) |
    ((num & 0x0f) << (position - 4)) |
    (1 << (position - 5))) - MULAW_BIAS;
  return (sign === 0) ? decoded : -decoded;
};

module.exports = decode;
