export const createKey = (length = 5) => {
    let key = "";
    const alphas = "abcdefghijklmnopqrstuvwxyz";
    const numbs = "0987654321";
    for (let a = 1; a <= length; a++) {
      let rn = Math.floor(Math.random() * numbs.length);
      key += alphas[rn].concat(numbs[rn]);
    }
    return key.toUpperCase();
  };