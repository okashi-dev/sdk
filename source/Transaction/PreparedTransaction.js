import xdr from '../xdr.js';

import {Transaction} from './Transaction.js';

class PreparedTransaction {
  static async from(transaction, network) {
    if (!transaction._sourceAccount) {
      throw `Error: source account not defined for this transactions.`;
    }

    await network.hydrate();
    await transaction._sourceAccount.hydrateOn(network);
    transaction._sequenceNumber = BigInt(transaction._sourceAccount.sequenceNumber) + 1n;

    const encoded = new xdr.Transaction({
      sourceAccount: transaction._sourceAccount.serialized,
      fee: transaction._fee || transaction._operations.length * Transaction.minimumFee,
      seqNum: xdr.SequenceNumber.fromString(transaction._sequenceNumber.toString()),
      cond: transaction._preconditions || xdr.Preconditions.precondNone(),
      memo: xdr.Memo.memoNone(),
      operations: await Promise.all(
        transaction._operations.map((operation) => operation.serialized())
      ),
      ext: new xdr.TransactionExt(0)
    });

    const signaturePayload = new xdr.TransactionSignaturePayload({
      networkId: network.id,
      taggedTransaction: xdr.TransactionSignaturePayloadTaggedTransaction.envelopeTypeTx(
        encoded
      )
    });

    const hashed = new Uint8Array(
      await crypto.subtle.digest('SHA-256', signaturePayload.toXDR())
    );

    return new PreparedTransaction(
      encoded,
      hashed
    );
  }
  constructor(transaction, hash) {
    this.transaction = transaction;
    this.hash = hash;
    this.signatures = [];
  }
  signedBy(account) {
    this.signatures.push(
      account.signDecorated(this.hash)
    );
    
    return this;
  }
  serialized() {
    const envelope = xdr.TransactionEnvelope.envelopeTypeTx(
      new xdr.TransactionV1Envelope({
        tx: this.transaction,
        signatures: this.signatures
      })
    );

    return envelope.toXDR('base64');
  }
}

export {PreparedTransaction};