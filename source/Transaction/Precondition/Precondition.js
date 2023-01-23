import * as XDR from 'js-xdr';

import xdr from '../../xdr.js';

class Precondition {
  static TimeBounds(min, max) {
    return xdr.Preconditions.precondTime(
      new xdr.TimeBounds({
        minTime: XDR.UnsignedHyper.fromString(`${min}`),
        maxTime: XDR.UnsignedHyper.fromString(`${max}`)
      })
    )
  }
}

export {Precondition};