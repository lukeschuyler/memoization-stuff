class Memo {
  constructor() {
    this.numbs = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25];
    this.run();
  }

  memoize(fn) {
    let cache = {};
    return async (...args) => {
      let n = args[0];
      if (n in cache) {
        console.log('Fetching from cache', n);
        return await this.wait(cache[n]); // short(er) pause for cooler effect
      }
      else {
        console.log('Not fetching from cache', n);
        let result = await fn(n);
        cache[n] = result;
        return result; // mimic data call or some long process
      }
    }
  }

  wait(n) {
    return new Promise((res, rej) => {
      setTimeout(function() {
        res(n + 10);
      }, 500);
    });
  }


  add(n) {
    return new Promise((res, rej) => {
      setTimeout(function() {
        res(n);
      }, 2000);
    });
  }
  
  async run() {
    const memoized = this.memoize(this.add);
    let arr = new Array(200); // Needed iterable for async, used arbitrary array with length of 200 

    for (let i of arr) {
      await memoized(this.numbs[Math.floor(Math.random() * this.numbs.length)]);
    }
  };
}

new Memo();
