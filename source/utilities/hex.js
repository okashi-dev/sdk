function encode(data) {
  let bytes = null;

  // Convert any valid incoming data to Uint8Array.
  if (data instanceof Uint8Array) {
    bytes = data;
  } else if (data instanceof ArrayBuffer) {
    bytes = new Uint8Array(data);
  } else if (typeof data === 'number' && Number.isInteger(data)) {
    const buffer = [];
    
    if (data === 0) {
      buffer.push(0);
    }

    let number = BigInt(data);
    while (number > 0n) {
      const byte = number & 0xffn;
      number = number >> 8n;
      buffer.push(Number.parseInt(byte.toString()));
    }

    bytes = new Uint8Array(buffer.reverse());
  }

  if (bytes === null) {
    throw `Error: cannot encode data of type '${typeof data}'.`;
  }

  // Take each byte and conver to string using 16 radix and zero padding to produce 2 characters per byte.
  return bytes.reduce(
    (hex, byte) => `${hex}${byte.toString(16).padStart(2, '0')}`,
    ''
  );
}

function decode(data) {
  const bytes = [];
  for (let cursor = 0; cursor < data.length; cursor += 2) {
    // Cut data string into 2 character long chunks and parse with 16 radix.
    bytes.push(
      Number.parseInt(data.substr(cursor, 2), 16)
    );
  }
  return new Uint8Array(bytes);
}

export {encode, decode};