import {base64} from '../../utilities/index.js';

import {Transaction} from './Transaction.js';
import {Account} from '../Account/index.js';
import {Network} from '../Network/index.js';
import {Precondition} from './Precondition/index.js';
import * as Operation from './Operation';

describe('Transaction', () => {
  test('Initialization with nothing.', () => {
    const transaction = new Transaction();

    expect(transaction._sourceAccount).toBeNull();
    expect(transaction._fee).toBe(Transaction.minimumFee);
    expect(transaction._sequenceNumber).toBeNull();
    expect(transaction._preconditions).toBeNull();
    expect(transaction._memo).toBeNull();
    expect(transaction._operations).toStrictEqual([]);
    expect(transaction._extension).toBeNull();

    expect(transaction.isValid).toBeFalsy();
  });

  test('Set source account.', () => {
    const account = Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD');
    const transaction = new Transaction()
      .sourceAccount(account);

    expect(transaction._sourceAccount).toBe(account);
  });
  test('Set fee.', () => {
    const transaction = new Transaction()
      .fee(200);

    expect(transaction._fee).toBe(200);
  });
  test('Set preconditions.', () => {
    const transaction = new Transaction()
      .preconditions(Precondition.TimeBounds(0, 1671053250 + 3600));

    expect(new Uint8Array(transaction._preconditions.toXDR())).toStrictEqual(new Uint8Array([
      0, 0, 0, 1, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0,
      99, 154, 77, 210
    ]));
  });
  test('Set operation.', async () => {
    const transaction = new Transaction()
      .operation(
        new Operation.Payment()
          .recipient(Account.fromKey('GB245HBHTR7BH34HXT2H3PH2UDJOAKDOAOC2WQWF37PBYLBYMDIWVWQ3'))
          .amount(1.52)
      );

    expect(transaction._operations.length).toBe(1);
    expect(
      new Uint8Array((await transaction._operations[0].serialized()).toXDR())
    ).toStrictEqual(
      new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 1,
        0, 0, 0, 0, 117, 206, 156, 39,
        156, 126, 19, 239, 135, 188, 244, 125,
        188, 250, 160, 210, 224, 40, 110, 3,
        133, 171, 66, 197, 223, 222, 28, 44,
        56, 96, 209, 106, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 231, 239, 0,
      ])
    )
  });

  test('Serialized.', async () => {
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
              "sequence": "438086664197"
            }
          })
        }
      } else {
        return null;
      }
    };

    const account = Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD');
    const transaction = await new Transaction()
      .sourceAccount(account)
      .fee(100)
      .preconditions(Precondition.TimeBounds(0, 1671053250 + 3600))
      .operation(
        new Operation.Payment()
          .recipient(Account.fromKey('GB245HBHTR7BH34HXT2H3PH2UDJOAKDOAOC2WQWF37PBYLBYMDIWVWQ3'))
          .amount(1.52)
      )
      .serializedFor(Network.local);
    
    // const serialized = await transaction.serializedFor(Network.local);

    expect(new Uint8Array(transaction.serializedSignaturePayload.toXDR())).toStrictEqual(new Uint8Array([
      186, 239, 215, 52, 184, 211, 228, 132,
      114, 207, 248, 57, 18, 55, 95, 237,
      188, 117, 115, 112, 25, 18, 254, 48,
      138, 247, 48, 24, 15, 151, 215, 74,
      0, 0, 0, 2, 0, 0, 0, 0,
      22, 150, 29, 8, 39, 215, 3, 141,
      145, 86, 22, 23, 167, 246, 104, 32,
      253, 215, 118, 77, 9, 190, 167, 158,
      167, 180, 198, 118, 44, 251, 149, 116,
      0, 0, 0, 100, 0, 0, 0, 102,
      0, 0, 0, 6, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 99, 154, 77, 210,
      0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 0, 0, 0, 1,
      0, 0, 0, 0, 117, 206, 156, 39,
      156, 126, 19, 239, 135, 188, 244, 125,
      188, 250, 160, 210, 224, 40, 110, 3,
      133, 171, 66, 197, 223, 222, 28, 44,
      56, 96, 209, 106, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 231, 239, 0,
      0, 0, 0, 0
    ]));
  });
  test('Signed.', async () => {
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
              "sequence": "438086664197"
            }
          })
        }
      } else {
        return null;
      }
    };

    const account = Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD');
    const transaction = await new Transaction()
      .sourceAccount(account)
      .fee(100)
      .preconditions(Precondition.TimeBounds(0, 1671053250 + 3600))
      .operation(
        new Operation.Payment()
          .recipient(Account.fromKey('GB245HBHTR7BH34HXT2H3PH2UDJOAKDOAOC2WQWF37PBYLBYMDIWVWQ3'))
          .amount(1.52)
      )
      .serializedFor(Network.local);
      
    await transaction.signedBy(account);

    const referenceTransactionEncoded = 'AAAAAgAAAAAWlh0IJ9cDjZFWFhen9mgg/dd2TQm+p56ntMZ2LPuVdAAAAGQAAABmAAAABgAAAAEAAAAAAAAAAAAAAABjmk3SAAAAAAAAAAEAAAAAAAAAAQAAAAB1zpwnnH4T74e89H28+qDS4ChuA4WrQsXf3hwsOGDRagAAAAAAAAAAAOfvAAAAAAAAAAABLPuVdAAAAEAS9h9uoCeeV8m/Zu47DrFDdjAlL4dWyuXkXIDoiB6lk6M8U6+FWnrzMiBdNqENFrIOMtbzWiv7bCAyrG/zc0cF';

    expect(new Uint8Array(transaction.serializedEnvelope().toXDR())).toStrictEqual(
      base64.decode(referenceTransactionEncoded)
    );
    expect(transaction.finalized()).toBe(referenceTransactionEncoded);
  });
});