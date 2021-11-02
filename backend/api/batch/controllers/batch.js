'use strict';

module.exports = {
  /** create a record */
  async index(ctx) {
    let entity;
    const { keywords } = ctx.request.body;
    const items = keywords.split(',').map((item) => item.trim());
    const response = await strapi.services.batch.save(items);

    return response;
  },
};
