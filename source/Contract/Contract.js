import xdr from '../xdr.js';

import {CallContract} from '../Transaction/Operation/CallContract.js';

import {parseContractData} from './parseContractData.js';
import {parseAssembly} from './parseAssembly.js';

import {hex} from '../utilities/index.js';

class Contract {
  get storage() {
    return {
      get: (key) => this.fetchStorage(key)
    };
  }
  get isInitialized() {
    return this.executableBinary && this.executable;
  }
  constructor(network, id) {
    this.network = network;
    this.id = id;
    this.executableBinary = null;
    this.executable = null;
  }
  async initialize() {
    // Get contract code hash.
    const hashKey = xdr.LedgerKey.contractData(
      new xdr.LedgerKeyContractData({
        contractId: hex.decode(this.id),
        key: xdr.ScVal.scvStatic(
          xdr.ScStatic.scsLedgerKeyContractCode()
        )
      })
    );
    const hashResponse = await this.network.getLedgerEntry(
      hashKey.toXDR('base64')
    );

    if (!hashResponse.xdr) {
      throw `Error: couldn't find contract code hash for contract ${this.id}.`;
    }

    const encodedHash = xdr.LedgerEntryData.fromXDR(hashResponse.xdr, 'base64');
    const hash = encodedHash._value._attributes.val._value._value._value;

    // Get the executable code.
    const executableKey = xdr.LedgerKey.contractCode(
      new xdr.LedgerKeyContractCode({
        hash
      })
    );
    
    const executableResponse = await this.network.getLedgerEntry(
      executableKey.toXDR('base64')
    );

    if (!executableResponse.xdr) {
      throw `Error: couldn't find contract code for contract ${this.id}.`;
    }

    const encodedCode = xdr.LedgerEntryData.fromXDR(executableResponse.xdr, 'base64');
    this.executableBinary = encodedCode._value._attributes.code;
    this.executable = await parseAssembly(this.executableBinary);
    
    // Read contract interface from WebAssembly.
    const functions = [];
    const contractSpecificationSection = WebAssembly.Module.customSections(this.executable.module, 'contractspecv0');
    for (const item of contractSpecificationSection) {
      // As of the current release, the data for ScSpecEntry is not shaped as an array, rather it's all one long sequence of bytes.
      let itemBytes = new Uint8Array(item);
      while (itemBytes.length > 0) {
        const entry = xdr.ScSpecEntry.fromXDR(itemBytes);
        itemBytes = itemBytes.slice(entry.toXDR().length);
        // Decode entry further.
        
        if (entry._arm === 'functionV0') {
          const name = new TextDecoder().decode(entry._value._attributes.name);
          console.log(name);
          const inputs = entry._value._attributes.inputs.map((input) => ({
            name: new TextDecoder().decode(input._attributes.name),
            type: input._attributes.type._switch.name
          }));
          const outputs = entry._value._attributes.outputs.map((output) => output._switch.name);
          
          functions.push({
            name,
            inputs,
            outputs
          });
        }
      }
      
    }

    // Add contract interface to this instance of Contract.
    for (const fn of functions) {
      this[fn.name] = (rawInputs) => {
        console.log(rawInputs);
        let operation = new CallContract()
          .contractId(this.id)
          .functionName(fn.name);
        for (const input of fn.inputs) {
          const rawInput = rawInputs[input.name];
          console.log(rawInput, input);
          
          let parsedInput = null;

          switch (input.type) {
            case 'scSpecTypeU32': {
              parsedInput = xdr.ScVal.scvU32(rawInput)
              break;
            }
            case 'scSpecTypeBool': {
              parsedInput = xdr.ScVal.scvStatic(
                rawInput ? xdr.ScStatic.scsTrue() : xdr.ScStatic.scsFalse()
              )
              break;
            }
            case 'scSpecTypeSymbol': {
              parsedInput = xdr.ScVal.scvSymbol(
                new TextEncoder().encode(rawInput)
              );
              break;
            }
          }

          if (!parsedInput) {
            throw `Error: argument ${input.name} has unrecognized type.`;
          }

          operation = operation.functionArgument(parsedInput);
        }

        return {
          network: this.network,
          operations: [
            operation
          ]
        };
      };
    }
  }
  async fetchStorage(key) {
    const formattedKey = xdr.LedgerKey.contractData(
      new xdr.LedgerKeyContractData({
        contractId: hex.decode(this.id),
        key: xdr.ScVal.scvSymbol(
          new TextEncoder().encode(key)
        )
      })
    );

    const response = await this.network.getLedgerEntry(
      formattedKey.toXDR('base64')
    );

    if (response?.xdr) {
      return parseContractData(response.xdr);
    } else {
      return undefined;
    }
  }
}

export {Contract};