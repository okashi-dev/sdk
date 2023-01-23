import {Network} from './Network.js';

describe('Network', () => {
  test('Initialize local network.', async () => {
    const network = await Network.local.hydrate();

    expect(network.passphrase).toBe('Standalone Network ; February 2017');
    expect(network.id).toStrictEqual(new Uint8Array([
      186, 239, 215, 52, 184, 211, 228, 132,
      114, 207, 248, 57, 18, 55, 95, 237,
      188, 117, 115, 112, 25, 18, 254, 48,
      138, 247, 48, 24, 15, 151, 215, 74
    ]));
  });
  test('Initialize future network.', async () => {
    const network = Network.future;
    await network.hydrate();

    expect(network.passphrase).toBe('Test SDF Future Network ; October 2022');
    expect(network.id).toStrictEqual(new Uint8Array([
      163, 161, 198, 167, 130, 134, 113, 62,
      41, 190, 14, 151, 133, 103, 15, 168,
      56, 209, 57, 23, 205, 142, 174, 180,
      163, 87, 159, 241, 222, 188, 127, 213
    ]));
  });

  test('Call getHealth().', async () => {
    global.fetch = () => {
      return {
        ok: true,
        json: () => ({
          "jsonrpc": "2.0",
          "id": 0,
          "result": {
            "status": "healthy"
          }
        })
      }
    };

    const network = await Network.local.hydrate();
    const response = await network.call('getHealth');

    expect(response).toStrictEqual({
      "status": "healthy"
    });
  });
  test('Call getAccount().', async () => {
    global.fetch = () => {
      return {
        ok: true,
        json: () => ({
          "jsonrpc": "2.0",
          "id": 0,
          "result": {
            "id": "GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW",
            "sequence": "438086664201"
          }
        })
      }
    };

    const network = await Network.local.hydrate();
    const response = await network.call('getAccount', {
      address: 'GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW'
    });

    expect(response).toStrictEqual({
      "id": "GALJMHIIE7LQHDMRKYLBPJ7WNAQP3V3WJUE35J46U62MM5RM7OKXIWWW",
      "sequence": "438086664201"
    });
  });
});