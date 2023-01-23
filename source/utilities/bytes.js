function areEqual(a, b, shouldDebug = false) {
  if (a.byteLength !== b.byteLength) {
    return false;
  }

  let flag = true;

  for (let i = 0; i < a.byteLength; i += 1) {
    if (a[i] !== b[i]) {
      if (shouldDebug) {
        console.log(`${i}: ${a[i]} != ${b[i]}`);
        flag = false;
      } else {
        return false;
      }
    }
  }
  
  return flag;
}

export {areEqual};