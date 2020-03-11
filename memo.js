class Memo {
  constructor() {
    this.numbs = [...Array(25).keys()].map(n => n + 1);
    this.run();
  }

  memoize(fn) {
    let cache = {};
    return async (...args) => {
      let n = args[0];
      if (n in cache) {
        console.log('Fetching from cache', n);
        return await this.sleep(cache[n]); // short(er) pause for cooler effect
      }
      else {
        console.log('Not fetching from cache', n);
        let result = await fn(n);
        cache[n] = result;
        return result; // mimic data call or some long process
      }
    }
  }

  // Synthetic `sleep` funciton
  sleep(n) {
    return new Promise((res, rej) => {
      setTimeout(function() {
        res(n + 10);
      }, 100);
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
      let random = Math.floor(Math.random() * this.numbs.length)
      await memoized(this.numbs[random]);
    }
  };
}

new Memo();
