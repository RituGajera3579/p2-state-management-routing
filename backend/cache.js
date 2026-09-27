const NodeCache = require("node-cache");

const cache = new NodeCache({
  stdTTL: 60
});

let hits = 0;
let misses = 0;

const stats = {
  hit() {
    hits++;
  },

  miss() {
    misses++;
  },

  get() {
    return {
      hits,
      misses
    };
  },

  reset() {
    hits = 0;
    misses = 0;
  }
};

module.exports = {
  cache,
  stats
};