'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /** create a record */
  async index(ctx) {
    let entity;
    const { keywords } = ctx.request.body;
    const items = keywords.split(',').map((item) => item.trim());
    const response = await strapi.services.batch.fetchProducts(items)

    return response;
  },
};
