import {Account} from './Account.js';
import {Network} from '../Network/index.js';

describe('Account', () => {
  test('Signature.', () => {
    const account = Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD');
    const data = new Uint8Array([
      66, 193, 111, 55, 76, 14, 5, 42,
      149, 70, 97, 230, 162, 39, 149, 131,
      43, 249, 60, 133, 187, 54, 186, 157,
      20, 38, 142, 34, 251, 29, 107, 78
    ]);

    expect(account.sign(data)).toStrictEqual(new Uint8Array([
      91, 137, 172, 118, 121, 101, 198, 217,
      47, 113, 8, 114, 27, 43, 113, 62,
      131, 6, 94, 131, 41, 249, 45, 123,
      33, 31, 83, 140, 129, 76, 3, 190,
      221, 72, 172, 72, 15, 42, 241, 212,
      1, 63, 43, 118, 203, 48, 66, 246,
      217, 186, 99, 107, 62, 147, 39, 74,
      218, 165, 163, 31, 126, 188, 64, 7
    ]))
  });

  test('Decorated signature.', () => {
    const account = Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD');
    const data = new Uint8Array([
      66, 193, 111, 55, 76, 14, 5, 42,
      149, 70, 97, 230, 162, 39, 149, 131,
      43, 249, 60, 133, 187, 54, 186, 157,
      20, 38, 142, 34, 251, 29, 107, 78
    ]);

    expect(new Uint8Array(account.signDecorated(data).toXDR())).toStrictEqual(new Uint8Array([
      44, 251, 149, 116, 0, 0, 0, 64,
      91, 137, 172, 118, 121, 101, 198, 217,
      47, 113, 8, 114, 27, 43, 113, 62,
      131, 6, 94, 131, 41, 249, 45, 123,
      33, 31, 83, 140, 129, 76, 3, 190,
      221, 72, 172, 72, 15, 42, 241, 212,
      1, 63, 43, 118, 203, 48, 66, 246,
      217, 186, 99, 107, 62, 147, 39, 74,
      218, 165, 163, 31, 126, 188, 64, 7
    ]))
  });

  test('Address.', () => {
    const account = Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD');

    expect(account.address).toBe('GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW');
  });

  test('Serialized account.', () => {
    const account = Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD');

    expect(new Uint8Array(account.serialized.toXDR())).toStrictEqual(new Uint8Array([
      0, 0, 0, 0, 22, 150, 29, 8,
      39, 215, 3, 141, 145, 86, 22, 23,
      167, 246, 104, 32, 253, 215, 118, 77,
      9, 190, 167, 158, 167, 180, 198, 118,
      44, 251, 149, 116
    ]));
  });

  test('Hydrated.', async () => {
    global.fetch = (url, parameters) => {
      const body = JSON.parse(parameters.body);
      if (body.params.address === 'GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW') {
        return {
          ok: true,
          json: () => ({
            "jsonrpc": "2.0",
            "id": 0,
            "result": {
              "id": "GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW",
              "sequence": "1"
            }
          })
        }
      } else {
        return null;
      }
    };

    const account = Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD');
    await account.hydrateOn(Network.local);

    expect(account.sequenceNumber.toString()).toBe('1');
  });
});