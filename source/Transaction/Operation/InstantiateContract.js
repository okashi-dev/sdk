import xdr from '../../xdr.js';

import {hex} from '../../utilities/index.js';

class InstantiateContract {
  constructor() {
    this._code = null;
    this._codeHash = null;
    this._network = null;
    this._sourceAccount = null;
  }

  async serialized() {
    await this._network.hydrate();

    const salt = crypto.getRandomValues(new Uint8Array(32));
    const preimage = xdr.HashIdPreimage.envelopeTypeContractIdFromSourceAccount(
      new xdr.HashIdPreimageSourceAccountContractId({
        networkId: this._network.id,
        sourceAccount: xdr.AccountId.publicKeyTypeEd25519(this._sourceAccount.keys.public),
        salt
      })
    );
    const contractId = new Uint8Array(
      await crypto.subtle.digest('SHA-256', preimage.toXDR())
    );

    const codeHash = this._code ? await this._code.hash() : hex.decode(this._codeHash);

    return new xdr.Operation({
      body: xdr.OperationBody.invokeHostFunction(
        new xdr.InvokeHostFunctionOp({
          function: xdr.HostFunction.hostFunctionTypeCreateContract(
            new xdr.CreateContractArgs({
              contractId: xdr.ContractId.contractIdFromSourceAccount(
                salt
              ),
              source: xdr.ScContractCode.sccontractCodeWasmRef(
                codeHash
              )
            })
          ),
          footprint: new xdr.LedgerFootprint({
            readOnly: [
              xdr.LedgerKey.contractCode(new xdr.LedgerKeyContractCode({
                hash: codeHash
              }))
            ],
            readWrite: [
              xdr.LedgerKey.contractData(new xdr.LedgerKeyContractData({
                contractId,
                key: xdr.ScVal.scvStatic(
                  xdr.ScStatic.scsLedgerKeyContractCode()
                )
              }))
            ]
          })
        })
      )
    });
  }

  code(code) {
    this._code = code;
    return this;
  }
  codeHash(codeHash) {
    this._codeHash = codeHash;
    return this;
  }
  network(network) {
    this._network = network;
    return this;
  }
  sourceAccount(account) {
    this._sourceAccount = account;
    return this;
  }
}

export {InstantiateContract};