import * as hex from './hex.js';

describe('Hex coding', () => {
  test('Hex encoding', () => {
    expect(hex.encode(new Uint8Array([255]))).toBe('ff');
  });
  test('Hex encoding empty', () => {
    expect(hex.encode(new Uint8Array([]))).toBe('');
  });
  test('Hex encoding invalid', () => {
    expect(() => {
      hex.encode('invalid');
    }).toThrowError(`Error: cannot encode data of type 'string'.`);
  });
  test('Hex encoding padded once', () => {
    expect(hex.encode(new Uint8Array([10]))).toBe('0a');
  });
  test('Hex encoding padded twice', () => {
    expect(hex.encode(new Uint8Array([0]))).toBe('00');
  });
  test('Hex encoding long string', () => {
    expect(hex.encode(new Uint8Array([255, 255, 255, 254, 253]))).toBe('fffffffefd');
  });

  test('Hex encoding a JavaScript number', () => {
    expect(hex.encode(0)).toBe('00');
    expect(hex.encode(1)).toBe('01');
    expect(hex.encode(15)).toBe('0f');
    expect(hex.encode(16)).toBe('10');
    expect(hex.encode(255)).toBe('ff');
    expect(hex.encode(4095)).toBe('0fff');
    expect(hex.encode(65520)).toBe('fff0');
    expect(hex.encode(1048320)).toBe('0fff00');
    expect(hex.encode(2147483648)).toBe('80000000');
  });

  test('Hex decoding', () => {
    expect(hex.decode('ff')).toStrictEqual(new Uint8Array([255]));
  });
  test('Hex decoding empty', () => {
    expect(hex.decode('')).toStrictEqual(new Uint8Array([]));
  });
  test('Hex decoding padding once', () => {
    expect(hex.decode('0a')).toStrictEqual(new Uint8Array([10]));
  });
  test('Hex decoding padding twice', () => {
    expect(hex.decode('00')).toStrictEqual(new Uint8Array([0]));
  });
  test('Hex decoding long', () => {
    expect(hex.decode('fffffffefd')).toStrictEqual(new Uint8Array([255, 255, 255, 254, 253]));
  });
});