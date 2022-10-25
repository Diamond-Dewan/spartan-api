"use strict";

module.exports = {
  /** create a record */
  async create(ctx) {
    const { keywords, faqs } = ctx.request.body;
    const items = keywords.split(",").map((item) => item.trim());
    const response = await strapi.services.batch.save(items, faqs);

    return response;
  },

  async update(ctx) {
    const { id } = ctx.params;
    const response = await strapi.services.batch.update(id);

    return response;
  },
};
