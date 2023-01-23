# Soroban JavaScript SDK

The main aim of this SDK is to provide a great developer experience while integrating and using Soroban contracts and the Stellar blockchain.

## Documentation

The SDK exports the following objects. I will describe each separately.

```JavaScript
import {
  xdr,
  Network,
  Account,
  Keys,
  Transaction,
  Operation,
  Contract
} from '@usesoroban/sdk';
```

### `xdr`

This is the product of [`xdrgen`][1] ingesting [`stellar-xdr`][2]. I made the one modification where I import a browser wrapper over `Buffer`, which is a Node data type. The intention here was to leverage as much of what's provided by the browser as possible.

Every available Stellar xdr definition is accessible under `xdr`.

```JavaScript
xdr.AccountId.publicKeyTypeEd25519(...);
xdr.ScVal.scvU32(42);
// ...
```

You can explore the Stellar/Soroban XDR type definitions in the [source code][3].

### `Network`

You interact with **Soroban** by sending requests to compatible RPC servers. To simplify these requests, `Network` wraps all Soroban RPC methods.

To initialize, provide the network passphrase and the remote RPC URL.

```JavaScript
const network = new Network(
  'Test SDF Future Network ; October 2022',
  'https://futurenet.sorobandev.com/soroban/rpc'
);
```

#### RPC calls

To interact with the Soroban RPC use these `Network` methods.

```TypeScript
async getHealth();
async getAccount(account: string | Account);
async getLatestLedger();
async getLedgerEntry(key: string | XDR);
async getNetwork();
async requestAirdrop(account: Account);
async getEvents({
  startLedger: string,
  endLedger: string
});
async getTransactionStatus(transactionId: string);
async sendTransaction(transaction: Transaction | PreparedTransaction | string);
async simulateTransaction(transaction: : Transaction | PreparedTransaction | string);
```

### `Account`

At the moment, this SDK has not integrated any wallet providers so the transaction signing process is done insecurely using a secret key string. However, while Soroban is in development, I felt like it was reasonable to avoid wallet integration to reduce complexity. This will change in the future.

You can initialize instances of `Account` by using both the address or public key as well as the secret key.

```JavaScript
// Initialized using address, account can be used as an argument, but can't sign transactions.
const account = Account.fromKey('GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW');
// Initialized using secret key, can be used to sign transactions.
const account = Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD');
```

The most important ability instances of `Account` have is the `call` method. It allows calling Soroban contract functions in a very simple way.

```JavaScript
const result = await account.call(
  contract.toggle({state: true})
);
```

I'll describe this in more detail later in this document.

#### Interace

```TypeScript
get address(); // Stellar address encoded as string G...
sign(data: Uint8Array);
async call(invocation: {network: Network, operations: Operation[]});
```

### `Keys`

Every account has associated `Keys`, you can access it either as `account.keys` or by initializing `Keys` directly using the factory function `Keys.fromString(key: string)` which takes a public or secret key string.

I'm using the [`TweetNaCl.js`][4] npm package to sign bytes encoded as `Uint8Array`. Normally, there's no need to interact with `Keys` directly as other objects do so under the hood.

### `Transaction`

This is a wrapper class that allows composing Stellar transactions.

```JavaScript
const transaction = new Transaction()
  .sourceAccount(
    Account.fromKey('SAEWT32IC2A77HNKNI6FJA2YQEJN24SDH6U3QVLFW2QEPQ5JZMENNCCD')
  )
  .operations(
    new Operation.CallContract()
      .contractId('d9d5827dc639a3a100fecc1e9ac71e7e7d59867745d5dcc2955049f5ef9c3c06')
      .functionName('on')
  );
```

You define a `Transaction` by applying the following methods.

```TypeScript
sourceAccount(account: Account);
fee(amount: number);
preconditioncs(preconditions: Precondition[]);
operations(...operations: Operation);
operationFootprints(...footprints: string[]);
```

Once you're ready to sign and send it.

```JavaScript
const preparedTransaction = await transaction.prepareFor(network: Network);
preparedTransaction.signedBy(account);
network.sendTransaction(preparedTransaction.serialized());
```

Or you can allow `Network` to take care of this and simply provide the transaction object.

```JavaScript
network.sendTransaction(transaction);
```

### `Operation`

A `Transaction` instance is a wrapper around `Operation`s. When working with Soroban, you only need three types of `Operation`s.

```JavaScript
import {Operation} from '@usesoroban/sdk';

Operation.UploadWasm;
Operation.InstantiateContract;
Operation.CallContract;
```

You only `UploadWasm` and `InstantiateContract` when you're setting up. In your application you're mostly going to be using `CallContract`, however, there's an even better way of interacting with Soroban contracts - using the `Contract` class.

### `Contract`

All you need is a contract ID.

```JavaScript
const contract = new Contract(
  network,
  'e1ccc55518c3f2461aaa4984173286ff3374adcbbaa942ac8a40b12ec5dbc752'
);
await contract.initialize();
```

During a single session, instances of `Contract` only need to be initialized once. After that, you can easily read their contract data on the ledger.

```JavaScript
const list = await contract.fetchStorage('LIST');
```

As well as call their public functions. All arguments maintain the same name as in Rust, for that purpose I'm using an object function argument.

In this case, the `add` function is defined in Rust.

```Rust
pub fn add(env: Env, item: Symbol) -> Vec<Symbol>
```

While on the JavaScript client-side you call the same function using this syntax.

```JavaScript
let result = await account.call(
  contract.add({item: 'Hello'})
);
```

[1]: https://github.com/stellar/xdrgen
[2]: https://github.com/stellar/stellar-xdr/tree/026c9cd074bdb28ddde8ee52f2a4502d9e518a09
[3]: https://github.com/useSoroban/sdk/blob/trunk/source/xdr.js
[4]: https://www.npmjs.com/package/tweetnacl