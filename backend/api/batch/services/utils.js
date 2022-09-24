module.exports = {
  findByName: async (modelName, name) => {
    const item = await strapi.query(modelName).findOne({ name });

    return item;
  }
}