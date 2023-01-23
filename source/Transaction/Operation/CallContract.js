import xdr from '../../xdr.js';

import {hex} from '../../utilities/index.js';

class CallContract {
  constructor() {
    this._contractId = null;
    this._functionName = null;
    this._functionArguments = [];
    this._footprint = new xdr.LedgerFootprint({
      readOnly: [],
      readWrite: []
    });
  }

  clone() {
    const operation = new CallContract();
    operation._contractId = this._contractId;
    operation._functionName = this._functionName;
    operation._functionArguments = [...this._functionArguments];
    operation._footprint = this._footprint;

    return operation;
  }

  async serialized() {
    const invokeArguments = [
      xdr.ScVal.scvObject(
        xdr.ScObject.scoBytes(
          hex.decode(this._contractId)
        )
      ),
      xdr.ScVal.scvSymbol(
        new TextEncoder().encode(this._functionName)
      ),
      ...this._functionArguments
    ];

    return new xdr.Operation({
      body: xdr.OperationBody.invokeHostFunction(
        new xdr.InvokeHostFunctionOp({
          function: xdr.HostFunction.hostFunctionTypeInvokeContract(
            invokeArguments
          ),
          footprint: this._footprint
        })
      )
    });
  }

  contractId(id) {
    const mutated = this.clone();
    mutated._contractId = id;
    return mutated;
  }
  functionName(name) {
    const mutated = this.clone();
    mutated._functionName = name;
    return mutated;
  }
  functionArgument(argument) {
    const mutated = this.clone();
    mutated._functionArguments.push(argument);
    return mutated;
  }
  functionArguments(...list) {
    const mutated = this.clone();
    mutated._functionArguments = list;
    return mutated;
  }
  footprint(footprint) {
    if (footprint) {
      const mutated = this.clone();
      mutated._footprint = typeof footprint === 'string' ? xdr.LedgerFootprint.fromXDR(footprint, 'base64') : footprint;
      return mutated;
    }
    return this;
  }
}

export {CallContract};