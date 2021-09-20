'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */
const fetchProduct = async (keyword) => {
  console.log(`Batch.Service::FetchProductData::Start`);
  console.log(`Query data for ${keyword}`);
  // const items = await searchItems(keyword);
  // console.log(items);

  return keyword;
};

module.exports = {
  fetchProducts: async (keywords) => {
    console.log(`Batch.Service::FetchProducts::Start`);
    const items = await keywords.map((keyword) => fetchProduct(keyword));
    const data = Promise.all(items);

    return data;
  },
};
