import {encode, decode} from './base32.js';

describe('Base32', () => {
  describe('Encode', () => {
    test.concurrent.each([
      [[], ''],
      [[0], 'AA======'],
      [[48], 'GA======'],
      [[144], 'SA======'],
      [[0, 0], 'AAAA===='],
      [[21, 14], 'CUHA===='],
      [[0, 0, 0], 'AAAAA==='],
      [[21, 14, 21], 'CUHBK==='],
      [[0, 0, 0, 0], 'AAAAAAA='],
      [[21, 14, 21, 14], 'CUHBKDQ='],
      [[0, 0, 0, 0, 0], 'AAAAAAAA'],
      [[21, 14, 21, 14, 21], 'CUHBKDQV'],
    ])('Bytes = %o', async (bytes, expected) => {
      expect(encode(new Uint8Array(bytes))).toBe(expected);
    });
  });
  describe('Decode', () => {
    test.concurrent.each([
      ['', []],
      ['AA======', [0]],
      ['AAAA====', [0, 0]],
      ['CUHA====', [21, 14]],
      ['AAAAA===', [0, 0, 0]],
      ['CUHBK===', [21, 14, 21]],
      ['AAAAAAA=', [0, 0, 0, 0]],
      ['CUHBKDQ=', [21, 14, 21, 14]],
      ['AAAAAAAA', [0, 0, 0, 0, 0]],
      ['CUHBKDQV', [21, 14, 21, 14, 21]],
    ])('Text = %o', async (text, expected) => {
      expect(decode(text)).toStrictEqual(new Uint8Array(expected));
    });
    test('Invalid length', () => {
      const address = 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAY5HFKQ';

      expect(() => decode(address)).toThrow('Error: decode expects a valid Base32 encoded string, this one has invalid length.');
    });
  });
});