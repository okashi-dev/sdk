import nacl from 'tweetnacl';

import {base32, bytes} from '../../utilities/index.js';

import * as checksum from './checksum.js';

const constants = {
  prefixToType: {
    144: 'ed25519SecretSeed',
    48: 'ed25519PublicKey'
  },
  typeToPrefix: {
    'ed25519SecretSeed': 144,
    'ed25519PublicKey': 48
  }
};

class Keys {
  static fromString(key) {
    // This expects a Stellar format key [S...] for secret key or [G...] public key.
    const decoded = base32.decode(key);
    const payload = decoded.slice(0, -2);
    const incomingChecksum = decoded.slice(-2);

    let publicKey = null;
    let secretKey = null;

    // Parse based on the key type.
    const keyType = constants.prefixToType[decoded[0]];
    switch (keyType) {
      // Stellar secret key.
      case 'ed25519SecretSeed': {
        const seed = payload.slice(1);

        const keyPair = nacl.sign.keyPair.fromSeed(seed);
        publicKey = keyPair.publicKey;
        secretKey = keyPair.secretKey;
        break;
      }
      // Stellar public key.
      case 'ed25519PublicKey': {
        publicKey = payload.slice(1);
        break;
      }
      // Proceed no further without knowing the key type.
      default: {
        throw `Error: unknown key type, raw value = ${decoded[0]}.`;
      }
    }

    if (publicKey.length !== 32) {
      throw `Error: invalid public key length.`;
    }

    if (!bytes.areEqual(incomingChecksum, checksum.ingest(payload))) {
      throw `Error: invalid checksum.`;
    }

    return new Keys(
      publicKey,
      secretKey
    );
  }

  constructor(publicKey, secretKey = null) {
    this.public = publicKey;
    this.secret = secretKey;
  }

  get formattedSecretKey() {
    const prefixedSecretKey = [
      constants.typeToPrefix['ed25519SecretSeed'],
      ...this.secret.slice(0, 32)
    ];
    const calculatedChecksum = checksum.ingest(prefixedSecretKey);
    const payload = new Uint8Array([
      ...prefixedSecretKey,
      ...calculatedChecksum
    ]);

    return base32.encode(payload);
  }
  get formattedPublicKey() {
    const prefixedPublicKey = [
      constants.typeToPrefix['ed25519PublicKey'],
      ...this.public
    ];
    const calculatedChecksum = checksum.ingest(prefixedPublicKey);
    const payload = new Uint8Array([
      ...prefixedPublicKey,
      ...calculatedChecksum
    ]);

    return base32.encode(payload);
  }
  get hint() {
    return this.public.slice(-4);
  }

  sign(data) {
    if (this.secret === null) {
      throw `Error: sign() method only available for Keys that have a secret key defined.`;
    }
    
    const signature = nacl.sign.detached(data, this.secret);
    return signature;
  }

  toString() {
    return this.formattedPublicKey;
  }

}

export {Keys};