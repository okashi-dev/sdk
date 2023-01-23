import xdr from '../xdr.js';

import {PreparedTransaction} from './PreparedTransaction.js';

import {base64} from '../utilities/index.js';

class Transaction {
  static get minimumFee() {
    return 100;
  }

  constructor() {
    this._sourceAccount = null;
    this._fee = null;
    this._sequenceNumber = null;
    this._preconditions = null;
    this._memo = null;
    this._operations = [];
    this._extension = null;

    this.signatures = [];

    this.hash = null;
    this.serialized = null;
    this.serializedSignaturePayload = null;
  }

  get isValid() {
    // These fields are required.
    return (
      this._sourceAccount !== null &&
      this._fee !== null &&
      this._operations.length > 0
    );
  }

  sourceAccount(account) {
    this._sourceAccount = account;
    return this;
  }
  fee(amount) {
    this._fee = amount;
    return this;
  }
  preconditions(preconditions) {
    this._preconditions = preconditions;
    return this;
  }
  operations(...operations) {
    this._operations = operations;
    return this;
  }
  operationFootprints(...footprints) {
    this._operations = this._operations.map(
      (operation, index) => operation.footprint(footprints[index])
    );
    return this;
  }

  async preparedFor(network) {
    return await PreparedTransaction.from(this, network);
  }

  serializedEnvelope() {
    return xdr.TransactionEnvelope.envelopeTypeTx(
      new xdr.TransactionV1Envelope({
        tx: this.serialized,
        signatures: this.signatures
      })
    );
  }
  finalized() {
    return base64.encode(
      new Uint8Array(
        this.serializedEnvelope().toXDR()
      )
    );
  }
}

export {Transaction};