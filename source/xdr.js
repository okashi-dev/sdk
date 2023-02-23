// Automatically generated on 2023-02-17T00:32:57+02:00
// DO NOT EDIT or your changes may be overwritten

/* jshint maxstatements:2147483647  */
/* jshint esnext:true  */

import * as XDR from 'js-xdr';
import * as buffer from 'buffer';

if (typeof window !== 'undefined') {
  // Add support for Buffer in browsers.
  window.Buffer = buffer.Buffer;
}


var types = XDR.config(xdr => {

// === xdr source ============================================================
//
//   typedef opaque Value<>;
//
// ===========================================================================
xdr.typedef("Value", xdr.varOpaque());

// === xdr source ============================================================
//
//   struct SCPBallot
//   {
//       uint32 counter; // n
//       Value value;    // x
//   };
//
// ===========================================================================
xdr.struct("ScpBallot", [
  ["counter", xdr.lookup("Uint32")],
  ["value", xdr.lookup("Value")],
]);

// === xdr source ============================================================
//
//   enum SCPStatementType
//   {
//       SCP_ST_PREPARE = 0,
//       SCP_ST_CONFIRM = 1,
//       SCP_ST_EXTERNALIZE = 2,
//       SCP_ST_NOMINATE = 3
//   };
//
// ===========================================================================
xdr.enum("ScpStatementType", {
  scpStPrepare: 0,
  scpStConfirm: 1,
  scpStExternalize: 2,
  scpStNominate: 3,
});

// === xdr source ============================================================
//
//   struct SCPNomination
//   {
//       Hash quorumSetHash; // D
//       Value votes<>;      // X
//       Value accepted<>;   // Y
//   };
//
// ===========================================================================
xdr.struct("ScpNomination", [
  ["quorumSetHash", xdr.lookup("Hash")],
  ["votes", xdr.varArray(xdr.lookup("Value"), 2147483647)],
  ["accepted", xdr.varArray(xdr.lookup("Value"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               Hash quorumSetHash;       // D
//               SCPBallot ballot;         // b
//               SCPBallot* prepared;      // p
//               SCPBallot* preparedPrime; // p'
//               uint32 nC;                // c.n
//               uint32 nH;                // h.n
//           }
//
// ===========================================================================
xdr.struct("ScpStatementPrepare", [
  ["quorumSetHash", xdr.lookup("Hash")],
  ["ballot", xdr.lookup("ScpBallot")],
  ["prepared", xdr.option(xdr.lookup("ScpBallot"))],
  ["preparedPrime", xdr.option(xdr.lookup("ScpBallot"))],
  ["nC", xdr.lookup("Uint32")],
  ["nH", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               SCPBallot ballot;   // b
//               uint32 nPrepared;   // p.n
//               uint32 nCommit;     // c.n
//               uint32 nH;          // h.n
//               Hash quorumSetHash; // D
//           }
//
// ===========================================================================
xdr.struct("ScpStatementConfirm", [
  ["ballot", xdr.lookup("ScpBallot")],
  ["nPrepared", xdr.lookup("Uint32")],
  ["nCommit", xdr.lookup("Uint32")],
  ["nH", xdr.lookup("Uint32")],
  ["quorumSetHash", xdr.lookup("Hash")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               SCPBallot commit;         // c
//               uint32 nH;                // h.n
//               Hash commitQuorumSetHash; // D used before EXTERNALIZE
//           }
//
// ===========================================================================
xdr.struct("ScpStatementExternalize", [
  ["commit", xdr.lookup("ScpBallot")],
  ["nH", xdr.lookup("Uint32")],
  ["commitQuorumSetHash", xdr.lookup("Hash")],
]);

// === xdr source ============================================================
//
//   union switch (SCPStatementType type)
//       {
//       case SCP_ST_PREPARE:
//           struct
//           {
//               Hash quorumSetHash;       // D
//               SCPBallot ballot;         // b
//               SCPBallot* prepared;      // p
//               SCPBallot* preparedPrime; // p'
//               uint32 nC;                // c.n
//               uint32 nH;                // h.n
//           } prepare;
//       case SCP_ST_CONFIRM:
//           struct
//           {
//               SCPBallot ballot;   // b
//               uint32 nPrepared;   // p.n
//               uint32 nCommit;     // c.n
//               uint32 nH;          // h.n
//               Hash quorumSetHash; // D
//           } confirm;
//       case SCP_ST_EXTERNALIZE:
//           struct
//           {
//               SCPBallot commit;         // c
//               uint32 nH;                // h.n
//               Hash commitQuorumSetHash; // D used before EXTERNALIZE
//           } externalize;
//       case SCP_ST_NOMINATE:
//           SCPNomination nominate;
//       }
//
// ===========================================================================
xdr.union("ScpStatementPledges", {
  switchOn: xdr.lookup("ScpStatementType"),
  switchName: "type",
  switches: [
    ["scpStPrepare", "prepare"],
    ["scpStConfirm", "confirm"],
    ["scpStExternalize", "externalize"],
    ["scpStNominate", "nominate"],
  ],
  arms: {
    prepare: xdr.lookup("ScpStatementPrepare"),
    confirm: xdr.lookup("ScpStatementConfirm"),
    externalize: xdr.lookup("ScpStatementExternalize"),
    nominate: xdr.lookup("ScpNomination"),
  },
});

// === xdr source ============================================================
//
//   struct SCPStatement
//   {
//       NodeID nodeID;    // v
//       uint64 slotIndex; // i
//   
//       union switch (SCPStatementType type)
//       {
//       case SCP_ST_PREPARE:
//           struct
//           {
//               Hash quorumSetHash;       // D
//               SCPBallot ballot;         // b
//               SCPBallot* prepared;      // p
//               SCPBallot* preparedPrime; // p'
//               uint32 nC;                // c.n
//               uint32 nH;                // h.n
//           } prepare;
//       case SCP_ST_CONFIRM:
//           struct
//           {
//               SCPBallot ballot;   // b
//               uint32 nPrepared;   // p.n
//               uint32 nCommit;     // c.n
//               uint32 nH;          // h.n
//               Hash quorumSetHash; // D
//           } confirm;
//       case SCP_ST_EXTERNALIZE:
//           struct
//           {
//               SCPBallot commit;         // c
//               uint32 nH;                // h.n
//               Hash commitQuorumSetHash; // D used before EXTERNALIZE
//           } externalize;
//       case SCP_ST_NOMINATE:
//           SCPNomination nominate;
//       }
//       pledges;
//   };
//
// ===========================================================================
xdr.struct("ScpStatement", [
  ["nodeId", xdr.lookup("NodeId")],
  ["slotIndex", xdr.lookup("Uint64")],
  ["pledges", xdr.lookup("ScpStatementPledges")],
]);

// === xdr source ============================================================
//
//   struct SCPEnvelope
//   {
//       SCPStatement statement;
//       Signature signature;
//   };
//
// ===========================================================================
xdr.struct("ScpEnvelope", [
  ["statement", xdr.lookup("ScpStatement")],
  ["signature", xdr.lookup("Signature")],
]);

// === xdr source ============================================================
//
//   struct SCPQuorumSet
//   {
//       uint32 threshold;
//       NodeID validators<>;
//       SCPQuorumSet innerSets<>;
//   };
//
// ===========================================================================
xdr.struct("ScpQuorumSet", [
  ["threshold", xdr.lookup("Uint32")],
  ["validators", xdr.varArray(xdr.lookup("NodeId"), 2147483647)],
  ["innerSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)],
]);

// === xdr source ============================================================
//
//   enum SCEnvMetaKind
//   {
//       SC_ENV_META_KIND_INTERFACE_VERSION = 0
//   };
//
// ===========================================================================
xdr.enum("ScEnvMetaKind", {
  scEnvMetaKindInterfaceVersion: 0,
});

// === xdr source ============================================================
//
//   union SCEnvMetaEntry switch (SCEnvMetaKind kind)
//   {
//   case SC_ENV_META_KIND_INTERFACE_VERSION:
//       uint64 interfaceVersion;
//   };
//
// ===========================================================================
xdr.union("ScEnvMetaEntry", {
  switchOn: xdr.lookup("ScEnvMetaKind"),
  switchName: "kind",
  switches: [
    ["scEnvMetaKindInterfaceVersion", "interfaceVersion"],
  ],
  arms: {
    interfaceVersion: xdr.lookup("Uint64"),
  },
});

// === xdr source ============================================================
//
//   const SC_SPEC_DOC_LIMIT = 1024;
//
// ===========================================================================
xdr.const("SC_SPEC_DOC_LIMIT", 1024);

// === xdr source ============================================================
//
//   enum SCSpecType
//   {
//       SC_SPEC_TYPE_VAL = 0,
//   
//       // Types with no parameters.
//       SC_SPEC_TYPE_U32 = 1,
//       SC_SPEC_TYPE_I32 = 2,
//       SC_SPEC_TYPE_U64 = 3,
//       SC_SPEC_TYPE_I64 = 4,
//       SC_SPEC_TYPE_U128 = 5,
//       SC_SPEC_TYPE_I128 = 6,
//       SC_SPEC_TYPE_BOOL = 7,
//       SC_SPEC_TYPE_SYMBOL = 8,
//       SC_SPEC_TYPE_BITSET = 9,
//       SC_SPEC_TYPE_STATUS = 10,
//       SC_SPEC_TYPE_BYTES = 11,
//       SC_SPEC_TYPE_INVOKER = 12,
//       SC_SPEC_TYPE_ADDRESS = 13,
//   
//       // Types with parameters.
//       SC_SPEC_TYPE_OPTION = 1000,
//       SC_SPEC_TYPE_RESULT = 1001,
//       SC_SPEC_TYPE_VEC = 1002,
//       SC_SPEC_TYPE_SET = 1003,
//       SC_SPEC_TYPE_MAP = 1004,
//       SC_SPEC_TYPE_TUPLE = 1005,
//       SC_SPEC_TYPE_BYTES_N = 1006,
//   
//       // User defined types.
//       SC_SPEC_TYPE_UDT = 2000
//   };
//
// ===========================================================================
xdr.enum("ScSpecType", {
  scSpecTypeVal: 0,
  scSpecTypeU32: 1,
  scSpecTypeI32: 2,
  scSpecTypeU64: 3,
  scSpecTypeI64: 4,
  scSpecTypeU128: 5,
  scSpecTypeI128: 6,
  scSpecTypeBool: 7,
  scSpecTypeSymbol: 8,
  scSpecTypeBitset: 9,
  scSpecTypeStatus: 10,
  scSpecTypeBytes: 11,
  scSpecTypeInvoker: 12,
  scSpecTypeAddress: 13,
  scSpecTypeOption: 1000,
  scSpecTypeResult: 1001,
  scSpecTypeVec: 1002,
  scSpecTypeSet: 1003,
  scSpecTypeMap: 1004,
  scSpecTypeTuple: 1005,
  scSpecTypeBytesN: 1006,
  scSpecTypeUdt: 2000,
});

// === xdr source ============================================================
//
//   struct SCSpecTypeOption
//   {
//       SCSpecTypeDef valueType;
//   };
//
// ===========================================================================
xdr.struct("ScSpecTypeOption", [
  ["valueType", xdr.lookup("ScSpecTypeDef")],
]);

// === xdr source ============================================================
//
//   struct SCSpecTypeResult
//   {
//       SCSpecTypeDef okType;
//       SCSpecTypeDef errorType;
//   };
//
// ===========================================================================
xdr.struct("ScSpecTypeResult", [
  ["okType", xdr.lookup("ScSpecTypeDef")],
  ["errorType", xdr.lookup("ScSpecTypeDef")],
]);

// === xdr source ============================================================
//
//   struct SCSpecTypeVec
//   {
//       SCSpecTypeDef elementType;
//   };
//
// ===========================================================================
xdr.struct("ScSpecTypeVec", [
  ["elementType", xdr.lookup("ScSpecTypeDef")],
]);

// === xdr source ============================================================
//
//   struct SCSpecTypeMap
//   {
//       SCSpecTypeDef keyType;
//       SCSpecTypeDef valueType;
//   };
//
// ===========================================================================
xdr.struct("ScSpecTypeMap", [
  ["keyType", xdr.lookup("ScSpecTypeDef")],
  ["valueType", xdr.lookup("ScSpecTypeDef")],
]);

// === xdr source ============================================================
//
//   struct SCSpecTypeSet
//   {
//       SCSpecTypeDef elementType;
//   };
//
// ===========================================================================
xdr.struct("ScSpecTypeSet", [
  ["elementType", xdr.lookup("ScSpecTypeDef")],
]);

// === xdr source ============================================================
//
//   struct SCSpecTypeTuple
//   {
//       SCSpecTypeDef valueTypes<12>;
//   };
//
// ===========================================================================
xdr.struct("ScSpecTypeTuple", [
  ["valueTypes", xdr.varArray(xdr.lookup("ScSpecTypeDef"), 12)],
]);

// === xdr source ============================================================
//
//   struct SCSpecTypeBytesN
//   {
//       uint32 n;
//   };
//
// ===========================================================================
xdr.struct("ScSpecTypeBytesN", [
  ["n", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct SCSpecTypeUDT
//   {
//       string name<60>;
//   };
//
// ===========================================================================
xdr.struct("ScSpecTypeUdt", [
  ["name", xdr.string(60)],
]);

// === xdr source ============================================================
//
//   union SCSpecTypeDef switch (SCSpecType type)
//   {
//   case SC_SPEC_TYPE_VAL:
//   case SC_SPEC_TYPE_U64:
//   case SC_SPEC_TYPE_I64:
//   case SC_SPEC_TYPE_U128:
//   case SC_SPEC_TYPE_I128:
//   case SC_SPEC_TYPE_U32:
//   case SC_SPEC_TYPE_I32:
//   case SC_SPEC_TYPE_BOOL:
//   case SC_SPEC_TYPE_SYMBOL:
//   case SC_SPEC_TYPE_BITSET:
//   case SC_SPEC_TYPE_STATUS:
//   case SC_SPEC_TYPE_BYTES:
//   case SC_SPEC_TYPE_ADDRESS:
//       void;
//   case SC_SPEC_TYPE_OPTION:
//       SCSpecTypeOption option;
//   case SC_SPEC_TYPE_RESULT:
//       SCSpecTypeResult result;
//   case SC_SPEC_TYPE_VEC:
//       SCSpecTypeVec vec;
//   case SC_SPEC_TYPE_MAP:
//       SCSpecTypeMap map;
//   case SC_SPEC_TYPE_SET:
//       SCSpecTypeSet set;
//   case SC_SPEC_TYPE_TUPLE:
//       SCSpecTypeTuple tuple;
//   case SC_SPEC_TYPE_BYTES_N:
//       SCSpecTypeBytesN bytesN;
//   case SC_SPEC_TYPE_UDT:
//       SCSpecTypeUDT udt;
//   };
//
// ===========================================================================
xdr.union("ScSpecTypeDef", {
  switchOn: xdr.lookup("ScSpecType"),
  switchName: "type",
  switches: [
    ["scSpecTypeVal", xdr.void()],
    ["scSpecTypeU64", xdr.void()],
    ["scSpecTypeI64", xdr.void()],
    ["scSpecTypeU128", xdr.void()],
    ["scSpecTypeI128", xdr.void()],
    ["scSpecTypeU32", xdr.void()],
    ["scSpecTypeI32", xdr.void()],
    ["scSpecTypeBool", xdr.void()],
    ["scSpecTypeSymbol", xdr.void()],
    ["scSpecTypeBitset", xdr.void()],
    ["scSpecTypeStatus", xdr.void()],
    ["scSpecTypeBytes", xdr.void()],
    ["scSpecTypeAddress", xdr.void()],
    ["scSpecTypeOption", "option"],
    ["scSpecTypeResult", "result"],
    ["scSpecTypeVec", "vec"],
    ["scSpecTypeMap", "map"],
    ["scSpecTypeSet", "Set"],
    ["scSpecTypeTuple", "tuple"],
    ["scSpecTypeBytesN", "bytesN"],
    ["scSpecTypeUdt", "udt"],
  ],
  arms: {
    option: xdr.lookup("ScSpecTypeOption"),
    result: xdr.lookup("ScSpecTypeResult"),
    vec: xdr.lookup("ScSpecTypeVec"),
    map: xdr.lookup("ScSpecTypeMap"),
    Set: xdr.lookup("ScSpecTypeSet"),
    tuple: xdr.lookup("ScSpecTypeTuple"),
    bytesN: xdr.lookup("ScSpecTypeBytesN"),
    udt: xdr.lookup("ScSpecTypeUdt"),
  },
});

// === xdr source ============================================================
//
//   struct SCSpecUDTStructFieldV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string name<30>;
//       SCSpecTypeDef type;
//   };
//
// ===========================================================================
xdr.struct("ScSpecUdtStructFieldV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["name", xdr.string(30)],
  ["type", xdr.lookup("ScSpecTypeDef")],
]);

// === xdr source ============================================================
//
//   struct SCSpecUDTStructV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string lib<80>;
//       string name<60>;
//       SCSpecUDTStructFieldV0 fields<40>;
//   };
//
// ===========================================================================
xdr.struct("ScSpecUdtStructV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["lib", xdr.string(80)],
  ["name", xdr.string(60)],
  ["fields", xdr.varArray(xdr.lookup("ScSpecUdtStructFieldV0"), 40)],
]);

// === xdr source ============================================================
//
//   struct SCSpecUDTUnionCaseVoidV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string name<60>;
//   };
//
// ===========================================================================
xdr.struct("ScSpecUdtUnionCaseVoidV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["name", xdr.string(60)],
]);

// === xdr source ============================================================
//
//   struct SCSpecUDTUnionCaseTupleV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string name<60>;
//       SCSpecTypeDef type<12>;
//   };
//
// ===========================================================================
xdr.struct("ScSpecUdtUnionCaseTupleV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["name", xdr.string(60)],
  ["type", xdr.varArray(xdr.lookup("ScSpecTypeDef"), 12)],
]);

// === xdr source ============================================================
//
//   enum SCSpecUDTUnionCaseV0Kind
//   {
//       SC_SPEC_UDT_UNION_CASE_VOID_V0 = 0,
//       SC_SPEC_UDT_UNION_CASE_TUPLE_V0 = 1
//   };
//
// ===========================================================================
xdr.enum("ScSpecUdtUnionCaseV0Kind", {
  scSpecUdtUnionCaseVoidV0: 0,
  scSpecUdtUnionCaseTupleV0: 1,
});

// === xdr source ============================================================
//
//   union SCSpecUDTUnionCaseV0 switch (SCSpecUDTUnionCaseV0Kind kind)
//   {
//   case SC_SPEC_UDT_UNION_CASE_VOID_V0:
//       SCSpecUDTUnionCaseVoidV0 voidCase;
//   case SC_SPEC_UDT_UNION_CASE_TUPLE_V0:
//       SCSpecUDTUnionCaseTupleV0 tupleCase;
//   };
//
// ===========================================================================
xdr.union("ScSpecUdtUnionCaseV0", {
  switchOn: xdr.lookup("ScSpecUdtUnionCaseV0Kind"),
  switchName: "kind",
  switches: [
    ["scSpecUdtUnionCaseVoidV0", "voidCase"],
    ["scSpecUdtUnionCaseTupleV0", "tupleCase"],
  ],
  arms: {
    voidCase: xdr.lookup("ScSpecUdtUnionCaseVoidV0"),
    tupleCase: xdr.lookup("ScSpecUdtUnionCaseTupleV0"),
  },
});

// === xdr source ============================================================
//
//   struct SCSpecUDTUnionV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string lib<80>;
//       string name<60>;
//       SCSpecUDTUnionCaseV0 cases<50>;
//   };
//
// ===========================================================================
xdr.struct("ScSpecUdtUnionV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["lib", xdr.string(80)],
  ["name", xdr.string(60)],
  ["cases", xdr.varArray(xdr.lookup("ScSpecUdtUnionCaseV0"), 50)],
]);

// === xdr source ============================================================
//
//   struct SCSpecUDTEnumCaseV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string name<60>;
//       uint32 value;
//   };
//
// ===========================================================================
xdr.struct("ScSpecUdtEnumCaseV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["name", xdr.string(60)],
  ["value", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct SCSpecUDTEnumV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string lib<80>;
//       string name<60>;
//       SCSpecUDTEnumCaseV0 cases<50>;
//   };
//
// ===========================================================================
xdr.struct("ScSpecUdtEnumV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["lib", xdr.string(80)],
  ["name", xdr.string(60)],
  ["cases", xdr.varArray(xdr.lookup("ScSpecUdtEnumCaseV0"), 50)],
]);

// === xdr source ============================================================
//
//   struct SCSpecUDTErrorEnumCaseV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string name<60>;
//       uint32 value;
//   };
//
// ===========================================================================
xdr.struct("ScSpecUdtErrorEnumCaseV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["name", xdr.string(60)],
  ["value", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct SCSpecUDTErrorEnumV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string lib<80>;
//       string name<60>;
//       SCSpecUDTErrorEnumCaseV0 cases<50>;
//   };
//
// ===========================================================================
xdr.struct("ScSpecUdtErrorEnumV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["lib", xdr.string(80)],
  ["name", xdr.string(60)],
  ["cases", xdr.varArray(xdr.lookup("ScSpecUdtErrorEnumCaseV0"), 50)],
]);

// === xdr source ============================================================
//
//   struct SCSpecFunctionInputV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       string name<30>;
//       SCSpecTypeDef type;
//   };
//
// ===========================================================================
xdr.struct("ScSpecFunctionInputV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["name", xdr.string(30)],
  ["type", xdr.lookup("ScSpecTypeDef")],
]);

// === xdr source ============================================================
//
//   struct SCSpecFunctionV0
//   {
//       string doc<SC_SPEC_DOC_LIMIT>;
//       SCSymbol name;
//       SCSpecFunctionInputV0 inputs<10>;
//       SCSpecTypeDef outputs<1>;
//   };
//
// ===========================================================================
xdr.struct("ScSpecFunctionV0", [
  ["doc", xdr.string(xdr.lookup("SC_SPEC_DOC_LIMIT"))],
  ["name", xdr.lookup("ScSymbol")],
  ["inputs", xdr.varArray(xdr.lookup("ScSpecFunctionInputV0"), 10)],
  ["outputs", xdr.varArray(xdr.lookup("ScSpecTypeDef"), 1)],
]);

// === xdr source ============================================================
//
//   enum SCSpecEntryKind
//   {
//       SC_SPEC_ENTRY_FUNCTION_V0 = 0,
//       SC_SPEC_ENTRY_UDT_STRUCT_V0 = 1,
//       SC_SPEC_ENTRY_UDT_UNION_V0 = 2,
//       SC_SPEC_ENTRY_UDT_ENUM_V0 = 3,
//       SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0 = 4
//   };
//
// ===========================================================================
xdr.enum("ScSpecEntryKind", {
  scSpecEntryFunctionV0: 0,
  scSpecEntryUdtStructV0: 1,
  scSpecEntryUdtUnionV0: 2,
  scSpecEntryUdtEnumV0: 3,
  scSpecEntryUdtErrorEnumV0: 4,
});

// === xdr source ============================================================
//
//   union SCSpecEntry switch (SCSpecEntryKind kind)
//   {
//   case SC_SPEC_ENTRY_FUNCTION_V0:
//       SCSpecFunctionV0 functionV0;
//   case SC_SPEC_ENTRY_UDT_STRUCT_V0:
//       SCSpecUDTStructV0 udtStructV0;
//   case SC_SPEC_ENTRY_UDT_UNION_V0:
//       SCSpecUDTUnionV0 udtUnionV0;
//   case SC_SPEC_ENTRY_UDT_ENUM_V0:
//       SCSpecUDTEnumV0 udtEnumV0;
//   case SC_SPEC_ENTRY_UDT_ERROR_ENUM_V0:
//       SCSpecUDTErrorEnumV0 udtErrorEnumV0;
//   };
//
// ===========================================================================
xdr.union("ScSpecEntry", {
  switchOn: xdr.lookup("ScSpecEntryKind"),
  switchName: "kind",
  switches: [
    ["scSpecEntryFunctionV0", "functionV0"],
    ["scSpecEntryUdtStructV0", "udtStructV0"],
    ["scSpecEntryUdtUnionV0", "udtUnionV0"],
    ["scSpecEntryUdtEnumV0", "udtEnumV0"],
    ["scSpecEntryUdtErrorEnumV0", "udtErrorEnumV0"],
  ],
  arms: {
    functionV0: xdr.lookup("ScSpecFunctionV0"),
    udtStructV0: xdr.lookup("ScSpecUdtStructV0"),
    udtUnionV0: xdr.lookup("ScSpecUdtUnionV0"),
    udtEnumV0: xdr.lookup("ScSpecUdtEnumV0"),
    udtErrorEnumV0: xdr.lookup("ScSpecUdtErrorEnumV0"),
  },
});

// === xdr source ============================================================
//
//   typedef string SCSymbol<10>;
//
// ===========================================================================
xdr.typedef("ScSymbol", xdr.string(10));

// === xdr source ============================================================
//
//   enum SCValType
//   {
//       SCV_U63 = 0,
//       SCV_U32 = 1,
//       SCV_I32 = 2,
//       SCV_STATIC = 3,
//       SCV_OBJECT = 4,
//       SCV_SYMBOL = 5,
//       SCV_BITSET = 6,
//       SCV_STATUS = 7
//   };
//
// ===========================================================================
xdr.enum("ScValType", {
  scvU63: 0,
  scvU32: 1,
  scvI32: 2,
  scvStatic: 3,
  scvObject: 4,
  scvSymbol: 5,
  scvBitset: 6,
  scvStatus: 7,
});

// === xdr source ============================================================
//
//   enum SCStatic
//   {
//       SCS_VOID = 0,
//       SCS_TRUE = 1,
//       SCS_FALSE = 2,
//       SCS_LEDGER_KEY_CONTRACT_CODE = 3
//   };
//
// ===========================================================================
xdr.enum("ScStatic", {
  scsVoid: 0,
  scsTrue: 1,
  scsFalse: 2,
  scsLedgerKeyContractCode: 3,
});

// === xdr source ============================================================
//
//   enum SCStatusType
//   {
//       SST_OK = 0,
//       SST_UNKNOWN_ERROR = 1,
//       SST_HOST_VALUE_ERROR = 2,
//       SST_HOST_OBJECT_ERROR = 3,
//       SST_HOST_FUNCTION_ERROR = 4,
//       SST_HOST_STORAGE_ERROR = 5,
//       SST_HOST_CONTEXT_ERROR = 6,
//       SST_VM_ERROR = 7,
//       SST_CONTRACT_ERROR = 8,
//       SST_HOST_AUTH_ERROR = 9
//       // TODO: add more
//   };
//
// ===========================================================================
xdr.enum("ScStatusType", {
  sstOk: 0,
  sstUnknownError: 1,
  sstHostValueError: 2,
  sstHostObjectError: 3,
  sstHostFunctionError: 4,
  sstHostStorageError: 5,
  sstHostContextError: 6,
  sstVmError: 7,
  sstContractError: 8,
  sstHostAuthError: 9,
});

// === xdr source ============================================================
//
//   enum SCHostValErrorCode
//   {
//       HOST_VALUE_UNKNOWN_ERROR = 0,
//       HOST_VALUE_RESERVED_TAG_VALUE = 1,
//       HOST_VALUE_UNEXPECTED_VAL_TYPE = 2,
//       HOST_VALUE_U63_OUT_OF_RANGE = 3,
//       HOST_VALUE_U32_OUT_OF_RANGE = 4,
//       HOST_VALUE_STATIC_UNKNOWN = 5,
//       HOST_VALUE_MISSING_OBJECT = 6,
//       HOST_VALUE_SYMBOL_TOO_LONG = 7,
//       HOST_VALUE_SYMBOL_BAD_CHAR = 8,
//       HOST_VALUE_SYMBOL_CONTAINS_NON_UTF8 = 9,
//       HOST_VALUE_BITSET_TOO_MANY_BITS = 10,
//       HOST_VALUE_STATUS_UNKNOWN = 11
//   };
//
// ===========================================================================
xdr.enum("ScHostValErrorCode", {
  hostValueUnknownError: 0,
  hostValueReservedTagValue: 1,
  hostValueUnexpectedValType: 2,
  hostValueU63OutOfRange: 3,
  hostValueU32OutOfRange: 4,
  hostValueStaticUnknown: 5,
  hostValueMissingObject: 6,
  hostValueSymbolTooLong: 7,
  hostValueSymbolBadChar: 8,
  hostValueSymbolContainsNonUtf8: 9,
  hostValueBitsetTooManyBits: 10,
  hostValueStatusUnknown: 11,
});

// === xdr source ============================================================
//
//   enum SCHostObjErrorCode
//   {
//       HOST_OBJECT_UNKNOWN_ERROR = 0,
//       HOST_OBJECT_UNKNOWN_REFERENCE = 1,
//       HOST_OBJECT_UNEXPECTED_TYPE = 2,
//       HOST_OBJECT_OBJECT_COUNT_EXCEEDS_U32_MAX = 3,
//       HOST_OBJECT_OBJECT_NOT_EXIST = 4,
//       HOST_OBJECT_VEC_INDEX_OUT_OF_BOUND = 5,
//       HOST_OBJECT_CONTRACT_HASH_WRONG_LENGTH = 6
//   };
//
// ===========================================================================
xdr.enum("ScHostObjErrorCode", {
  hostObjectUnknownError: 0,
  hostObjectUnknownReference: 1,
  hostObjectUnexpectedType: 2,
  hostObjectObjectCountExceedsU32Max: 3,
  hostObjectObjectNotExist: 4,
  hostObjectVecIndexOutOfBound: 5,
  hostObjectContractHashWrongLength: 6,
});

// === xdr source ============================================================
//
//   enum SCHostFnErrorCode
//   {
//       HOST_FN_UNKNOWN_ERROR = 0,
//       HOST_FN_UNEXPECTED_HOST_FUNCTION_ACTION = 1,
//       HOST_FN_INPUT_ARGS_WRONG_LENGTH = 2,
//       HOST_FN_INPUT_ARGS_WRONG_TYPE = 3,
//       HOST_FN_INPUT_ARGS_INVALID = 4
//   };
//
// ===========================================================================
xdr.enum("ScHostFnErrorCode", {
  hostFnUnknownError: 0,
  hostFnUnexpectedHostFunctionAction: 1,
  hostFnInputArgsWrongLength: 2,
  hostFnInputArgsWrongType: 3,
  hostFnInputArgsInvalid: 4,
});

// === xdr source ============================================================
//
//   enum SCHostStorageErrorCode
//   {
//       HOST_STORAGE_UNKNOWN_ERROR = 0,
//       HOST_STORAGE_EXPECT_CONTRACT_DATA = 1,
//       HOST_STORAGE_READWRITE_ACCESS_TO_READONLY_ENTRY = 2,
//       HOST_STORAGE_ACCESS_TO_UNKNOWN_ENTRY = 3,
//       HOST_STORAGE_MISSING_KEY_IN_GET = 4,
//       HOST_STORAGE_GET_ON_DELETED_KEY = 5
//   };
//
// ===========================================================================
xdr.enum("ScHostStorageErrorCode", {
  hostStorageUnknownError: 0,
  hostStorageExpectContractData: 1,
  hostStorageReadwriteAccessToReadonlyEntry: 2,
  hostStorageAccessToUnknownEntry: 3,
  hostStorageMissingKeyInGet: 4,
  hostStorageGetOnDeletedKey: 5,
});

// === xdr source ============================================================
//
//   enum SCHostAuthErrorCode
//   {
//       HOST_AUTH_UNKNOWN_ERROR = 0,
//       HOST_AUTH_NONCE_ERROR = 1,
//       HOST_AUTH_DUPLICATE_AUTHORIZATION = 2,
//       HOST_AUTH_NOT_AUTHORIZED = 3
//   };
//
// ===========================================================================
xdr.enum("ScHostAuthErrorCode", {
  hostAuthUnknownError: 0,
  hostAuthNonceError: 1,
  hostAuthDuplicateAuthorization: 2,
  hostAuthNotAuthorized: 3,
});

// === xdr source ============================================================
//
//   enum SCHostContextErrorCode
//   {
//       HOST_CONTEXT_UNKNOWN_ERROR = 0,
//       HOST_CONTEXT_NO_CONTRACT_RUNNING = 1
//   };
//
// ===========================================================================
xdr.enum("ScHostContextErrorCode", {
  hostContextUnknownError: 0,
  hostContextNoContractRunning: 1,
});

// === xdr source ============================================================
//
//   enum SCVmErrorCode {
//       VM_UNKNOWN = 0,
//       VM_VALIDATION = 1,
//       VM_INSTANTIATION = 2,
//       VM_FUNCTION = 3,
//       VM_TABLE = 4,
//       VM_MEMORY = 5,
//       VM_GLOBAL = 6,
//       VM_VALUE = 7,
//       VM_TRAP_UNREACHABLE = 8,
//       VM_TRAP_MEMORY_ACCESS_OUT_OF_BOUNDS = 9,
//       VM_TRAP_TABLE_ACCESS_OUT_OF_BOUNDS = 10,
//       VM_TRAP_ELEM_UNINITIALIZED = 11,
//       VM_TRAP_DIVISION_BY_ZERO = 12,
//       VM_TRAP_INTEGER_OVERFLOW = 13,
//       VM_TRAP_INVALID_CONVERSION_TO_INT = 14,
//       VM_TRAP_STACK_OVERFLOW = 15,
//       VM_TRAP_UNEXPECTED_SIGNATURE = 16,
//       VM_TRAP_MEM_LIMIT_EXCEEDED = 17,
//       VM_TRAP_CPU_LIMIT_EXCEEDED = 18
//   };
//
// ===========================================================================
xdr.enum("ScVmErrorCode", {
  vmUnknown: 0,
  vmValidation: 1,
  vmInstantiation: 2,
  vmFunction: 3,
  vmTable: 4,
  vmMemory: 5,
  vmGlobal: 6,
  vmValue: 7,
  vmTrapUnreachable: 8,
  vmTrapMemoryAccessOutOfBounds: 9,
  vmTrapTableAccessOutOfBounds: 10,
  vmTrapElemUninitialized: 11,
  vmTrapDivisionByZero: 12,
  vmTrapIntegerOverflow: 13,
  vmTrapInvalidConversionToInt: 14,
  vmTrapStackOverflow: 15,
  vmTrapUnexpectedSignature: 16,
  vmTrapMemLimitExceeded: 17,
  vmTrapCpuLimitExceeded: 18,
});

// === xdr source ============================================================
//
//   enum SCUnknownErrorCode
//   {
//       UNKNOWN_ERROR_GENERAL = 0,
//       UNKNOWN_ERROR_XDR = 1
//   };
//
// ===========================================================================
xdr.enum("ScUnknownErrorCode", {
  unknownErrorGeneral: 0,
  unknownErrorXdr: 1,
});

// === xdr source ============================================================
//
//   union SCStatus switch (SCStatusType type)
//   {
//   case SST_OK:
//       void;
//   case SST_UNKNOWN_ERROR:
//       SCUnknownErrorCode unknownCode;
//   case SST_HOST_VALUE_ERROR:
//       SCHostValErrorCode valCode;
//   case SST_HOST_OBJECT_ERROR:
//       SCHostObjErrorCode objCode;
//   case SST_HOST_FUNCTION_ERROR:
//       SCHostFnErrorCode fnCode;
//   case SST_HOST_STORAGE_ERROR:
//       SCHostStorageErrorCode storageCode;
//   case SST_HOST_CONTEXT_ERROR:
//       SCHostContextErrorCode contextCode;
//   case SST_VM_ERROR:
//       SCVmErrorCode vmCode;
//   case SST_CONTRACT_ERROR:
//       uint32 contractCode;
//   case SST_HOST_AUTH_ERROR:
//       SCHostAuthErrorCode authCode;
//   };
//
// ===========================================================================
xdr.union("ScStatus", {
  switchOn: xdr.lookup("ScStatusType"),
  switchName: "type",
  switches: [
    ["sstOk", xdr.void()],
    ["sstUnknownError", "unknownCode"],
    ["sstHostValueError", "valCode"],
    ["sstHostObjectError", "objCode"],
    ["sstHostFunctionError", "fnCode"],
    ["sstHostStorageError", "storageCode"],
    ["sstHostContextError", "contextCode"],
    ["sstVmError", "vmCode"],
    ["sstContractError", "contractCode"],
    ["sstHostAuthError", "authCode"],
  ],
  arms: {
    unknownCode: xdr.lookup("ScUnknownErrorCode"),
    valCode: xdr.lookup("ScHostValErrorCode"),
    objCode: xdr.lookup("ScHostObjErrorCode"),
    fnCode: xdr.lookup("ScHostFnErrorCode"),
    storageCode: xdr.lookup("ScHostStorageErrorCode"),
    contextCode: xdr.lookup("ScHostContextErrorCode"),
    vmCode: xdr.lookup("ScVmErrorCode"),
    contractCode: xdr.lookup("Uint32"),
    authCode: xdr.lookup("ScHostAuthErrorCode"),
  },
});

// === xdr source ============================================================
//
//   union SCVal switch (SCValType type)
//   {
//   case SCV_U63:
//       int64 u63;
//   case SCV_U32:
//       uint32 u32;
//   case SCV_I32:
//       int32 i32;
//   case SCV_STATIC:
//       SCStatic ic;
//   case SCV_OBJECT:
//       SCObject* obj;
//   case SCV_SYMBOL:
//       SCSymbol sym;
//   case SCV_BITSET:
//       uint64 bits;
//   case SCV_STATUS:
//       SCStatus status;
//   };
//
// ===========================================================================
xdr.union("ScVal", {
  switchOn: xdr.lookup("ScValType"),
  switchName: "type",
  switches: [
    ["scvU63", "u63"],
    ["scvU32", "u32"],
    ["scvI32", "i32"],
    ["scvStatic", "ic"],
    ["scvObject", "obj"],
    ["scvSymbol", "sym"],
    ["scvBitset", "bits"],
    ["scvStatus", "status"],
  ],
  arms: {
    u63: xdr.lookup("Int64"),
    u32: xdr.lookup("Uint32"),
    i32: xdr.lookup("Int32"),
    ic: xdr.lookup("ScStatic"),
    obj: xdr.option(xdr.lookup("ScObject")),
    sym: xdr.lookup("ScSymbol"),
    bits: xdr.lookup("Uint64"),
    status: xdr.lookup("ScStatus"),
  },
});

// === xdr source ============================================================
//
//   enum SCObjectType
//   {
//       // We have a few objects that represent non-stellar-specific concepts
//       // like general-purpose maps, vectors, numbers, blobs.
//   
//       SCO_VEC = 0,
//       SCO_MAP = 1,
//       SCO_U64 = 2,
//       SCO_I64 = 3,
//       SCO_U128 = 4,
//       SCO_I128 = 5,
//       SCO_BYTES = 6,
//       SCO_CONTRACT_CODE = 7,
//       SCO_ADDRESS = 8,
//       SCO_NONCE_KEY = 9
//   
//       // TODO: add more
//   };
//
// ===========================================================================
xdr.enum("ScObjectType", {
  scoVec: 0,
  scoMap: 1,
  scoU64: 2,
  scoI64: 3,
  scoU128: 4,
  scoI128: 5,
  scoBytes: 6,
  scoContractCode: 7,
  scoAddress: 8,
  scoNonceKey: 9,
});

// === xdr source ============================================================
//
//   struct SCMapEntry
//   {
//       SCVal key;
//       SCVal val;
//   };
//
// ===========================================================================
xdr.struct("ScMapEntry", [
  ["key", xdr.lookup("ScVal")],
  ["val", xdr.lookup("ScVal")],
]);

// === xdr source ============================================================
//
//   const SCVAL_LIMIT = 256000;
//
// ===========================================================================
xdr.const("SCVAL_LIMIT", 256000);

// === xdr source ============================================================
//
//   typedef SCVal SCVec<SCVAL_LIMIT>;
//
// ===========================================================================
xdr.typedef("ScVec", xdr.varArray(xdr.lookup("ScVal"), xdr.lookup("SCVAL_LIMIT")));

// === xdr source ============================================================
//
//   typedef SCMapEntry SCMap<SCVAL_LIMIT>;
//
// ===========================================================================
xdr.typedef("ScMap", xdr.varArray(xdr.lookup("ScMapEntry"), xdr.lookup("SCVAL_LIMIT")));

// === xdr source ============================================================
//
//   enum SCContractCodeType
//   {
//       SCCONTRACT_CODE_WASM_REF = 0,
//       SCCONTRACT_CODE_TOKEN = 1
//   };
//
// ===========================================================================
xdr.enum("ScContractCodeType", {
  sccontractCodeWasmRef: 0,
  sccontractCodeToken: 1,
});

// === xdr source ============================================================
//
//   union SCContractCode switch (SCContractCodeType type)
//   {
//   case SCCONTRACT_CODE_WASM_REF:
//       Hash wasm_id;
//   case SCCONTRACT_CODE_TOKEN:
//       void;
//   };
//
// ===========================================================================
xdr.union("ScContractCode", {
  switchOn: xdr.lookup("ScContractCodeType"),
  switchName: "type",
  switches: [
    ["sccontractCodeWasmRef", "wasmId"],
    ["sccontractCodeToken", xdr.void()],
  ],
  arms: {
    wasmId: xdr.lookup("Hash"),
  },
});

// === xdr source ============================================================
//
//   struct Int128Parts {
//       // Both signed and unsigned 128-bit ints
//       // are transported in a pair of uint64s
//       // to reduce the risk of sign-extension.
//       uint64 lo;
//       uint64 hi;
//   };
//
// ===========================================================================
xdr.struct("Int128Parts", [
  ["lo", xdr.lookup("Uint64")],
  ["hi", xdr.lookup("Uint64")],
]);

// === xdr source ============================================================
//
//   enum SCAddressType
//   {
//       SC_ADDRESS_TYPE_ACCOUNT = 0,
//       SC_ADDRESS_TYPE_CONTRACT = 1
//   };
//
// ===========================================================================
xdr.enum("ScAddressType", {
  scAddressTypeAccount: 0,
  scAddressTypeContract: 1,
});

// === xdr source ============================================================
//
//   union SCAddress switch (SCAddressType type)
//   {
//   case SC_ADDRESS_TYPE_ACCOUNT:
//       AccountID accountId;
//   case SC_ADDRESS_TYPE_CONTRACT:
//       Hash contractId;
//   };
//
// ===========================================================================
xdr.union("ScAddress", {
  switchOn: xdr.lookup("ScAddressType"),
  switchName: "type",
  switches: [
    ["scAddressTypeAccount", "accountId"],
    ["scAddressTypeContract", "contractId"],
  ],
  arms: {
    accountId: xdr.lookup("AccountId"),
    contractId: xdr.lookup("Hash"),
  },
});

// === xdr source ============================================================
//
//   union SCObject switch (SCObjectType type)
//   {
//   case SCO_VEC:
//       SCVec vec;
//   case SCO_MAP:
//       SCMap map;
//   case SCO_U64:
//       uint64 u64;
//   case SCO_I64:
//       int64 i64;
//   case SCO_U128:
//       Int128Parts u128;
//   case SCO_I128:
//       Int128Parts i128;
//   case SCO_BYTES:
//       opaque bin<SCVAL_LIMIT>;
//   case SCO_CONTRACT_CODE:
//       SCContractCode contractCode;
//   case SCO_ADDRESS:
//       SCAddress address;
//   case SCO_NONCE_KEY:
//       SCAddress nonceAddress;
//   };
//
// ===========================================================================
xdr.union("ScObject", {
  switchOn: xdr.lookup("ScObjectType"),
  switchName: "type",
  switches: [
    ["scoVec", "vec"],
    ["scoMap", "map"],
    ["scoU64", "u64"],
    ["scoI64", "i64"],
    ["scoU128", "u128"],
    ["scoI128", "i128"],
    ["scoBytes", "bin"],
    ["scoContractCode", "contractCode"],
    ["scoAddress", "address"],
    ["scoNonceKey", "nonceAddress"],
  ],
  arms: {
    vec: xdr.lookup("ScVec"),
    map: xdr.lookup("ScMap"),
    u64: xdr.lookup("Uint64"),
    i64: xdr.lookup("Int64"),
    u128: xdr.lookup("Int128Parts"),
    i128: xdr.lookup("Int128Parts"),
    bin: xdr.varOpaque(xdr.lookup("SCVAL_LIMIT")),
    contractCode: xdr.lookup("ScContractCode"),
    address: xdr.lookup("ScAddress"),
    nonceAddress: xdr.lookup("ScAddress"),
  },
});

// === xdr source ============================================================
//
//   union StoredTransactionSet switch (int v)
//   {
//   case 0:
//   	TransactionSet txSet;
//   case 1:
//   	GeneralizedTransactionSet generalizedTxSet;
//   };
//
// ===========================================================================
xdr.union("StoredTransactionSet", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, "txSet"],
    [1, "generalizedTxSet"],
  ],
  arms: {
    txSet: xdr.lookup("TransactionSet"),
    generalizedTxSet: xdr.lookup("GeneralizedTransactionSet"),
  },
});

// === xdr source ============================================================
//
//   struct PersistedSCPStateV0
//   {
//   	SCPEnvelope scpEnvelopes<>;
//   	SCPQuorumSet quorumSets<>;
//   	StoredTransactionSet txSets<>;
//   };
//
// ===========================================================================
xdr.struct("PersistedScpStateV0", [
  ["scpEnvelopes", xdr.varArray(xdr.lookup("ScpEnvelope"), 2147483647)],
  ["quorumSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)],
  ["txSets", xdr.varArray(xdr.lookup("StoredTransactionSet"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct PersistedSCPStateV1
//   {
//   	// Tx sets are saved separately
//   	SCPEnvelope scpEnvelopes<>;
//   	SCPQuorumSet quorumSets<>;
//   };
//
// ===========================================================================
xdr.struct("PersistedScpStateV1", [
  ["scpEnvelopes", xdr.varArray(xdr.lookup("ScpEnvelope"), 2147483647)],
  ["quorumSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union PersistedSCPState switch (int v)
//   {
//   case 0:
//   	PersistedSCPStateV0 v0;
//   case 1:
//   	PersistedSCPStateV1 v1;
//   };
//
// ===========================================================================
xdr.union("PersistedScpState", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, "v0"],
    [1, "v1"],
  ],
  arms: {
    v0: xdr.lookup("PersistedScpStateV0"),
    v1: xdr.lookup("PersistedScpStateV1"),
  },
});

// === xdr source ============================================================
//
//   typedef opaque Thresholds[4];
//
// ===========================================================================
xdr.typedef("Thresholds", xdr.opaque(4));

// === xdr source ============================================================
//
//   typedef string string32<32>;
//
// ===========================================================================
xdr.typedef("String32", xdr.string(32));

// === xdr source ============================================================
//
//   typedef string string64<64>;
//
// ===========================================================================
xdr.typedef("String64", xdr.string(64));

// === xdr source ============================================================
//
//   typedef int64 SequenceNumber;
//
// ===========================================================================
xdr.typedef("SequenceNumber", xdr.lookup("Int64"));

// === xdr source ============================================================
//
//   typedef uint64 TimePoint;
//
// ===========================================================================
xdr.typedef("TimePoint", xdr.lookup("Uint64"));

// === xdr source ============================================================
//
//   typedef uint64 Duration;
//
// ===========================================================================
xdr.typedef("Duration", xdr.lookup("Uint64"));

// === xdr source ============================================================
//
//   typedef opaque DataValue<64>;
//
// ===========================================================================
xdr.typedef("DataValue", xdr.varOpaque(64));

// === xdr source ============================================================
//
//   typedef Hash PoolID;
//
// ===========================================================================
xdr.typedef("PoolId", xdr.lookup("Hash"));

// === xdr source ============================================================
//
//   typedef opaque AssetCode4[4];
//
// ===========================================================================
xdr.typedef("AssetCode4", xdr.opaque(4));

// === xdr source ============================================================
//
//   typedef opaque AssetCode12[12];
//
// ===========================================================================
xdr.typedef("AssetCode12", xdr.opaque(12));

// === xdr source ============================================================
//
//   enum AssetType
//   {
//       ASSET_TYPE_NATIVE = 0,
//       ASSET_TYPE_CREDIT_ALPHANUM4 = 1,
//       ASSET_TYPE_CREDIT_ALPHANUM12 = 2,
//       ASSET_TYPE_POOL_SHARE = 3
//   };
//
// ===========================================================================
xdr.enum("AssetType", {
  assetTypeNative: 0,
  assetTypeCreditAlphanum4: 1,
  assetTypeCreditAlphanum12: 2,
  assetTypePoolShare: 3,
});

// === xdr source ============================================================
//
//   union AssetCode switch (AssetType type)
//   {
//   case ASSET_TYPE_CREDIT_ALPHANUM4:
//       AssetCode4 assetCode4;
//   
//   case ASSET_TYPE_CREDIT_ALPHANUM12:
//       AssetCode12 assetCode12;
//   
//       // add other asset types here in the future
//   };
//
// ===========================================================================
xdr.union("AssetCode", {
  switchOn: xdr.lookup("AssetType"),
  switchName: "type",
  switches: [
    ["assetTypeCreditAlphanum4", "assetCode4"],
    ["assetTypeCreditAlphanum12", "assetCode12"],
  ],
  arms: {
    assetCode4: xdr.lookup("AssetCode4"),
    assetCode12: xdr.lookup("AssetCode12"),
  },
});

// === xdr source ============================================================
//
//   struct AlphaNum4
//   {
//       AssetCode4 assetCode;
//       AccountID issuer;
//   };
//
// ===========================================================================
xdr.struct("AlphaNum4", [
  ["assetCode", xdr.lookup("AssetCode4")],
  ["issuer", xdr.lookup("AccountId")],
]);

// === xdr source ============================================================
//
//   struct AlphaNum12
//   {
//       AssetCode12 assetCode;
//       AccountID issuer;
//   };
//
// ===========================================================================
xdr.struct("AlphaNum12", [
  ["assetCode", xdr.lookup("AssetCode12")],
  ["issuer", xdr.lookup("AccountId")],
]);

// === xdr source ============================================================
//
//   union Asset switch (AssetType type)
//   {
//   case ASSET_TYPE_NATIVE: // Not credit
//       void;
//   
//   case ASSET_TYPE_CREDIT_ALPHANUM4:
//       AlphaNum4 alphaNum4;
//   
//   case ASSET_TYPE_CREDIT_ALPHANUM12:
//       AlphaNum12 alphaNum12;
//   
//       // add other asset types here in the future
//   };
//
// ===========================================================================
xdr.union("Asset", {
  switchOn: xdr.lookup("AssetType"),
  switchName: "type",
  switches: [
    ["assetTypeNative", xdr.void()],
    ["assetTypeCreditAlphanum4", "alphaNum4"],
    ["assetTypeCreditAlphanum12", "alphaNum12"],
  ],
  arms: {
    alphaNum4: xdr.lookup("AlphaNum4"),
    alphaNum12: xdr.lookup("AlphaNum12"),
  },
});

// === xdr source ============================================================
//
//   struct Price
//   {
//       int32 n; // numerator
//       int32 d; // denominator
//   };
//
// ===========================================================================
xdr.struct("Price", [
  ["n", xdr.lookup("Int32")],
  ["d", xdr.lookup("Int32")],
]);

// === xdr source ============================================================
//
//   struct Liabilities
//   {
//       int64 buying;
//       int64 selling;
//   };
//
// ===========================================================================
xdr.struct("Liabilities", [
  ["buying", xdr.lookup("Int64")],
  ["selling", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   enum ThresholdIndexes
//   {
//       THRESHOLD_MASTER_WEIGHT = 0,
//       THRESHOLD_LOW = 1,
//       THRESHOLD_MED = 2,
//       THRESHOLD_HIGH = 3
//   };
//
// ===========================================================================
xdr.enum("ThresholdIndices", {
  thresholdMasterWeight: 0,
  thresholdLow: 1,
  thresholdMed: 2,
  thresholdHigh: 3,
});

// === xdr source ============================================================
//
//   enum LedgerEntryType
//   {
//       ACCOUNT = 0,
//       TRUSTLINE = 1,
//       OFFER = 2,
//       DATA = 3,
//       CLAIMABLE_BALANCE = 4,
//       LIQUIDITY_POOL = 5,
//       CONTRACT_DATA = 6,
//       CONTRACT_CODE = 7,
//       CONFIG_SETTING = 8
//   };
//
// ===========================================================================
xdr.enum("LedgerEntryType", {
  account: 0,
  trustline: 1,
  offer: 2,
  data: 3,
  claimableBalance: 4,
  liquidityPool: 5,
  contractData: 6,
  contractCode: 7,
  configSetting: 8,
});

// === xdr source ============================================================
//
//   struct Signer
//   {
//       SignerKey key;
//       uint32 weight; // really only need 1 byte
//   };
//
// ===========================================================================
xdr.struct("Signer", [
  ["key", xdr.lookup("SignerKey")],
  ["weight", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   enum AccountFlags
//   { // masks for each flag
//   
//       // Flags set on issuer accounts
//       // TrustLines are created with authorized set to "false" requiring
//       // the issuer to set it for each TrustLine
//       AUTH_REQUIRED_FLAG = 0x1,
//       // If set, the authorized flag in TrustLines can be cleared
//       // otherwise, authorization cannot be revoked
//       AUTH_REVOCABLE_FLAG = 0x2,
//       // Once set, causes all AUTH_* flags to be read-only
//       AUTH_IMMUTABLE_FLAG = 0x4,
//       // Trustlines are created with clawback enabled set to "true",
//       // and claimable balances created from those trustlines are created
//       // with clawback enabled set to "true"
//       AUTH_CLAWBACK_ENABLED_FLAG = 0x8
//   };
//
// ===========================================================================
xdr.enum("AccountFlags", {
  authRequiredFlag: 1,
  authRevocableFlag: 2,
  authImmutableFlag: 4,
  authClawbackEnabledFlag: 8,
});

// === xdr source ============================================================
//
//   const MASK_ACCOUNT_FLAGS = 0x7;
//
// ===========================================================================
xdr.const("MASK_ACCOUNT_FLAGS", 0x7);

// === xdr source ============================================================
//
//   const MASK_ACCOUNT_FLAGS_V17 = 0xF;
//
// ===========================================================================
xdr.const("MASK_ACCOUNT_FLAGS_V17", 0xF);

// === xdr source ============================================================
//
//   const MAX_SIGNERS = 20;
//
// ===========================================================================
xdr.const("MAX_SIGNERS", 20);

// === xdr source ============================================================
//
//   typedef AccountID* SponsorshipDescriptor;
//
// ===========================================================================
xdr.typedef("SponsorshipDescriptor", xdr.option(xdr.lookup("AccountId")));

// === xdr source ============================================================
//
//   struct AccountEntryExtensionV3
//   {
//       // We can use this to add more fields, or because it is first, to
//       // change AccountEntryExtensionV3 into a union.
//       ExtensionPoint ext;
//   
//       // Ledger number at which `seqNum` took on its present value.
//       uint32 seqLedger;
//   
//       // Time at which `seqNum` took on its present value.
//       TimePoint seqTime;
//   };
//
// ===========================================================================
xdr.struct("AccountEntryExtensionV3", [
  ["ext", xdr.lookup("ExtensionPoint")],
  ["seqLedger", xdr.lookup("Uint32")],
  ["seqTime", xdr.lookup("TimePoint")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       case 3:
//           AccountEntryExtensionV3 v3;
//       }
//
// ===========================================================================
xdr.union("AccountEntryExtensionV2Ext", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
    [3, "v3"],
  ],
  arms: {
    v3: xdr.lookup("AccountEntryExtensionV3"),
  },
});

// === xdr source ============================================================
//
//   struct AccountEntryExtensionV2
//   {
//       uint32 numSponsored;
//       uint32 numSponsoring;
//       SponsorshipDescriptor signerSponsoringIDs<MAX_SIGNERS>;
//   
//       union switch (int v)
//       {
//       case 0:
//           void;
//       case 3:
//           AccountEntryExtensionV3 v3;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountEntryExtensionV2", [
  ["numSponsored", xdr.lookup("Uint32")],
  ["numSponsoring", xdr.lookup("Uint32")],
  ["signerSponsoringIDs", xdr.varArray(xdr.lookup("SponsorshipDescriptor"), xdr.lookup("MAX_SIGNERS"))],
  ["ext", xdr.lookup("AccountEntryExtensionV2Ext")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       case 2:
//           AccountEntryExtensionV2 v2;
//       }
//
// ===========================================================================
xdr.union("AccountEntryExtensionV1Ext", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
    [2, "v2"],
  ],
  arms: {
    v2: xdr.lookup("AccountEntryExtensionV2"),
  },
});

// === xdr source ============================================================
//
//   struct AccountEntryExtensionV1
//   {
//       Liabilities liabilities;
//   
//       union switch (int v)
//       {
//       case 0:
//           void;
//       case 2:
//           AccountEntryExtensionV2 v2;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountEntryExtensionV1", [
  ["liabilities", xdr.lookup("Liabilities")],
  ["ext", xdr.lookup("AccountEntryExtensionV1Ext")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           AccountEntryExtensionV1 v1;
//       }
//
// ===========================================================================
xdr.union("AccountEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
    [1, "v1"],
  ],
  arms: {
    v1: xdr.lookup("AccountEntryExtensionV1"),
  },
});

// === xdr source ============================================================
//
//   struct AccountEntry
//   {
//       AccountID accountID;      // master public key for this account
//       int64 balance;            // in stroops
//       SequenceNumber seqNum;    // last sequence number used for this account
//       uint32 numSubEntries;     // number of sub-entries this account has
//                                 // drives the reserve
//       AccountID* inflationDest; // Account to vote for during inflation
//       uint32 flags;             // see AccountFlags
//   
//       string32 homeDomain; // can be used for reverse federation and memo lookup
//   
//       // fields used for signatures
//       // thresholds stores unsigned bytes: [weight of master|low|medium|high]
//       Thresholds thresholds;
//   
//       Signer signers<MAX_SIGNERS>; // possible signers for this account
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           AccountEntryExtensionV1 v1;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("AccountEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["balance", xdr.lookup("Int64")],
  ["seqNum", xdr.lookup("SequenceNumber")],
  ["numSubEntries", xdr.lookup("Uint32")],
  ["inflationDest", xdr.option(xdr.lookup("AccountId"))],
  ["flags", xdr.lookup("Uint32")],
  ["homeDomain", xdr.lookup("String32")],
  ["thresholds", xdr.lookup("Thresholds")],
  ["signers", xdr.varArray(xdr.lookup("Signer"), xdr.lookup("MAX_SIGNERS"))],
  ["ext", xdr.lookup("AccountEntryExt")],
]);

// === xdr source ============================================================
//
//   enum TrustLineFlags
//   {
//       // issuer has authorized account to perform transactions with its credit
//       AUTHORIZED_FLAG = 1,
//       // issuer has authorized account to maintain and reduce liabilities for its
//       // credit
//       AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG = 2,
//       // issuer has specified that it may clawback its credit, and that claimable
//       // balances created with its credit may also be clawed back
//       TRUSTLINE_CLAWBACK_ENABLED_FLAG = 4
//   };
//
// ===========================================================================
xdr.enum("TrustLineFlags", {
  authorizedFlag: 1,
  authorizedToMaintainLiabilitiesFlag: 2,
  trustlineClawbackEnabledFlag: 4,
});

// === xdr source ============================================================
//
//   const MASK_TRUSTLINE_FLAGS = 1;
//
// ===========================================================================
xdr.const("MASK_TRUSTLINE_FLAGS", 1);

// === xdr source ============================================================
//
//   const MASK_TRUSTLINE_FLAGS_V13 = 3;
//
// ===========================================================================
xdr.const("MASK_TRUSTLINE_FLAGS_V13", 3);

// === xdr source ============================================================
//
//   const MASK_TRUSTLINE_FLAGS_V17 = 7;
//
// ===========================================================================
xdr.const("MASK_TRUSTLINE_FLAGS_V17", 7);

// === xdr source ============================================================
//
//   enum LiquidityPoolType
//   {
//       LIQUIDITY_POOL_CONSTANT_PRODUCT = 0
//   };
//
// ===========================================================================
xdr.enum("LiquidityPoolType", {
  liquidityPoolConstantProduct: 0,
});

// === xdr source ============================================================
//
//   union TrustLineAsset switch (AssetType type)
//   {
//   case ASSET_TYPE_NATIVE: // Not credit
//       void;
//   
//   case ASSET_TYPE_CREDIT_ALPHANUM4:
//       AlphaNum4 alphaNum4;
//   
//   case ASSET_TYPE_CREDIT_ALPHANUM12:
//       AlphaNum12 alphaNum12;
//   
//   case ASSET_TYPE_POOL_SHARE:
//       PoolID liquidityPoolID;
//   
//       // add other asset types here in the future
//   };
//
// ===========================================================================
xdr.union("TrustLineAsset", {
  switchOn: xdr.lookup("AssetType"),
  switchName: "type",
  switches: [
    ["assetTypeNative", xdr.void()],
    ["assetTypeCreditAlphanum4", "alphaNum4"],
    ["assetTypeCreditAlphanum12", "alphaNum12"],
    ["assetTypePoolShare", "liquidityPoolId"],
  ],
  arms: {
    alphaNum4: xdr.lookup("AlphaNum4"),
    alphaNum12: xdr.lookup("AlphaNum12"),
    liquidityPoolId: xdr.lookup("PoolId"),
  },
});

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("TrustLineEntryExtensionV2Ext", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TrustLineEntryExtensionV2
//   {
//       int32 liquidityPoolUseCount;
//   
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TrustLineEntryExtensionV2", [
  ["liquidityPoolUseCount", xdr.lookup("Int32")],
  ["ext", xdr.lookup("TrustLineEntryExtensionV2Ext")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//               {
//               case 0:
//                   void;
//               case 2:
//                   TrustLineEntryExtensionV2 v2;
//               }
//
// ===========================================================================
xdr.union("TrustLineEntryV1Ext", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
    [2, "v2"],
  ],
  arms: {
    v2: xdr.lookup("TrustLineEntryExtensionV2"),
  },
});

// === xdr source ============================================================
//
//   struct
//           {
//               Liabilities liabilities;
//   
//               union switch (int v)
//               {
//               case 0:
//                   void;
//               case 2:
//                   TrustLineEntryExtensionV2 v2;
//               }
//               ext;
//           }
//
// ===========================================================================
xdr.struct("TrustLineEntryV1", [
  ["liabilities", xdr.lookup("Liabilities")],
  ["ext", xdr.lookup("TrustLineEntryV1Ext")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           struct
//           {
//               Liabilities liabilities;
//   
//               union switch (int v)
//               {
//               case 0:
//                   void;
//               case 2:
//                   TrustLineEntryExtensionV2 v2;
//               }
//               ext;
//           } v1;
//       }
//
// ===========================================================================
xdr.union("TrustLineEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
    [1, "v1"],
  ],
  arms: {
    v1: xdr.lookup("TrustLineEntryV1"),
  },
});

// === xdr source ============================================================
//
//   struct TrustLineEntry
//   {
//       AccountID accountID;  // account this trustline belongs to
//       TrustLineAsset asset; // type of asset (with issuer)
//       int64 balance;        // how much of this asset the user has.
//                             // Asset defines the unit for this;
//   
//       int64 limit;  // balance cannot be above this
//       uint32 flags; // see TrustLineFlags
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           struct
//           {
//               Liabilities liabilities;
//   
//               union switch (int v)
//               {
//               case 0:
//                   void;
//               case 2:
//                   TrustLineEntryExtensionV2 v2;
//               }
//               ext;
//           } v1;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TrustLineEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["asset", xdr.lookup("TrustLineAsset")],
  ["balance", xdr.lookup("Int64")],
  ["limit", xdr.lookup("Int64")],
  ["flags", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("TrustLineEntryExt")],
]);

// === xdr source ============================================================
//
//   enum OfferEntryFlags
//   {
//       // an offer with this flag will not act on and take a reverse offer of equal
//       // price
//       PASSIVE_FLAG = 1
//   };
//
// ===========================================================================
xdr.enum("OfferEntryFlags", {
  passiveFlag: 1,
});

// === xdr source ============================================================
//
//   const MASK_OFFERENTRY_FLAGS = 1;
//
// ===========================================================================
xdr.const("MASK_OFFERENTRY_FLAGS", 1);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("OfferEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct OfferEntry
//   {
//       AccountID sellerID;
//       int64 offerID;
//       Asset selling; // A
//       Asset buying;  // B
//       int64 amount;  // amount of A
//   
//       /* price for this offer:
//           price of A in terms of B
//           price=AmountB/AmountA=priceNumerator/priceDenominator
//           price is after fees
//       */
//       Price price;
//       uint32 flags; // see OfferEntryFlags
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("OfferEntry", [
  ["sellerId", xdr.lookup("AccountId")],
  ["offerId", xdr.lookup("Int64")],
  ["selling", xdr.lookup("Asset")],
  ["buying", xdr.lookup("Asset")],
  ["amount", xdr.lookup("Int64")],
  ["price", xdr.lookup("Price")],
  ["flags", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("OfferEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("DataEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct DataEntry
//   {
//       AccountID accountID; // account this data belongs to
//       string64 dataName;
//       DataValue dataValue;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("DataEntry", [
  ["accountId", xdr.lookup("AccountId")],
  ["dataName", xdr.lookup("String64")],
  ["dataValue", xdr.lookup("DataValue")],
  ["ext", xdr.lookup("DataEntryExt")],
]);

// === xdr source ============================================================
//
//   enum ClaimPredicateType
//   {
//       CLAIM_PREDICATE_UNCONDITIONAL = 0,
//       CLAIM_PREDICATE_AND = 1,
//       CLAIM_PREDICATE_OR = 2,
//       CLAIM_PREDICATE_NOT = 3,
//       CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME = 4,
//       CLAIM_PREDICATE_BEFORE_RELATIVE_TIME = 5
//   };
//
// ===========================================================================
xdr.enum("ClaimPredicateType", {
  claimPredicateUnconditional: 0,
  claimPredicateAnd: 1,
  claimPredicateOr: 2,
  claimPredicateNot: 3,
  claimPredicateBeforeAbsoluteTime: 4,
  claimPredicateBeforeRelativeTime: 5,
});

// === xdr source ============================================================
//
//   union ClaimPredicate switch (ClaimPredicateType type)
//   {
//   case CLAIM_PREDICATE_UNCONDITIONAL:
//       void;
//   case CLAIM_PREDICATE_AND:
//       ClaimPredicate andPredicates<2>;
//   case CLAIM_PREDICATE_OR:
//       ClaimPredicate orPredicates<2>;
//   case CLAIM_PREDICATE_NOT:
//       ClaimPredicate* notPredicate;
//   case CLAIM_PREDICATE_BEFORE_ABSOLUTE_TIME:
//       int64 absBefore; // Predicate will be true if closeTime < absBefore
//   case CLAIM_PREDICATE_BEFORE_RELATIVE_TIME:
//       int64 relBefore; // Seconds since closeTime of the ledger in which the
//                        // ClaimableBalanceEntry was created
//   };
//
// ===========================================================================
xdr.union("ClaimPredicate", {
  switchOn: xdr.lookup("ClaimPredicateType"),
  switchName: "type",
  switches: [
    ["claimPredicateUnconditional", xdr.void()],
    ["claimPredicateAnd", "andPredicates"],
    ["claimPredicateOr", "orPredicates"],
    ["claimPredicateNot", "notPredicate"],
    ["claimPredicateBeforeAbsoluteTime", "absBefore"],
    ["claimPredicateBeforeRelativeTime", "relBefore"],
  ],
  arms: {
    andPredicates: xdr.varArray(xdr.lookup("ClaimPredicate"), 2),
    orPredicates: xdr.varArray(xdr.lookup("ClaimPredicate"), 2),
    notPredicate: xdr.option(xdr.lookup("ClaimPredicate")),
    absBefore: xdr.lookup("Int64"),
    relBefore: xdr.lookup("Int64"),
  },
});

// === xdr source ============================================================
//
//   enum ClaimantType
//   {
//       CLAIMANT_TYPE_V0 = 0
//   };
//
// ===========================================================================
xdr.enum("ClaimantType", {
  claimantTypeV0: 0,
});

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID destination;    // The account that can use this condition
//           ClaimPredicate predicate; // Claimable if predicate is true
//       }
//
// ===========================================================================
xdr.struct("ClaimantV0", [
  ["destination", xdr.lookup("AccountId")],
  ["predicate", xdr.lookup("ClaimPredicate")],
]);

// === xdr source ============================================================
//
//   union Claimant switch (ClaimantType type)
//   {
//   case CLAIMANT_TYPE_V0:
//       struct
//       {
//           AccountID destination;    // The account that can use this condition
//           ClaimPredicate predicate; // Claimable if predicate is true
//       } v0;
//   };
//
// ===========================================================================
xdr.union("Claimant", {
  switchOn: xdr.lookup("ClaimantType"),
  switchName: "type",
  switches: [
    ["claimantTypeV0", "v0"],
  ],
  arms: {
    v0: xdr.lookup("ClaimantV0"),
  },
});

// === xdr source ============================================================
//
//   enum ClaimableBalanceIDType
//   {
//       CLAIMABLE_BALANCE_ID_TYPE_V0 = 0
//   };
//
// ===========================================================================
xdr.enum("ClaimableBalanceIdType", {
  claimableBalanceIdTypeV0: 0,
});

// === xdr source ============================================================
//
//   union ClaimableBalanceID switch (ClaimableBalanceIDType type)
//   {
//   case CLAIMABLE_BALANCE_ID_TYPE_V0:
//       Hash v0;
//   };
//
// ===========================================================================
xdr.union("ClaimableBalanceId", {
  switchOn: xdr.lookup("ClaimableBalanceIdType"),
  switchName: "type",
  switches: [
    ["claimableBalanceIdTypeV0", "v0"],
  ],
  arms: {
    v0: xdr.lookup("Hash"),
  },
});

// === xdr source ============================================================
//
//   enum ClaimableBalanceFlags
//   {
//       // If set, the issuer account of the asset held by the claimable balance may
//       // clawback the claimable balance
//       CLAIMABLE_BALANCE_CLAWBACK_ENABLED_FLAG = 0x1
//   };
//
// ===========================================================================
xdr.enum("ClaimableBalanceFlags", {
  claimableBalanceClawbackEnabledFlag: 1,
});

// === xdr source ============================================================
//
//   const MASK_CLAIMABLE_BALANCE_FLAGS = 0x1;
//
// ===========================================================================
xdr.const("MASK_CLAIMABLE_BALANCE_FLAGS", 0x1);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("ClaimableBalanceEntryExtensionV1Ext", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ClaimableBalanceEntryExtensionV1
//   {
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   
//       uint32 flags; // see ClaimableBalanceFlags
//   };
//
// ===========================================================================
xdr.struct("ClaimableBalanceEntryExtensionV1", [
  ["ext", xdr.lookup("ClaimableBalanceEntryExtensionV1Ext")],
  ["flags", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           ClaimableBalanceEntryExtensionV1 v1;
//       }
//
// ===========================================================================
xdr.union("ClaimableBalanceEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
    [1, "v1"],
  ],
  arms: {
    v1: xdr.lookup("ClaimableBalanceEntryExtensionV1"),
  },
});

// === xdr source ============================================================
//
//   struct ClaimableBalanceEntry
//   {
//       // Unique identifier for this ClaimableBalanceEntry
//       ClaimableBalanceID balanceID;
//   
//       // List of claimants with associated predicate
//       Claimant claimants<10>;
//   
//       // Any asset including native
//       Asset asset;
//   
//       // Amount of asset
//       int64 amount;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           ClaimableBalanceEntryExtensionV1 v1;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("ClaimableBalanceEntry", [
  ["balanceId", xdr.lookup("ClaimableBalanceId")],
  ["claimants", xdr.varArray(xdr.lookup("Claimant"), 10)],
  ["asset", xdr.lookup("Asset")],
  ["amount", xdr.lookup("Int64")],
  ["ext", xdr.lookup("ClaimableBalanceEntryExt")],
]);

// === xdr source ============================================================
//
//   struct LiquidityPoolConstantProductParameters
//   {
//       Asset assetA; // assetA < assetB
//       Asset assetB;
//       int32 fee; // Fee is in basis points, so the actual rate is (fee/100)%
//   };
//
// ===========================================================================
xdr.struct("LiquidityPoolConstantProductParameters", [
  ["assetA", xdr.lookup("Asset")],
  ["assetB", xdr.lookup("Asset")],
  ["fee", xdr.lookup("Int32")],
]);

// === xdr source ============================================================
//
//   struct
//           {
//               LiquidityPoolConstantProductParameters params;
//   
//               int64 reserveA;        // amount of A in the pool
//               int64 reserveB;        // amount of B in the pool
//               int64 totalPoolShares; // total number of pool shares issued
//               int64 poolSharesTrustLineCount; // number of trust lines for the
//                                               // associated pool shares
//           }
//
// ===========================================================================
xdr.struct("LiquidityPoolEntryConstantProduct", [
  ["params", xdr.lookup("LiquidityPoolConstantProductParameters")],
  ["reserveA", xdr.lookup("Int64")],
  ["reserveB", xdr.lookup("Int64")],
  ["totalPoolShares", xdr.lookup("Int64")],
  ["poolSharesTrustLineCount", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   union switch (LiquidityPoolType type)
//       {
//       case LIQUIDITY_POOL_CONSTANT_PRODUCT:
//           struct
//           {
//               LiquidityPoolConstantProductParameters params;
//   
//               int64 reserveA;        // amount of A in the pool
//               int64 reserveB;        // amount of B in the pool
//               int64 totalPoolShares; // total number of pool shares issued
//               int64 poolSharesTrustLineCount; // number of trust lines for the
//                                               // associated pool shares
//           } constantProduct;
//       }
//
// ===========================================================================
xdr.union("LiquidityPoolEntryBody", {
  switchOn: xdr.lookup("LiquidityPoolType"),
  switchName: "type",
  switches: [
    ["liquidityPoolConstantProduct", "constantProduct"],
  ],
  arms: {
    constantProduct: xdr.lookup("LiquidityPoolEntryConstantProduct"),
  },
});

// === xdr source ============================================================
//
//   struct LiquidityPoolEntry
//   {
//       PoolID liquidityPoolID;
//   
//       union switch (LiquidityPoolType type)
//       {
//       case LIQUIDITY_POOL_CONSTANT_PRODUCT:
//           struct
//           {
//               LiquidityPoolConstantProductParameters params;
//   
//               int64 reserveA;        // amount of A in the pool
//               int64 reserveB;        // amount of B in the pool
//               int64 totalPoolShares; // total number of pool shares issued
//               int64 poolSharesTrustLineCount; // number of trust lines for the
//                                               // associated pool shares
//           } constantProduct;
//       }
//       body;
//   };
//
// ===========================================================================
xdr.struct("LiquidityPoolEntry", [
  ["liquidityPoolId", xdr.lookup("PoolId")],
  ["body", xdr.lookup("LiquidityPoolEntryBody")],
]);

// === xdr source ============================================================
//
//   struct ContractDataEntry {
//       Hash contractID;
//       SCVal key;
//       SCVal val;
//   };
//
// ===========================================================================
xdr.struct("ContractDataEntry", [
  ["contractId", xdr.lookup("Hash")],
  ["key", xdr.lookup("ScVal")],
  ["val", xdr.lookup("ScVal")],
]);

// === xdr source ============================================================
//
//    struct ContractCodeEntry {
//        ExtensionPoint ext;
//
//        Hash hash;
//        opaque code<SCVAL_LIMIT>;
//    };
//
// ===========================================================================
xdr.struct("ContractCodeEntry", [
  ["ext", xdr.lookup("ExtensionPoint")],
  ["hash", xdr.lookup("Hash")],
  ["code", xdr.varOpaque(xdr.lookup("SCVAL_LIMIT"))],
]);

// === xdr source ============================================================
//
//   enum ConfigSettingType
//   {
//       CONFIG_SETTING_TYPE_UINT32 = 0
//   };
//
// ===========================================================================
xdr.enum("ConfigSettingType", {
  configSettingTypeUint32: 0,
});

// === xdr source ============================================================
//
//   union ConfigSetting switch (ConfigSettingType type)
//   {
//   case CONFIG_SETTING_TYPE_UINT32:
//       uint32 uint32Val;
//   };
//
// ===========================================================================
xdr.union("ConfigSetting", {
  switchOn: xdr.lookup("ConfigSettingType"),
  switchName: "type",
  switches: [
    ["configSettingTypeUint32", "uint32Val"],
  ],
  arms: {
    uint32Val: xdr.lookup("Uint32"),
  },
});

// === xdr source ============================================================
//
//   enum ConfigSettingID
//   {
//       CONFIG_SETTING_CONTRACT_MAX_SIZE = 0
//   };
//
// ===========================================================================
xdr.enum("ConfigSettingId", {
  configSettingContractMaxSize: 0,
});

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("ConfigSettingEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct ConfigSettingEntry
//   {
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   
//       ConfigSettingID configSettingID;
//       ConfigSetting setting;
//   };
//
// ===========================================================================
xdr.struct("ConfigSettingEntry", [
  ["ext", xdr.lookup("ConfigSettingEntryExt")],
  ["configSettingId", xdr.lookup("ConfigSettingId")],
  ["setting", xdr.lookup("ConfigSetting")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("LedgerEntryExtensionV1Ext", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LedgerEntryExtensionV1
//   {
//       SponsorshipDescriptor sponsoringID;
//   
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerEntryExtensionV1", [
  ["sponsoringId", xdr.lookup("SponsorshipDescriptor")],
  ["ext", xdr.lookup("LedgerEntryExtensionV1Ext")],
]);

// === xdr source ============================================================
//
//   union switch (LedgerEntryType type)
//       {
//       case ACCOUNT:
//           AccountEntry account;
//       case TRUSTLINE:
//           TrustLineEntry trustLine;
//       case OFFER:
//           OfferEntry offer;
//       case DATA:
//           DataEntry data;
//       case CLAIMABLE_BALANCE:
//           ClaimableBalanceEntry claimableBalance;
//       case LIQUIDITY_POOL:
//           LiquidityPoolEntry liquidityPool;
//       case CONTRACT_DATA:
//           ContractDataEntry contractData;
//       case CONTRACT_CODE:
//           ContractCodeEntry contractCode;
//       case CONFIG_SETTING:
//           ConfigSettingEntry configSetting;
//       }
//
// ===========================================================================
xdr.union("LedgerEntryData", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["trustline", "trustLine"],
    ["offer", "offer"],
    ["data", "data"],
    ["claimableBalance", "claimableBalance"],
    ["liquidityPool", "liquidityPool"],
    ["contractData", "contractData"],
    ["contractCode", "contractCode"],
    ["configSetting", "configSetting"],
  ],
  arms: {
    account: xdr.lookup("AccountEntry"),
    trustLine: xdr.lookup("TrustLineEntry"),
    offer: xdr.lookup("OfferEntry"),
    data: xdr.lookup("DataEntry"),
    claimableBalance: xdr.lookup("ClaimableBalanceEntry"),
    liquidityPool: xdr.lookup("LiquidityPoolEntry"),
    contractData: xdr.lookup("ContractDataEntry"),
    contractCode: xdr.lookup("ContractCodeEntry"),
    configSetting: xdr.lookup("ConfigSettingEntry"),
  },
});

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           LedgerEntryExtensionV1 v1;
//       }
//
// ===========================================================================
xdr.union("LedgerEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
    [1, "v1"],
  ],
  arms: {
    v1: xdr.lookup("LedgerEntryExtensionV1"),
  },
});

// === xdr source ============================================================
//
//   struct LedgerEntry
//   {
//       uint32 lastModifiedLedgerSeq; // ledger the LedgerEntry was last changed
//   
//       union switch (LedgerEntryType type)
//       {
//       case ACCOUNT:
//           AccountEntry account;
//       case TRUSTLINE:
//           TrustLineEntry trustLine;
//       case OFFER:
//           OfferEntry offer;
//       case DATA:
//           DataEntry data;
//       case CLAIMABLE_BALANCE:
//           ClaimableBalanceEntry claimableBalance;
//       case LIQUIDITY_POOL:
//           LiquidityPoolEntry liquidityPool;
//       case CONTRACT_DATA:
//           ContractDataEntry contractData;
//       case CONTRACT_CODE:
//           ContractCodeEntry contractCode;
//       case CONFIG_SETTING:
//           ConfigSettingEntry configSetting;
//       }
//       data;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           LedgerEntryExtensionV1 v1;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerEntry", [
  ["lastModifiedLedgerSeq", xdr.lookup("Uint32")],
  ["data", xdr.lookup("LedgerEntryData")],
  ["ext", xdr.lookup("LedgerEntryExt")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID accountID;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyAccount", [
  ["accountId", xdr.lookup("AccountId")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID accountID;
//           TrustLineAsset asset;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyTrustLine", [
  ["accountId", xdr.lookup("AccountId")],
  ["asset", xdr.lookup("TrustLineAsset")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID sellerID;
//           int64 offerID;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyOffer", [
  ["sellerId", xdr.lookup("AccountId")],
  ["offerId", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID accountID;
//           string64 dataName;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyData", [
  ["accountId", xdr.lookup("AccountId")],
  ["dataName", xdr.lookup("String64")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           ClaimableBalanceID balanceID;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyClaimableBalance", [
  ["balanceId", xdr.lookup("ClaimableBalanceId")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           PoolID liquidityPoolID;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyLiquidityPool", [
  ["liquidityPoolId", xdr.lookup("PoolId")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           Hash contractID;
//           SCVal key;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyContractData", [
  ["contractId", xdr.lookup("Hash")],
  ["key", xdr.lookup("ScVal")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           Hash hash;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyContractCode", [
  ["hash", xdr.lookup("Hash")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           ConfigSettingID configSettingID;
//       }
//
// ===========================================================================
xdr.struct("LedgerKeyConfigSetting", [
  ["configSettingId", xdr.lookup("ConfigSettingId")],
]);

// === xdr source ============================================================
//
//   union LedgerKey switch (LedgerEntryType type)
//   {
//   case ACCOUNT:
//       struct
//       {
//           AccountID accountID;
//       } account;
//   
//   case TRUSTLINE:
//       struct
//       {
//           AccountID accountID;
//           TrustLineAsset asset;
//       } trustLine;
//   
//   case OFFER:
//       struct
//       {
//           AccountID sellerID;
//           int64 offerID;
//       } offer;
//   
//   case DATA:
//       struct
//       {
//           AccountID accountID;
//           string64 dataName;
//       } data;
//   
//   case CLAIMABLE_BALANCE:
//       struct
//       {
//           ClaimableBalanceID balanceID;
//       } claimableBalance;
//   
//   case LIQUIDITY_POOL:
//       struct
//       {
//           PoolID liquidityPoolID;
//       } liquidityPool;
//   case CONTRACT_DATA:
//       struct
//       {
//           Hash contractID;
//           SCVal key;
//       } contractData;
//   case CONTRACT_CODE:
//       struct
//       {
//           Hash hash;
//       } contractCode;
//   case CONFIG_SETTING:
//       struct
//       {
//           ConfigSettingID configSettingID;
//       } configSetting;
//   };
//
// ===========================================================================
xdr.union("LedgerKey", {
  switchOn: xdr.lookup("LedgerEntryType"),
  switchName: "type",
  switches: [
    ["account", "account"],
    ["trustline", "trustLine"],
    ["offer", "offer"],
    ["data", "data"],
    ["claimableBalance", "claimableBalance"],
    ["liquidityPool", "liquidityPool"],
    ["contractData", "contractData"],
    ["contractCode", "contractCode"],
    ["configSetting", "configSetting"],
  ],
  arms: {
    account: xdr.lookup("LedgerKeyAccount"),
    trustLine: xdr.lookup("LedgerKeyTrustLine"),
    offer: xdr.lookup("LedgerKeyOffer"),
    data: xdr.lookup("LedgerKeyData"),
    claimableBalance: xdr.lookup("LedgerKeyClaimableBalance"),
    liquidityPool: xdr.lookup("LedgerKeyLiquidityPool"),
    contractData: xdr.lookup("LedgerKeyContractData"),
    contractCode: xdr.lookup("LedgerKeyContractCode"),
    configSetting: xdr.lookup("LedgerKeyConfigSetting"),
  },
});

// === xdr source ============================================================
//
//   enum EnvelopeType
//   {
//       ENVELOPE_TYPE_TX_V0 = 0,
//       ENVELOPE_TYPE_SCP = 1,
//       ENVELOPE_TYPE_TX = 2,
//       ENVELOPE_TYPE_AUTH = 3,
//       ENVELOPE_TYPE_SCPVALUE = 4,
//       ENVELOPE_TYPE_TX_FEE_BUMP = 5,
//       ENVELOPE_TYPE_OP_ID = 6,
//       ENVELOPE_TYPE_POOL_REVOKE_OP_ID = 7,
//       ENVELOPE_TYPE_CONTRACT_ID_FROM_ED25519 = 8,
//       ENVELOPE_TYPE_CONTRACT_ID_FROM_CONTRACT = 9,
//       ENVELOPE_TYPE_CONTRACT_ID_FROM_ASSET = 10,
//       ENVELOPE_TYPE_CONTRACT_ID_FROM_SOURCE_ACCOUNT = 11,
//       ENVELOPE_TYPE_CREATE_CONTRACT_ARGS = 12,
//       ENVELOPE_TYPE_CONTRACT_AUTH = 13
//   };
//
// ===========================================================================
xdr.enum("EnvelopeType", {
  envelopeTypeTxV0: 0,
  envelopeTypeScp: 1,
  envelopeTypeTx: 2,
  envelopeTypeAuth: 3,
  envelopeTypeScpvalue: 4,
  envelopeTypeTxFeeBump: 5,
  envelopeTypeOpId: 6,
  envelopeTypePoolRevokeOpId: 7,
  envelopeTypeContractIdFromEd25519: 8,
  envelopeTypeContractIdFromContract: 9,
  envelopeTypeContractIdFromAsset: 10,
  envelopeTypeContractIdFromSourceAccount: 11,
  envelopeTypeCreateContractArgs: 12,
  envelopeTypeContractAuth: 13,
});

// === xdr source ============================================================
//
//   typedef opaque UpgradeType<128>;
//
// ===========================================================================
xdr.typedef("UpgradeType", xdr.varOpaque(128));

// === xdr source ============================================================
//
//   enum StellarValueType
//   {
//       STELLAR_VALUE_BASIC = 0,
//       STELLAR_VALUE_SIGNED = 1
//   };
//
// ===========================================================================
xdr.enum("StellarValueType", {
  stellarValueBasic: 0,
  stellarValueSigned: 1,
});

// === xdr source ============================================================
//
//   struct LedgerCloseValueSignature
//   {
//       NodeID nodeID;       // which node introduced the value
//       Signature signature; // nodeID's signature
//   };
//
// ===========================================================================
xdr.struct("LedgerCloseValueSignature", [
  ["nodeId", xdr.lookup("NodeId")],
  ["signature", xdr.lookup("Signature")],
]);

// === xdr source ============================================================
//
//   union switch (StellarValueType v)
//       {
//       case STELLAR_VALUE_BASIC:
//           void;
//       case STELLAR_VALUE_SIGNED:
//           LedgerCloseValueSignature lcValueSignature;
//       }
//
// ===========================================================================
xdr.union("StellarValueExt", {
  switchOn: xdr.lookup("StellarValueType"),
  switchName: "v",
  switches: [
    ["stellarValueBasic", xdr.void()],
    ["stellarValueSigned", "lcValueSignature"],
  ],
  arms: {
    lcValueSignature: xdr.lookup("LedgerCloseValueSignature"),
  },
});

// === xdr source ============================================================
//
//   struct StellarValue
//   {
//       Hash txSetHash;      // transaction set to apply to previous ledger
//       TimePoint closeTime; // network close time
//   
//       // upgrades to apply to the previous ledger (usually empty)
//       // this is a vector of encoded 'LedgerUpgrade' so that nodes can drop
//       // unknown steps during consensus if needed.
//       // see notes below on 'LedgerUpgrade' for more detail
//       // max size is dictated by number of upgrade types (+ room for future)
//       UpgradeType upgrades<6>;
//   
//       // reserved for future use
//       union switch (StellarValueType v)
//       {
//       case STELLAR_VALUE_BASIC:
//           void;
//       case STELLAR_VALUE_SIGNED:
//           LedgerCloseValueSignature lcValueSignature;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("StellarValue", [
  ["txSetHash", xdr.lookup("Hash")],
  ["closeTime", xdr.lookup("TimePoint")],
  ["upgrades", xdr.varArray(xdr.lookup("UpgradeType"), 6)],
  ["ext", xdr.lookup("StellarValueExt")],
]);

// === xdr source ============================================================
//
//   const MASK_LEDGER_HEADER_FLAGS = 0x7F;
//
// ===========================================================================
xdr.const("MASK_LEDGER_HEADER_FLAGS", 0x7F);

// === xdr source ============================================================
//
//   enum LedgerHeaderFlags
//   {
//       DISABLE_LIQUIDITY_POOL_TRADING_FLAG = 0x1,
//       DISABLE_LIQUIDITY_POOL_DEPOSIT_FLAG = 0x2,
//       DISABLE_LIQUIDITY_POOL_WITHDRAWAL_FLAG = 0x4,
//       DISABLE_CONTRACT_CREATE = 0x8,
//       DISABLE_CONTRACT_UPDATE = 0x10,
//       DISABLE_CONTRACT_REMOVE = 0x20,
//       DISABLE_CONTRACT_INVOKE = 0x40
//   };
//
// ===========================================================================
xdr.enum("LedgerHeaderFlags", {
  disableLiquidityPoolTradingFlag: 1,
  disableLiquidityPoolDepositFlag: 2,
  disableLiquidityPoolWithdrawalFlag: 4,
  disableContractCreate: 8,
  disableContractUpdate: 16,
  disableContractRemove: 32,
  disableContractInvoke: 64,
});

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("LedgerHeaderExtensionV1Ext", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LedgerHeaderExtensionV1
//   {
//       uint32 flags; // LedgerHeaderFlags
//   
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerHeaderExtensionV1", [
  ["flags", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("LedgerHeaderExtensionV1Ext")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           LedgerHeaderExtensionV1 v1;
//       }
//
// ===========================================================================
xdr.union("LedgerHeaderExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
    [1, "v1"],
  ],
  arms: {
    v1: xdr.lookup("LedgerHeaderExtensionV1"),
  },
});

// === xdr source ============================================================
//
//   struct LedgerHeader
//   {
//       uint32 ledgerVersion;    // the protocol version of the ledger
//       Hash previousLedgerHash; // hash of the previous ledger header
//       StellarValue scpValue;   // what consensus agreed to
//       Hash txSetResultHash;    // the TransactionResultSet that led to this ledger
//       Hash bucketListHash;     // hash of the ledger state
//   
//       uint32 ledgerSeq; // sequence number of this ledger
//   
//       int64 totalCoins; // total number of stroops in existence.
//                         // 10,000,000 stroops in 1 XLM
//   
//       int64 feePool;       // fees burned since last inflation run
//       uint32 inflationSeq; // inflation sequence number
//   
//       uint64 idPool; // last used global ID, used for generating objects
//   
//       uint32 baseFee;     // base fee per operation in stroops
//       uint32 baseReserve; // account base reserve in stroops
//   
//       uint32 maxTxSetSize; // maximum size a transaction set can be
//   
//       Hash skipList[4]; // hashes of ledgers in the past. allows you to jump back
//                         // in time without walking the chain back ledger by ledger
//                         // each slot contains the oldest ledger that is mod of
//                         // either 50  5000  50000 or 500000 depending on index
//                         // skipList[0] mod(50), skipList[1] mod(5000), etc
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           LedgerHeaderExtensionV1 v1;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerHeader", [
  ["ledgerVersion", xdr.lookup("Uint32")],
  ["previousLedgerHash", xdr.lookup("Hash")],
  ["scpValue", xdr.lookup("StellarValue")],
  ["txSetResultHash", xdr.lookup("Hash")],
  ["bucketListHash", xdr.lookup("Hash")],
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["totalCoins", xdr.lookup("Int64")],
  ["feePool", xdr.lookup("Int64")],
  ["inflationSeq", xdr.lookup("Uint32")],
  ["idPool", xdr.lookup("Uint64")],
  ["baseFee", xdr.lookup("Uint32")],
  ["baseReserve", xdr.lookup("Uint32")],
  ["maxTxSetSize", xdr.lookup("Uint32")],
  ["skipList", xdr.array(xdr.lookup("Hash"), 4)],
  ["ext", xdr.lookup("LedgerHeaderExt")],
]);

// === xdr source ============================================================
//
//   enum LedgerUpgradeType
//   {
//       LEDGER_UPGRADE_VERSION = 1,
//       LEDGER_UPGRADE_BASE_FEE = 2,
//       LEDGER_UPGRADE_MAX_TX_SET_SIZE = 3,
//       LEDGER_UPGRADE_BASE_RESERVE = 4,
//       LEDGER_UPGRADE_FLAGS = 5,
//       LEDGER_UPGRADE_CONFIG = 6
//   };
//
// ===========================================================================
xdr.enum("LedgerUpgradeType", {
  ledgerUpgradeVersion: 1,
  ledgerUpgradeBaseFee: 2,
  ledgerUpgradeMaxTxSetSize: 3,
  ledgerUpgradeBaseReserve: 4,
  ledgerUpgradeFlags: 5,
  ledgerUpgradeConfig: 6,
});

// === xdr source ============================================================
//
//   struct
//       {
//           ConfigSettingID id; // id to update
//           ConfigSetting setting; // new value
//       }
//
// ===========================================================================
xdr.struct("LedgerUpgradeConfigSetting", [
  ["id", xdr.lookup("ConfigSettingId")],
  ["setting", xdr.lookup("ConfigSetting")],
]);

// === xdr source ============================================================
//
//   union LedgerUpgrade switch (LedgerUpgradeType type)
//   {
//   case LEDGER_UPGRADE_VERSION:
//       uint32 newLedgerVersion; // update ledgerVersion
//   case LEDGER_UPGRADE_BASE_FEE:
//       uint32 newBaseFee; // update baseFee
//   case LEDGER_UPGRADE_MAX_TX_SET_SIZE:
//       uint32 newMaxTxSetSize; // update maxTxSetSize
//   case LEDGER_UPGRADE_BASE_RESERVE:
//       uint32 newBaseReserve; // update baseReserve
//   case LEDGER_UPGRADE_FLAGS:
//       uint32 newFlags; // update flags
//   case LEDGER_UPGRADE_CONFIG:
//       struct
//       {
//           ConfigSettingID id; // id to update
//           ConfigSetting setting; // new value
//       } configSetting;
//   };
//
// ===========================================================================
xdr.union("LedgerUpgrade", {
  switchOn: xdr.lookup("LedgerUpgradeType"),
  switchName: "type",
  switches: [
    ["ledgerUpgradeVersion", "newLedgerVersion"],
    ["ledgerUpgradeBaseFee", "newBaseFee"],
    ["ledgerUpgradeMaxTxSetSize", "newMaxTxSetSize"],
    ["ledgerUpgradeBaseReserve", "newBaseReserve"],
    ["ledgerUpgradeFlags", "newFlags"],
    ["ledgerUpgradeConfig", "configSetting"],
  ],
  arms: {
    newLedgerVersion: xdr.lookup("Uint32"),
    newBaseFee: xdr.lookup("Uint32"),
    newMaxTxSetSize: xdr.lookup("Uint32"),
    newBaseReserve: xdr.lookup("Uint32"),
    newFlags: xdr.lookup("Uint32"),
    configSetting: xdr.lookup("LedgerUpgradeConfigSetting"),
  },
});

// === xdr source ============================================================
//
//   enum BucketEntryType
//   {
//       METAENTRY =
//           -1, // At-and-after protocol 11: bucket metadata, should come first.
//       LIVEENTRY = 0, // Before protocol 11: created-or-updated;
//                      // At-and-after protocol 11: only updated.
//       DEADENTRY = 1,
//       INITENTRY = 2 // At-and-after protocol 11: only created.
//   };
//
// ===========================================================================
xdr.enum("BucketEntryType", {
  metaentry: -1,
  liveentry: 0,
  deadentry: 1,
  initentry: 2,
});

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("BucketMetadataExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct BucketMetadata
//   {
//       // Indicates the protocol version used to create / merge this bucket.
//       uint32 ledgerVersion;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("BucketMetadata", [
  ["ledgerVersion", xdr.lookup("Uint32")],
  ["ext", xdr.lookup("BucketMetadataExt")],
]);

// === xdr source ============================================================
//
//   union BucketEntry switch (BucketEntryType type)
//   {
//   case LIVEENTRY:
//   case INITENTRY:
//       LedgerEntry liveEntry;
//   
//   case DEADENTRY:
//       LedgerKey deadEntry;
//   case METAENTRY:
//       BucketMetadata metaEntry;
//   };
//
// ===========================================================================
xdr.union("BucketEntry", {
  switchOn: xdr.lookup("BucketEntryType"),
  switchName: "type",
  switches: [
    ["liveentry", "liveEntry"],
    ["initentry", "liveEntry"],
    ["deadentry", "deadEntry"],
    ["metaentry", "metaEntry"],
  ],
  arms: {
    liveEntry: xdr.lookup("LedgerEntry"),
    deadEntry: xdr.lookup("LedgerKey"),
    metaEntry: xdr.lookup("BucketMetadata"),
  },
});

// === xdr source ============================================================
//
//   enum TxSetComponentType
//   {
//     // txs with effective fee <= bid derived from a base fee (if any).
//     // If base fee is not specified, no discount is applied.
//     TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE = 0
//   };
//
// ===========================================================================
xdr.enum("TxSetComponentType", {
  txsetCompTxsMaybeDiscountedFee: 0,
});

// === xdr source ============================================================
//
//   struct
//     {
//       int64* baseFee;
//       TransactionEnvelope txs<>;
//     }
//
// ===========================================================================
xdr.struct("TxSetComponentTxsMaybeDiscountedFee", [
  ["baseFee", xdr.option(xdr.lookup("Int64"))],
  ["txes", xdr.varArray(xdr.lookup("TransactionEnvelope"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union TxSetComponent switch (TxSetComponentType type)
//   {
//   case TXSET_COMP_TXS_MAYBE_DISCOUNTED_FEE:
//     struct
//     {
//       int64* baseFee;
//       TransactionEnvelope txs<>;
//     } txsMaybeDiscountedFee;
//   };
//
// ===========================================================================
xdr.union("TxSetComponent", {
  switchOn: xdr.lookup("TxSetComponentType"),
  switchName: "type",
  switches: [
    ["txsetCompTxsMaybeDiscountedFee", "txsMaybeDiscountedFee"],
  ],
  arms: {
    txsMaybeDiscountedFee: xdr.lookup("TxSetComponentTxsMaybeDiscountedFee"),
  },
});

// === xdr source ============================================================
//
//   union TransactionPhase switch (int v)
//   {
//   case 0:
//       TxSetComponent v0Components<>;
//   };
//
// ===========================================================================
xdr.union("TransactionPhase", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, "v0Components"],
  ],
  arms: {
    v0Components: xdr.varArray(xdr.lookup("TxSetComponent"), 2147483647),
  },
});

// === xdr source ============================================================
//
//   struct TransactionSet
//   {
//       Hash previousLedgerHash;
//       TransactionEnvelope txs<>;
//   };
//
// ===========================================================================
xdr.struct("TransactionSet", [
  ["previousLedgerHash", xdr.lookup("Hash")],
  ["txes", xdr.varArray(xdr.lookup("TransactionEnvelope"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct TransactionSetV1
//   {
//       Hash previousLedgerHash;
//       TransactionPhase phases<>;
//   };
//
// ===========================================================================
xdr.struct("TransactionSetV1", [
  ["previousLedgerHash", xdr.lookup("Hash")],
  ["phases", xdr.varArray(xdr.lookup("TransactionPhase"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union GeneralizedTransactionSet switch (int v)
//   {
//   // We consider the legacy TransactionSet to be v0.
//   case 1:
//       TransactionSetV1 v1TxSet;
//   };
//
// ===========================================================================
xdr.union("GeneralizedTransactionSet", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [1, "v1TxSet"],
  ],
  arms: {
    v1TxSet: xdr.lookup("TransactionSetV1"),
  },
});

// === xdr source ============================================================
//
//   struct TransactionResultPair
//   {
//       Hash transactionHash;
//       TransactionResult result; // result for the transaction
//   };
//
// ===========================================================================
xdr.struct("TransactionResultPair", [
  ["transactionHash", xdr.lookup("Hash")],
  ["result", xdr.lookup("TransactionResult")],
]);

// === xdr source ============================================================
//
//   struct TransactionResultSet
//   {
//       TransactionResultPair results<>;
//   };
//
// ===========================================================================
xdr.struct("TransactionResultSet", [
  ["results", xdr.varArray(xdr.lookup("TransactionResultPair"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           GeneralizedTransactionSet generalizedTxSet;
//       }
//
// ===========================================================================
xdr.union("TransactionHistoryEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
    [1, "generalizedTxSet"],
  ],
  arms: {
    generalizedTxSet: xdr.lookup("GeneralizedTransactionSet"),
  },
});

// === xdr source ============================================================
//
//   struct TransactionHistoryEntry
//   {
//       uint32 ledgerSeq;
//       TransactionSet txSet;
//   
//       // when v != 0, txSet must be empty
//       union switch (int v)
//       {
//       case 0:
//           void;
//       case 1:
//           GeneralizedTransactionSet generalizedTxSet;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionHistoryEntry", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["txSet", xdr.lookup("TransactionSet")],
  ["ext", xdr.lookup("TransactionHistoryEntryExt")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionHistoryResultEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionHistoryResultEntry
//   {
//       uint32 ledgerSeq;
//       TransactionResultSet txResultSet;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionHistoryResultEntry", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["txResultSet", xdr.lookup("TransactionResultSet")],
  ["ext", xdr.lookup("TransactionHistoryResultEntryExt")],
]);

// === xdr source ============================================================
//
//   struct TransactionResultPairV2
//   {
//       Hash transactionHash;
//       Hash hashOfMetaHashes; // hash of hashes in TransactionMetaV3
//                              // TransactionResult is in the meta
//   };
//
// ===========================================================================
xdr.struct("TransactionResultPairV2", [
  ["transactionHash", xdr.lookup("Hash")],
  ["hashOfMetaHashes", xdr.lookup("Hash")],
]);

// === xdr source ============================================================
//
//   struct TransactionResultSetV2
//   {
//       TransactionResultPairV2 results<>;
//   };
//
// ===========================================================================
xdr.struct("TransactionResultSetV2", [
  ["results", xdr.varArray(xdr.lookup("TransactionResultPairV2"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionHistoryResultEntryV2Ext", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionHistoryResultEntryV2
//   {
//       uint32 ledgerSeq;
//       TransactionResultSetV2 txResultSet;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionHistoryResultEntryV2", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["txResultSet", xdr.lookup("TransactionResultSetV2")],
  ["ext", xdr.lookup("TransactionHistoryResultEntryV2Ext")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("LedgerHeaderHistoryEntryExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct LedgerHeaderHistoryEntry
//   {
//       Hash hash;
//       LedgerHeader header;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("LedgerHeaderHistoryEntry", [
  ["hash", xdr.lookup("Hash")],
  ["header", xdr.lookup("LedgerHeader")],
  ["ext", xdr.lookup("LedgerHeaderHistoryEntryExt")],
]);

// === xdr source ============================================================
//
//   struct LedgerSCPMessages
//   {
//       uint32 ledgerSeq;
//       SCPEnvelope messages<>;
//   };
//
// ===========================================================================
xdr.struct("LedgerScpMessages", [
  ["ledgerSeq", xdr.lookup("Uint32")],
  ["messages", xdr.varArray(xdr.lookup("ScpEnvelope"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct SCPHistoryEntryV0
//   {
//       SCPQuorumSet quorumSets<>; // additional quorum sets used by ledgerMessages
//       LedgerSCPMessages ledgerMessages;
//   };
//
// ===========================================================================
xdr.struct("ScpHistoryEntryV0", [
  ["quorumSets", xdr.varArray(xdr.lookup("ScpQuorumSet"), 2147483647)],
  ["ledgerMessages", xdr.lookup("LedgerScpMessages")],
]);

// === xdr source ============================================================
//
//   union SCPHistoryEntry switch (int v)
//   {
//   case 0:
//       SCPHistoryEntryV0 v0;
//   };
//
// ===========================================================================
xdr.union("ScpHistoryEntry", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, "v0"],
  ],
  arms: {
    v0: xdr.lookup("ScpHistoryEntryV0"),
  },
});

// === xdr source ============================================================
//
//   enum LedgerEntryChangeType
//   {
//       LEDGER_ENTRY_CREATED = 0, // entry was added to the ledger
//       LEDGER_ENTRY_UPDATED = 1, // entry was modified in the ledger
//       LEDGER_ENTRY_REMOVED = 2, // entry was removed from the ledger
//       LEDGER_ENTRY_STATE = 3    // value of the entry
//   };
//
// ===========================================================================
xdr.enum("LedgerEntryChangeType", {
  ledgerEntryCreated: 0,
  ledgerEntryUpdated: 1,
  ledgerEntryRemoved: 2,
  ledgerEntryState: 3,
});

// === xdr source ============================================================
//
//   union LedgerEntryChange switch (LedgerEntryChangeType type)
//   {
//   case LEDGER_ENTRY_CREATED:
//       LedgerEntry created;
//   case LEDGER_ENTRY_UPDATED:
//       LedgerEntry updated;
//   case LEDGER_ENTRY_REMOVED:
//       LedgerKey removed;
//   case LEDGER_ENTRY_STATE:
//       LedgerEntry state;
//   };
//
// ===========================================================================
xdr.union("LedgerEntryChange", {
  switchOn: xdr.lookup("LedgerEntryChangeType"),
  switchName: "type",
  switches: [
    ["ledgerEntryCreated", "created"],
    ["ledgerEntryUpdated", "updated"],
    ["ledgerEntryRemoved", "removed"],
    ["ledgerEntryState", "state"],
  ],
  arms: {
    created: xdr.lookup("LedgerEntry"),
    updated: xdr.lookup("LedgerEntry"),
    removed: xdr.lookup("LedgerKey"),
    state: xdr.lookup("LedgerEntry"),
  },
});

// === xdr source ============================================================
//
//   typedef LedgerEntryChange LedgerEntryChanges<>;
//
// ===========================================================================
xdr.typedef("LedgerEntryChanges", xdr.varArray(xdr.lookup("LedgerEntryChange"), 2147483647));

// === xdr source ============================================================
//
//   struct OperationMeta
//   {
//       LedgerEntryChanges changes;
//   };
//
// ===========================================================================
xdr.struct("OperationMeta", [
  ["changes", xdr.lookup("LedgerEntryChanges")],
]);

// === xdr source ============================================================
//
//   struct TransactionMetaV1
//   {
//       LedgerEntryChanges txChanges; // tx level changes if any
//       OperationMeta operations<>;   // meta for each operation
//   };
//
// ===========================================================================
xdr.struct("TransactionMetaV1", [
  ["txChanges", xdr.lookup("LedgerEntryChanges")],
  ["operations", xdr.varArray(xdr.lookup("OperationMeta"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct TransactionMetaV2
//   {
//       LedgerEntryChanges txChangesBefore; // tx level changes before operations
//                                           // are applied if any
//       OperationMeta operations<>;         // meta for each operation
//       LedgerEntryChanges txChangesAfter;  // tx level changes after operations are
//                                           // applied if any
//   };
//
// ===========================================================================
xdr.struct("TransactionMetaV2", [
  ["txChangesBefore", xdr.lookup("LedgerEntryChanges")],
  ["operations", xdr.varArray(xdr.lookup("OperationMeta"), 2147483647)],
  ["txChangesAfter", xdr.lookup("LedgerEntryChanges")],
]);

// === xdr source ============================================================
//
//   enum ContractEventType
//   {
//       SYSTEM = 0,
//       CONTRACT = 1
//   };
//
// ===========================================================================
xdr.enum("ContractEventType", {
  system: 0,
  contract: 1,
});

// === xdr source ============================================================
//
//   struct
//           {
//               SCVec topics;
//               SCVal data;
//           }
//
// ===========================================================================
xdr.struct("ContractEventV0", [
  ["topics", xdr.lookup("ScVec")],
  ["data", xdr.lookup("ScVal")],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           struct
//           {
//               SCVec topics;
//               SCVal data;
//           } v0;
//       }
//
// ===========================================================================
xdr.union("ContractEventBody", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, "v0"],
  ],
  arms: {
    v0: xdr.lookup("ContractEventV0"),
  },
});

// === xdr source ============================================================
//
//   struct ContractEvent
//   {
//       // We can use this to add more fields, or because it
//       // is first, to change ContractEvent into a union.
//       ExtensionPoint ext;
//   
//       Hash* contractID;
//       ContractEventType type;
//   
//       union switch (int v)
//       {
//       case 0:
//           struct
//           {
//               SCVec topics;
//               SCVal data;
//           } v0;
//       }
//       body;
//   };
//
// ===========================================================================
xdr.struct("ContractEvent", [
  ["ext", xdr.lookup("ExtensionPoint")],
  ["contractId", xdr.option(xdr.lookup("Hash"))],
  ["type", xdr.lookup("ContractEventType")],
  ["body", xdr.lookup("ContractEventBody")],
]);

// === xdr source ============================================================
//
//   struct OperationEvents
//   {
//       ContractEvent events<>;
//   };
//
// ===========================================================================
xdr.struct("OperationEvents", [
  ["events", xdr.varArray(xdr.lookup("ContractEvent"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct TransactionMetaV3
//   {
//       LedgerEntryChanges txChangesBefore; // tx level changes before operations
//                                           // are applied if any
//       OperationMeta operations<>;         // meta for each operation
//       LedgerEntryChanges txChangesAfter;  // tx level changes after operations are
//                                           // applied if any
//       OperationEvents events<>;           // custom events populated by the
//                                           // contracts themselves. One list per operation.
//       TransactionResult txResult;
//   
//       Hash hashes[3];                     // stores sha256(txChangesBefore, operations, txChangesAfter),
//                                           // sha256(events), and sha256(txResult)
//   };
//
// ===========================================================================
xdr.struct("TransactionMetaV3", [
  ["txChangesBefore", xdr.lookup("LedgerEntryChanges")],
  ["operations", xdr.varArray(xdr.lookup("OperationMeta"), 2147483647)],
  ["txChangesAfter", xdr.lookup("LedgerEntryChanges")],
  ["events", xdr.varArray(xdr.lookup("OperationEvents"), 2147483647)],
  ["txResult", xdr.lookup("TransactionResult")],
  ["hashes", xdr.array(xdr.lookup("Hash"), 3)],
]);

// === xdr source ============================================================
//
//   union TransactionMeta switch (int v)
//   {
//   case 0:
//       OperationMeta operations<>;
//   case 1:
//       TransactionMetaV1 v1;
//   case 2:
//       TransactionMetaV2 v2;
//   case 3:
//       TransactionMetaV3 v3;
//   };
//
// ===========================================================================
xdr.union("TransactionMeta", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, "operations"],
    [1, "v1"],
    [2, "v2"],
    [3, "v3"],
  ],
  arms: {
    operations: xdr.varArray(xdr.lookup("OperationMeta"), 2147483647),
    v1: xdr.lookup("TransactionMetaV1"),
    v2: xdr.lookup("TransactionMetaV2"),
    v3: xdr.lookup("TransactionMetaV3"),
  },
});

// === xdr source ============================================================
//
//   struct TransactionResultMeta
//   {
//       TransactionResultPair result;
//       LedgerEntryChanges feeProcessing;
//       TransactionMeta txApplyProcessing;
//   };
//
// ===========================================================================
xdr.struct("TransactionResultMeta", [
  ["result", xdr.lookup("TransactionResultPair")],
  ["feeProcessing", xdr.lookup("LedgerEntryChanges")],
  ["txApplyProcessing", xdr.lookup("TransactionMeta")],
]);

// === xdr source ============================================================
//
//   struct TransactionResultMetaV2
//   {
//       TransactionResultPairV2 result;
//       LedgerEntryChanges feeProcessing;
//       TransactionMeta txApplyProcessing;
//   };
//
// ===========================================================================
xdr.struct("TransactionResultMetaV2", [
  ["result", xdr.lookup("TransactionResultPairV2")],
  ["feeProcessing", xdr.lookup("LedgerEntryChanges")],
  ["txApplyProcessing", xdr.lookup("TransactionMeta")],
]);

// === xdr source ============================================================
//
//   struct UpgradeEntryMeta
//   {
//       LedgerUpgrade upgrade;
//       LedgerEntryChanges changes;
//   };
//
// ===========================================================================
xdr.struct("UpgradeEntryMeta", [
  ["upgrade", xdr.lookup("LedgerUpgrade")],
  ["changes", xdr.lookup("LedgerEntryChanges")],
]);

// === xdr source ============================================================
//
//   struct LedgerCloseMetaV0
//   {
//       LedgerHeaderHistoryEntry ledgerHeader;
//       // NB: txSet is sorted in "Hash order"
//       TransactionSet txSet;
//   
//       // NB: transactions are sorted in apply order here
//       // fees for all transactions are processed first
//       // followed by applying transactions
//       TransactionResultMeta txProcessing<>;
//   
//       // upgrades are applied last
//       UpgradeEntryMeta upgradesProcessing<>;
//   
//       // other misc information attached to the ledger close
//       SCPHistoryEntry scpInfo<>;
//   };
//
// ===========================================================================
xdr.struct("LedgerCloseMetaV0", [
  ["ledgerHeader", xdr.lookup("LedgerHeaderHistoryEntry")],
  ["txSet", xdr.lookup("TransactionSet")],
  ["txProcessing", xdr.varArray(xdr.lookup("TransactionResultMeta"), 2147483647)],
  ["upgradesProcessing", xdr.varArray(xdr.lookup("UpgradeEntryMeta"), 2147483647)],
  ["scpInfo", xdr.varArray(xdr.lookup("ScpHistoryEntry"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct LedgerCloseMetaV1
//   {
//       LedgerHeaderHistoryEntry ledgerHeader;
//   
//       GeneralizedTransactionSet txSet;
//   
//       // NB: transactions are sorted in apply order here
//       // fees for all transactions are processed first
//       // followed by applying transactions
//       TransactionResultMeta txProcessing<>;
//   
//       // upgrades are applied last
//       UpgradeEntryMeta upgradesProcessing<>;
//   
//       // other misc information attached to the ledger close
//       SCPHistoryEntry scpInfo<>;
//   };
//
// ===========================================================================
xdr.struct("LedgerCloseMetaV1", [
  ["ledgerHeader", xdr.lookup("LedgerHeaderHistoryEntry")],
  ["txSet", xdr.lookup("GeneralizedTransactionSet")],
  ["txProcessing", xdr.varArray(xdr.lookup("TransactionResultMeta"), 2147483647)],
  ["upgradesProcessing", xdr.varArray(xdr.lookup("UpgradeEntryMeta"), 2147483647)],
  ["scpInfo", xdr.varArray(xdr.lookup("ScpHistoryEntry"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct LedgerCloseMetaV2
//   {
//       LedgerHeaderHistoryEntry ledgerHeader;
//       
//       GeneralizedTransactionSet txSet;
//   
//       // NB: transactions are sorted in apply order here
//       // fees for all transactions are processed first
//       // followed by applying transactions
//       TransactionResultMetaV2 txProcessing<>;
//   
//       // upgrades are applied last
//       UpgradeEntryMeta upgradesProcessing<>;
//   
//       // other misc information attached to the ledger close
//       SCPHistoryEntry scpInfo<>;
//   };
//
// ===========================================================================
xdr.struct("LedgerCloseMetaV2", [
  ["ledgerHeader", xdr.lookup("LedgerHeaderHistoryEntry")],
  ["txSet", xdr.lookup("GeneralizedTransactionSet")],
  ["txProcessing", xdr.varArray(xdr.lookup("TransactionResultMetaV2"), 2147483647)],
  ["upgradesProcessing", xdr.varArray(xdr.lookup("UpgradeEntryMeta"), 2147483647)],
  ["scpInfo", xdr.varArray(xdr.lookup("ScpHistoryEntry"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union LedgerCloseMeta switch (int v)
//   {
//   case 0:
//       LedgerCloseMetaV0 v0;
//   case 1:
//       LedgerCloseMetaV1 v1;
//   case 2:
//       LedgerCloseMetaV2 v2;
//   };
//
// ===========================================================================
xdr.union("LedgerCloseMeta", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, "v0"],
    [1, "v1"],
    [2, "v2"],
  ],
  arms: {
    v0: xdr.lookup("LedgerCloseMetaV0"),
    v1: xdr.lookup("LedgerCloseMetaV1"),
    v2: xdr.lookup("LedgerCloseMetaV2"),
  },
});

// === xdr source ============================================================
//
//   enum ErrorCode
//   {
//       ERR_MISC = 0, // Unspecific error
//       ERR_DATA = 1, // Malformed data
//       ERR_CONF = 2, // Misconfiguration error
//       ERR_AUTH = 3, // Authentication failure
//       ERR_LOAD = 4  // System overloaded
//   };
//
// ===========================================================================
xdr.enum("ErrorCode", {
  errMisc: 0,
  errData: 1,
  errConf: 2,
  errAuth: 3,
  errLoad: 4,
});

// === xdr source ============================================================
//
//   struct Error
//   {
//       ErrorCode code;
//       string msg<100>;
//   };
//
// ===========================================================================
xdr.struct("Error", [
  ["code", xdr.lookup("ErrorCode")],
  ["msg", xdr.string(100)],
]);

// === xdr source ============================================================
//
//   struct SendMore
//   {
//       uint32 numMessages;
//   };
//
// ===========================================================================
xdr.struct("SendMore", [
  ["numMessages", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct AuthCert
//   {
//       Curve25519Public pubkey;
//       uint64 expiration;
//       Signature sig;
//   };
//
// ===========================================================================
xdr.struct("AuthCert", [
  ["pubkey", xdr.lookup("Curve25519Public")],
  ["expiration", xdr.lookup("Uint64")],
  ["sig", xdr.lookup("Signature")],
]);

// === xdr source ============================================================
//
//   struct Hello
//   {
//       uint32 ledgerVersion;
//       uint32 overlayVersion;
//       uint32 overlayMinVersion;
//       Hash networkID;
//       string versionStr<100>;
//       int listeningPort;
//       NodeID peerID;
//       AuthCert cert;
//       uint256 nonce;
//   };
//
// ===========================================================================
xdr.struct("Hello", [
  ["ledgerVersion", xdr.lookup("Uint32")],
  ["overlayVersion", xdr.lookup("Uint32")],
  ["overlayMinVersion", xdr.lookup("Uint32")],
  ["networkId", xdr.lookup("Hash")],
  ["versionStr", xdr.string(100)],
  ["listeningPort", xdr.int()],
  ["peerId", xdr.lookup("NodeId")],
  ["cert", xdr.lookup("AuthCert")],
  ["nonce", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   const AUTH_MSG_FLAG_PULL_MODE_REQUESTED = 100;
//
// ===========================================================================
xdr.const("AUTH_MSG_FLAG_PULL_MODE_REQUESTED", 100);

// === xdr source ============================================================
//
//   struct Auth
//   {
//       int flags;
//   };
//
// ===========================================================================
xdr.struct("Auth", [
  ["flags", xdr.int()],
]);

// === xdr source ============================================================
//
//   enum IPAddrType
//   {
//       IPv4 = 0,
//       IPv6 = 1
//   };
//
// ===========================================================================
xdr.enum("IpAddrType", {
  iPv4: 0,
  iPv6: 1,
});

// === xdr source ============================================================
//
//   union switch (IPAddrType type)
//       {
//       case IPv4:
//           opaque ipv4[4];
//       case IPv6:
//           opaque ipv6[16];
//       }
//
// ===========================================================================
xdr.union("PeerAddressIp", {
  switchOn: xdr.lookup("IpAddrType"),
  switchName: "type",
  switches: [
    ["iPv4", "ipv4"],
    ["iPv6", "ipv6"],
  ],
  arms: {
    ipv4: xdr.opaque(4),
    ipv6: xdr.opaque(16),
  },
});

// === xdr source ============================================================
//
//   struct PeerAddress
//   {
//       union switch (IPAddrType type)
//       {
//       case IPv4:
//           opaque ipv4[4];
//       case IPv6:
//           opaque ipv6[16];
//       }
//       ip;
//       uint32 port;
//       uint32 numFailures;
//   };
//
// ===========================================================================
xdr.struct("PeerAddress", [
  ["ip", xdr.lookup("PeerAddressIp")],
  ["port", xdr.lookup("Uint32")],
  ["numFailures", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   enum MessageType
//   {
//       ERROR_MSG = 0,
//       AUTH = 2,
//       DONT_HAVE = 3,
//   
//       GET_PEERS = 4, // gets a list of peers this guy knows about
//       PEERS = 5,
//   
//       GET_TX_SET = 6, // gets a particular txset by hash
//       TX_SET = 7,
//       GENERALIZED_TX_SET = 17,
//   
//       TRANSACTION = 8, // pass on a tx you have heard about
//   
//       // SCP
//       GET_SCP_QUORUMSET = 9,
//       SCP_QUORUMSET = 10,
//       SCP_MESSAGE = 11,
//       GET_SCP_STATE = 12,
//   
//       // new messages
//       HELLO = 13,
//   
//       SURVEY_REQUEST = 14,
//       SURVEY_RESPONSE = 15,
//   
//       SEND_MORE = 16,
//       FLOOD_ADVERT = 18,
//       FLOOD_DEMAND = 19
//   };
//
// ===========================================================================
xdr.enum("MessageType", {
  errorMsg: 0,
  auth: 2,
  dontHave: 3,
  getPeers: 4,
  peers: 5,
  getTxSet: 6,
  txSet: 7,
  generalizedTxSet: 17,
  transaction: 8,
  getScpQuorumset: 9,
  scpQuorumset: 10,
  scpMessage: 11,
  getScpState: 12,
  hello: 13,
  surveyRequest: 14,
  surveyResponse: 15,
  sendMore: 16,
  floodAdvert: 18,
  floodDemand: 19,
});

// === xdr source ============================================================
//
//   struct DontHave
//   {
//       MessageType type;
//       uint256 reqHash;
//   };
//
// ===========================================================================
xdr.struct("DontHave", [
  ["type", xdr.lookup("MessageType")],
  ["reqHash", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   enum SurveyMessageCommandType
//   {
//       SURVEY_TOPOLOGY = 0
//   };
//
// ===========================================================================
xdr.enum("SurveyMessageCommandType", {
  surveyTopology: 0,
});

// === xdr source ============================================================
//
//   enum SurveyMessageResponseType
//   {
//       SURVEY_TOPOLOGY_RESPONSE_V0 = 0,
//       SURVEY_TOPOLOGY_RESPONSE_V1 = 1
//   };
//
// ===========================================================================
xdr.enum("SurveyMessageResponseType", {
  surveyTopologyResponseV0: 0,
  surveyTopologyResponseV1: 1,
});

// === xdr source ============================================================
//
//   struct SurveyRequestMessage
//   {
//       NodeID surveyorPeerID;
//       NodeID surveyedPeerID;
//       uint32 ledgerNum;
//       Curve25519Public encryptionKey;
//       SurveyMessageCommandType commandType;
//   };
//
// ===========================================================================
xdr.struct("SurveyRequestMessage", [
  ["surveyorPeerId", xdr.lookup("NodeId")],
  ["surveyedPeerId", xdr.lookup("NodeId")],
  ["ledgerNum", xdr.lookup("Uint32")],
  ["encryptionKey", xdr.lookup("Curve25519Public")],
  ["commandType", xdr.lookup("SurveyMessageCommandType")],
]);

// === xdr source ============================================================
//
//   struct SignedSurveyRequestMessage
//   {
//       Signature requestSignature;
//       SurveyRequestMessage request;
//   };
//
// ===========================================================================
xdr.struct("SignedSurveyRequestMessage", [
  ["requestSignature", xdr.lookup("Signature")],
  ["request", xdr.lookup("SurveyRequestMessage")],
]);

// === xdr source ============================================================
//
//   typedef opaque EncryptedBody<64000>;
//
// ===========================================================================
xdr.typedef("EncryptedBody", xdr.varOpaque(64000));

// === xdr source ============================================================
//
//   struct SurveyResponseMessage
//   {
//       NodeID surveyorPeerID;
//       NodeID surveyedPeerID;
//       uint32 ledgerNum;
//       SurveyMessageCommandType commandType;
//       EncryptedBody encryptedBody;
//   };
//
// ===========================================================================
xdr.struct("SurveyResponseMessage", [
  ["surveyorPeerId", xdr.lookup("NodeId")],
  ["surveyedPeerId", xdr.lookup("NodeId")],
  ["ledgerNum", xdr.lookup("Uint32")],
  ["commandType", xdr.lookup("SurveyMessageCommandType")],
  ["encryptedBody", xdr.lookup("EncryptedBody")],
]);

// === xdr source ============================================================
//
//   struct SignedSurveyResponseMessage
//   {
//       Signature responseSignature;
//       SurveyResponseMessage response;
//   };
//
// ===========================================================================
xdr.struct("SignedSurveyResponseMessage", [
  ["responseSignature", xdr.lookup("Signature")],
  ["response", xdr.lookup("SurveyResponseMessage")],
]);

// === xdr source ============================================================
//
//   struct PeerStats
//   {
//       NodeID id;
//       string versionStr<100>;
//       uint64 messagesRead;
//       uint64 messagesWritten;
//       uint64 bytesRead;
//       uint64 bytesWritten;
//       uint64 secondsConnected;
//   
//       uint64 uniqueFloodBytesRecv;
//       uint64 duplicateFloodBytesRecv;
//       uint64 uniqueFetchBytesRecv;
//       uint64 duplicateFetchBytesRecv;
//   
//       uint64 uniqueFloodMessageRecv;
//       uint64 duplicateFloodMessageRecv;
//       uint64 uniqueFetchMessageRecv;
//       uint64 duplicateFetchMessageRecv;
//   };
//
// ===========================================================================
xdr.struct("PeerStats", [
  ["id", xdr.lookup("NodeId")],
  ["versionStr", xdr.string(100)],
  ["messagesRead", xdr.lookup("Uint64")],
  ["messagesWritten", xdr.lookup("Uint64")],
  ["bytesRead", xdr.lookup("Uint64")],
  ["bytesWritten", xdr.lookup("Uint64")],
  ["secondsConnected", xdr.lookup("Uint64")],
  ["uniqueFloodBytesRecv", xdr.lookup("Uint64")],
  ["duplicateFloodBytesRecv", xdr.lookup("Uint64")],
  ["uniqueFetchBytesRecv", xdr.lookup("Uint64")],
  ["duplicateFetchBytesRecv", xdr.lookup("Uint64")],
  ["uniqueFloodMessageRecv", xdr.lookup("Uint64")],
  ["duplicateFloodMessageRecv", xdr.lookup("Uint64")],
  ["uniqueFetchMessageRecv", xdr.lookup("Uint64")],
  ["duplicateFetchMessageRecv", xdr.lookup("Uint64")],
]);

// === xdr source ============================================================
//
//   typedef PeerStats PeerStatList<25>;
//
// ===========================================================================
xdr.typedef("PeerStatList", xdr.varArray(xdr.lookup("PeerStats"), 25));

// === xdr source ============================================================
//
//   struct TopologyResponseBodyV0
//   {
//       PeerStatList inboundPeers;
//       PeerStatList outboundPeers;
//   
//       uint32 totalInboundPeerCount;
//       uint32 totalOutboundPeerCount;
//   };
//
// ===========================================================================
xdr.struct("TopologyResponseBodyV0", [
  ["inboundPeers", xdr.lookup("PeerStatList")],
  ["outboundPeers", xdr.lookup("PeerStatList")],
  ["totalInboundPeerCount", xdr.lookup("Uint32")],
  ["totalOutboundPeerCount", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct TopologyResponseBodyV1
//   {
//       PeerStatList inboundPeers;
//       PeerStatList outboundPeers;
//   
//       uint32 totalInboundPeerCount;
//       uint32 totalOutboundPeerCount;
//   
//       uint32 maxInboundPeerCount;
//       uint32 maxOutboundPeerCount;
//   };
//
// ===========================================================================
xdr.struct("TopologyResponseBodyV1", [
  ["inboundPeers", xdr.lookup("PeerStatList")],
  ["outboundPeers", xdr.lookup("PeerStatList")],
  ["totalInboundPeerCount", xdr.lookup("Uint32")],
  ["totalOutboundPeerCount", xdr.lookup("Uint32")],
  ["maxInboundPeerCount", xdr.lookup("Uint32")],
  ["maxOutboundPeerCount", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   union SurveyResponseBody switch (SurveyMessageResponseType type)
//   {
//   case SURVEY_TOPOLOGY_RESPONSE_V0:
//       TopologyResponseBodyV0 topologyResponseBodyV0;
//   case SURVEY_TOPOLOGY_RESPONSE_V1:
//       TopologyResponseBodyV1 topologyResponseBodyV1;
//   };
//
// ===========================================================================
xdr.union("SurveyResponseBody", {
  switchOn: xdr.lookup("SurveyMessageResponseType"),
  switchName: "type",
  switches: [
    ["surveyTopologyResponseV0", "topologyResponseBodyV0"],
    ["surveyTopologyResponseV1", "topologyResponseBodyV1"],
  ],
  arms: {
    topologyResponseBodyV0: xdr.lookup("TopologyResponseBodyV0"),
    topologyResponseBodyV1: xdr.lookup("TopologyResponseBodyV1"),
  },
});

// === xdr source ============================================================
//
//   const TX_ADVERT_VECTOR_MAX_SIZE = 1000;
//
// ===========================================================================
xdr.const("TX_ADVERT_VECTOR_MAX_SIZE", 1000);

// === xdr source ============================================================
//
//   typedef Hash TxAdvertVector<TX_ADVERT_VECTOR_MAX_SIZE>;
//
// ===========================================================================
xdr.typedef("TxAdvertVector", xdr.varArray(xdr.lookup("Hash"), xdr.lookup("TX_ADVERT_VECTOR_MAX_SIZE")));

// === xdr source ============================================================
//
//   struct FloodAdvert
//   {
//       TxAdvertVector txHashes;
//   };
//
// ===========================================================================
xdr.struct("FloodAdvert", [
  ["txHashes", xdr.lookup("TxAdvertVector")],
]);

// === xdr source ============================================================
//
//   const TX_DEMAND_VECTOR_MAX_SIZE = 1000;
//
// ===========================================================================
xdr.const("TX_DEMAND_VECTOR_MAX_SIZE", 1000);

// === xdr source ============================================================
//
//   typedef Hash TxDemandVector<TX_DEMAND_VECTOR_MAX_SIZE>;
//
// ===========================================================================
xdr.typedef("TxDemandVector", xdr.varArray(xdr.lookup("Hash"), xdr.lookup("TX_DEMAND_VECTOR_MAX_SIZE")));

// === xdr source ============================================================
//
//   struct FloodDemand
//   {
//       TxDemandVector txHashes;
//   };
//
// ===========================================================================
xdr.struct("FloodDemand", [
  ["txHashes", xdr.lookup("TxDemandVector")],
]);

// === xdr source ============================================================
//
//   union StellarMessage switch (MessageType type)
//   {
//   case ERROR_MSG:
//       Error error;
//   case HELLO:
//       Hello hello;
//   case AUTH:
//       Auth auth;
//   case DONT_HAVE:
//       DontHave dontHave;
//   case GET_PEERS:
//       void;
//   case PEERS:
//       PeerAddress peers<100>;
//   
//   case GET_TX_SET:
//       uint256 txSetHash;
//   case TX_SET:
//       TransactionSet txSet;
//   case GENERALIZED_TX_SET:
//       GeneralizedTransactionSet generalizedTxSet;
//   
//   case TRANSACTION:
//       TransactionEnvelope transaction;
//   
//   case SURVEY_REQUEST:
//       SignedSurveyRequestMessage signedSurveyRequestMessage;
//   
//   case SURVEY_RESPONSE:
//       SignedSurveyResponseMessage signedSurveyResponseMessage;
//   
//   // SCP
//   case GET_SCP_QUORUMSET:
//       uint256 qSetHash;
//   case SCP_QUORUMSET:
//       SCPQuorumSet qSet;
//   case SCP_MESSAGE:
//       SCPEnvelope envelope;
//   case GET_SCP_STATE:
//       uint32 getSCPLedgerSeq; // ledger seq requested ; if 0, requests the latest
//   case SEND_MORE:
//       SendMore sendMoreMessage;
//   
//   // Pull mode
//   case FLOOD_ADVERT:
//        FloodAdvert floodAdvert;
//   case FLOOD_DEMAND:
//        FloodDemand floodDemand;
//   };
//
// ===========================================================================
xdr.union("StellarMessage", {
  switchOn: xdr.lookup("MessageType"),
  switchName: "type",
  switches: [
    ["errorMsg", "error"],
    ["hello", "hello"],
    ["auth", "auth"],
    ["dontHave", "dontHave"],
    ["getPeers", xdr.void()],
    ["peers", "peers"],
    ["getTxSet", "txSetHash"],
    ["txSet", "txSet"],
    ["generalizedTxSet", "generalizedTxSet"],
    ["transaction", "transaction"],
    ["surveyRequest", "signedSurveyRequestMessage"],
    ["surveyResponse", "signedSurveyResponseMessage"],
    ["getScpQuorumset", "qSetHash"],
    ["scpQuorumset", "qSet"],
    ["scpMessage", "envelope"],
    ["getScpState", "getScpLedgerSeq"],
    ["sendMore", "sendMoreMessage"],
    ["floodAdvert", "floodAdvert"],
    ["floodDemand", "floodDemand"],
  ],
  arms: {
    error: xdr.lookup("Error"),
    hello: xdr.lookup("Hello"),
    auth: xdr.lookup("Auth"),
    dontHave: xdr.lookup("DontHave"),
    peers: xdr.varArray(xdr.lookup("PeerAddress"), 100),
    txSetHash: xdr.lookup("Uint256"),
    txSet: xdr.lookup("TransactionSet"),
    generalizedTxSet: xdr.lookup("GeneralizedTransactionSet"),
    transaction: xdr.lookup("TransactionEnvelope"),
    signedSurveyRequestMessage: xdr.lookup("SignedSurveyRequestMessage"),
    signedSurveyResponseMessage: xdr.lookup("SignedSurveyResponseMessage"),
    qSetHash: xdr.lookup("Uint256"),
    qSet: xdr.lookup("ScpQuorumSet"),
    envelope: xdr.lookup("ScpEnvelope"),
    getScpLedgerSeq: xdr.lookup("Uint32"),
    sendMoreMessage: xdr.lookup("SendMore"),
    floodAdvert: xdr.lookup("FloodAdvert"),
    floodDemand: xdr.lookup("FloodDemand"),
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 sequence;
//           StellarMessage message;
//           HmacSha256Mac mac;
//       }
//
// ===========================================================================
xdr.struct("AuthenticatedMessageV0", [
  ["sequence", xdr.lookup("Uint64")],
  ["message", xdr.lookup("StellarMessage")],
  ["mac", xdr.lookup("HmacSha256Mac")],
]);

// === xdr source ============================================================
//
//   union AuthenticatedMessage switch (uint32 v)
//   {
//   case 0:
//       struct
//       {
//           uint64 sequence;
//           StellarMessage message;
//           HmacSha256Mac mac;
//       } v0;
//   };
//
// ===========================================================================
xdr.union("AuthenticatedMessage", {
  switchOn: xdr.lookup("Uint32"),
  switchName: "v",
  switches: [
    [0, "v0"],
  ],
  arms: {
    v0: xdr.lookup("AuthenticatedMessageV0"),
  },
});

// === xdr source ============================================================
//
//   union LiquidityPoolParameters switch (LiquidityPoolType type)
//   {
//   case LIQUIDITY_POOL_CONSTANT_PRODUCT:
//       LiquidityPoolConstantProductParameters constantProduct;
//   };
//
// ===========================================================================
xdr.union("LiquidityPoolParameters", {
  switchOn: xdr.lookup("LiquidityPoolType"),
  switchName: "type",
  switches: [
    ["liquidityPoolConstantProduct", "constantProduct"],
  ],
  arms: {
    constantProduct: xdr.lookup("LiquidityPoolConstantProductParameters"),
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//           uint64 id;
//           uint256 ed25519;
//       }
//
// ===========================================================================
xdr.struct("MuxedAccountMed25519", [
  ["id", xdr.lookup("Uint64")],
  ["ed25519", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   union MuxedAccount switch (CryptoKeyType type)
//   {
//   case KEY_TYPE_ED25519:
//       uint256 ed25519;
//   case KEY_TYPE_MUXED_ED25519:
//       struct
//       {
//           uint64 id;
//           uint256 ed25519;
//       } med25519;
//   };
//
// ===========================================================================
xdr.union("MuxedAccount", {
  switchOn: xdr.lookup("CryptoKeyType"),
  switchName: "type",
  switches: [
    ["keyTypeEd25519", "ed25519"],
    ["keyTypeMuxedEd25519", "med25519"],
  ],
  arms: {
    ed25519: xdr.lookup("Uint256"),
    med25519: xdr.lookup("MuxedAccountMed25519"),
  },
});

// === xdr source ============================================================
//
//   struct DecoratedSignature
//   {
//       SignatureHint hint;  // last 4 bytes of the public key, used as a hint
//       Signature signature; // actual signature
//   };
//
// ===========================================================================
xdr.struct("DecoratedSignature", [
  ["hint", xdr.lookup("SignatureHint")],
  ["signature", xdr.lookup("Signature")],
]);

// === xdr source ============================================================
//
//   struct LedgerFootprint
//   {
//       LedgerKey readOnly<>;
//       LedgerKey readWrite<>;
//   };
//
// ===========================================================================
xdr.struct("LedgerFootprint", [
  ["readOnly", xdr.varArray(xdr.lookup("LedgerKey"), 2147483647)],
  ["readWrite", xdr.varArray(xdr.lookup("LedgerKey"), 2147483647)],
]);

// === xdr source ============================================================
//
//   enum OperationType
//   {
//       CREATE_ACCOUNT = 0,
//       PAYMENT = 1,
//       PATH_PAYMENT_STRICT_RECEIVE = 2,
//       MANAGE_SELL_OFFER = 3,
//       CREATE_PASSIVE_SELL_OFFER = 4,
//       SET_OPTIONS = 5,
//       CHANGE_TRUST = 6,
//       ALLOW_TRUST = 7,
//       ACCOUNT_MERGE = 8,
//       INFLATION = 9,
//       MANAGE_DATA = 10,
//       BUMP_SEQUENCE = 11,
//       MANAGE_BUY_OFFER = 12,
//       PATH_PAYMENT_STRICT_SEND = 13,
//       CREATE_CLAIMABLE_BALANCE = 14,
//       CLAIM_CLAIMABLE_BALANCE = 15,
//       BEGIN_SPONSORING_FUTURE_RESERVES = 16,
//       END_SPONSORING_FUTURE_RESERVES = 17,
//       REVOKE_SPONSORSHIP = 18,
//       CLAWBACK = 19,
//       CLAWBACK_CLAIMABLE_BALANCE = 20,
//       SET_TRUST_LINE_FLAGS = 21,
//       LIQUIDITY_POOL_DEPOSIT = 22,
//       LIQUIDITY_POOL_WITHDRAW = 23,
//       INVOKE_HOST_FUNCTION = 24
//   };
//
// ===========================================================================
xdr.enum("OperationType", {
  createAccount: 0,
  payment: 1,
  pathPaymentStrictReceive: 2,
  manageSellOffer: 3,
  createPassiveSellOffer: 4,
  setOptions: 5,
  changeTrust: 6,
  allowTrust: 7,
  accountMerge: 8,
  inflation: 9,
  manageData: 10,
  bumpSequence: 11,
  manageBuyOffer: 12,
  pathPaymentStrictSend: 13,
  createClaimableBalance: 14,
  claimClaimableBalance: 15,
  beginSponsoringFutureReserves: 16,
  endSponsoringFutureReserves: 17,
  revokeSponsorship: 18,
  clawback: 19,
  clawbackClaimableBalance: 20,
  setTrustLineFlags: 21,
  liquidityPoolDeposit: 22,
  liquidityPoolWithdraw: 23,
  invokeHostFunction: 24,
});

// === xdr source ============================================================
//
//   struct CreateAccountOp
//   {
//       AccountID destination; // account to create
//       int64 startingBalance; // amount they end up with
//   };
//
// ===========================================================================
xdr.struct("CreateAccountOp", [
  ["destination", xdr.lookup("AccountId")],
  ["startingBalance", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct PaymentOp
//   {
//       MuxedAccount destination; // recipient of the payment
//       Asset asset;              // what they end up with
//       int64 amount;             // amount they end up with
//   };
//
// ===========================================================================
xdr.struct("PaymentOp", [
  ["destination", xdr.lookup("MuxedAccount")],
  ["asset", xdr.lookup("Asset")],
  ["amount", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct PathPaymentStrictReceiveOp
//   {
//       Asset sendAsset; // asset we pay with
//       int64 sendMax;   // the maximum amount of sendAsset to
//                        // send (excluding fees).
//                        // The operation will fail if can't be met
//   
//       MuxedAccount destination; // recipient of the payment
//       Asset destAsset;          // what they end up with
//       int64 destAmount;         // amount they end up with
//   
//       Asset path<5>; // additional hops it must go through to get there
//   };
//
// ===========================================================================
xdr.struct("PathPaymentStrictReceiveOp", [
  ["sendAsset", xdr.lookup("Asset")],
  ["sendMax", xdr.lookup("Int64")],
  ["destination", xdr.lookup("MuxedAccount")],
  ["destAsset", xdr.lookup("Asset")],
  ["destAmount", xdr.lookup("Int64")],
  ["path", xdr.varArray(xdr.lookup("Asset"), 5)],
]);

// === xdr source ============================================================
//
//   struct PathPaymentStrictSendOp
//   {
//       Asset sendAsset;  // asset we pay with
//       int64 sendAmount; // amount of sendAsset to send (excluding fees)
//   
//       MuxedAccount destination; // recipient of the payment
//       Asset destAsset;          // what they end up with
//       int64 destMin;            // the minimum amount of dest asset to
//                                 // be received
//                                 // The operation will fail if it can't be met
//   
//       Asset path<5>; // additional hops it must go through to get there
//   };
//
// ===========================================================================
xdr.struct("PathPaymentStrictSendOp", [
  ["sendAsset", xdr.lookup("Asset")],
  ["sendAmount", xdr.lookup("Int64")],
  ["destination", xdr.lookup("MuxedAccount")],
  ["destAsset", xdr.lookup("Asset")],
  ["destMin", xdr.lookup("Int64")],
  ["path", xdr.varArray(xdr.lookup("Asset"), 5)],
]);

// === xdr source ============================================================
//
//   struct ManageSellOfferOp
//   {
//       Asset selling;
//       Asset buying;
//       int64 amount; // amount being sold. if set to 0, delete the offer
//       Price price;  // price of thing being sold in terms of what you are buying
//   
//       // 0=create a new offer, otherwise edit an existing offer
//       int64 offerID;
//   };
//
// ===========================================================================
xdr.struct("ManageSellOfferOp", [
  ["selling", xdr.lookup("Asset")],
  ["buying", xdr.lookup("Asset")],
  ["amount", xdr.lookup("Int64")],
  ["price", xdr.lookup("Price")],
  ["offerId", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct ManageBuyOfferOp
//   {
//       Asset selling;
//       Asset buying;
//       int64 buyAmount; // amount being bought. if set to 0, delete the offer
//       Price price;     // price of thing being bought in terms of what you are
//                        // selling
//   
//       // 0=create a new offer, otherwise edit an existing offer
//       int64 offerID;
//   };
//
// ===========================================================================
xdr.struct("ManageBuyOfferOp", [
  ["selling", xdr.lookup("Asset")],
  ["buying", xdr.lookup("Asset")],
  ["buyAmount", xdr.lookup("Int64")],
  ["price", xdr.lookup("Price")],
  ["offerId", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct CreatePassiveSellOfferOp
//   {
//       Asset selling; // A
//       Asset buying;  // B
//       int64 amount;  // amount taker gets
//       Price price;   // cost of A in terms of B
//   };
//
// ===========================================================================
xdr.struct("CreatePassiveSellOfferOp", [
  ["selling", xdr.lookup("Asset")],
  ["buying", xdr.lookup("Asset")],
  ["amount", xdr.lookup("Int64")],
  ["price", xdr.lookup("Price")],
]);

// === xdr source ============================================================
//
//   struct SetOptionsOp
//   {
//       AccountID* inflationDest; // sets the inflation destination
//   
//       uint32* clearFlags; // which flags to clear
//       uint32* setFlags;   // which flags to set
//   
//       // account threshold manipulation
//       uint32* masterWeight; // weight of the master account
//       uint32* lowThreshold;
//       uint32* medThreshold;
//       uint32* highThreshold;
//   
//       string32* homeDomain; // sets the home domain
//   
//       // Add, update or remove a signer for the account
//       // signer is deleted if the weight is 0
//       Signer* signer;
//   };
//
// ===========================================================================
xdr.struct("SetOptionsOp", [
  ["inflationDest", xdr.option(xdr.lookup("AccountId"))],
  ["clearFlags", xdr.option(xdr.lookup("Uint32"))],
  ["setFlags", xdr.option(xdr.lookup("Uint32"))],
  ["masterWeight", xdr.option(xdr.lookup("Uint32"))],
  ["lowThreshold", xdr.option(xdr.lookup("Uint32"))],
  ["medThreshold", xdr.option(xdr.lookup("Uint32"))],
  ["highThreshold", xdr.option(xdr.lookup("Uint32"))],
  ["homeDomain", xdr.option(xdr.lookup("String32"))],
  ["signer", xdr.option(xdr.lookup("Signer"))],
]);

// === xdr source ============================================================
//
//   union ChangeTrustAsset switch (AssetType type)
//   {
//   case ASSET_TYPE_NATIVE: // Not credit
//       void;
//   
//   case ASSET_TYPE_CREDIT_ALPHANUM4:
//       AlphaNum4 alphaNum4;
//   
//   case ASSET_TYPE_CREDIT_ALPHANUM12:
//       AlphaNum12 alphaNum12;
//   
//   case ASSET_TYPE_POOL_SHARE:
//       LiquidityPoolParameters liquidityPool;
//   
//       // add other asset types here in the future
//   };
//
// ===========================================================================
xdr.union("ChangeTrustAsset", {
  switchOn: xdr.lookup("AssetType"),
  switchName: "type",
  switches: [
    ["assetTypeNative", xdr.void()],
    ["assetTypeCreditAlphanum4", "alphaNum4"],
    ["assetTypeCreditAlphanum12", "alphaNum12"],
    ["assetTypePoolShare", "liquidityPool"],
  ],
  arms: {
    alphaNum4: xdr.lookup("AlphaNum4"),
    alphaNum12: xdr.lookup("AlphaNum12"),
    liquidityPool: xdr.lookup("LiquidityPoolParameters"),
  },
});

// === xdr source ============================================================
//
//   struct ChangeTrustOp
//   {
//       ChangeTrustAsset line;
//   
//       // if limit is set to 0, deletes the trust line
//       int64 limit;
//   };
//
// ===========================================================================
xdr.struct("ChangeTrustOp", [
  ["line", xdr.lookup("ChangeTrustAsset")],
  ["limit", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct AllowTrustOp
//   {
//       AccountID trustor;
//       AssetCode asset;
//   
//       // One of 0, AUTHORIZED_FLAG, or AUTHORIZED_TO_MAINTAIN_LIABILITIES_FLAG
//       uint32 authorize;
//   };
//
// ===========================================================================
xdr.struct("AllowTrustOp", [
  ["trustor", xdr.lookup("AccountId")],
  ["asset", xdr.lookup("AssetCode")],
  ["authorize", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct ManageDataOp
//   {
//       string64 dataName;
//       DataValue* dataValue; // set to null to clear
//   };
//
// ===========================================================================
xdr.struct("ManageDataOp", [
  ["dataName", xdr.lookup("String64")],
  ["dataValue", xdr.option(xdr.lookup("DataValue"))],
]);

// === xdr source ============================================================
//
//   struct BumpSequenceOp
//   {
//       SequenceNumber bumpTo;
//   };
//
// ===========================================================================
xdr.struct("BumpSequenceOp", [
  ["bumpTo", xdr.lookup("SequenceNumber")],
]);

// === xdr source ============================================================
//
//   struct CreateClaimableBalanceOp
//   {
//       Asset asset;
//       int64 amount;
//       Claimant claimants<10>;
//   };
//
// ===========================================================================
xdr.struct("CreateClaimableBalanceOp", [
  ["asset", xdr.lookup("Asset")],
  ["amount", xdr.lookup("Int64")],
  ["claimants", xdr.varArray(xdr.lookup("Claimant"), 10)],
]);

// === xdr source ============================================================
//
//   struct ClaimClaimableBalanceOp
//   {
//       ClaimableBalanceID balanceID;
//   };
//
// ===========================================================================
xdr.struct("ClaimClaimableBalanceOp", [
  ["balanceId", xdr.lookup("ClaimableBalanceId")],
]);

// === xdr source ============================================================
//
//   struct BeginSponsoringFutureReservesOp
//   {
//       AccountID sponsoredID;
//   };
//
// ===========================================================================
xdr.struct("BeginSponsoringFutureReservesOp", [
  ["sponsoredId", xdr.lookup("AccountId")],
]);

// === xdr source ============================================================
//
//   enum RevokeSponsorshipType
//   {
//       REVOKE_SPONSORSHIP_LEDGER_ENTRY = 0,
//       REVOKE_SPONSORSHIP_SIGNER = 1
//   };
//
// ===========================================================================
xdr.enum("RevokeSponsorshipType", {
  revokeSponsorshipLedgerEntry: 0,
  revokeSponsorshipSigner: 1,
});

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID accountID;
//           SignerKey signerKey;
//       }
//
// ===========================================================================
xdr.struct("RevokeSponsorshipOpSigner", [
  ["accountId", xdr.lookup("AccountId")],
  ["signerKey", xdr.lookup("SignerKey")],
]);

// === xdr source ============================================================
//
//   union RevokeSponsorshipOp switch (RevokeSponsorshipType type)
//   {
//   case REVOKE_SPONSORSHIP_LEDGER_ENTRY:
//       LedgerKey ledgerKey;
//   case REVOKE_SPONSORSHIP_SIGNER:
//       struct
//       {
//           AccountID accountID;
//           SignerKey signerKey;
//       } signer;
//   };
//
// ===========================================================================
xdr.union("RevokeSponsorshipOp", {
  switchOn: xdr.lookup("RevokeSponsorshipType"),
  switchName: "type",
  switches: [
    ["revokeSponsorshipLedgerEntry", "ledgerKey"],
    ["revokeSponsorshipSigner", "signer"],
  ],
  arms: {
    ledgerKey: xdr.lookup("LedgerKey"),
    signer: xdr.lookup("RevokeSponsorshipOpSigner"),
  },
});

// === xdr source ============================================================
//
//   struct ClawbackOp
//   {
//       Asset asset;
//       MuxedAccount from;
//       int64 amount;
//   };
//
// ===========================================================================
xdr.struct("ClawbackOp", [
  ["asset", xdr.lookup("Asset")],
  ["from", xdr.lookup("MuxedAccount")],
  ["amount", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct ClawbackClaimableBalanceOp
//   {
//       ClaimableBalanceID balanceID;
//   };
//
// ===========================================================================
xdr.struct("ClawbackClaimableBalanceOp", [
  ["balanceId", xdr.lookup("ClaimableBalanceId")],
]);

// === xdr source ============================================================
//
//   struct SetTrustLineFlagsOp
//   {
//       AccountID trustor;
//       Asset asset;
//   
//       uint32 clearFlags; // which flags to clear
//       uint32 setFlags;   // which flags to set
//   };
//
// ===========================================================================
xdr.struct("SetTrustLineFlagsOp", [
  ["trustor", xdr.lookup("AccountId")],
  ["asset", xdr.lookup("Asset")],
  ["clearFlags", xdr.lookup("Uint32")],
  ["setFlags", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   const LIQUIDITY_POOL_FEE_V18 = 30;
//
// ===========================================================================
xdr.const("LIQUIDITY_POOL_FEE_V18", 30);

// === xdr source ============================================================
//
//   struct LiquidityPoolDepositOp
//   {
//       PoolID liquidityPoolID;
//       int64 maxAmountA; // maximum amount of first asset to deposit
//       int64 maxAmountB; // maximum amount of second asset to deposit
//       Price minPrice;   // minimum depositA/depositB
//       Price maxPrice;   // maximum depositA/depositB
//   };
//
// ===========================================================================
xdr.struct("LiquidityPoolDepositOp", [
  ["liquidityPoolId", xdr.lookup("PoolId")],
  ["maxAmountA", xdr.lookup("Int64")],
  ["maxAmountB", xdr.lookup("Int64")],
  ["minPrice", xdr.lookup("Price")],
  ["maxPrice", xdr.lookup("Price")],
]);

// === xdr source ============================================================
//
//   struct LiquidityPoolWithdrawOp
//   {
//       PoolID liquidityPoolID;
//       int64 amount;     // amount of pool shares to withdraw
//       int64 minAmountA; // minimum amount of first asset to withdraw
//       int64 minAmountB; // minimum amount of second asset to withdraw
//   };
//
// ===========================================================================
xdr.struct("LiquidityPoolWithdrawOp", [
  ["liquidityPoolId", xdr.lookup("PoolId")],
  ["amount", xdr.lookup("Int64")],
  ["minAmountA", xdr.lookup("Int64")],
  ["minAmountB", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   enum HostFunctionType
//   {
//       HOST_FUNCTION_TYPE_INVOKE_CONTRACT = 0,
//       HOST_FUNCTION_TYPE_CREATE_CONTRACT = 1,
//       HOST_FUNCTION_TYPE_INSTALL_CONTRACT_CODE = 2
//   };
//
// ===========================================================================
xdr.enum("HostFunctionType", {
  hostFunctionTypeInvokeContract: 0,
  hostFunctionTypeCreateContract: 1,
  hostFunctionTypeInstallContractCode: 2,
});

// === xdr source ============================================================
//
//   enum ContractIDType
//   {
//       CONTRACT_ID_FROM_SOURCE_ACCOUNT = 0,
//       CONTRACT_ID_FROM_ED25519_PUBLIC_KEY = 1,
//       CONTRACT_ID_FROM_ASSET = 2
//   };
//
// ===========================================================================
xdr.enum("ContractIdType", {
  contractIdFromSourceAccount: 0,
  contractIdFromEd25519PublicKey: 1,
  contractIdFromAsset: 2,
});

// === xdr source ============================================================
//
//   enum ContractIDPublicKeyType
//   {
//       CONTRACT_ID_PUBLIC_KEY_SOURCE_ACCOUNT = 0,
//       CONTRACT_ID_PUBLIC_KEY_ED25519 = 1
//   };
//
// ===========================================================================
xdr.enum("ContractIdPublicKeyType", {
  contractIdPublicKeySourceAccount: 0,
  contractIdPublicKeyEd25519: 1,
});

// === xdr source ============================================================
//
//   struct InstallContractCodeArgs
//   {
//       opaque code<SCVAL_LIMIT>;
//   };
//
// ===========================================================================
xdr.struct("InstallContractCodeArgs", [
  ["code", xdr.varOpaque(xdr.lookup("SCVAL_LIMIT"))],
]);

// === xdr source ============================================================
//
//   struct 
//       {
//           uint256 key;
//           Signature signature;
//           uint256 salt;
//       }
//
// ===========================================================================
xdr.struct("ContractIdFromEd25519PublicKey", [
  ["key", xdr.lookup("Uint256")],
  ["signature", xdr.lookup("Signature")],
  ["salt", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   union ContractID switch (ContractIDType type)
//   {
//   case CONTRACT_ID_FROM_SOURCE_ACCOUNT:
//       uint256 salt;
//   case CONTRACT_ID_FROM_ED25519_PUBLIC_KEY:
//       struct 
//       {
//           uint256 key;
//           Signature signature;
//           uint256 salt;
//       } fromEd25519PublicKey;
//   case CONTRACT_ID_FROM_ASSET:
//       Asset asset;
//   };
//
// ===========================================================================
xdr.union("ContractId", {
  switchOn: xdr.lookup("ContractIdType"),
  switchName: "type",
  switches: [
    ["contractIdFromSourceAccount", "salt"],
    ["contractIdFromEd25519PublicKey", "fromEd25519PublicKey"],
    ["contractIdFromAsset", "asset"],
  ],
  arms: {
    salt: xdr.lookup("Uint256"),
    fromEd25519PublicKey: xdr.lookup("ContractIdFromEd25519PublicKey"),
    asset: xdr.lookup("Asset"),
  },
});

// === xdr source ============================================================
//
//   struct CreateContractArgs
//   {
//       ContractID contractID;
//       SCContractCode source;
//   };
//
// ===========================================================================
xdr.struct("CreateContractArgs", [
  ["contractId", xdr.lookup("ContractId")],
  ["source", xdr.lookup("ScContractCode")],
]);

// === xdr source ============================================================
//
//   union HostFunction switch (HostFunctionType type)
//   {
//   case HOST_FUNCTION_TYPE_INVOKE_CONTRACT:
//       SCVec invokeArgs;
//   case HOST_FUNCTION_TYPE_CREATE_CONTRACT:
//       CreateContractArgs createContractArgs;
//   case HOST_FUNCTION_TYPE_INSTALL_CONTRACT_CODE:
//       InstallContractCodeArgs installContractCodeArgs;
//   };
//
// ===========================================================================
xdr.union("HostFunction", {
  switchOn: xdr.lookup("HostFunctionType"),
  switchName: "type",
  switches: [
    ["hostFunctionTypeInvokeContract", "invokeArgs"],
    ["hostFunctionTypeCreateContract", "createContractArgs"],
    ["hostFunctionTypeInstallContractCode", "installContractCodeArgs"],
  ],
  arms: {
    invokeArgs: xdr.lookup("ScVec"),
    createContractArgs: xdr.lookup("CreateContractArgs"),
    installContractCodeArgs: xdr.lookup("InstallContractCodeArgs"),
  },
});

// === xdr source ============================================================
//
//   struct AuthorizedInvocation
//   {
//       Hash contractID;
//       SCSymbol functionName;
//       SCVec args;
//       AuthorizedInvocation subInvocations<>;
//   };
//
// ===========================================================================
xdr.struct("AuthorizedInvocation", [
  ["contractId", xdr.lookup("Hash")],
  ["functionName", xdr.lookup("ScSymbol")],
  ["args", xdr.lookup("ScVec")],
  ["subInvocations", xdr.varArray(xdr.lookup("AuthorizedInvocation"), 2147483647)],
]);

// === xdr source ============================================================
//
//   struct AddressWithNonce
//   {
//       SCAddress address;
//       uint64 nonce;
//   };
//
// ===========================================================================
xdr.struct("AddressWithNonce", [
  ["address", xdr.lookup("ScAddress")],
  ["nonce", xdr.lookup("Uint64")],
]);

// === xdr source ============================================================
//
//   struct ContractAuth
//   {
//       AddressWithNonce* addressWithNonce; // not present for invoker
//       AuthorizedInvocation rootInvocation;
//       SCVec signatureArgs;
//   };
//
// ===========================================================================
xdr.struct("ContractAuth", [
  ["addressWithNonce", xdr.option(xdr.lookup("AddressWithNonce"))],
  ["rootInvocation", xdr.lookup("AuthorizedInvocation")],
  ["signatureArgs", xdr.lookup("ScVec")],
]);

// === xdr source ============================================================
//
//   struct InvokeHostFunctionOp
//   {
//       // The host function to invoke
//       HostFunction function;
//       // The footprint for this invocation
//       LedgerFootprint footprint;
//       // Per-address authorizations for this host fn
//       // Currently only supported for INVOKE_CONTRACT function
//       ContractAuth auth<>;
//   };
//
// ===========================================================================
xdr.struct("InvokeHostFunctionOp", [
  ["function", xdr.lookup("HostFunction")],
  ["footprint", xdr.lookup("LedgerFootprint")],
  ["auth", xdr.varArray(xdr.lookup("ContractAuth"), 2147483647)],
]);

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//       case PAYMENT:
//           PaymentOp paymentOp;
//       case PATH_PAYMENT_STRICT_RECEIVE:
//           PathPaymentStrictReceiveOp pathPaymentStrictReceiveOp;
//       case MANAGE_SELL_OFFER:
//           ManageSellOfferOp manageSellOfferOp;
//       case CREATE_PASSIVE_SELL_OFFER:
//           CreatePassiveSellOfferOp createPassiveSellOfferOp;
//       case SET_OPTIONS:
//           SetOptionsOp setOptionsOp;
//       case CHANGE_TRUST:
//           ChangeTrustOp changeTrustOp;
//       case ALLOW_TRUST:
//           AllowTrustOp allowTrustOp;
//       case ACCOUNT_MERGE:
//           MuxedAccount destination;
//       case INFLATION:
//           void;
//       case MANAGE_DATA:
//           ManageDataOp manageDataOp;
//       case BUMP_SEQUENCE:
//           BumpSequenceOp bumpSequenceOp;
//       case MANAGE_BUY_OFFER:
//           ManageBuyOfferOp manageBuyOfferOp;
//       case PATH_PAYMENT_STRICT_SEND:
//           PathPaymentStrictSendOp pathPaymentStrictSendOp;
//       case CREATE_CLAIMABLE_BALANCE:
//           CreateClaimableBalanceOp createClaimableBalanceOp;
//       case CLAIM_CLAIMABLE_BALANCE:
//           ClaimClaimableBalanceOp claimClaimableBalanceOp;
//       case BEGIN_SPONSORING_FUTURE_RESERVES:
//           BeginSponsoringFutureReservesOp beginSponsoringFutureReservesOp;
//       case END_SPONSORING_FUTURE_RESERVES:
//           void;
//       case REVOKE_SPONSORSHIP:
//           RevokeSponsorshipOp revokeSponsorshipOp;
//       case CLAWBACK:
//           ClawbackOp clawbackOp;
//       case CLAWBACK_CLAIMABLE_BALANCE:
//           ClawbackClaimableBalanceOp clawbackClaimableBalanceOp;
//       case SET_TRUST_LINE_FLAGS:
//           SetTrustLineFlagsOp setTrustLineFlagsOp;
//       case LIQUIDITY_POOL_DEPOSIT:
//           LiquidityPoolDepositOp liquidityPoolDepositOp;
//       case LIQUIDITY_POOL_WITHDRAW:
//           LiquidityPoolWithdrawOp liquidityPoolWithdrawOp;
//       case INVOKE_HOST_FUNCTION:
//           InvokeHostFunctionOp invokeHostFunctionOp;
//       }
//
// ===========================================================================
xdr.union("OperationBody", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountOp"],
    ["payment", "paymentOp"],
    ["pathPaymentStrictReceive", "pathPaymentStrictReceiveOp"],
    ["manageSellOffer", "manageSellOfferOp"],
    ["createPassiveSellOffer", "createPassiveSellOfferOp"],
    ["setOptions", "setOptionsOp"],
    ["changeTrust", "changeTrustOp"],
    ["allowTrust", "allowTrustOp"],
    ["accountMerge", "destination"],
    ["inflation", xdr.void()],
    ["manageData", "manageDataOp"],
    ["bumpSequence", "bumpSequenceOp"],
    ["manageBuyOffer", "manageBuyOfferOp"],
    ["pathPaymentStrictSend", "pathPaymentStrictSendOp"],
    ["createClaimableBalance", "createClaimableBalanceOp"],
    ["claimClaimableBalance", "claimClaimableBalanceOp"],
    ["beginSponsoringFutureReserves", "beginSponsoringFutureReservesOp"],
    ["endSponsoringFutureReserves", xdr.void()],
    ["revokeSponsorship", "revokeSponsorshipOp"],
    ["clawback", "clawbackOp"],
    ["clawbackClaimableBalance", "clawbackClaimableBalanceOp"],
    ["setTrustLineFlags", "setTrustLineFlagsOp"],
    ["liquidityPoolDeposit", "liquidityPoolDepositOp"],
    ["liquidityPoolWithdraw", "liquidityPoolWithdrawOp"],
    ["invokeHostFunction", "invokeHostFunctionOp"],
  ],
  arms: {
    createAccountOp: xdr.lookup("CreateAccountOp"),
    paymentOp: xdr.lookup("PaymentOp"),
    pathPaymentStrictReceiveOp: xdr.lookup("PathPaymentStrictReceiveOp"),
    manageSellOfferOp: xdr.lookup("ManageSellOfferOp"),
    createPassiveSellOfferOp: xdr.lookup("CreatePassiveSellOfferOp"),
    setOptionsOp: xdr.lookup("SetOptionsOp"),
    changeTrustOp: xdr.lookup("ChangeTrustOp"),
    allowTrustOp: xdr.lookup("AllowTrustOp"),
    destination: xdr.lookup("MuxedAccount"),
    manageDataOp: xdr.lookup("ManageDataOp"),
    bumpSequenceOp: xdr.lookup("BumpSequenceOp"),
    manageBuyOfferOp: xdr.lookup("ManageBuyOfferOp"),
    pathPaymentStrictSendOp: xdr.lookup("PathPaymentStrictSendOp"),
    createClaimableBalanceOp: xdr.lookup("CreateClaimableBalanceOp"),
    claimClaimableBalanceOp: xdr.lookup("ClaimClaimableBalanceOp"),
    beginSponsoringFutureReservesOp: xdr.lookup("BeginSponsoringFutureReservesOp"),
    revokeSponsorshipOp: xdr.lookup("RevokeSponsorshipOp"),
    clawbackOp: xdr.lookup("ClawbackOp"),
    clawbackClaimableBalanceOp: xdr.lookup("ClawbackClaimableBalanceOp"),
    setTrustLineFlagsOp: xdr.lookup("SetTrustLineFlagsOp"),
    liquidityPoolDepositOp: xdr.lookup("LiquidityPoolDepositOp"),
    liquidityPoolWithdrawOp: xdr.lookup("LiquidityPoolWithdrawOp"),
    invokeHostFunctionOp: xdr.lookup("InvokeHostFunctionOp"),
  },
});

// === xdr source ============================================================
//
//   struct Operation
//   {
//       // sourceAccount is the account used to run the operation
//       // if not set, the runtime defaults to "sourceAccount" specified at
//       // the transaction level
//       MuxedAccount* sourceAccount;
//   
//       union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountOp createAccountOp;
//       case PAYMENT:
//           PaymentOp paymentOp;
//       case PATH_PAYMENT_STRICT_RECEIVE:
//           PathPaymentStrictReceiveOp pathPaymentStrictReceiveOp;
//       case MANAGE_SELL_OFFER:
//           ManageSellOfferOp manageSellOfferOp;
//       case CREATE_PASSIVE_SELL_OFFER:
//           CreatePassiveSellOfferOp createPassiveSellOfferOp;
//       case SET_OPTIONS:
//           SetOptionsOp setOptionsOp;
//       case CHANGE_TRUST:
//           ChangeTrustOp changeTrustOp;
//       case ALLOW_TRUST:
//           AllowTrustOp allowTrustOp;
//       case ACCOUNT_MERGE:
//           MuxedAccount destination;
//       case INFLATION:
//           void;
//       case MANAGE_DATA:
//           ManageDataOp manageDataOp;
//       case BUMP_SEQUENCE:
//           BumpSequenceOp bumpSequenceOp;
//       case MANAGE_BUY_OFFER:
//           ManageBuyOfferOp manageBuyOfferOp;
//       case PATH_PAYMENT_STRICT_SEND:
//           PathPaymentStrictSendOp pathPaymentStrictSendOp;
//       case CREATE_CLAIMABLE_BALANCE:
//           CreateClaimableBalanceOp createClaimableBalanceOp;
//       case CLAIM_CLAIMABLE_BALANCE:
//           ClaimClaimableBalanceOp claimClaimableBalanceOp;
//       case BEGIN_SPONSORING_FUTURE_RESERVES:
//           BeginSponsoringFutureReservesOp beginSponsoringFutureReservesOp;
//       case END_SPONSORING_FUTURE_RESERVES:
//           void;
//       case REVOKE_SPONSORSHIP:
//           RevokeSponsorshipOp revokeSponsorshipOp;
//       case CLAWBACK:
//           ClawbackOp clawbackOp;
//       case CLAWBACK_CLAIMABLE_BALANCE:
//           ClawbackClaimableBalanceOp clawbackClaimableBalanceOp;
//       case SET_TRUST_LINE_FLAGS:
//           SetTrustLineFlagsOp setTrustLineFlagsOp;
//       case LIQUIDITY_POOL_DEPOSIT:
//           LiquidityPoolDepositOp liquidityPoolDepositOp;
//       case LIQUIDITY_POOL_WITHDRAW:
//           LiquidityPoolWithdrawOp liquidityPoolWithdrawOp;
//       case INVOKE_HOST_FUNCTION:
//           InvokeHostFunctionOp invokeHostFunctionOp;
//       }
//       body;
//   };
//
// ===========================================================================
xdr.struct("Operation", [
  ["sourceAccount", xdr.option(xdr.lookup("MuxedAccount"))],
  ["body", xdr.lookup("OperationBody")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID sourceAccount;
//           SequenceNumber seqNum;
//           uint32 opNum;
//       }
//
// ===========================================================================
xdr.struct("HashIdPreimageOperationId", [
  ["sourceAccount", xdr.lookup("AccountId")],
  ["seqNum", xdr.lookup("SequenceNumber")],
  ["opNum", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           AccountID sourceAccount;
//           SequenceNumber seqNum;
//           uint32 opNum;
//           PoolID liquidityPoolID;
//           Asset asset;
//       }
//
// ===========================================================================
xdr.struct("HashIdPreimageRevokeId", [
  ["sourceAccount", xdr.lookup("AccountId")],
  ["seqNum", xdr.lookup("SequenceNumber")],
  ["opNum", xdr.lookup("Uint32")],
  ["liquidityPoolId", xdr.lookup("PoolId")],
  ["asset", xdr.lookup("Asset")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           Hash networkID;
//           uint256 ed25519;
//           uint256 salt;
//       }
//
// ===========================================================================
xdr.struct("HashIdPreimageEd25519ContractId", [
  ["networkId", xdr.lookup("Hash")],
  ["ed25519", xdr.lookup("Uint256")],
  ["salt", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           Hash networkID;
//           Hash contractID;
//           uint256 salt;
//       }
//
// ===========================================================================
xdr.struct("HashIdPreimageContractId", [
  ["networkId", xdr.lookup("Hash")],
  ["contractId", xdr.lookup("Hash")],
  ["salt", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           Hash networkID;
//           Asset asset;
//       }
//
// ===========================================================================
xdr.struct("HashIdPreimageFromAsset", [
  ["networkId", xdr.lookup("Hash")],
  ["asset", xdr.lookup("Asset")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           Hash networkID;
//           AccountID sourceAccount;
//           uint256 salt;
//       }
//
// ===========================================================================
xdr.struct("HashIdPreimageSourceAccountContractId", [
  ["networkId", xdr.lookup("Hash")],
  ["sourceAccount", xdr.lookup("AccountId")],
  ["salt", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           Hash networkID;
//           SCContractCode source;
//           uint256 salt;
//       }
//
// ===========================================================================
xdr.struct("HashIdPreimageCreateContractArgs", [
  ["networkId", xdr.lookup("Hash")],
  ["source", xdr.lookup("ScContractCode")],
  ["salt", xdr.lookup("Uint256")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           Hash networkID;
//           uint64 nonce;
//           AuthorizedInvocation invocation;
//       }
//
// ===========================================================================
xdr.struct("HashIdPreimageContractAuth", [
  ["networkId", xdr.lookup("Hash")],
  ["nonce", xdr.lookup("Uint64")],
  ["invocation", xdr.lookup("AuthorizedInvocation")],
]);

// === xdr source ============================================================
//
//   union HashIDPreimage switch (EnvelopeType type)
//   {
//   case ENVELOPE_TYPE_OP_ID:
//       struct
//       {
//           AccountID sourceAccount;
//           SequenceNumber seqNum;
//           uint32 opNum;
//       } operationID;
//   case ENVELOPE_TYPE_POOL_REVOKE_OP_ID:
//       struct
//       {
//           AccountID sourceAccount;
//           SequenceNumber seqNum;
//           uint32 opNum;
//           PoolID liquidityPoolID;
//           Asset asset;
//       } revokeID;
//   case ENVELOPE_TYPE_CONTRACT_ID_FROM_ED25519:
//       struct
//       {
//           Hash networkID;
//           uint256 ed25519;
//           uint256 salt;
//       } ed25519ContractID;
//   case ENVELOPE_TYPE_CONTRACT_ID_FROM_CONTRACT:
//       struct
//       {
//           Hash networkID;
//           Hash contractID;
//           uint256 salt;
//       } contractID;
//   case ENVELOPE_TYPE_CONTRACT_ID_FROM_ASSET:
//       struct
//       {
//           Hash networkID;
//           Asset asset;
//       } fromAsset;
//   case ENVELOPE_TYPE_CONTRACT_ID_FROM_SOURCE_ACCOUNT:
//       struct
//       {
//           Hash networkID;
//           AccountID sourceAccount;
//           uint256 salt;
//       } sourceAccountContractID;
//   case ENVELOPE_TYPE_CREATE_CONTRACT_ARGS:
//       struct
//       {
//           Hash networkID;
//           SCContractCode source;
//           uint256 salt;
//       } createContractArgs;
//   case ENVELOPE_TYPE_CONTRACT_AUTH:
//       struct
//       {
//           Hash networkID;
//           uint64 nonce;
//           AuthorizedInvocation invocation;
//       } contractAuth;
//   };
//
// ===========================================================================
xdr.union("HashIdPreimage", {
  switchOn: xdr.lookup("EnvelopeType"),
  switchName: "type",
  switches: [
    ["envelopeTypeOpId", "operationId"],
    ["envelopeTypePoolRevokeOpId", "revokeId"],
    ["envelopeTypeContractIdFromEd25519", "ed25519ContractId"],
    ["envelopeTypeContractIdFromContract", "contractId"],
    ["envelopeTypeContractIdFromAsset", "fromAsset"],
    ["envelopeTypeContractIdFromSourceAccount", "sourceAccountContractId"],
    ["envelopeTypeCreateContractArgs", "createContractArgs"],
    ["envelopeTypeContractAuth", "contractAuth"],
  ],
  arms: {
    operationId: xdr.lookup("HashIdPreimageOperationId"),
    revokeId: xdr.lookup("HashIdPreimageRevokeId"),
    ed25519ContractId: xdr.lookup("HashIdPreimageEd25519ContractId"),
    contractId: xdr.lookup("HashIdPreimageContractId"),
    fromAsset: xdr.lookup("HashIdPreimageFromAsset"),
    sourceAccountContractId: xdr.lookup("HashIdPreimageSourceAccountContractId"),
    createContractArgs: xdr.lookup("HashIdPreimageCreateContractArgs"),
    contractAuth: xdr.lookup("HashIdPreimageContractAuth"),
  },
});

// === xdr source ============================================================
//
//   enum MemoType
//   {
//       MEMO_NONE = 0,
//       MEMO_TEXT = 1,
//       MEMO_ID = 2,
//       MEMO_HASH = 3,
//       MEMO_RETURN = 4
//   };
//
// ===========================================================================
xdr.enum("MemoType", {
  memoNone: 0,
  memoText: 1,
  memoId: 2,
  memoHash: 3,
  memoReturn: 4,
});

// === xdr source ============================================================
//
//   union Memo switch (MemoType type)
//   {
//   case MEMO_NONE:
//       void;
//   case MEMO_TEXT:
//       string text<28>;
//   case MEMO_ID:
//       uint64 id;
//   case MEMO_HASH:
//       Hash hash; // the hash of what to pull from the content server
//   case MEMO_RETURN:
//       Hash retHash; // the hash of the tx you are rejecting
//   };
//
// ===========================================================================
xdr.union("Memo", {
  switchOn: xdr.lookup("MemoType"),
  switchName: "type",
  switches: [
    ["memoNone", xdr.void()],
    ["memoText", "text"],
    ["memoId", "id"],
    ["memoHash", "hash"],
    ["memoReturn", "retHash"],
  ],
  arms: {
    text: xdr.string(28),
    id: xdr.lookup("Uint64"),
    hash: xdr.lookup("Hash"),
    retHash: xdr.lookup("Hash"),
  },
});

// === xdr source ============================================================
//
//   struct TimeBounds
//   {
//       TimePoint minTime;
//       TimePoint maxTime; // 0 here means no maxTime
//   };
//
// ===========================================================================
xdr.struct("TimeBounds", [
  ["minTime", xdr.lookup("TimePoint")],
  ["maxTime", xdr.lookup("TimePoint")],
]);

// === xdr source ============================================================
//
//   struct LedgerBounds
//   {
//       uint32 minLedger;
//       uint32 maxLedger; // 0 here means no maxLedger
//   };
//
// ===========================================================================
xdr.struct("LedgerBounds", [
  ["minLedger", xdr.lookup("Uint32")],
  ["maxLedger", xdr.lookup("Uint32")],
]);

// === xdr source ============================================================
//
//   struct PreconditionsV2
//   {
//       TimeBounds* timeBounds;
//   
//       // Transaction only valid for ledger numbers n such that
//       // minLedger <= n < maxLedger (if maxLedger == 0, then
//       // only minLedger is checked)
//       LedgerBounds* ledgerBounds;
//   
//       // If NULL, only valid when sourceAccount's sequence number
//       // is seqNum - 1.  Otherwise, valid when sourceAccount's
//       // sequence number n satisfies minSeqNum <= n < tx.seqNum.
//       // Note that after execution the account's sequence number
//       // is always raised to tx.seqNum, and a transaction is not
//       // valid if tx.seqNum is too high to ensure replay protection.
//       SequenceNumber* minSeqNum;
//   
//       // For the transaction to be valid, the current ledger time must
//       // be at least minSeqAge greater than sourceAccount's seqTime.
//       Duration minSeqAge;
//   
//       // For the transaction to be valid, the current ledger number
//       // must be at least minSeqLedgerGap greater than sourceAccount's
//       // seqLedger.
//       uint32 minSeqLedgerGap;
//   
//       // For the transaction to be valid, there must be a signature
//       // corresponding to every Signer in this array, even if the
//       // signature is not otherwise required by the sourceAccount or
//       // operations.
//       SignerKey extraSigners<2>;
//   };
//
// ===========================================================================
xdr.struct("PreconditionsV2", [
  ["timeBounds", xdr.option(xdr.lookup("TimeBounds"))],
  ["ledgerBounds", xdr.option(xdr.lookup("LedgerBounds"))],
  ["minSeqNum", xdr.option(xdr.lookup("SequenceNumber"))],
  ["minSeqAge", xdr.lookup("Duration")],
  ["minSeqLedgerGap", xdr.lookup("Uint32")],
  ["extraSigners", xdr.varArray(xdr.lookup("SignerKey"), 2)],
]);

// === xdr source ============================================================
//
//   enum PreconditionType
//   {
//       PRECOND_NONE = 0,
//       PRECOND_TIME = 1,
//       PRECOND_V2 = 2
//   };
//
// ===========================================================================
xdr.enum("PreconditionType", {
  precondNone: 0,
  precondTime: 1,
  precondV2: 2,
});

// === xdr source ============================================================
//
//   union Preconditions switch (PreconditionType type)
//   {
//   case PRECOND_NONE:
//       void;
//   case PRECOND_TIME:
//       TimeBounds timeBounds;
//   case PRECOND_V2:
//       PreconditionsV2 v2;
//   };
//
// ===========================================================================
xdr.union("Preconditions", {
  switchOn: xdr.lookup("PreconditionType"),
  switchName: "type",
  switches: [
    ["precondNone", xdr.void()],
    ["precondTime", "timeBounds"],
    ["precondV2", "v2"],
  ],
  arms: {
    timeBounds: xdr.lookup("TimeBounds"),
    v2: xdr.lookup("PreconditionsV2"),
  },
});

// === xdr source ============================================================
//
//   const MAX_OPS_PER_TX = 100;
//
// ===========================================================================
xdr.const("MAX_OPS_PER_TX", 100);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionV0Ext", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionV0
//   {
//       uint256 sourceAccountEd25519;
//       uint32 fee;
//       SequenceNumber seqNum;
//       TimeBounds* timeBounds;
//       Memo memo;
//       Operation operations<MAX_OPS_PER_TX>;
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionV0", [
  ["sourceAccountEd25519", xdr.lookup("Uint256")],
  ["fee", xdr.lookup("Uint32")],
  ["seqNum", xdr.lookup("SequenceNumber")],
  ["timeBounds", xdr.option(xdr.lookup("TimeBounds"))],
  ["memo", xdr.lookup("Memo")],
  ["operations", xdr.varArray(xdr.lookup("Operation"), xdr.lookup("MAX_OPS_PER_TX"))],
  ["ext", xdr.lookup("TransactionV0Ext")],
]);

// === xdr source ============================================================
//
//   struct TransactionV0Envelope
//   {
//       TransactionV0 tx;
//       /* Each decorated signature is a signature over the SHA256 hash of
//        * a TransactionSignaturePayload */
//       DecoratedSignature signatures<20>;
//   };
//
// ===========================================================================
xdr.struct("TransactionV0Envelope", [
  ["tx", xdr.lookup("TransactionV0")],
  ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)],
]);

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct Transaction
//   {
//       // account used to run the transaction
//       MuxedAccount sourceAccount;
//   
//       // the fee the sourceAccount will pay
//       uint32 fee;
//   
//       // sequence number to consume in the account
//       SequenceNumber seqNum;
//   
//       // validity conditions
//       Preconditions cond;
//   
//       Memo memo;
//   
//       Operation operations<MAX_OPS_PER_TX>;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("Transaction", [
  ["sourceAccount", xdr.lookup("MuxedAccount")],
  ["fee", xdr.lookup("Uint32")],
  ["seqNum", xdr.lookup("SequenceNumber")],
  ["cond", xdr.lookup("Preconditions")],
  ["memo", xdr.lookup("Memo")],
  ["operations", xdr.varArray(xdr.lookup("Operation"), xdr.lookup("MAX_OPS_PER_TX"))],
  ["ext", xdr.lookup("TransactionExt")],
]);

// === xdr source ============================================================
//
//   struct TransactionV1Envelope
//   {
//       Transaction tx;
//       /* Each decorated signature is a signature over the SHA256 hash of
//        * a TransactionSignaturePayload */
//       DecoratedSignature signatures<20>;
//   };
//
// ===========================================================================
xdr.struct("TransactionV1Envelope", [
  ["tx", xdr.lookup("Transaction")],
  ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)],
]);

// === xdr source ============================================================
//
//   union switch (EnvelopeType type)
//       {
//       case ENVELOPE_TYPE_TX:
//           TransactionV1Envelope v1;
//       }
//
// ===========================================================================
xdr.union("FeeBumpTransactionInnerTx", {
  switchOn: xdr.lookup("EnvelopeType"),
  switchName: "type",
  switches: [
    ["envelopeTypeTx", "v1"],
  ],
  arms: {
    v1: xdr.lookup("TransactionV1Envelope"),
  },
});

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("FeeBumpTransactionExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct FeeBumpTransaction
//   {
//       MuxedAccount feeSource;
//       int64 fee;
//       union switch (EnvelopeType type)
//       {
//       case ENVELOPE_TYPE_TX:
//           TransactionV1Envelope v1;
//       }
//       innerTx;
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("FeeBumpTransaction", [
  ["feeSource", xdr.lookup("MuxedAccount")],
  ["fee", xdr.lookup("Int64")],
  ["innerTx", xdr.lookup("FeeBumpTransactionInnerTx")],
  ["ext", xdr.lookup("FeeBumpTransactionExt")],
]);

// === xdr source ============================================================
//
//   struct FeeBumpTransactionEnvelope
//   {
//       FeeBumpTransaction tx;
//       /* Each decorated signature is a signature over the SHA256 hash of
//        * a TransactionSignaturePayload */
//       DecoratedSignature signatures<20>;
//   };
//
// ===========================================================================
xdr.struct("FeeBumpTransactionEnvelope", [
  ["tx", xdr.lookup("FeeBumpTransaction")],
  ["signatures", xdr.varArray(xdr.lookup("DecoratedSignature"), 20)],
]);

// === xdr source ============================================================
//
//   union TransactionEnvelope switch (EnvelopeType type)
//   {
//   case ENVELOPE_TYPE_TX_V0:
//       TransactionV0Envelope v0;
//   case ENVELOPE_TYPE_TX:
//       TransactionV1Envelope v1;
//   case ENVELOPE_TYPE_TX_FEE_BUMP:
//       FeeBumpTransactionEnvelope feeBump;
//   };
//
// ===========================================================================
xdr.union("TransactionEnvelope", {
  switchOn: xdr.lookup("EnvelopeType"),
  switchName: "type",
  switches: [
    ["envelopeTypeTxV0", "v0"],
    ["envelopeTypeTx", "v1"],
    ["envelopeTypeTxFeeBump", "feeBump"],
  ],
  arms: {
    v0: xdr.lookup("TransactionV0Envelope"),
    v1: xdr.lookup("TransactionV1Envelope"),
    feeBump: xdr.lookup("FeeBumpTransactionEnvelope"),
  },
});

// === xdr source ============================================================
//
//   union switch (EnvelopeType type)
//       {
//       // Backwards Compatibility: Use ENVELOPE_TYPE_TX to sign ENVELOPE_TYPE_TX_V0
//       case ENVELOPE_TYPE_TX:
//           Transaction tx;
//       case ENVELOPE_TYPE_TX_FEE_BUMP:
//           FeeBumpTransaction feeBump;
//       }
//
// ===========================================================================
xdr.union("TransactionSignaturePayloadTaggedTransaction", {
  switchOn: xdr.lookup("EnvelopeType"),
  switchName: "type",
  switches: [
    ["envelopeTypeTx", "tx"],
    ["envelopeTypeTxFeeBump", "feeBump"],
  ],
  arms: {
    tx: xdr.lookup("Transaction"),
    feeBump: xdr.lookup("FeeBumpTransaction"),
  },
});

// === xdr source ============================================================
//
//   struct TransactionSignaturePayload
//   {
//       Hash networkId;
//       union switch (EnvelopeType type)
//       {
//       // Backwards Compatibility: Use ENVELOPE_TYPE_TX to sign ENVELOPE_TYPE_TX_V0
//       case ENVELOPE_TYPE_TX:
//           Transaction tx;
//       case ENVELOPE_TYPE_TX_FEE_BUMP:
//           FeeBumpTransaction feeBump;
//       }
//       taggedTransaction;
//   };
//
// ===========================================================================
xdr.struct("TransactionSignaturePayload", [
  ["networkId", xdr.lookup("Hash")],
  ["taggedTransaction", xdr.lookup("TransactionSignaturePayloadTaggedTransaction")],
]);

// === xdr source ============================================================
//
//   enum ClaimAtomType
//   {
//       CLAIM_ATOM_TYPE_V0 = 0,
//       CLAIM_ATOM_TYPE_ORDER_BOOK = 1,
//       CLAIM_ATOM_TYPE_LIQUIDITY_POOL = 2
//   };
//
// ===========================================================================
xdr.enum("ClaimAtomType", {
  claimAtomTypeV0: 0,
  claimAtomTypeOrderBook: 1,
  claimAtomTypeLiquidityPool: 2,
});

// === xdr source ============================================================
//
//   struct ClaimOfferAtomV0
//   {
//       // emitted to identify the offer
//       uint256 sellerEd25519; // Account that owns the offer
//       int64 offerID;
//   
//       // amount and asset taken from the owner
//       Asset assetSold;
//       int64 amountSold;
//   
//       // amount and asset sent to the owner
//       Asset assetBought;
//       int64 amountBought;
//   };
//
// ===========================================================================
xdr.struct("ClaimOfferAtomV0", [
  ["sellerEd25519", xdr.lookup("Uint256")],
  ["offerId", xdr.lookup("Int64")],
  ["assetSold", xdr.lookup("Asset")],
  ["amountSold", xdr.lookup("Int64")],
  ["assetBought", xdr.lookup("Asset")],
  ["amountBought", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct ClaimOfferAtom
//   {
//       // emitted to identify the offer
//       AccountID sellerID; // Account that owns the offer
//       int64 offerID;
//   
//       // amount and asset taken from the owner
//       Asset assetSold;
//       int64 amountSold;
//   
//       // amount and asset sent to the owner
//       Asset assetBought;
//       int64 amountBought;
//   };
//
// ===========================================================================
xdr.struct("ClaimOfferAtom", [
  ["sellerId", xdr.lookup("AccountId")],
  ["offerId", xdr.lookup("Int64")],
  ["assetSold", xdr.lookup("Asset")],
  ["amountSold", xdr.lookup("Int64")],
  ["assetBought", xdr.lookup("Asset")],
  ["amountBought", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct ClaimLiquidityAtom
//   {
//       PoolID liquidityPoolID;
//   
//       // amount and asset taken from the pool
//       Asset assetSold;
//       int64 amountSold;
//   
//       // amount and asset sent to the pool
//       Asset assetBought;
//       int64 amountBought;
//   };
//
// ===========================================================================
xdr.struct("ClaimLiquidityAtom", [
  ["liquidityPoolId", xdr.lookup("PoolId")],
  ["assetSold", xdr.lookup("Asset")],
  ["amountSold", xdr.lookup("Int64")],
  ["assetBought", xdr.lookup("Asset")],
  ["amountBought", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   union ClaimAtom switch (ClaimAtomType type)
//   {
//   case CLAIM_ATOM_TYPE_V0:
//       ClaimOfferAtomV0 v0;
//   case CLAIM_ATOM_TYPE_ORDER_BOOK:
//       ClaimOfferAtom orderBook;
//   case CLAIM_ATOM_TYPE_LIQUIDITY_POOL:
//       ClaimLiquidityAtom liquidityPool;
//   };
//
// ===========================================================================
xdr.union("ClaimAtom", {
  switchOn: xdr.lookup("ClaimAtomType"),
  switchName: "type",
  switches: [
    ["claimAtomTypeV0", "v0"],
    ["claimAtomTypeOrderBook", "orderBook"],
    ["claimAtomTypeLiquidityPool", "liquidityPool"],
  ],
  arms: {
    v0: xdr.lookup("ClaimOfferAtomV0"),
    orderBook: xdr.lookup("ClaimOfferAtom"),
    liquidityPool: xdr.lookup("ClaimLiquidityAtom"),
  },
});

// === xdr source ============================================================
//
//   enum CreateAccountResultCode
//   {
//       // codes considered as "success" for the operation
//       CREATE_ACCOUNT_SUCCESS = 0, // account was created
//   
//       // codes considered as "failure" for the operation
//       CREATE_ACCOUNT_MALFORMED = -1,   // invalid destination
//       CREATE_ACCOUNT_UNDERFUNDED = -2, // not enough funds in source account
//       CREATE_ACCOUNT_LOW_RESERVE =
//           -3, // would create an account below the min reserve
//       CREATE_ACCOUNT_ALREADY_EXIST = -4 // account already exists
//   };
//
// ===========================================================================
xdr.enum("CreateAccountResultCode", {
  createAccountSuccess: 0,
  createAccountMalformed: -1,
  createAccountUnderfunded: -2,
  createAccountLowReserve: -3,
  createAccountAlreadyExist: -4,
});

// === xdr source ============================================================
//
//   union CreateAccountResult switch (CreateAccountResultCode code)
//   {
//   case CREATE_ACCOUNT_SUCCESS:
//       void;
//   case CREATE_ACCOUNT_MALFORMED:
//   case CREATE_ACCOUNT_UNDERFUNDED:
//   case CREATE_ACCOUNT_LOW_RESERVE:
//   case CREATE_ACCOUNT_ALREADY_EXIST:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateAccountResult", {
  switchOn: xdr.lookup("CreateAccountResultCode"),
  switchName: "code",
  switches: [
    ["createAccountSuccess", xdr.void()],
    ["createAccountMalformed", xdr.void()],
    ["createAccountUnderfunded", xdr.void()],
    ["createAccountLowReserve", xdr.void()],
    ["createAccountAlreadyExist", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum PaymentResultCode
//   {
//       // codes considered as "success" for the operation
//       PAYMENT_SUCCESS = 0, // payment successfully completed
//   
//       // codes considered as "failure" for the operation
//       PAYMENT_MALFORMED = -1,          // bad input
//       PAYMENT_UNDERFUNDED = -2,        // not enough funds in source account
//       PAYMENT_SRC_NO_TRUST = -3,       // no trust line on source account
//       PAYMENT_SRC_NOT_AUTHORIZED = -4, // source not authorized to transfer
//       PAYMENT_NO_DESTINATION = -5,     // destination account does not exist
//       PAYMENT_NO_TRUST = -6,       // destination missing a trust line for asset
//       PAYMENT_NOT_AUTHORIZED = -7, // destination not authorized to hold asset
//       PAYMENT_LINE_FULL = -8,      // destination would go above their limit
//       PAYMENT_NO_ISSUER = -9       // missing issuer on asset
//   };
//
// ===========================================================================
xdr.enum("PaymentResultCode", {
  paymentSuccess: 0,
  paymentMalformed: -1,
  paymentUnderfunded: -2,
  paymentSrcNoTrust: -3,
  paymentSrcNotAuthorized: -4,
  paymentNoDestination: -5,
  paymentNoTrust: -6,
  paymentNotAuthorized: -7,
  paymentLineFull: -8,
  paymentNoIssuer: -9,
});

// === xdr source ============================================================
//
//   union PaymentResult switch (PaymentResultCode code)
//   {
//   case PAYMENT_SUCCESS:
//       void;
//   case PAYMENT_MALFORMED:
//   case PAYMENT_UNDERFUNDED:
//   case PAYMENT_SRC_NO_TRUST:
//   case PAYMENT_SRC_NOT_AUTHORIZED:
//   case PAYMENT_NO_DESTINATION:
//   case PAYMENT_NO_TRUST:
//   case PAYMENT_NOT_AUTHORIZED:
//   case PAYMENT_LINE_FULL:
//   case PAYMENT_NO_ISSUER:
//       void;
//   };
//
// ===========================================================================
xdr.union("PaymentResult", {
  switchOn: xdr.lookup("PaymentResultCode"),
  switchName: "code",
  switches: [
    ["paymentSuccess", xdr.void()],
    ["paymentMalformed", xdr.void()],
    ["paymentUnderfunded", xdr.void()],
    ["paymentSrcNoTrust", xdr.void()],
    ["paymentSrcNotAuthorized", xdr.void()],
    ["paymentNoDestination", xdr.void()],
    ["paymentNoTrust", xdr.void()],
    ["paymentNotAuthorized", xdr.void()],
    ["paymentLineFull", xdr.void()],
    ["paymentNoIssuer", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum PathPaymentStrictReceiveResultCode
//   {
//       // codes considered as "success" for the operation
//       PATH_PAYMENT_STRICT_RECEIVE_SUCCESS = 0, // success
//   
//       // codes considered as "failure" for the operation
//       PATH_PAYMENT_STRICT_RECEIVE_MALFORMED = -1, // bad input
//       PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED =
//           -2, // not enough funds in source account
//       PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST =
//           -3, // no trust line on source account
//       PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED =
//           -4, // source not authorized to transfer
//       PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION =
//           -5, // destination account does not exist
//       PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST =
//           -6, // dest missing a trust line for asset
//       PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED =
//           -7, // dest not authorized to hold asset
//       PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL =
//           -8, // dest would go above their limit
//       PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER = -9, // missing issuer on one asset
//       PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS =
//           -10, // not enough offers to satisfy path
//       PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF =
//           -11, // would cross one of its own offers
//       PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX = -12 // could not satisfy sendmax
//   };
//
// ===========================================================================
xdr.enum("PathPaymentStrictReceiveResultCode", {
  pathPaymentStrictReceiveSuccess: 0,
  pathPaymentStrictReceiveMalformed: -1,
  pathPaymentStrictReceiveUnderfunded: -2,
  pathPaymentStrictReceiveSrcNoTrust: -3,
  pathPaymentStrictReceiveSrcNotAuthorized: -4,
  pathPaymentStrictReceiveNoDestination: -5,
  pathPaymentStrictReceiveNoTrust: -6,
  pathPaymentStrictReceiveNotAuthorized: -7,
  pathPaymentStrictReceiveLineFull: -8,
  pathPaymentStrictReceiveNoIssuer: -9,
  pathPaymentStrictReceiveTooFewOffers: -10,
  pathPaymentStrictReceiveOfferCrossSelf: -11,
  pathPaymentStrictReceiveOverSendmax: -12,
});

// === xdr source ============================================================
//
//   struct SimplePaymentResult
//   {
//       AccountID destination;
//       Asset asset;
//       int64 amount;
//   };
//
// ===========================================================================
xdr.struct("SimplePaymentResult", [
  ["destination", xdr.lookup("AccountId")],
  ["asset", xdr.lookup("Asset")],
  ["amount", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   struct
//       {
//           ClaimAtom offers<>;
//           SimplePaymentResult last;
//       }
//
// ===========================================================================
xdr.struct("PathPaymentStrictReceiveResultSuccess", [
  ["offers", xdr.varArray(xdr.lookup("ClaimAtom"), 2147483647)],
  ["last", xdr.lookup("SimplePaymentResult")],
]);

// === xdr source ============================================================
//
//   union PathPaymentStrictReceiveResult switch (
//       PathPaymentStrictReceiveResultCode code)
//   {
//   case PATH_PAYMENT_STRICT_RECEIVE_SUCCESS:
//       struct
//       {
//           ClaimAtom offers<>;
//           SimplePaymentResult last;
//       } success;
//   case PATH_PAYMENT_STRICT_RECEIVE_MALFORMED:
//   case PATH_PAYMENT_STRICT_RECEIVE_UNDERFUNDED:
//   case PATH_PAYMENT_STRICT_RECEIVE_SRC_NO_TRUST:
//   case PATH_PAYMENT_STRICT_RECEIVE_SRC_NOT_AUTHORIZED:
//   case PATH_PAYMENT_STRICT_RECEIVE_NO_DESTINATION:
//   case PATH_PAYMENT_STRICT_RECEIVE_NO_TRUST:
//   case PATH_PAYMENT_STRICT_RECEIVE_NOT_AUTHORIZED:
//   case PATH_PAYMENT_STRICT_RECEIVE_LINE_FULL:
//       void;
//   case PATH_PAYMENT_STRICT_RECEIVE_NO_ISSUER:
//       Asset noIssuer; // the asset that caused the error
//   case PATH_PAYMENT_STRICT_RECEIVE_TOO_FEW_OFFERS:
//   case PATH_PAYMENT_STRICT_RECEIVE_OFFER_CROSS_SELF:
//   case PATH_PAYMENT_STRICT_RECEIVE_OVER_SENDMAX:
//       void;
//   };
//
// ===========================================================================
xdr.union("PathPaymentStrictReceiveResult", {
  switchOn: xdr.lookup("PathPaymentStrictReceiveResultCode"),
  switchName: "code",
  switches: [
    ["pathPaymentStrictReceiveSuccess", "success"],
    ["pathPaymentStrictReceiveMalformed", xdr.void()],
    ["pathPaymentStrictReceiveUnderfunded", xdr.void()],
    ["pathPaymentStrictReceiveSrcNoTrust", xdr.void()],
    ["pathPaymentStrictReceiveSrcNotAuthorized", xdr.void()],
    ["pathPaymentStrictReceiveNoDestination", xdr.void()],
    ["pathPaymentStrictReceiveNoTrust", xdr.void()],
    ["pathPaymentStrictReceiveNotAuthorized", xdr.void()],
    ["pathPaymentStrictReceiveLineFull", xdr.void()],
    ["pathPaymentStrictReceiveNoIssuer", "noIssuer"],
    ["pathPaymentStrictReceiveTooFewOffers", xdr.void()],
    ["pathPaymentStrictReceiveOfferCrossSelf", xdr.void()],
    ["pathPaymentStrictReceiveOverSendmax", xdr.void()],
  ],
  arms: {
    success: xdr.lookup("PathPaymentStrictReceiveResultSuccess"),
    noIssuer: xdr.lookup("Asset"),
  },
});

// === xdr source ============================================================
//
//   enum PathPaymentStrictSendResultCode
//   {
//       // codes considered as "success" for the operation
//       PATH_PAYMENT_STRICT_SEND_SUCCESS = 0, // success
//   
//       // codes considered as "failure" for the operation
//       PATH_PAYMENT_STRICT_SEND_MALFORMED = -1, // bad input
//       PATH_PAYMENT_STRICT_SEND_UNDERFUNDED =
//           -2, // not enough funds in source account
//       PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST =
//           -3, // no trust line on source account
//       PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED =
//           -4, // source not authorized to transfer
//       PATH_PAYMENT_STRICT_SEND_NO_DESTINATION =
//           -5, // destination account does not exist
//       PATH_PAYMENT_STRICT_SEND_NO_TRUST =
//           -6, // dest missing a trust line for asset
//       PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED =
//           -7, // dest not authorized to hold asset
//       PATH_PAYMENT_STRICT_SEND_LINE_FULL = -8, // dest would go above their limit
//       PATH_PAYMENT_STRICT_SEND_NO_ISSUER = -9, // missing issuer on one asset
//       PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS =
//           -10, // not enough offers to satisfy path
//       PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF =
//           -11, // would cross one of its own offers
//       PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN = -12 // could not satisfy destMin
//   };
//
// ===========================================================================
xdr.enum("PathPaymentStrictSendResultCode", {
  pathPaymentStrictSendSuccess: 0,
  pathPaymentStrictSendMalformed: -1,
  pathPaymentStrictSendUnderfunded: -2,
  pathPaymentStrictSendSrcNoTrust: -3,
  pathPaymentStrictSendSrcNotAuthorized: -4,
  pathPaymentStrictSendNoDestination: -5,
  pathPaymentStrictSendNoTrust: -6,
  pathPaymentStrictSendNotAuthorized: -7,
  pathPaymentStrictSendLineFull: -8,
  pathPaymentStrictSendNoIssuer: -9,
  pathPaymentStrictSendTooFewOffers: -10,
  pathPaymentStrictSendOfferCrossSelf: -11,
  pathPaymentStrictSendUnderDestmin: -12,
});

// === xdr source ============================================================
//
//   struct
//       {
//           ClaimAtom offers<>;
//           SimplePaymentResult last;
//       }
//
// ===========================================================================
xdr.struct("PathPaymentStrictSendResultSuccess", [
  ["offers", xdr.varArray(xdr.lookup("ClaimAtom"), 2147483647)],
  ["last", xdr.lookup("SimplePaymentResult")],
]);

// === xdr source ============================================================
//
//   union PathPaymentStrictSendResult switch (PathPaymentStrictSendResultCode code)
//   {
//   case PATH_PAYMENT_STRICT_SEND_SUCCESS:
//       struct
//       {
//           ClaimAtom offers<>;
//           SimplePaymentResult last;
//       } success;
//   case PATH_PAYMENT_STRICT_SEND_MALFORMED:
//   case PATH_PAYMENT_STRICT_SEND_UNDERFUNDED:
//   case PATH_PAYMENT_STRICT_SEND_SRC_NO_TRUST:
//   case PATH_PAYMENT_STRICT_SEND_SRC_NOT_AUTHORIZED:
//   case PATH_PAYMENT_STRICT_SEND_NO_DESTINATION:
//   case PATH_PAYMENT_STRICT_SEND_NO_TRUST:
//   case PATH_PAYMENT_STRICT_SEND_NOT_AUTHORIZED:
//   case PATH_PAYMENT_STRICT_SEND_LINE_FULL:
//       void;
//   case PATH_PAYMENT_STRICT_SEND_NO_ISSUER:
//       Asset noIssuer; // the asset that caused the error
//   case PATH_PAYMENT_STRICT_SEND_TOO_FEW_OFFERS:
//   case PATH_PAYMENT_STRICT_SEND_OFFER_CROSS_SELF:
//   case PATH_PAYMENT_STRICT_SEND_UNDER_DESTMIN:
//       void;
//   };
//
// ===========================================================================
xdr.union("PathPaymentStrictSendResult", {
  switchOn: xdr.lookup("PathPaymentStrictSendResultCode"),
  switchName: "code",
  switches: [
    ["pathPaymentStrictSendSuccess", "success"],
    ["pathPaymentStrictSendMalformed", xdr.void()],
    ["pathPaymentStrictSendUnderfunded", xdr.void()],
    ["pathPaymentStrictSendSrcNoTrust", xdr.void()],
    ["pathPaymentStrictSendSrcNotAuthorized", xdr.void()],
    ["pathPaymentStrictSendNoDestination", xdr.void()],
    ["pathPaymentStrictSendNoTrust", xdr.void()],
    ["pathPaymentStrictSendNotAuthorized", xdr.void()],
    ["pathPaymentStrictSendLineFull", xdr.void()],
    ["pathPaymentStrictSendNoIssuer", "noIssuer"],
    ["pathPaymentStrictSendTooFewOffers", xdr.void()],
    ["pathPaymentStrictSendOfferCrossSelf", xdr.void()],
    ["pathPaymentStrictSendUnderDestmin", xdr.void()],
  ],
  arms: {
    success: xdr.lookup("PathPaymentStrictSendResultSuccess"),
    noIssuer: xdr.lookup("Asset"),
  },
});

// === xdr source ============================================================
//
//   enum ManageSellOfferResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_SELL_OFFER_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MANAGE_SELL_OFFER_MALFORMED = -1, // generated offer would be invalid
//       MANAGE_SELL_OFFER_SELL_NO_TRUST =
//           -2,                              // no trust line for what we're selling
//       MANAGE_SELL_OFFER_BUY_NO_TRUST = -3, // no trust line for what we're buying
//       MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED = -4, // not authorized to sell
//       MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED = -5,  // not authorized to buy
//       MANAGE_SELL_OFFER_LINE_FULL = -6, // can't receive more of what it's buying
//       MANAGE_SELL_OFFER_UNDERFUNDED = -7, // doesn't hold what it's trying to sell
//       MANAGE_SELL_OFFER_CROSS_SELF =
//           -8, // would cross an offer from the same user
//       MANAGE_SELL_OFFER_SELL_NO_ISSUER = -9, // no issuer for what we're selling
//       MANAGE_SELL_OFFER_BUY_NO_ISSUER = -10, // no issuer for what we're buying
//   
//       // update errors
//       MANAGE_SELL_OFFER_NOT_FOUND =
//           -11, // offerID does not match an existing offer
//   
//       MANAGE_SELL_OFFER_LOW_RESERVE =
//           -12 // not enough funds to create a new Offer
//   };
//
// ===========================================================================
xdr.enum("ManageSellOfferResultCode", {
  manageSellOfferSuccess: 0,
  manageSellOfferMalformed: -1,
  manageSellOfferSellNoTrust: -2,
  manageSellOfferBuyNoTrust: -3,
  manageSellOfferSellNotAuthorized: -4,
  manageSellOfferBuyNotAuthorized: -5,
  manageSellOfferLineFull: -6,
  manageSellOfferUnderfunded: -7,
  manageSellOfferCrossSelf: -8,
  manageSellOfferSellNoIssuer: -9,
  manageSellOfferBuyNoIssuer: -10,
  manageSellOfferNotFound: -11,
  manageSellOfferLowReserve: -12,
});

// === xdr source ============================================================
//
//   enum ManageOfferEffect
//   {
//       MANAGE_OFFER_CREATED = 0,
//       MANAGE_OFFER_UPDATED = 1,
//       MANAGE_OFFER_DELETED = 2
//   };
//
// ===========================================================================
xdr.enum("ManageOfferEffect", {
  manageOfferCreated: 0,
  manageOfferUpdated: 1,
  manageOfferDeleted: 2,
});

// === xdr source ============================================================
//
//   union switch (ManageOfferEffect effect)
//       {
//       case MANAGE_OFFER_CREATED:
//       case MANAGE_OFFER_UPDATED:
//           OfferEntry offer;
//       case MANAGE_OFFER_DELETED:
//           void;
//       }
//
// ===========================================================================
xdr.union("ManageOfferSuccessResultOffer", {
  switchOn: xdr.lookup("ManageOfferEffect"),
  switchName: "effect",
  switches: [
    ["manageOfferCreated", "offer"],
    ["manageOfferUpdated", "offer"],
    ["manageOfferDeleted", xdr.void()],
  ],
  arms: {
    offer: xdr.lookup("OfferEntry"),
  },
});

// === xdr source ============================================================
//
//   struct ManageOfferSuccessResult
//   {
//       // offers that got claimed while creating this offer
//       ClaimAtom offersClaimed<>;
//   
//       union switch (ManageOfferEffect effect)
//       {
//       case MANAGE_OFFER_CREATED:
//       case MANAGE_OFFER_UPDATED:
//           OfferEntry offer;
//       case MANAGE_OFFER_DELETED:
//           void;
//       }
//       offer;
//   };
//
// ===========================================================================
xdr.struct("ManageOfferSuccessResult", [
  ["offersClaimed", xdr.varArray(xdr.lookup("ClaimAtom"), 2147483647)],
  ["offer", xdr.lookup("ManageOfferSuccessResultOffer")],
]);

// === xdr source ============================================================
//
//   union ManageSellOfferResult switch (ManageSellOfferResultCode code)
//   {
//   case MANAGE_SELL_OFFER_SUCCESS:
//       ManageOfferSuccessResult success;
//   case MANAGE_SELL_OFFER_MALFORMED:
//   case MANAGE_SELL_OFFER_SELL_NO_TRUST:
//   case MANAGE_SELL_OFFER_BUY_NO_TRUST:
//   case MANAGE_SELL_OFFER_SELL_NOT_AUTHORIZED:
//   case MANAGE_SELL_OFFER_BUY_NOT_AUTHORIZED:
//   case MANAGE_SELL_OFFER_LINE_FULL:
//   case MANAGE_SELL_OFFER_UNDERFUNDED:
//   case MANAGE_SELL_OFFER_CROSS_SELF:
//   case MANAGE_SELL_OFFER_SELL_NO_ISSUER:
//   case MANAGE_SELL_OFFER_BUY_NO_ISSUER:
//   case MANAGE_SELL_OFFER_NOT_FOUND:
//   case MANAGE_SELL_OFFER_LOW_RESERVE:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageSellOfferResult", {
  switchOn: xdr.lookup("ManageSellOfferResultCode"),
  switchName: "code",
  switches: [
    ["manageSellOfferSuccess", "success"],
    ["manageSellOfferMalformed", xdr.void()],
    ["manageSellOfferSellNoTrust", xdr.void()],
    ["manageSellOfferBuyNoTrust", xdr.void()],
    ["manageSellOfferSellNotAuthorized", xdr.void()],
    ["manageSellOfferBuyNotAuthorized", xdr.void()],
    ["manageSellOfferLineFull", xdr.void()],
    ["manageSellOfferUnderfunded", xdr.void()],
    ["manageSellOfferCrossSelf", xdr.void()],
    ["manageSellOfferSellNoIssuer", xdr.void()],
    ["manageSellOfferBuyNoIssuer", xdr.void()],
    ["manageSellOfferNotFound", xdr.void()],
    ["manageSellOfferLowReserve", xdr.void()],
  ],
  arms: {
    success: xdr.lookup("ManageOfferSuccessResult"),
  },
});

// === xdr source ============================================================
//
//   enum ManageBuyOfferResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_BUY_OFFER_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       MANAGE_BUY_OFFER_MALFORMED = -1,     // generated offer would be invalid
//       MANAGE_BUY_OFFER_SELL_NO_TRUST = -2, // no trust line for what we're selling
//       MANAGE_BUY_OFFER_BUY_NO_TRUST = -3,  // no trust line for what we're buying
//       MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED = -4, // not authorized to sell
//       MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED = -5,  // not authorized to buy
//       MANAGE_BUY_OFFER_LINE_FULL = -6,   // can't receive more of what it's buying
//       MANAGE_BUY_OFFER_UNDERFUNDED = -7, // doesn't hold what it's trying to sell
//       MANAGE_BUY_OFFER_CROSS_SELF = -8, // would cross an offer from the same user
//       MANAGE_BUY_OFFER_SELL_NO_ISSUER = -9, // no issuer for what we're selling
//       MANAGE_BUY_OFFER_BUY_NO_ISSUER = -10, // no issuer for what we're buying
//   
//       // update errors
//       MANAGE_BUY_OFFER_NOT_FOUND =
//           -11, // offerID does not match an existing offer
//   
//       MANAGE_BUY_OFFER_LOW_RESERVE = -12 // not enough funds to create a new Offer
//   };
//
// ===========================================================================
xdr.enum("ManageBuyOfferResultCode", {
  manageBuyOfferSuccess: 0,
  manageBuyOfferMalformed: -1,
  manageBuyOfferSellNoTrust: -2,
  manageBuyOfferBuyNoTrust: -3,
  manageBuyOfferSellNotAuthorized: -4,
  manageBuyOfferBuyNotAuthorized: -5,
  manageBuyOfferLineFull: -6,
  manageBuyOfferUnderfunded: -7,
  manageBuyOfferCrossSelf: -8,
  manageBuyOfferSellNoIssuer: -9,
  manageBuyOfferBuyNoIssuer: -10,
  manageBuyOfferNotFound: -11,
  manageBuyOfferLowReserve: -12,
});

// === xdr source ============================================================
//
//   union ManageBuyOfferResult switch (ManageBuyOfferResultCode code)
//   {
//   case MANAGE_BUY_OFFER_SUCCESS:
//       ManageOfferSuccessResult success;
//   case MANAGE_BUY_OFFER_MALFORMED:
//   case MANAGE_BUY_OFFER_SELL_NO_TRUST:
//   case MANAGE_BUY_OFFER_BUY_NO_TRUST:
//   case MANAGE_BUY_OFFER_SELL_NOT_AUTHORIZED:
//   case MANAGE_BUY_OFFER_BUY_NOT_AUTHORIZED:
//   case MANAGE_BUY_OFFER_LINE_FULL:
//   case MANAGE_BUY_OFFER_UNDERFUNDED:
//   case MANAGE_BUY_OFFER_CROSS_SELF:
//   case MANAGE_BUY_OFFER_SELL_NO_ISSUER:
//   case MANAGE_BUY_OFFER_BUY_NO_ISSUER:
//   case MANAGE_BUY_OFFER_NOT_FOUND:
//   case MANAGE_BUY_OFFER_LOW_RESERVE:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageBuyOfferResult", {
  switchOn: xdr.lookup("ManageBuyOfferResultCode"),
  switchName: "code",
  switches: [
    ["manageBuyOfferSuccess", "success"],
    ["manageBuyOfferMalformed", xdr.void()],
    ["manageBuyOfferSellNoTrust", xdr.void()],
    ["manageBuyOfferBuyNoTrust", xdr.void()],
    ["manageBuyOfferSellNotAuthorized", xdr.void()],
    ["manageBuyOfferBuyNotAuthorized", xdr.void()],
    ["manageBuyOfferLineFull", xdr.void()],
    ["manageBuyOfferUnderfunded", xdr.void()],
    ["manageBuyOfferCrossSelf", xdr.void()],
    ["manageBuyOfferSellNoIssuer", xdr.void()],
    ["manageBuyOfferBuyNoIssuer", xdr.void()],
    ["manageBuyOfferNotFound", xdr.void()],
    ["manageBuyOfferLowReserve", xdr.void()],
  ],
  arms: {
    success: xdr.lookup("ManageOfferSuccessResult"),
  },
});

// === xdr source ============================================================
//
//   enum SetOptionsResultCode
//   {
//       // codes considered as "success" for the operation
//       SET_OPTIONS_SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       SET_OPTIONS_LOW_RESERVE = -1,      // not enough funds to add a signer
//       SET_OPTIONS_TOO_MANY_SIGNERS = -2, // max number of signers already reached
//       SET_OPTIONS_BAD_FLAGS = -3,        // invalid combination of clear/set flags
//       SET_OPTIONS_INVALID_INFLATION = -4,      // inflation account does not exist
//       SET_OPTIONS_CANT_CHANGE = -5,            // can no longer change this option
//       SET_OPTIONS_UNKNOWN_FLAG = -6,           // can't set an unknown flag
//       SET_OPTIONS_THRESHOLD_OUT_OF_RANGE = -7, // bad value for weight/threshold
//       SET_OPTIONS_BAD_SIGNER = -8,             // signer cannot be masterkey
//       SET_OPTIONS_INVALID_HOME_DOMAIN = -9,    // malformed home domain
//       SET_OPTIONS_AUTH_REVOCABLE_REQUIRED =
//           -10 // auth revocable is required for clawback
//   };
//
// ===========================================================================
xdr.enum("SetOptionsResultCode", {
  setOptionsSuccess: 0,
  setOptionsLowReserve: -1,
  setOptionsTooManySigners: -2,
  setOptionsBadFlags: -3,
  setOptionsInvalidInflation: -4,
  setOptionsCantChange: -5,
  setOptionsUnknownFlag: -6,
  setOptionsThresholdOutOfRange: -7,
  setOptionsBadSigner: -8,
  setOptionsInvalidHomeDomain: -9,
  setOptionsAuthRevocableRequired: -10,
});

// === xdr source ============================================================
//
//   union SetOptionsResult switch (SetOptionsResultCode code)
//   {
//   case SET_OPTIONS_SUCCESS:
//       void;
//   case SET_OPTIONS_LOW_RESERVE:
//   case SET_OPTIONS_TOO_MANY_SIGNERS:
//   case SET_OPTIONS_BAD_FLAGS:
//   case SET_OPTIONS_INVALID_INFLATION:
//   case SET_OPTIONS_CANT_CHANGE:
//   case SET_OPTIONS_UNKNOWN_FLAG:
//   case SET_OPTIONS_THRESHOLD_OUT_OF_RANGE:
//   case SET_OPTIONS_BAD_SIGNER:
//   case SET_OPTIONS_INVALID_HOME_DOMAIN:
//   case SET_OPTIONS_AUTH_REVOCABLE_REQUIRED:
//       void;
//   };
//
// ===========================================================================
xdr.union("SetOptionsResult", {
  switchOn: xdr.lookup("SetOptionsResultCode"),
  switchName: "code",
  switches: [
    ["setOptionsSuccess", xdr.void()],
    ["setOptionsLowReserve", xdr.void()],
    ["setOptionsTooManySigners", xdr.void()],
    ["setOptionsBadFlags", xdr.void()],
    ["setOptionsInvalidInflation", xdr.void()],
    ["setOptionsCantChange", xdr.void()],
    ["setOptionsUnknownFlag", xdr.void()],
    ["setOptionsThresholdOutOfRange", xdr.void()],
    ["setOptionsBadSigner", xdr.void()],
    ["setOptionsInvalidHomeDomain", xdr.void()],
    ["setOptionsAuthRevocableRequired", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum ChangeTrustResultCode
//   {
//       // codes considered as "success" for the operation
//       CHANGE_TRUST_SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       CHANGE_TRUST_MALFORMED = -1,     // bad input
//       CHANGE_TRUST_NO_ISSUER = -2,     // could not find issuer
//       CHANGE_TRUST_INVALID_LIMIT = -3, // cannot drop limit below balance
//                                        // cannot create with a limit of 0
//       CHANGE_TRUST_LOW_RESERVE =
//           -4, // not enough funds to create a new trust line,
//       CHANGE_TRUST_SELF_NOT_ALLOWED = -5,   // trusting self is not allowed
//       CHANGE_TRUST_TRUST_LINE_MISSING = -6, // Asset trustline is missing for pool
//       CHANGE_TRUST_CANNOT_DELETE =
//           -7, // Asset trustline is still referenced in a pool
//       CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES =
//           -8 // Asset trustline is deauthorized
//   };
//
// ===========================================================================
xdr.enum("ChangeTrustResultCode", {
  changeTrustSuccess: 0,
  changeTrustMalformed: -1,
  changeTrustNoIssuer: -2,
  changeTrustInvalidLimit: -3,
  changeTrustLowReserve: -4,
  changeTrustSelfNotAllowed: -5,
  changeTrustTrustLineMissing: -6,
  changeTrustCannotDelete: -7,
  changeTrustNotAuthMaintainLiabilities: -8,
});

// === xdr source ============================================================
//
//   union ChangeTrustResult switch (ChangeTrustResultCode code)
//   {
//   case CHANGE_TRUST_SUCCESS:
//       void;
//   case CHANGE_TRUST_MALFORMED:
//   case CHANGE_TRUST_NO_ISSUER:
//   case CHANGE_TRUST_INVALID_LIMIT:
//   case CHANGE_TRUST_LOW_RESERVE:
//   case CHANGE_TRUST_SELF_NOT_ALLOWED:
//   case CHANGE_TRUST_TRUST_LINE_MISSING:
//   case CHANGE_TRUST_CANNOT_DELETE:
//   case CHANGE_TRUST_NOT_AUTH_MAINTAIN_LIABILITIES:
//       void;
//   };
//
// ===========================================================================
xdr.union("ChangeTrustResult", {
  switchOn: xdr.lookup("ChangeTrustResultCode"),
  switchName: "code",
  switches: [
    ["changeTrustSuccess", xdr.void()],
    ["changeTrustMalformed", xdr.void()],
    ["changeTrustNoIssuer", xdr.void()],
    ["changeTrustInvalidLimit", xdr.void()],
    ["changeTrustLowReserve", xdr.void()],
    ["changeTrustSelfNotAllowed", xdr.void()],
    ["changeTrustTrustLineMissing", xdr.void()],
    ["changeTrustCannotDelete", xdr.void()],
    ["changeTrustNotAuthMaintainLiabilities", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum AllowTrustResultCode
//   {
//       // codes considered as "success" for the operation
//       ALLOW_TRUST_SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       ALLOW_TRUST_MALFORMED = -1,     // asset is not ASSET_TYPE_ALPHANUM
//       ALLOW_TRUST_NO_TRUST_LINE = -2, // trustor does not have a trustline
//                                       // source account does not require trust
//       ALLOW_TRUST_TRUST_NOT_REQUIRED = -3,
//       ALLOW_TRUST_CANT_REVOKE = -4,      // source account can't revoke trust,
//       ALLOW_TRUST_SELF_NOT_ALLOWED = -5, // trusting self is not allowed
//       ALLOW_TRUST_LOW_RESERVE = -6       // claimable balances can't be created
//                                          // on revoke due to low reserves
//   };
//
// ===========================================================================
xdr.enum("AllowTrustResultCode", {
  allowTrustSuccess: 0,
  allowTrustMalformed: -1,
  allowTrustNoTrustLine: -2,
  allowTrustTrustNotRequired: -3,
  allowTrustCantRevoke: -4,
  allowTrustSelfNotAllowed: -5,
  allowTrustLowReserve: -6,
});

// === xdr source ============================================================
//
//   union AllowTrustResult switch (AllowTrustResultCode code)
//   {
//   case ALLOW_TRUST_SUCCESS:
//       void;
//   case ALLOW_TRUST_MALFORMED:
//   case ALLOW_TRUST_NO_TRUST_LINE:
//   case ALLOW_TRUST_TRUST_NOT_REQUIRED:
//   case ALLOW_TRUST_CANT_REVOKE:
//   case ALLOW_TRUST_SELF_NOT_ALLOWED:
//   case ALLOW_TRUST_LOW_RESERVE:
//       void;
//   };
//
// ===========================================================================
xdr.union("AllowTrustResult", {
  switchOn: xdr.lookup("AllowTrustResultCode"),
  switchName: "code",
  switches: [
    ["allowTrustSuccess", xdr.void()],
    ["allowTrustMalformed", xdr.void()],
    ["allowTrustNoTrustLine", xdr.void()],
    ["allowTrustTrustNotRequired", xdr.void()],
    ["allowTrustCantRevoke", xdr.void()],
    ["allowTrustSelfNotAllowed", xdr.void()],
    ["allowTrustLowReserve", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum AccountMergeResultCode
//   {
//       // codes considered as "success" for the operation
//       ACCOUNT_MERGE_SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       ACCOUNT_MERGE_MALFORMED = -1,       // can't merge onto itself
//       ACCOUNT_MERGE_NO_ACCOUNT = -2,      // destination does not exist
//       ACCOUNT_MERGE_IMMUTABLE_SET = -3,   // source account has AUTH_IMMUTABLE set
//       ACCOUNT_MERGE_HAS_SUB_ENTRIES = -4, // account has trust lines/offers
//       ACCOUNT_MERGE_SEQNUM_TOO_FAR = -5,  // sequence number is over max allowed
//       ACCOUNT_MERGE_DEST_FULL = -6,       // can't add source balance to
//                                           // destination balance
//       ACCOUNT_MERGE_IS_SPONSOR = -7       // can't merge account that is a sponsor
//   };
//
// ===========================================================================
xdr.enum("AccountMergeResultCode", {
  accountMergeSuccess: 0,
  accountMergeMalformed: -1,
  accountMergeNoAccount: -2,
  accountMergeImmutableSet: -3,
  accountMergeHasSubEntries: -4,
  accountMergeSeqnumTooFar: -5,
  accountMergeDestFull: -6,
  accountMergeIsSponsor: -7,
});

// === xdr source ============================================================
//
//   union AccountMergeResult switch (AccountMergeResultCode code)
//   {
//   case ACCOUNT_MERGE_SUCCESS:
//       int64 sourceAccountBalance; // how much got transferred from source account
//   case ACCOUNT_MERGE_MALFORMED:
//   case ACCOUNT_MERGE_NO_ACCOUNT:
//   case ACCOUNT_MERGE_IMMUTABLE_SET:
//   case ACCOUNT_MERGE_HAS_SUB_ENTRIES:
//   case ACCOUNT_MERGE_SEQNUM_TOO_FAR:
//   case ACCOUNT_MERGE_DEST_FULL:
//   case ACCOUNT_MERGE_IS_SPONSOR:
//       void;
//   };
//
// ===========================================================================
xdr.union("AccountMergeResult", {
  switchOn: xdr.lookup("AccountMergeResultCode"),
  switchName: "code",
  switches: [
    ["accountMergeSuccess", "sourceAccountBalance"],
    ["accountMergeMalformed", xdr.void()],
    ["accountMergeNoAccount", xdr.void()],
    ["accountMergeImmutableSet", xdr.void()],
    ["accountMergeHasSubEntries", xdr.void()],
    ["accountMergeSeqnumTooFar", xdr.void()],
    ["accountMergeDestFull", xdr.void()],
    ["accountMergeIsSponsor", xdr.void()],
  ],
  arms: {
    sourceAccountBalance: xdr.lookup("Int64"),
  },
});

// === xdr source ============================================================
//
//   enum InflationResultCode
//   {
//       // codes considered as "success" for the operation
//       INFLATION_SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       INFLATION_NOT_TIME = -1
//   };
//
// ===========================================================================
xdr.enum("InflationResultCode", {
  inflationSuccess: 0,
  inflationNotTime: -1,
});

// === xdr source ============================================================
//
//   struct InflationPayout // or use PaymentResultAtom to limit types?
//   {
//       AccountID destination;
//       int64 amount;
//   };
//
// ===========================================================================
xdr.struct("InflationPayout", [
  ["destination", xdr.lookup("AccountId")],
  ["amount", xdr.lookup("Int64")],
]);

// === xdr source ============================================================
//
//   union InflationResult switch (InflationResultCode code)
//   {
//   case INFLATION_SUCCESS:
//       InflationPayout payouts<>;
//   case INFLATION_NOT_TIME:
//       void;
//   };
//
// ===========================================================================
xdr.union("InflationResult", {
  switchOn: xdr.lookup("InflationResultCode"),
  switchName: "code",
  switches: [
    ["inflationSuccess", "payouts"],
    ["inflationNotTime", xdr.void()],
  ],
  arms: {
    payouts: xdr.varArray(xdr.lookup("InflationPayout"), 2147483647),
  },
});

// === xdr source ============================================================
//
//   enum ManageDataResultCode
//   {
//       // codes considered as "success" for the operation
//       MANAGE_DATA_SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       MANAGE_DATA_NOT_SUPPORTED_YET =
//           -1, // The network hasn't moved to this protocol change yet
//       MANAGE_DATA_NAME_NOT_FOUND =
//           -2, // Trying to remove a Data Entry that isn't there
//       MANAGE_DATA_LOW_RESERVE = -3, // not enough funds to create a new Data Entry
//       MANAGE_DATA_INVALID_NAME = -4 // Name not a valid string
//   };
//
// ===========================================================================
xdr.enum("ManageDataResultCode", {
  manageDataSuccess: 0,
  manageDataNotSupportedYet: -1,
  manageDataNameNotFound: -2,
  manageDataLowReserve: -3,
  manageDataInvalidName: -4,
});

// === xdr source ============================================================
//
//   union ManageDataResult switch (ManageDataResultCode code)
//   {
//   case MANAGE_DATA_SUCCESS:
//       void;
//   case MANAGE_DATA_NOT_SUPPORTED_YET:
//   case MANAGE_DATA_NAME_NOT_FOUND:
//   case MANAGE_DATA_LOW_RESERVE:
//   case MANAGE_DATA_INVALID_NAME:
//       void;
//   };
//
// ===========================================================================
xdr.union("ManageDataResult", {
  switchOn: xdr.lookup("ManageDataResultCode"),
  switchName: "code",
  switches: [
    ["manageDataSuccess", xdr.void()],
    ["manageDataNotSupportedYet", xdr.void()],
    ["manageDataNameNotFound", xdr.void()],
    ["manageDataLowReserve", xdr.void()],
    ["manageDataInvalidName", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum BumpSequenceResultCode
//   {
//       // codes considered as "success" for the operation
//       BUMP_SEQUENCE_SUCCESS = 0,
//       // codes considered as "failure" for the operation
//       BUMP_SEQUENCE_BAD_SEQ = -1 // `bumpTo` is not within bounds
//   };
//
// ===========================================================================
xdr.enum("BumpSequenceResultCode", {
  bumpSequenceSuccess: 0,
  bumpSequenceBadSeq: -1,
});

// === xdr source ============================================================
//
//   union BumpSequenceResult switch (BumpSequenceResultCode code)
//   {
//   case BUMP_SEQUENCE_SUCCESS:
//       void;
//   case BUMP_SEQUENCE_BAD_SEQ:
//       void;
//   };
//
// ===========================================================================
xdr.union("BumpSequenceResult", {
  switchOn: xdr.lookup("BumpSequenceResultCode"),
  switchName: "code",
  switches: [
    ["bumpSequenceSuccess", xdr.void()],
    ["bumpSequenceBadSeq", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum CreateClaimableBalanceResultCode
//   {
//       CREATE_CLAIMABLE_BALANCE_SUCCESS = 0,
//       CREATE_CLAIMABLE_BALANCE_MALFORMED = -1,
//       CREATE_CLAIMABLE_BALANCE_LOW_RESERVE = -2,
//       CREATE_CLAIMABLE_BALANCE_NO_TRUST = -3,
//       CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED = -4,
//       CREATE_CLAIMABLE_BALANCE_UNDERFUNDED = -5
//   };
//
// ===========================================================================
xdr.enum("CreateClaimableBalanceResultCode", {
  createClaimableBalanceSuccess: 0,
  createClaimableBalanceMalformed: -1,
  createClaimableBalanceLowReserve: -2,
  createClaimableBalanceNoTrust: -3,
  createClaimableBalanceNotAuthorized: -4,
  createClaimableBalanceUnderfunded: -5,
});

// === xdr source ============================================================
//
//   union CreateClaimableBalanceResult switch (
//       CreateClaimableBalanceResultCode code)
//   {
//   case CREATE_CLAIMABLE_BALANCE_SUCCESS:
//       ClaimableBalanceID balanceID;
//   case CREATE_CLAIMABLE_BALANCE_MALFORMED:
//   case CREATE_CLAIMABLE_BALANCE_LOW_RESERVE:
//   case CREATE_CLAIMABLE_BALANCE_NO_TRUST:
//   case CREATE_CLAIMABLE_BALANCE_NOT_AUTHORIZED:
//   case CREATE_CLAIMABLE_BALANCE_UNDERFUNDED:
//       void;
//   };
//
// ===========================================================================
xdr.union("CreateClaimableBalanceResult", {
  switchOn: xdr.lookup("CreateClaimableBalanceResultCode"),
  switchName: "code",
  switches: [
    ["createClaimableBalanceSuccess", "balanceId"],
    ["createClaimableBalanceMalformed", xdr.void()],
    ["createClaimableBalanceLowReserve", xdr.void()],
    ["createClaimableBalanceNoTrust", xdr.void()],
    ["createClaimableBalanceNotAuthorized", xdr.void()],
    ["createClaimableBalanceUnderfunded", xdr.void()],
  ],
  arms: {
    balanceId: xdr.lookup("ClaimableBalanceId"),
  },
});

// === xdr source ============================================================
//
//   enum ClaimClaimableBalanceResultCode
//   {
//       CLAIM_CLAIMABLE_BALANCE_SUCCESS = 0,
//       CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST = -1,
//       CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM = -2,
//       CLAIM_CLAIMABLE_BALANCE_LINE_FULL = -3,
//       CLAIM_CLAIMABLE_BALANCE_NO_TRUST = -4,
//       CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED = -5
//   };
//
// ===========================================================================
xdr.enum("ClaimClaimableBalanceResultCode", {
  claimClaimableBalanceSuccess: 0,
  claimClaimableBalanceDoesNotExist: -1,
  claimClaimableBalanceCannotClaim: -2,
  claimClaimableBalanceLineFull: -3,
  claimClaimableBalanceNoTrust: -4,
  claimClaimableBalanceNotAuthorized: -5,
});

// === xdr source ============================================================
//
//   union ClaimClaimableBalanceResult switch (ClaimClaimableBalanceResultCode code)
//   {
//   case CLAIM_CLAIMABLE_BALANCE_SUCCESS:
//       void;
//   case CLAIM_CLAIMABLE_BALANCE_DOES_NOT_EXIST:
//   case CLAIM_CLAIMABLE_BALANCE_CANNOT_CLAIM:
//   case CLAIM_CLAIMABLE_BALANCE_LINE_FULL:
//   case CLAIM_CLAIMABLE_BALANCE_NO_TRUST:
//   case CLAIM_CLAIMABLE_BALANCE_NOT_AUTHORIZED:
//       void;
//   };
//
// ===========================================================================
xdr.union("ClaimClaimableBalanceResult", {
  switchOn: xdr.lookup("ClaimClaimableBalanceResultCode"),
  switchName: "code",
  switches: [
    ["claimClaimableBalanceSuccess", xdr.void()],
    ["claimClaimableBalanceDoesNotExist", xdr.void()],
    ["claimClaimableBalanceCannotClaim", xdr.void()],
    ["claimClaimableBalanceLineFull", xdr.void()],
    ["claimClaimableBalanceNoTrust", xdr.void()],
    ["claimClaimableBalanceNotAuthorized", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum BeginSponsoringFutureReservesResultCode
//   {
//       // codes considered as "success" for the operation
//       BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED = -1,
//       BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED = -2,
//       BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE = -3
//   };
//
// ===========================================================================
xdr.enum("BeginSponsoringFutureReservesResultCode", {
  beginSponsoringFutureReservesSuccess: 0,
  beginSponsoringFutureReservesMalformed: -1,
  beginSponsoringFutureReservesAlreadySponsored: -2,
  beginSponsoringFutureReservesRecursive: -3,
});

// === xdr source ============================================================
//
//   union BeginSponsoringFutureReservesResult switch (
//       BeginSponsoringFutureReservesResultCode code)
//   {
//   case BEGIN_SPONSORING_FUTURE_RESERVES_SUCCESS:
//       void;
//   case BEGIN_SPONSORING_FUTURE_RESERVES_MALFORMED:
//   case BEGIN_SPONSORING_FUTURE_RESERVES_ALREADY_SPONSORED:
//   case BEGIN_SPONSORING_FUTURE_RESERVES_RECURSIVE:
//       void;
//   };
//
// ===========================================================================
xdr.union("BeginSponsoringFutureReservesResult", {
  switchOn: xdr.lookup("BeginSponsoringFutureReservesResultCode"),
  switchName: "code",
  switches: [
    ["beginSponsoringFutureReservesSuccess", xdr.void()],
    ["beginSponsoringFutureReservesMalformed", xdr.void()],
    ["beginSponsoringFutureReservesAlreadySponsored", xdr.void()],
    ["beginSponsoringFutureReservesRecursive", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum EndSponsoringFutureReservesResultCode
//   {
//       // codes considered as "success" for the operation
//       END_SPONSORING_FUTURE_RESERVES_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED = -1
//   };
//
// ===========================================================================
xdr.enum("EndSponsoringFutureReservesResultCode", {
  endSponsoringFutureReservesSuccess: 0,
  endSponsoringFutureReservesNotSponsored: -1,
});

// === xdr source ============================================================
//
//   union EndSponsoringFutureReservesResult switch (
//       EndSponsoringFutureReservesResultCode code)
//   {
//   case END_SPONSORING_FUTURE_RESERVES_SUCCESS:
//       void;
//   case END_SPONSORING_FUTURE_RESERVES_NOT_SPONSORED:
//       void;
//   };
//
// ===========================================================================
xdr.union("EndSponsoringFutureReservesResult", {
  switchOn: xdr.lookup("EndSponsoringFutureReservesResultCode"),
  switchName: "code",
  switches: [
    ["endSponsoringFutureReservesSuccess", xdr.void()],
    ["endSponsoringFutureReservesNotSponsored", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum RevokeSponsorshipResultCode
//   {
//       // codes considered as "success" for the operation
//       REVOKE_SPONSORSHIP_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       REVOKE_SPONSORSHIP_DOES_NOT_EXIST = -1,
//       REVOKE_SPONSORSHIP_NOT_SPONSOR = -2,
//       REVOKE_SPONSORSHIP_LOW_RESERVE = -3,
//       REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE = -4,
//       REVOKE_SPONSORSHIP_MALFORMED = -5
//   };
//
// ===========================================================================
xdr.enum("RevokeSponsorshipResultCode", {
  revokeSponsorshipSuccess: 0,
  revokeSponsorshipDoesNotExist: -1,
  revokeSponsorshipNotSponsor: -2,
  revokeSponsorshipLowReserve: -3,
  revokeSponsorshipOnlyTransferable: -4,
  revokeSponsorshipMalformed: -5,
});

// === xdr source ============================================================
//
//   union RevokeSponsorshipResult switch (RevokeSponsorshipResultCode code)
//   {
//   case REVOKE_SPONSORSHIP_SUCCESS:
//       void;
//   case REVOKE_SPONSORSHIP_DOES_NOT_EXIST:
//   case REVOKE_SPONSORSHIP_NOT_SPONSOR:
//   case REVOKE_SPONSORSHIP_LOW_RESERVE:
//   case REVOKE_SPONSORSHIP_ONLY_TRANSFERABLE:
//   case REVOKE_SPONSORSHIP_MALFORMED:
//       void;
//   };
//
// ===========================================================================
xdr.union("RevokeSponsorshipResult", {
  switchOn: xdr.lookup("RevokeSponsorshipResultCode"),
  switchName: "code",
  switches: [
    ["revokeSponsorshipSuccess", xdr.void()],
    ["revokeSponsorshipDoesNotExist", xdr.void()],
    ["revokeSponsorshipNotSponsor", xdr.void()],
    ["revokeSponsorshipLowReserve", xdr.void()],
    ["revokeSponsorshipOnlyTransferable", xdr.void()],
    ["revokeSponsorshipMalformed", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum ClawbackResultCode
//   {
//       // codes considered as "success" for the operation
//       CLAWBACK_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       CLAWBACK_MALFORMED = -1,
//       CLAWBACK_NOT_CLAWBACK_ENABLED = -2,
//       CLAWBACK_NO_TRUST = -3,
//       CLAWBACK_UNDERFUNDED = -4
//   };
//
// ===========================================================================
xdr.enum("ClawbackResultCode", {
  clawbackSuccess: 0,
  clawbackMalformed: -1,
  clawbackNotClawbackEnabled: -2,
  clawbackNoTrust: -3,
  clawbackUnderfunded: -4,
});

// === xdr source ============================================================
//
//   union ClawbackResult switch (ClawbackResultCode code)
//   {
//   case CLAWBACK_SUCCESS:
//       void;
//   case CLAWBACK_MALFORMED:
//   case CLAWBACK_NOT_CLAWBACK_ENABLED:
//   case CLAWBACK_NO_TRUST:
//   case CLAWBACK_UNDERFUNDED:
//       void;
//   };
//
// ===========================================================================
xdr.union("ClawbackResult", {
  switchOn: xdr.lookup("ClawbackResultCode"),
  switchName: "code",
  switches: [
    ["clawbackSuccess", xdr.void()],
    ["clawbackMalformed", xdr.void()],
    ["clawbackNotClawbackEnabled", xdr.void()],
    ["clawbackNoTrust", xdr.void()],
    ["clawbackUnderfunded", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum ClawbackClaimableBalanceResultCode
//   {
//       // codes considered as "success" for the operation
//       CLAWBACK_CLAIMABLE_BALANCE_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST = -1,
//       CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER = -2,
//       CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED = -3
//   };
//
// ===========================================================================
xdr.enum("ClawbackClaimableBalanceResultCode", {
  clawbackClaimableBalanceSuccess: 0,
  clawbackClaimableBalanceDoesNotExist: -1,
  clawbackClaimableBalanceNotIssuer: -2,
  clawbackClaimableBalanceNotClawbackEnabled: -3,
});

// === xdr source ============================================================
//
//   union ClawbackClaimableBalanceResult switch (
//       ClawbackClaimableBalanceResultCode code)
//   {
//   case CLAWBACK_CLAIMABLE_BALANCE_SUCCESS:
//       void;
//   case CLAWBACK_CLAIMABLE_BALANCE_DOES_NOT_EXIST:
//   case CLAWBACK_CLAIMABLE_BALANCE_NOT_ISSUER:
//   case CLAWBACK_CLAIMABLE_BALANCE_NOT_CLAWBACK_ENABLED:
//       void;
//   };
//
// ===========================================================================
xdr.union("ClawbackClaimableBalanceResult", {
  switchOn: xdr.lookup("ClawbackClaimableBalanceResultCode"),
  switchName: "code",
  switches: [
    ["clawbackClaimableBalanceSuccess", xdr.void()],
    ["clawbackClaimableBalanceDoesNotExist", xdr.void()],
    ["clawbackClaimableBalanceNotIssuer", xdr.void()],
    ["clawbackClaimableBalanceNotClawbackEnabled", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum SetTrustLineFlagsResultCode
//   {
//       // codes considered as "success" for the operation
//       SET_TRUST_LINE_FLAGS_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       SET_TRUST_LINE_FLAGS_MALFORMED = -1,
//       SET_TRUST_LINE_FLAGS_NO_TRUST_LINE = -2,
//       SET_TRUST_LINE_FLAGS_CANT_REVOKE = -3,
//       SET_TRUST_LINE_FLAGS_INVALID_STATE = -4,
//       SET_TRUST_LINE_FLAGS_LOW_RESERVE = -5 // claimable balances can't be created
//                                             // on revoke due to low reserves
//   };
//
// ===========================================================================
xdr.enum("SetTrustLineFlagsResultCode", {
  setTrustLineFlagsSuccess: 0,
  setTrustLineFlagsMalformed: -1,
  setTrustLineFlagsNoTrustLine: -2,
  setTrustLineFlagsCantRevoke: -3,
  setTrustLineFlagsInvalidState: -4,
  setTrustLineFlagsLowReserve: -5,
});

// === xdr source ============================================================
//
//   union SetTrustLineFlagsResult switch (SetTrustLineFlagsResultCode code)
//   {
//   case SET_TRUST_LINE_FLAGS_SUCCESS:
//       void;
//   case SET_TRUST_LINE_FLAGS_MALFORMED:
//   case SET_TRUST_LINE_FLAGS_NO_TRUST_LINE:
//   case SET_TRUST_LINE_FLAGS_CANT_REVOKE:
//   case SET_TRUST_LINE_FLAGS_INVALID_STATE:
//   case SET_TRUST_LINE_FLAGS_LOW_RESERVE:
//       void;
//   };
//
// ===========================================================================
xdr.union("SetTrustLineFlagsResult", {
  switchOn: xdr.lookup("SetTrustLineFlagsResultCode"),
  switchName: "code",
  switches: [
    ["setTrustLineFlagsSuccess", xdr.void()],
    ["setTrustLineFlagsMalformed", xdr.void()],
    ["setTrustLineFlagsNoTrustLine", xdr.void()],
    ["setTrustLineFlagsCantRevoke", xdr.void()],
    ["setTrustLineFlagsInvalidState", xdr.void()],
    ["setTrustLineFlagsLowReserve", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum LiquidityPoolDepositResultCode
//   {
//       // codes considered as "success" for the operation
//       LIQUIDITY_POOL_DEPOSIT_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       LIQUIDITY_POOL_DEPOSIT_MALFORMED = -1,      // bad input
//       LIQUIDITY_POOL_DEPOSIT_NO_TRUST = -2,       // no trust line for one of the
//                                                   // assets
//       LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED = -3, // not authorized for one of the
//                                                   // assets
//       LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED = -4,    // not enough balance for one of
//                                                   // the assets
//       LIQUIDITY_POOL_DEPOSIT_LINE_FULL = -5,      // pool share trust line doesn't
//                                                   // have sufficient limit
//       LIQUIDITY_POOL_DEPOSIT_BAD_PRICE = -6,      // deposit price outside bounds
//       LIQUIDITY_POOL_DEPOSIT_POOL_FULL = -7       // pool reserves are full
//   };
//
// ===========================================================================
xdr.enum("LiquidityPoolDepositResultCode", {
  liquidityPoolDepositSuccess: 0,
  liquidityPoolDepositMalformed: -1,
  liquidityPoolDepositNoTrust: -2,
  liquidityPoolDepositNotAuthorized: -3,
  liquidityPoolDepositUnderfunded: -4,
  liquidityPoolDepositLineFull: -5,
  liquidityPoolDepositBadPrice: -6,
  liquidityPoolDepositPoolFull: -7,
});

// === xdr source ============================================================
//
//   union LiquidityPoolDepositResult switch (LiquidityPoolDepositResultCode code)
//   {
//   case LIQUIDITY_POOL_DEPOSIT_SUCCESS:
//       void;
//   case LIQUIDITY_POOL_DEPOSIT_MALFORMED:
//   case LIQUIDITY_POOL_DEPOSIT_NO_TRUST:
//   case LIQUIDITY_POOL_DEPOSIT_NOT_AUTHORIZED:
//   case LIQUIDITY_POOL_DEPOSIT_UNDERFUNDED:
//   case LIQUIDITY_POOL_DEPOSIT_LINE_FULL:
//   case LIQUIDITY_POOL_DEPOSIT_BAD_PRICE:
//   case LIQUIDITY_POOL_DEPOSIT_POOL_FULL:
//       void;
//   };
//
// ===========================================================================
xdr.union("LiquidityPoolDepositResult", {
  switchOn: xdr.lookup("LiquidityPoolDepositResultCode"),
  switchName: "code",
  switches: [
    ["liquidityPoolDepositSuccess", xdr.void()],
    ["liquidityPoolDepositMalformed", xdr.void()],
    ["liquidityPoolDepositNoTrust", xdr.void()],
    ["liquidityPoolDepositNotAuthorized", xdr.void()],
    ["liquidityPoolDepositUnderfunded", xdr.void()],
    ["liquidityPoolDepositLineFull", xdr.void()],
    ["liquidityPoolDepositBadPrice", xdr.void()],
    ["liquidityPoolDepositPoolFull", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum LiquidityPoolWithdrawResultCode
//   {
//       // codes considered as "success" for the operation
//       LIQUIDITY_POOL_WITHDRAW_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       LIQUIDITY_POOL_WITHDRAW_MALFORMED = -1,    // bad input
//       LIQUIDITY_POOL_WITHDRAW_NO_TRUST = -2,     // no trust line for one of the
//                                                  // assets
//       LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED = -3,  // not enough balance of the
//                                                  // pool share
//       LIQUIDITY_POOL_WITHDRAW_LINE_FULL = -4,    // would go above limit for one
//                                                  // of the assets
//       LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM = -5 // didn't withdraw enough
//   };
//
// ===========================================================================
xdr.enum("LiquidityPoolWithdrawResultCode", {
  liquidityPoolWithdrawSuccess: 0,
  liquidityPoolWithdrawMalformed: -1,
  liquidityPoolWithdrawNoTrust: -2,
  liquidityPoolWithdrawUnderfunded: -3,
  liquidityPoolWithdrawLineFull: -4,
  liquidityPoolWithdrawUnderMinimum: -5,
});

// === xdr source ============================================================
//
//   union LiquidityPoolWithdrawResult switch (LiquidityPoolWithdrawResultCode code)
//   {
//   case LIQUIDITY_POOL_WITHDRAW_SUCCESS:
//       void;
//   case LIQUIDITY_POOL_WITHDRAW_MALFORMED:
//   case LIQUIDITY_POOL_WITHDRAW_NO_TRUST:
//   case LIQUIDITY_POOL_WITHDRAW_UNDERFUNDED:
//   case LIQUIDITY_POOL_WITHDRAW_LINE_FULL:
//   case LIQUIDITY_POOL_WITHDRAW_UNDER_MINIMUM:
//       void;
//   };
//
// ===========================================================================
xdr.union("LiquidityPoolWithdrawResult", {
  switchOn: xdr.lookup("LiquidityPoolWithdrawResultCode"),
  switchName: "code",
  switches: [
    ["liquidityPoolWithdrawSuccess", xdr.void()],
    ["liquidityPoolWithdrawMalformed", xdr.void()],
    ["liquidityPoolWithdrawNoTrust", xdr.void()],
    ["liquidityPoolWithdrawUnderfunded", xdr.void()],
    ["liquidityPoolWithdrawLineFull", xdr.void()],
    ["liquidityPoolWithdrawUnderMinimum", xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum InvokeHostFunctionResultCode
//   {
//       // codes considered as "success" for the operation
//       INVOKE_HOST_FUNCTION_SUCCESS = 0,
//   
//       // codes considered as "failure" for the operation
//       INVOKE_HOST_FUNCTION_MALFORMED = -1,
//       INVOKE_HOST_FUNCTION_TRAPPED = -2
//   };
//
// ===========================================================================
xdr.enum("InvokeHostFunctionResultCode", {
  invokeHostFunctionSuccess: 0,
  invokeHostFunctionMalformed: -1,
  invokeHostFunctionTrapped: -2,
});

// === xdr source ============================================================
//
//   union InvokeHostFunctionResult switch (InvokeHostFunctionResultCode code)
//   {
//   case INVOKE_HOST_FUNCTION_SUCCESS:
//       SCVal success;
//   case INVOKE_HOST_FUNCTION_MALFORMED:
//   case INVOKE_HOST_FUNCTION_TRAPPED:
//       void;
//   };
//
// ===========================================================================
xdr.union("InvokeHostFunctionResult", {
  switchOn: xdr.lookup("InvokeHostFunctionResultCode"),
  switchName: "code",
  switches: [
    ["invokeHostFunctionSuccess", "success"],
    ["invokeHostFunctionMalformed", xdr.void()],
    ["invokeHostFunctionTrapped", xdr.void()],
  ],
  arms: {
    success: xdr.lookup("ScVal"),
  },
});

// === xdr source ============================================================
//
//   enum OperationResultCode
//   {
//       opINNER = 0, // inner object result is valid
//   
//       opBAD_AUTH = -1,            // too few valid signatures / wrong network
//       opNO_ACCOUNT = -2,          // source account was not found
//       opNOT_SUPPORTED = -3,       // operation not supported at this time
//       opTOO_MANY_SUBENTRIES = -4, // max number of subentries already reached
//       opEXCEEDED_WORK_LIMIT = -5, // operation did too much work
//       opTOO_MANY_SPONSORING = -6  // account is sponsoring too many entries
//   };
//
// ===========================================================================
xdr.enum("OperationResultCode", {
  opInner: 0,
  opBadAuth: -1,
  opNoAccount: -2,
  opNotSupported: -3,
  opTooManySubentries: -4,
  opExceededWorkLimit: -5,
  opTooManySponsoring: -6,
});

// === xdr source ============================================================
//
//   union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountResult createAccountResult;
//       case PAYMENT:
//           PaymentResult paymentResult;
//       case PATH_PAYMENT_STRICT_RECEIVE:
//           PathPaymentStrictReceiveResult pathPaymentStrictReceiveResult;
//       case MANAGE_SELL_OFFER:
//           ManageSellOfferResult manageSellOfferResult;
//       case CREATE_PASSIVE_SELL_OFFER:
//           ManageSellOfferResult createPassiveSellOfferResult;
//       case SET_OPTIONS:
//           SetOptionsResult setOptionsResult;
//       case CHANGE_TRUST:
//           ChangeTrustResult changeTrustResult;
//       case ALLOW_TRUST:
//           AllowTrustResult allowTrustResult;
//       case ACCOUNT_MERGE:
//           AccountMergeResult accountMergeResult;
//       case INFLATION:
//           InflationResult inflationResult;
//       case MANAGE_DATA:
//           ManageDataResult manageDataResult;
//       case BUMP_SEQUENCE:
//           BumpSequenceResult bumpSeqResult;
//       case MANAGE_BUY_OFFER:
//           ManageBuyOfferResult manageBuyOfferResult;
//       case PATH_PAYMENT_STRICT_SEND:
//           PathPaymentStrictSendResult pathPaymentStrictSendResult;
//       case CREATE_CLAIMABLE_BALANCE:
//           CreateClaimableBalanceResult createClaimableBalanceResult;
//       case CLAIM_CLAIMABLE_BALANCE:
//           ClaimClaimableBalanceResult claimClaimableBalanceResult;
//       case BEGIN_SPONSORING_FUTURE_RESERVES:
//           BeginSponsoringFutureReservesResult beginSponsoringFutureReservesResult;
//       case END_SPONSORING_FUTURE_RESERVES:
//           EndSponsoringFutureReservesResult endSponsoringFutureReservesResult;
//       case REVOKE_SPONSORSHIP:
//           RevokeSponsorshipResult revokeSponsorshipResult;
//       case CLAWBACK:
//           ClawbackResult clawbackResult;
//       case CLAWBACK_CLAIMABLE_BALANCE:
//           ClawbackClaimableBalanceResult clawbackClaimableBalanceResult;
//       case SET_TRUST_LINE_FLAGS:
//           SetTrustLineFlagsResult setTrustLineFlagsResult;
//       case LIQUIDITY_POOL_DEPOSIT:
//           LiquidityPoolDepositResult liquidityPoolDepositResult;
//       case LIQUIDITY_POOL_WITHDRAW:
//           LiquidityPoolWithdrawResult liquidityPoolWithdrawResult;
//       case INVOKE_HOST_FUNCTION:
//           InvokeHostFunctionResult invokeHostFunctionResult;
//       }
//
// ===========================================================================
xdr.union("OperationResultTr", {
  switchOn: xdr.lookup("OperationType"),
  switchName: "type",
  switches: [
    ["createAccount", "createAccountResult"],
    ["payment", "paymentResult"],
    ["pathPaymentStrictReceive", "pathPaymentStrictReceiveResult"],
    ["manageSellOffer", "manageSellOfferResult"],
    ["createPassiveSellOffer", "createPassiveSellOfferResult"],
    ["setOptions", "setOptionsResult"],
    ["changeTrust", "changeTrustResult"],
    ["allowTrust", "allowTrustResult"],
    ["accountMerge", "accountMergeResult"],
    ["inflation", "inflationResult"],
    ["manageData", "manageDataResult"],
    ["bumpSequence", "bumpSeqResult"],
    ["manageBuyOffer", "manageBuyOfferResult"],
    ["pathPaymentStrictSend", "pathPaymentStrictSendResult"],
    ["createClaimableBalance", "createClaimableBalanceResult"],
    ["claimClaimableBalance", "claimClaimableBalanceResult"],
    ["beginSponsoringFutureReserves", "beginSponsoringFutureReservesResult"],
    ["endSponsoringFutureReserves", "endSponsoringFutureReservesResult"],
    ["revokeSponsorship", "revokeSponsorshipResult"],
    ["clawback", "clawbackResult"],
    ["clawbackClaimableBalance", "clawbackClaimableBalanceResult"],
    ["setTrustLineFlags", "setTrustLineFlagsResult"],
    ["liquidityPoolDeposit", "liquidityPoolDepositResult"],
    ["liquidityPoolWithdraw", "liquidityPoolWithdrawResult"],
    ["invokeHostFunction", "invokeHostFunctionResult"],
  ],
  arms: {
    createAccountResult: xdr.lookup("CreateAccountResult"),
    paymentResult: xdr.lookup("PaymentResult"),
    pathPaymentStrictReceiveResult: xdr.lookup("PathPaymentStrictReceiveResult"),
    manageSellOfferResult: xdr.lookup("ManageSellOfferResult"),
    createPassiveSellOfferResult: xdr.lookup("ManageSellOfferResult"),
    setOptionsResult: xdr.lookup("SetOptionsResult"),
    changeTrustResult: xdr.lookup("ChangeTrustResult"),
    allowTrustResult: xdr.lookup("AllowTrustResult"),
    accountMergeResult: xdr.lookup("AccountMergeResult"),
    inflationResult: xdr.lookup("InflationResult"),
    manageDataResult: xdr.lookup("ManageDataResult"),
    bumpSeqResult: xdr.lookup("BumpSequenceResult"),
    manageBuyOfferResult: xdr.lookup("ManageBuyOfferResult"),
    pathPaymentStrictSendResult: xdr.lookup("PathPaymentStrictSendResult"),
    createClaimableBalanceResult: xdr.lookup("CreateClaimableBalanceResult"),
    claimClaimableBalanceResult: xdr.lookup("ClaimClaimableBalanceResult"),
    beginSponsoringFutureReservesResult: xdr.lookup("BeginSponsoringFutureReservesResult"),
    endSponsoringFutureReservesResult: xdr.lookup("EndSponsoringFutureReservesResult"),
    revokeSponsorshipResult: xdr.lookup("RevokeSponsorshipResult"),
    clawbackResult: xdr.lookup("ClawbackResult"),
    clawbackClaimableBalanceResult: xdr.lookup("ClawbackClaimableBalanceResult"),
    setTrustLineFlagsResult: xdr.lookup("SetTrustLineFlagsResult"),
    liquidityPoolDepositResult: xdr.lookup("LiquidityPoolDepositResult"),
    liquidityPoolWithdrawResult: xdr.lookup("LiquidityPoolWithdrawResult"),
    invokeHostFunctionResult: xdr.lookup("InvokeHostFunctionResult"),
  },
});

// === xdr source ============================================================
//
//   union OperationResult switch (OperationResultCode code)
//   {
//   case opINNER:
//       union switch (OperationType type)
//       {
//       case CREATE_ACCOUNT:
//           CreateAccountResult createAccountResult;
//       case PAYMENT:
//           PaymentResult paymentResult;
//       case PATH_PAYMENT_STRICT_RECEIVE:
//           PathPaymentStrictReceiveResult pathPaymentStrictReceiveResult;
//       case MANAGE_SELL_OFFER:
//           ManageSellOfferResult manageSellOfferResult;
//       case CREATE_PASSIVE_SELL_OFFER:
//           ManageSellOfferResult createPassiveSellOfferResult;
//       case SET_OPTIONS:
//           SetOptionsResult setOptionsResult;
//       case CHANGE_TRUST:
//           ChangeTrustResult changeTrustResult;
//       case ALLOW_TRUST:
//           AllowTrustResult allowTrustResult;
//       case ACCOUNT_MERGE:
//           AccountMergeResult accountMergeResult;
//       case INFLATION:
//           InflationResult inflationResult;
//       case MANAGE_DATA:
//           ManageDataResult manageDataResult;
//       case BUMP_SEQUENCE:
//           BumpSequenceResult bumpSeqResult;
//       case MANAGE_BUY_OFFER:
//           ManageBuyOfferResult manageBuyOfferResult;
//       case PATH_PAYMENT_STRICT_SEND:
//           PathPaymentStrictSendResult pathPaymentStrictSendResult;
//       case CREATE_CLAIMABLE_BALANCE:
//           CreateClaimableBalanceResult createClaimableBalanceResult;
//       case CLAIM_CLAIMABLE_BALANCE:
//           ClaimClaimableBalanceResult claimClaimableBalanceResult;
//       case BEGIN_SPONSORING_FUTURE_RESERVES:
//           BeginSponsoringFutureReservesResult beginSponsoringFutureReservesResult;
//       case END_SPONSORING_FUTURE_RESERVES:
//           EndSponsoringFutureReservesResult endSponsoringFutureReservesResult;
//       case REVOKE_SPONSORSHIP:
//           RevokeSponsorshipResult revokeSponsorshipResult;
//       case CLAWBACK:
//           ClawbackResult clawbackResult;
//       case CLAWBACK_CLAIMABLE_BALANCE:
//           ClawbackClaimableBalanceResult clawbackClaimableBalanceResult;
//       case SET_TRUST_LINE_FLAGS:
//           SetTrustLineFlagsResult setTrustLineFlagsResult;
//       case LIQUIDITY_POOL_DEPOSIT:
//           LiquidityPoolDepositResult liquidityPoolDepositResult;
//       case LIQUIDITY_POOL_WITHDRAW:
//           LiquidityPoolWithdrawResult liquidityPoolWithdrawResult;
//       case INVOKE_HOST_FUNCTION:
//           InvokeHostFunctionResult invokeHostFunctionResult;
//       }
//       tr;
//   case opBAD_AUTH:
//   case opNO_ACCOUNT:
//   case opNOT_SUPPORTED:
//   case opTOO_MANY_SUBENTRIES:
//   case opEXCEEDED_WORK_LIMIT:
//   case opTOO_MANY_SPONSORING:
//       void;
//   };
//
// ===========================================================================
xdr.union("OperationResult", {
  switchOn: xdr.lookup("OperationResultCode"),
  switchName: "code",
  switches: [
    ["opInner", "tr"],
    ["opBadAuth", xdr.void()],
    ["opNoAccount", xdr.void()],
    ["opNotSupported", xdr.void()],
    ["opTooManySubentries", xdr.void()],
    ["opExceededWorkLimit", xdr.void()],
    ["opTooManySponsoring", xdr.void()],
  ],
  arms: {
    tr: xdr.lookup("OperationResultTr"),
  },
});

// === xdr source ============================================================
//
//   enum TransactionResultCode
//   {
//       txFEE_BUMP_INNER_SUCCESS = 1, // fee bump inner transaction succeeded
//       txSUCCESS = 0,                // all operations succeeded
//   
//       txFAILED = -1, // one of the operations failed (none were applied)
//   
//       txTOO_EARLY = -2,         // ledger closeTime before minTime
//       txTOO_LATE = -3,          // ledger closeTime after maxTime
//       txMISSING_OPERATION = -4, // no operation was specified
//       txBAD_SEQ = -5,           // sequence number does not match source account
//   
//       txBAD_AUTH = -6,             // too few valid signatures / wrong network
//       txINSUFFICIENT_BALANCE = -7, // fee would bring account below reserve
//       txNO_ACCOUNT = -8,           // source account not found
//       txINSUFFICIENT_FEE = -9,     // fee is too small
//       txBAD_AUTH_EXTRA = -10,      // unused signatures attached to transaction
//       txINTERNAL_ERROR = -11,      // an unknown error occurred
//   
//       txNOT_SUPPORTED = -12,         // transaction type not supported
//       txFEE_BUMP_INNER_FAILED = -13, // fee bump inner transaction failed
//       txBAD_SPONSORSHIP = -14,       // sponsorship not confirmed
//       txBAD_MIN_SEQ_AGE_OR_GAP =
//           -15, // minSeqAge or minSeqLedgerGap conditions not met
//       txMALFORMED = -16 // precondition is invalid
//   };
//
// ===========================================================================
xdr.enum("TransactionResultCode", {
  txFeeBumpInnerSuccess: 1,
  txSuccess: 0,
  txFailed: -1,
  txTooEarly: -2,
  txTooLate: -3,
  txMissingOperation: -4,
  txBadSeq: -5,
  txBadAuth: -6,
  txInsufficientBalance: -7,
  txNoAccount: -8,
  txInsufficientFee: -9,
  txBadAuthExtra: -10,
  txInternalError: -11,
  txNotSupported: -12,
  txFeeBumpInnerFailed: -13,
  txBadSponsorship: -14,
  txBadMinSeqAgeOrGap: -15,
  txMalformed: -16,
});

// === xdr source ============================================================
//
//   union switch (TransactionResultCode code)
//       {
//       // txFEE_BUMP_INNER_SUCCESS is not included
//       case txSUCCESS:
//       case txFAILED:
//           OperationResult results<>;
//       case txTOO_EARLY:
//       case txTOO_LATE:
//       case txMISSING_OPERATION:
//       case txBAD_SEQ:
//       case txBAD_AUTH:
//       case txINSUFFICIENT_BALANCE:
//       case txNO_ACCOUNT:
//       case txINSUFFICIENT_FEE:
//       case txBAD_AUTH_EXTRA:
//       case txINTERNAL_ERROR:
//       case txNOT_SUPPORTED:
//       // txFEE_BUMP_INNER_FAILED is not included
//       case txBAD_SPONSORSHIP:
//       case txBAD_MIN_SEQ_AGE_OR_GAP:
//       case txMALFORMED:
//           void;
//       }
//
// ===========================================================================
xdr.union("InnerTransactionResultResult", {
  switchOn: xdr.lookup("TransactionResultCode"),
  switchName: "code",
  switches: [
    ["txSuccess", "results"],
    ["txFailed", "results"],
    ["txTooEarly", xdr.void()],
    ["txTooLate", xdr.void()],
    ["txMissingOperation", xdr.void()],
    ["txBadSeq", xdr.void()],
    ["txBadAuth", xdr.void()],
    ["txInsufficientBalance", xdr.void()],
    ["txNoAccount", xdr.void()],
    ["txInsufficientFee", xdr.void()],
    ["txBadAuthExtra", xdr.void()],
    ["txInternalError", xdr.void()],
    ["txNotSupported", xdr.void()],
    ["txBadSponsorship", xdr.void()],
    ["txBadMinSeqAgeOrGap", xdr.void()],
    ["txMalformed", xdr.void()],
  ],
  arms: {
    results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647),
  },
});

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("InnerTransactionResultExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct InnerTransactionResult
//   {
//       // Always 0. Here for binary compatibility.
//       int64 feeCharged;
//   
//       union switch (TransactionResultCode code)
//       {
//       // txFEE_BUMP_INNER_SUCCESS is not included
//       case txSUCCESS:
//       case txFAILED:
//           OperationResult results<>;
//       case txTOO_EARLY:
//       case txTOO_LATE:
//       case txMISSING_OPERATION:
//       case txBAD_SEQ:
//       case txBAD_AUTH:
//       case txINSUFFICIENT_BALANCE:
//       case txNO_ACCOUNT:
//       case txINSUFFICIENT_FEE:
//       case txBAD_AUTH_EXTRA:
//       case txINTERNAL_ERROR:
//       case txNOT_SUPPORTED:
//       // txFEE_BUMP_INNER_FAILED is not included
//       case txBAD_SPONSORSHIP:
//       case txBAD_MIN_SEQ_AGE_OR_GAP:
//       case txMALFORMED:
//           void;
//       }
//       result;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("InnerTransactionResult", [
  ["feeCharged", xdr.lookup("Int64")],
  ["result", xdr.lookup("InnerTransactionResultResult")],
  ["ext", xdr.lookup("InnerTransactionResultExt")],
]);

// === xdr source ============================================================
//
//   struct InnerTransactionResultPair
//   {
//       Hash transactionHash;          // hash of the inner transaction
//       InnerTransactionResult result; // result for the inner transaction
//   };
//
// ===========================================================================
xdr.struct("InnerTransactionResultPair", [
  ["transactionHash", xdr.lookup("Hash")],
  ["result", xdr.lookup("InnerTransactionResult")],
]);

// === xdr source ============================================================
//
//   union switch (TransactionResultCode code)
//       {
//       case txFEE_BUMP_INNER_SUCCESS:
//       case txFEE_BUMP_INNER_FAILED:
//           InnerTransactionResultPair innerResultPair;
//       case txSUCCESS:
//       case txFAILED:
//           OperationResult results<>;
//       case txTOO_EARLY:
//       case txTOO_LATE:
//       case txMISSING_OPERATION:
//       case txBAD_SEQ:
//       case txBAD_AUTH:
//       case txINSUFFICIENT_BALANCE:
//       case txNO_ACCOUNT:
//       case txINSUFFICIENT_FEE:
//       case txBAD_AUTH_EXTRA:
//       case txINTERNAL_ERROR:
//       case txNOT_SUPPORTED:
//       // case txFEE_BUMP_INNER_FAILED: handled above
//       case txBAD_SPONSORSHIP:
//       case txBAD_MIN_SEQ_AGE_OR_GAP:
//       case txMALFORMED:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionResultResult", {
  switchOn: xdr.lookup("TransactionResultCode"),
  switchName: "code",
  switches: [
    ["txFeeBumpInnerSuccess", "innerResultPair"],
    ["txFeeBumpInnerFailed", "innerResultPair"],
    ["txSuccess", "results"],
    ["txFailed", "results"],
    ["txTooEarly", xdr.void()],
    ["txTooLate", xdr.void()],
    ["txMissingOperation", xdr.void()],
    ["txBadSeq", xdr.void()],
    ["txBadAuth", xdr.void()],
    ["txInsufficientBalance", xdr.void()],
    ["txNoAccount", xdr.void()],
    ["txInsufficientFee", xdr.void()],
    ["txBadAuthExtra", xdr.void()],
    ["txInternalError", xdr.void()],
    ["txNotSupported", xdr.void()],
    ["txBadSponsorship", xdr.void()],
    ["txBadMinSeqAgeOrGap", xdr.void()],
    ["txMalformed", xdr.void()],
  ],
  arms: {
    innerResultPair: xdr.lookup("InnerTransactionResultPair"),
    results: xdr.varArray(xdr.lookup("OperationResult"), 2147483647),
  },
});

// === xdr source ============================================================
//
//   union switch (int v)
//       {
//       case 0:
//           void;
//       }
//
// ===========================================================================
xdr.union("TransactionResultExt", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   struct TransactionResult
//   {
//       int64 feeCharged; // actual fee charged for the transaction
//   
//       union switch (TransactionResultCode code)
//       {
//       case txFEE_BUMP_INNER_SUCCESS:
//       case txFEE_BUMP_INNER_FAILED:
//           InnerTransactionResultPair innerResultPair;
//       case txSUCCESS:
//       case txFAILED:
//           OperationResult results<>;
//       case txTOO_EARLY:
//       case txTOO_LATE:
//       case txMISSING_OPERATION:
//       case txBAD_SEQ:
//       case txBAD_AUTH:
//       case txINSUFFICIENT_BALANCE:
//       case txNO_ACCOUNT:
//       case txINSUFFICIENT_FEE:
//       case txBAD_AUTH_EXTRA:
//       case txINTERNAL_ERROR:
//       case txNOT_SUPPORTED:
//       // case txFEE_BUMP_INNER_FAILED: handled above
//       case txBAD_SPONSORSHIP:
//       case txBAD_MIN_SEQ_AGE_OR_GAP:
//       case txMALFORMED:
//           void;
//       }
//       result;
//   
//       // reserved for future use
//       union switch (int v)
//       {
//       case 0:
//           void;
//       }
//       ext;
//   };
//
// ===========================================================================
xdr.struct("TransactionResult", [
  ["feeCharged", xdr.lookup("Int64")],
  ["result", xdr.lookup("TransactionResultResult")],
  ["ext", xdr.lookup("TransactionResultExt")],
]);

// === xdr source ============================================================
//
//   typedef opaque Hash[32];
//
// ===========================================================================
xdr.typedef("Hash", xdr.opaque(32));

// === xdr source ============================================================
//
//   typedef opaque uint256[32];
//
// ===========================================================================
xdr.typedef("Uint256", xdr.opaque(32));

// === xdr source ============================================================
//
//   typedef unsigned int uint32;
//
// ===========================================================================
xdr.typedef("Uint32", xdr.uint());

// === xdr source ============================================================
//
//   typedef int int32;
//
// ===========================================================================
xdr.typedef("Int32", xdr.int());

// === xdr source ============================================================
//
//   typedef unsigned hyper uint64;
//
// ===========================================================================
xdr.typedef("Uint64", xdr.uhyper());

// === xdr source ============================================================
//
//   typedef hyper int64;
//
// ===========================================================================
xdr.typedef("Int64", xdr.hyper());

// === xdr source ============================================================
//
//   union ExtensionPoint switch (int v)
//   {
//   case 0:
//       void;
//   };
//
// ===========================================================================
xdr.union("ExtensionPoint", {
  switchOn: xdr.int(),
  switchName: "v",
  switches: [
    [0, xdr.void()],
  ],
  arms: {
  },
});

// === xdr source ============================================================
//
//   enum CryptoKeyType
//   {
//       KEY_TYPE_ED25519 = 0,
//       KEY_TYPE_PRE_AUTH_TX = 1,
//       KEY_TYPE_HASH_X = 2,
//       KEY_TYPE_ED25519_SIGNED_PAYLOAD = 3,
//       // MUXED enum values for supported type are derived from the enum values
//       // above by ORing them with 0x100
//       KEY_TYPE_MUXED_ED25519 = 0x100
//   };
//
// ===========================================================================
xdr.enum("CryptoKeyType", {
  keyTypeEd25519: 0,
  keyTypePreAuthTx: 1,
  keyTypeHashX: 2,
  keyTypeEd25519SignedPayload: 3,
  keyTypeMuxedEd25519: 256,
});

// === xdr source ============================================================
//
//   enum PublicKeyType
//   {
//       PUBLIC_KEY_TYPE_ED25519 = KEY_TYPE_ED25519
//   };
//
// ===========================================================================
xdr.enum("PublicKeyType", {
  publicKeyTypeEd25519: 0,
});

// === xdr source ============================================================
//
//   enum SignerKeyType
//   {
//       SIGNER_KEY_TYPE_ED25519 = KEY_TYPE_ED25519,
//       SIGNER_KEY_TYPE_PRE_AUTH_TX = KEY_TYPE_PRE_AUTH_TX,
//       SIGNER_KEY_TYPE_HASH_X = KEY_TYPE_HASH_X,
//       SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD = KEY_TYPE_ED25519_SIGNED_PAYLOAD
//   };
//
// ===========================================================================
xdr.enum("SignerKeyType", {
  signerKeyTypeEd25519: 0,
  signerKeyTypePreAuthTx: 1,
  signerKeyTypeHashX: 2,
  signerKeyTypeEd25519SignedPayload: 3,
});

// === xdr source ============================================================
//
//   union PublicKey switch (PublicKeyType type)
//   {
//   case PUBLIC_KEY_TYPE_ED25519:
//       uint256 ed25519;
//   };
//
// ===========================================================================
xdr.union("PublicKey", {
  switchOn: xdr.lookup("PublicKeyType"),
  switchName: "type",
  switches: [
    ["publicKeyTypeEd25519", "ed25519"],
  ],
  arms: {
    ed25519: xdr.lookup("Uint256"),
  },
});

// === xdr source ============================================================
//
//   struct
//       {
//           /* Public key that must sign the payload. */
//           uint256 ed25519;
//           /* Payload to be raw signed by ed25519. */
//           opaque payload<64>;
//       }
//
// ===========================================================================
xdr.struct("SignerKeyEd25519SignedPayload", [
  ["ed25519", xdr.lookup("Uint256")],
  ["payload", xdr.varOpaque(64)],
]);

// === xdr source ============================================================
//
//   union SignerKey switch (SignerKeyType type)
//   {
//   case SIGNER_KEY_TYPE_ED25519:
//       uint256 ed25519;
//   case SIGNER_KEY_TYPE_PRE_AUTH_TX:
//       /* SHA-256 Hash of TransactionSignaturePayload structure */
//       uint256 preAuthTx;
//   case SIGNER_KEY_TYPE_HASH_X:
//       /* Hash of random 256 bit preimage X */
//       uint256 hashX;
//   case SIGNER_KEY_TYPE_ED25519_SIGNED_PAYLOAD:
//       struct
//       {
//           /* Public key that must sign the payload. */
//           uint256 ed25519;
//           /* Payload to be raw signed by ed25519. */
//           opaque payload<64>;
//       } ed25519SignedPayload;
//   };
//
// ===========================================================================
xdr.union("SignerKey", {
  switchOn: xdr.lookup("SignerKeyType"),
  switchName: "type",
  switches: [
    ["signerKeyTypeEd25519", "ed25519"],
    ["signerKeyTypePreAuthTx", "preAuthTx"],
    ["signerKeyTypeHashX", "hashX"],
    ["signerKeyTypeEd25519SignedPayload", "ed25519SignedPayload"],
  ],
  arms: {
    ed25519: xdr.lookup("Uint256"),
    preAuthTx: xdr.lookup("Uint256"),
    hashX: xdr.lookup("Uint256"),
    ed25519SignedPayload: xdr.lookup("SignerKeyEd25519SignedPayload"),
  },
});

// === xdr source ============================================================
//
//   typedef opaque Signature<64>;
//
// ===========================================================================
xdr.typedef("Signature", xdr.varOpaque(64));

// === xdr source ============================================================
//
//   typedef opaque SignatureHint[4];
//
// ===========================================================================
xdr.typedef("SignatureHint", xdr.opaque(4));

// === xdr source ============================================================
//
//   typedef PublicKey NodeID;
//
// ===========================================================================
xdr.typedef("NodeId", xdr.lookup("PublicKey"));

// === xdr source ============================================================
//
//   typedef PublicKey AccountID;
//
// ===========================================================================
xdr.typedef("AccountId", xdr.lookup("PublicKey"));

// === xdr source ============================================================
//
//   struct Curve25519Secret
//   {
//       opaque key[32];
//   };
//
// ===========================================================================
xdr.struct("Curve25519Secret", [
  ["key", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   struct Curve25519Public
//   {
//       opaque key[32];
//   };
//
// ===========================================================================
xdr.struct("Curve25519Public", [
  ["key", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   struct HmacSha256Key
//   {
//       opaque key[32];
//   };
//
// ===========================================================================
xdr.struct("HmacSha256Key", [
  ["key", xdr.opaque(32)],
]);

// === xdr source ============================================================
//
//   struct HmacSha256Mac
//   {
//       opaque mac[32];
//   };
//
// ===========================================================================
xdr.struct("HmacSha256Mac", [
  ["mac", xdr.opaque(32)],
]);

});
export default types;
