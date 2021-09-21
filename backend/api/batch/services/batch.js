'use strict';

const { fetchProduct } = require("./paapiService");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  fetchProducts: async (keywords) => {
    console.log(`Batch.Service::FetchProducts::Start`);
    console.log(`Batch.Service::FetchProducts::Keywords`, keywords);
    // const items = await keywords.map((keyword) => fetchProduct(keyword));
    // const data = Promise.all(items);
    await fetchProduct(keywords[0]);

    return keywords;
  },
};
