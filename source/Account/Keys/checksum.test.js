import {ingest} from './checksum.js';

describe('Checksum', () => {
  test.concurrent.each([
    [[], [0, 0]],
    [[0], [0, 0]],
    [[0, 0], [0, 0]],
    [[1], [33, 16]],
    [[1, 0, 1, 0, 1, 0, 1, 0], [246, 71]],
  ])('Bytes = %o', (bytes, expected) => {
    expect(ingest(new Uint8Array(bytes))).toStrictEqual(new Uint8Array(expected));
  });
  test('Public key checksum', () => {
    const publicKey = new Uint8Array([
      22, 150, 29, 8, 39, 215, 3, 141,
      145, 86, 22, 23, 167, 246, 104, 32,
      253, 215, 118, 77, 9, 190, 167, 158,
      167, 180, 198, 118, 44, 251, 149, 116
    ]);

    expect(ingest(publicKey)).toStrictEqual(new Uint8Array([
      2, 51
    ]));
  });
});