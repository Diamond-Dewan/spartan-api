"use strict";

const { fetchProducts } = require("./paapiService");
const { findByName } = require("./utils");

const postModelName = "post";
const batchModelName = "batch";
const categoryModelName = "category";
const departmentModelName = "department";

const generateSlug = (title = "") => {
  const slug = title.toLowerCase().replace(/\s/g, "-");
  console.log(`Generated Slug: `, slug);

  return slug;
};

const faqMapper = (faqCollection = [{"index": [{}]}]) => {
  const faqMap = {};

  faqCollection.forEach((item) => {
    for (const [key, value] of Object.entries(item)) {
      faqMap[key] = value;
    };
  });

  return faqMap;
};

const create = async (modelName, properties) => {
  console.log(`Batch::Service::Create `, modelName);
  const item = await strapi.query(modelName).create({ ...properties });
  return item;
};

const createBatch = async (keys = []) => {
  const keywords = keys && keys.join(",\n");
  const existingBatch = await strapi.query(batchModelName).find({ keywords });
  if (existingBatch.length > 0) {
    return existingBatch[0];
  } else {
    const batch = await create(batchModelName, { keywords });

    return batch;
  }
};

const getDepartmentId = async (departmentName) => {
  console.log(`Batch::Service::GetDepartmentId::Name: `, departmentName);
  const item = await findByName(departmentModelName, departmentName);
  if (!item) {
    const department = await create(departmentModelName, {
      name: departmentName,
    });

    return department.id;
  }
  console.log(`Batch::Service::GetDepartmentId::item`, {
    id: item.id,
    name: item.name,
  });

  return item.id;
};

const getCategoryId = async (departmentId, categoryName) => {
  console.log(`Batch::Service::GetCategoryId::Name: `, categoryName);
  const item = await findByName(categoryModelName, categoryName);
  // console.log(`Batch::Service::GetCategoryId::items`, item);
  if (!item) {
    const category = await create(categoryModelName, {
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

const getRankList = (products) => {
  return products.map((product) => {
    return {
      title: product.ItemInfo?.Title?.DisplayValue,
      images: [product.Images?.Primary, product.Images?.Variants?.slice()],
      contents: product.ItemInfo?.Features?.DisplayValues,
      brand: product.ItemInfo?.ByLineInfo?.Brand,
      manufacturer: product.ItemInfo?.ByLineInfo?.Manufacturer,
      audienceRating: product.ItemInfo?.ContentRating,
      model: product.ItemInfo?.ManufactureInfo?.Model,
      warranty: product.ItemInfo?.ManufactureInfo?.Warranty,
      productInfo: {
        color: product.ItemInfo?.ProductInfo?.Color,
        dimensions: {
          height: product.ItemInfo?.ProductInfo?.ItemDimensions?.Height,
          length: product.ItemInfo?.ProductInfo?.ItemDimensions?.Length,
          width: product.ItemInfo?.ProductInfo?.ItemDimensions?.Width,
          weight: product.ItemInfo?.ProductInfo?.ItemDimensions?.Weight,
        },
        releaseDate: product.ItemInfo?.ProductInfo?.ReleaseDate?.DisplayValue,
      },
      detailPageURL: product.DetailPageURL,
      fullInfo: product.ItemInfo,
    };
  });
};

const createPost = async ({keyword, faqs, batchNumber}) => {
  console.log(`Batch::Service::CreatePost`);
  // get title
  const title = keyword;
  // create slug
  const slug = generateSlug(title);
  const existingPost = await strapi.query(postModelName).find({ slug });
  // return if exists
  if (existingPost.length > 0) {
    console.log(`Existing Posts: `, existingPost.length);
    console.log(`Slug: `, existingPost[0].slug);
    console.log(`Skipping....\n`);

    return null;
  }
  // fetch products
  const products = await fetchProducts(keyword);
  console.log(`Batch::Service:: ${products.length} items found for ${keyword}`);
  // get department
  const departmentName =
    products[0]?.ItemInfo?.Classifications?.Binding?.DisplayValue;
  const deptId = await getDepartmentId(departmentName);
  // get category
  const categoryName =
    products[0]?.ItemInfo?.Classifications?.ProductGroup?.DisplayValue;
  const categoryId = await getCategoryId(deptId, categoryName);

  // create post
  await strapi.query(postModelName).create({
    title,
    slug,
    rankList: getRankList(products),
    faq: faqs,
    batch: [batchNumber],
    categories: [categoryId],
  });
};

const updatePost = async (keyword, batchNumber) => {
  console.log(`Batch::Service::UpdatePost`);
  // get title
  const title = keyword;
  // create slug
  const slug = generateSlug(title);
  const existingPost = await strapi.query(postModelName).find({ slug });
  // return if exists
  if (existingPost.length > 0) {
    const products = await fetchProducts(keyword); // fetch products
    console.log(
      `Batch::Service:: ${products.length} items found for ${keyword}`
    );
    // get department
    const departmentName =
      products[0]?.ItemInfo?.Classifications?.ProductGroup?.DisplayValue;
    const deptId = await getDepartmentId(departmentName);
    // get category
    const categoryName =
      products[0].ItemInfo?.Classifications?.ProductGroup?.DisplayValue;
    const categoryId = await getCategoryId(deptId, categoryName);
    // update post
    await strapi.query(postModelName).update(
      { id: existingPost[0].id },
      {
        title,
        slug,
        rankList: getRankList(products),
        batch: [batchNumber],
        categories: [categoryId],
      }
    );
  } else {
    console.log("Batch::Service::UpdatePost::Post not found creating new post");
    await createPost(keyword, batchNumber);
  }
};

module.exports = {
  save: async (keywords = [], faqCollection = []) => {
    const length = keywords.length;
    console.log(`Keywords:: `, length);
    // map faq collections
    const faqMap = faqMapper(faqCollection)
    // create batch
    const batch = await createBatch(keywords);

    for (const keyword of keywords) {
      await createPost({ keyword, faqs: faqMap[keyword], batchNumber: batch.id });
    }
    console.log(`${keywords.length} keywords created...`);

    return batch;
  },

  update: async (id) => {
    console.log("Updating batch no: ", id);
    const batch = await strapi.query(batchModelName).findOne({ id });
    const keywords = batch.keywords.split(",").map((item) => item.trim());

    for (const keyword of keywords) {
      await updatePost(keyword, batch.id);
    }

    console.log(`${keywords.length} keywords Updated...`);

    return batch;
  },
};
