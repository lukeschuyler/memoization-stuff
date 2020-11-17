type MemoCache = {
  [index: string] : {
    result: number, ts: number
  }
}

class Memo {
  numbs: Array<number>;

  constructor (numbs: Array<number>) {
    this.numbs = numbs;
    this.run();
  }

  async mimicFetch (n: number, cache: MemoCache = {}, fn: Function): Promise<number> {
    console.log('Not fetching from cache', n);
    let result = await fn(n);
    cache[n] = { result, ts: Date.now() };
    return result; // mimic data call or some long process
  }

  memoize (fn: Function) {
    let cache: MemoCache = {};
    return async (...args: Array<any>) => {
      let n = args[0];
      if (n in cache) {
        // If less than 10 seconds since cached, show as cached
        let timeSincePrevious = Date.now() - cache[n].ts
        this.logCacheStatus(timeSincePrevious, n);

        if (timeSincePrevious < 10000) {
          console.log('Fetching from cache', n);
          return await this.sleep(cache[n].result); // short(er) pause for effect
        } else {
          return this.mimicFetch(n, cache, fn)
        }
      }
      else {
        return this.mimicFetch(n, cache, fn)
      }
    }
  }

  logCacheStatus (timeSincePrevious: number, n: number): void {
    console.log('\n')
    console.log(timeSincePrevious)
    console.log('since ' + n + ' was last fetched')
    console.log('\n')
  }

  // Synthetic `sleep` funciton
  sleep (n: number): Promise<number> {
    return new Promise(res => {
      setTimeout(function() {
        res(n + 10);
      }, 100);
    });
  }

  add (n: number): Promise<number> {
    return new Promise(res => {
      setTimeout(function() {
        res(n);
      }, 2000);
    });
  }
  
  async run (): Promise<void> {
    const memoized = this.memoize(this.add);

    // Needed iterable for async, used
    // arbitrary array with length of 200 
    let arr = new Array(200);
    
    for (let i of arr) {
      let random = Math.floor(Math.random() * this.numbs.length)
      await memoized(this.numbs[random]);
    }
  };
}

new Memo(
  [...Array(25).keys()].map(n => n + 1)
);
