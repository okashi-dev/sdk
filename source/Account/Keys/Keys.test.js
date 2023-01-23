import {Keys} from './Keys.js';

describe('Keys', () => {
  test('Initialization with secret key.', () => {
    const secretKey = 'SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD';
    const keys = Keys.fromString(secretKey);

    expect(keys.public).toStrictEqual(new Uint8Array([
      22, 150, 29, 8, 39, 215, 3, 141,
      145, 86, 22, 23, 167, 246, 104, 32,
      253, 215, 118, 77, 9, 190, 167, 158,
      167, 180, 198, 118, 44, 251, 149, 116
    ]));
    expect(keys.secret).toStrictEqual(new Uint8Array([
      9, 105, 239, 72, 22, 129, 255, 157,
      170, 106, 60, 84, 131, 88, 129, 18,
      221, 114, 67, 63, 169, 184, 85, 101,
      182, 160, 71, 195, 169, 203, 8, 214,
      22, 150, 29, 8, 39, 215, 3, 141,
      145, 86, 22, 23, 167, 246, 104, 32,
      253, 215, 118, 77, 9, 190, 167, 158,
      167, 180, 198, 118, 44, 251, 149, 116
    ]));
  });
  test('Initialiation with public key.', () => {
    const publicKey = 'GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW';
    const keys = Keys.fromString(publicKey);

    expect(keys.public).toStrictEqual(new Uint8Array([
      22, 150, 29, 8, 39, 215, 3, 141,
      145, 86, 22, 23, 167, 246, 104, 32,
      253, 215, 118, 77, 9, 190, 167, 158,
      167, 180, 198, 118, 44, 251, 149, 116
    ]));
  });
  test('Initialization with invalid key type.', () => {
    expect(() => {
      Keys.ingestString('XA======');
    }).toThrow();
  });

  test('Secret key format.', () => {
    const secretKey = 'SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD';
    const keys = Keys.fromString(secretKey);

    expect(keys.formattedSecretKey).toBe(secretKey);
  });
  test('Public key format.', () => {
    const publicKey = 'GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW';
    const keys = Keys.fromString(publicKey);

    expect(keys.formattedPublicKey).toBe(publicKey);
  });

  test('Hint.', () => {
    const secretKey = 'SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD';
    const publicKey = 'GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW';
    const keys = Keys.fromString(secretKey);

    expect(keys.formattedPublicKey).toBe(publicKey);
    expect(keys.hint).toStrictEqual(new Uint8Array([
      44, 251, 149, 116
    ]));
  });

  test('Signature.', () => {
    const secretKey = 'SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD';
    const keys = Keys.fromString(secretKey);

    expect(keys.sign(new Uint8Array([0]))).toStrictEqual(new Uint8Array([
      187, 145, 5, 38, 86, 102, 36, 10,
      50, 211, 170, 149, 96, 91, 181, 61,
      35, 158, 194, 92, 179, 10, 230, 179,
      56, 236, 94, 7, 215, 10, 150, 156,
      144, 165, 243, 104, 193, 240, 243, 243,
      86, 159, 18, 183, 61, 107, 157, 250,
      140, 107, 241, 220, 170, 137, 82, 41,
      110, 179, 18, 45, 90, 208, 107, 6
    ]));
  });
  test('Signature with public key.', () => {
    const publicKey = 'GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW';
    const keys = Keys.fromString(publicKey);

    expect(() => {
      keys.sign(new Uint8Array([0]));
    }).toThrow();
  });
});