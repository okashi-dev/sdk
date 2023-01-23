import xdr from '../../xdr.js';

class UploadWasm {
  constructor() {
    this._code = null;
  }

  async serialized() {
    return new xdr.Operation({
      body: xdr.OperationBody.invokeHostFunction(
        new xdr.InvokeHostFunctionOp({
          function: xdr.HostFunction.hostFunctionTypeInstallContractCode(
            await this._code.serialized()
          ),
          footprint: new xdr.LedgerFootprint({
            readOnly: [],
            readWrite: [
              xdr.LedgerKey.contractCode(new xdr.LedgerKeyContractCode({
                hash: await this._code.hash()
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
}

export {UploadWasm};