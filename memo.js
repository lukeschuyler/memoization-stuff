let numbs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];

const memoize = fn => {
  let cache = {};
  return async (...args) => {
    let n = args[0];
    if (n in cache) {
      console.log('Fetching from cache', n);
      return await wait(cache[n]); // short(er) pause for cooler effect
    }
    else {
      console.log('Not fetching from cache', n);
      let result = await fn(n);
      cache[n] = result;
      return result; // mimic data call or some long process
    }
  }
}

const wait = n => {
  return new Promise((res, rej) => {
    setTimeout(function() {
      res(n + 10);
    }, 500);
  });
}


const add = n => {
  return new Promise((res, rej) => {
    setTimeout(function() {
      res(n);
    }, 2000);
  });
}

const memoized = memoize(add);


let arr = new Array(200);
(async function() {
  for (let i of arr) {
    await memoized(numbs[Math.floor(Math.random() * numbs.length)]);
  }
}());
