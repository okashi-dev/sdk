import xdr from '../xdr.js';

import {Keys} from './Keys/index.js';

class Account {
  static fromKey(string) {
    const keys = Keys.fromString(string);
    return new Account(keys);
  }

  constructor(keys, sequenceNumber = null) {
    this.keys = keys;
    this.sequenceNumber = sequenceNumber;
  }

  get address() {
    return this.keys.formattedPublicKey
  }

  sign(data) {
    return this.keys.sign(data);
  }
  signDecorated(data) {
    const signature = this.keys.sign(data);
    return new xdr.DecoratedSignature({
      hint: this.keys.hint,
      signature: signature
    });
  }
  get serialized() {
    return xdr.MuxedAccount.keyTypeEd25519(this.keys.public);
  }
  async hydrateOn(network) {
    const networkAccount = await network.getAccount(this);
    this.sequenceNumber = BigInt(networkAccount.sequence);
  }

  async call(invocation) {
    return await invocation.network.execute(
      invocation.operations,
      this
    );
  }

  toString() {
    return this.keys.formattedPublicKey;
  }
}

export {Account};