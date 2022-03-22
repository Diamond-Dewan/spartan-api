'use strict';

const { fetchProducts } = require("./paapiService");
const { findByName } = require("./utils");

const generateSlug = (title='') => {
  const slug = title.toLowerCase().replace(/\s/g, "-");
  console.log(`Generated Slug: `, slug);

  return slug;
};

const create = async (modelName, properties) => {
  console.log(`Batch::Service::Create`);
  const item = await strapi.query(modelName).create({ ...properties });
  return item;
};

const createBatch = async (keys=[]) => {
  const modelName = 'batch';
  const keywords = keys && keys.join(',\n');
  const existingBatch = await strapi.query(modelName).find({ keywords });
  if (existingBatch.length > 0) {
    return existingBatch[0];
  } else {
    const batch = await create(modelName, {
      keywords,
    });
    
    return batch;
  }
};

const getDepartmentId = async (departmentName) => {
  console.log(`Batch::Service::GetDepartmentId::Name: `, departmentName);
  const modelName = 'department';
  const item = await findByName(modelName, departmentName);
  if (!item) {
    const department = await create(modelName, { name: departmentName });

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
    const category = await create(modelName, {
      name: categoryName,
      slug: generateSlug(categoryName),
      department: [departmentId],
      created_by: 1,
      updated_by: 1,
    });
    console.log(`Created Category:: `, category);

    return category.id;
  } else {
    return item.id;
  }
};

const createPost = async (keyword, batchNumber) => {
  console.log(`Batch::Service::CreatePost`);
  const modelName = 'post'
  // get title
  const title = keyword;
  // create slug
  const slug = generateSlug(title);
  const existingPost = await strapi.query(modelName).find({ slug });
  // return if exists
  if (existingPost.length > 0) {
    console.log(`Existing Posts: `, existingPost.length);
    console.log(`Slug: `, existingPost[0].slug);
    console.log(`Skipping....\n`);

    return null;
  };
  
  // fetch products
  const products = await fetchProducts(keyword);
  console.log(`Batch::Service:: ${products.length} items found for ${keyword}`);
  
  // body
  const ranklist = products.map((product) => {
    return {
      title: product.ItemInfo && product.ItemInfo.Title && product.ItemInfo.Title.DisplayValue || undefined,
      images: product.Images && product.Images.Primary || undefined,
      contents: product.ItemInfo && product.ItemInfo.Features && product.ItemInfo.Features.DisplayValues || undefined,
    }
  });
  // get department
  const departmentName = products[0].ItemInfo && products[0].ItemInfo.Classifications.Binding && products[0].ItemInfo.Classifications.Binding.DisplayValue;
  const deptId = await getDepartmentId(departmentName);
  // get category
  const categoryName = products[0].ItemInfo && products[0].ItemInfo.Classifications.ProductGroup && products[0].ItemInfo.Classifications.ProductGroup.DisplayValue;
  const categoryId = await getCategoryId(deptId, categoryName);
  
  // create post
  await strapi.query(modelName).create({
    title,
    slug,
    rankedList: { ranklist },
    batch: [batchNumber],
    categories: [categoryId],
  });
};

module.exports = {
  save: async (keywords = []) => {
    const length = keywords.length;
    console.log(`Keywords:: `, length);
    // create batch
    const batch = await createBatch(keywords);

    for (const keyword of keywords) {
      await createPost(keyword, batch.id);
    }
    console.log(`${keywords.length} keywords created...`);
    
    return batch;
  }
};
