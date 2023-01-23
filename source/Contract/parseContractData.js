import xdr from '../xdr.js';

import {Account, Keys} from '../Account/index.js';

function parseContractDataValue(xdr) {
  // console.log(xdr.constructor.unionName, xdr.constructor.structName, xdr);
  if (xdr.constructor.unionName === 'ScVal') {
    switch (xdr._switch.name) {
      case 'scvObject': {
        return parseContractDataValue(xdr._value);
      }
      case 'scvU32': {
        return xdr._value;
      }
      case 'scvSymbol': {
        return new TextDecoder().decode(xdr._value);
      }
      case 'scvStatic': {
        switch (xdr._value.name) {
          case 'scsVoid': {
            return null;
          }
          case 'scsTrue': {
            return true;
          }
          case 'scsFalse': {
            return false;
          }
          case 'scsLedgerKeyContractCode': {
            return 'contractCode';
          }
        }
      }
      default: {
        console.log(xdr._switch.name);
      }
    }
  } else if (xdr.constructor.unionName === 'ScObject') {
    switch (xdr._switch.name) {
      case 'scoVec': {
        return xdr._value.map((element) => parseContractDataValue(element));
      }
      case 'scoMap': {
        return xdr._value
          .map((entry) => {
            return {
              key: parseContractDataValue(entry._attributes.key),
              value: parseContractDataValue(entry._attributes.val)
            };
          })
          .reduce(
            (previous, current) => ({
              ...previous,
              [current.key]: current.value
            }),
            {}
          );
      }
      case 'scoAccountId': {
        return new Account(
          new Keys(xdr._value._value)
        );
      }
      default: {
        console.log(xdr._switch.name);
      }
    }
  }
}
function parseContractData(encodedData) {
  const data = xdr.LedgerEntryData.fromXDR(encodedData, 'base64');
  return parseContractDataValue(data._value._attributes.val);
}

export {parseContractData};