import xdr from '../xdr.js';

import {Account} from '../Account/index.js';
import {Transaction, PreparedTransaction} from '../Transaction/index.js';
import {CallContract} from '../Transaction/Operation/CallContract.js';

const constants = {
  passphrases: {
    local: 'Standalone Network ; February 2017',
    future: 'Test SDF Future Network ; October 2022',
  },
  defaultUrl: 'http://localhost:8000/soroban/rpc'
};

let localNetwork = null;
let futureNetwork = null;

class Network {
  static get passphrases() {
    return constants.passphrases;
  }

  static get local() {
    if (!localNetwork) {
      localNetwork = new Network(constants.passphrases.local, constants.defaultUrl);
    }
    return localNetwork;
  }
  static get future() {
    if (!futureNetwork) {
      futureNetwork = new Network(constants.passphrases.future, constants.defaultUrl);
    }
    return futureNetwork;
  }

  constructor(passphrase, remoteUrl) {
    this.passphrase = passphrase;
    this.id = null;
    this.remoteUrl = remoteUrl;
    this.counter = 0;
  }

  async hydrate() {
    this.id = new Uint8Array(
      await crypto.subtle.digest('SHA-256', new TextEncoder().encode(this.passphrase))
    );

    return this;
  }

  async executeRequest(request) {
    return await this.call(request.method, request.parameters);
  }
  async call(method, parameters) {
    const payload = {
      jsonrpc: '2.0',
      id: `${Date.now()}.${this.counter++}`,
      method
    };
    if (parameters) {
      payload.params = parameters;
    }

    const response = await fetch(this.remoteUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const responseJson = await response.json();

    if (responseJson.error) {
      return responseJson.error;
    }

    return responseJson.result;
  }

  //
  // Abstracted RPC calls.
  //

  async getHealth() {
    return this.call('getHealth');
  }
  async getAccount(account) {
    return this.call('getAccount', {
      address: account instanceof Account ? account.address : account
    });
  }
  async getLatestLedger() {
    return this.call('getLatestLedger');
  }
  async getLedgerEntry(key) {
    return this.call('getLedgerEntry', {
      key: typeof key === 'string' ? key : key.toXDR('base64')
    });
  }
  async getNetwork() {
    return this.call('getNetwork');
  }
  async requestAirdrop(account) {
    return this.call('requestAirdrop', {
      account: account.keys.formattedPublicKey
    });
  }
  async getEvents(query) {
    const parameters = {};

    if (query.startLedger) {
      parameters.startLedger = `${query.startLedger}`;
    }
    if (query.endLedger) {
      parameters.endLedger = `${query.endLedger}`;
    }

    return this.call('getEvents', parameters);
  }
  async getTransactionStatus(transactionId) {
    return this.call('getTransactionStatus', {
      hash: transactionId
    });
  }
  async sendTransaction(transaction) {
    return this.call('sendTransaction', {
      transaction: await this.serializeTransaction(transaction)
    });
  }
  async simulateTransaction(transaction) {
    return this.call('simulateTransaction', {
      transaction: await this.serializeTransaction(transaction)
    });
  }

  //
  // Custom interface.
  //

  async serializeTransaction(transaction) {
    let serializedTransaction = null;
  
    if (transaction instanceof Transaction) {
      const preparedTransaction = await transaction.preparedFor(this);
      preparedTransaction.signedBy(transaction._sourceAccount);
      serializedTransaction = preparedTransaction.serialized();
    } else if (transaction instanceof PreparedTransaction) {
      serializedTransaction = transaction.serialized();
    } else if (typeof transaction === 'string') {
      serializedTransaction = transaction;
    }
  
    return serializedTransaction;
  }

  async execute(operations, signee) {
    // TODO: Implement a way of executing multiple operations.
    const operation = operations[0];

    if (operation instanceof CallContract) {
      const transaction = await new Transaction()
        .sourceAccount(signee)
        .operations(operation);

      const simulation = await this.simulateTransaction(transaction);
      console.log(simulation);

      if (simulation.error) {
        throw simulation.error;
      }
      
      const result = await this.sendTransaction(
        transaction.operationFootprints(simulation.footprint)
      );
      
      return result;
    }
  }
}

export {Network};