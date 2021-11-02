'use strict';

const { fetchProducts } = require("./paapiService");
const { findByName } = require("./utils");

const getDepartmentId = async (departmentName) => {
  console.log(`Batch::Service::GetDepartmentId::Name: `, departmentName);
  const modelName = 'department';
  const item = await findByName(modelName, departmentName);
  if (!item) {
    const department = await strapi.query(modelName).create({
      name: departmentName
    });

    return department.id;
  }
  console.log(`Batch::Service::GetDepartmentId::item`, {id: item.id, name: item.name });
  
  return item.id;
};

const getCategoryId = async (departmentId, categoryName) => {
  console.log(`Batch::Service::GetCategoryId::Name: `, categoryName);
  const modelName = 'category';
  const item = await findByName(modelName, categoryName);
  console.log(`Batch::Service::GetCategoryId::items`, item);
  if (!item) {
    const category = await strapi.query(modelName).create({
      name: categoryName,
      department: [departmentId],
      created_by: 1,
      updated_by: 1,
    });
    console.log(`Crated Category:: `, category);

    return category.id;
  } else {
    return item.id;
  }
};

const generateSlug = async (title='') => {
  const slug = title.replaceAll(' ', '-');

  return slug;
}

const createPost = async (keyword, product) => {
  console.log(`Batch::Service::CreatePost`);
  // get title
  const title = keyword;
  // create slug
  const slug = generateSlug(title);
  // get department 
  const departmentName = product.ItemInfo && product.ItemInfo.Classifications.Binding && product.ItemInfo.Classifications.Binding.DisplayValue;
  const deptId = await getDepartmentId(departmentName);
  // get category
  const categoryName = product.ItemInfo && product.ItemInfo.Classifications.ProductGroup && product.ItemInfo.Classifications.ProductGroup.DisplayValue;
  const categoryId = await getCategoryId(deptId, categoryName);
  
}

module.exports = {
  save: async (keywords = []) => {
    // const length = keywords.length;
    for (const keyword of keywords) {
      const products = await fetchProducts(keyword);
      console.log(`Batch::Service:: ${products.length} items found for ${keyword}`);
      console.log(`${keywords.length} keywords created...`);
      for (const product of products) {
        await createPost(keyword, product);
      };

      return products;
    }
  }
};
