'use strict';

const { fetchProducts } = require("./paapiService");



module.exports = {
  fetchProduct: (keywords) => fetchProducts(keywords[0]),
};
