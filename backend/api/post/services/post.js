'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-services)
 * to customize this service
 */

module.exports = {
  async create(data) {
    const validData = await strapi.entityValidator.validateEntityCreation(
      strapi.models.post,
      data,
      { isDraft: isDraft(data, strapi.models.post) }
    );

    const entry = await strapi.query('post').create(validData);

    return entry;
  }
};
