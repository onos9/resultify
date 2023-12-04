import NodeCache from "node-cache";

class Cache {
  cache: NodeCache;
  constructor(ttlSeconds: number = 60) {
    this.cache = new NodeCache({
      stdTTL: ttlSeconds,
      checkperiod: ttlSeconds * 0.2,
      useClones: false,
    });
  }

  async get(key: string | number, storeFunction: () => Promise<any>) {
    const value = this.cache.get(key);
    if (value) {
      return Promise.resolve(value);
    }

    const result = await storeFunction();
    this.cache.set(key, result);
    return result;
  }

  del(keys: string | number | NodeCache.Key[]) {
    this.cache.del(keys);
  }

  delStartWith(startStr = "") {
    if (!startStr) {
      return;
    }

    const keys = this.cache.keys();
    for (const key of keys) {
      if (key.indexOf(startStr) === 0) {
        this.del(key);
      }
    }
  }

  flush() {
    this.cache.flushAll();
  }

  has(key: string | number) {
    return this.cache.has(key);
  }
}

export const nodeCache = new NodeCache();
export const cache = new Cache();
