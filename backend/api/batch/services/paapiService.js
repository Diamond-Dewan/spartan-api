let paapi = require("paapi5-nodejs-sdk");
let client = paapi.ApiClient.instance;

client.accessKey = "AKIAI5E7KWB3DBRMDQAQ";
client.secretKey = "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";
client.host = "webservices.amazon.com";
client.region = "us-east-1";

let api = new paapi.DefaultApi();

var searchItems = (keyword, pageNumber) => {
  var searchItemsRequest = new paapi.SearchItemsRequest();
  searchItemsRequest["PartnerTag"] = "cameratool-20";
  searchItemsRequest["PartnerType"] = "Associates";
  searchItemsRequest["Keywords"] = keyword;
  searchItemsRequest["SearchIndex"] = "All";
  searchItemsRequest["ItemPage"] = pageNumber;
  searchItemsRequest["ItemCount"] = 10;
  // 'BrowseNodeInfo.BrowseNodes.Ancestor',
  searchItemsRequest["Resources"] = [
    "BrowseNodeInfo.BrowseNodes",
    "ItemInfo.ByLineInfo",
    "ItemInfo.Classifications",
    "ItemInfo.ContentRating",
    "ItemInfo.Features",
    "ItemInfo.ManufactureInfo",
    "ItemInfo.ProductInfo",
    "ItemInfo.TechnicalInfo",
    "ItemInfo.Title",
    "ItemInfo.TradeInInfo",
    "Images.Primary.Large",
    "Images.Variants.Large",
    "SearchRefinements",
  ];

  return new Promise((resolve, reject) => {
    var callback = function (error, data, response) {
      if (error) {
        console.log("Error calling PA-API 5.0!");
        console.log(
          "Printing Full Error Object:\n" + JSON.stringify(error, null, 1)
        );
        console.log("Status Code: " + error["status"]);
        if (
          error["response"] !== undefined &&
          error["response"]["text"] !== undefined
        ) {
          console.log(
            "Error Object: " +
              JSON.stringify(error["response"]["text"], null, 1)
          );
        }
        reject(error);
      } else {
        console.log(
          `API call successful for :: ${keyword}, PageNO: ${pageNumber}`
        );
        var searchItemsResponse =
          paapi.SearchItemsResponse.constructFromObject(data);
        // console.log('Complete Response: \n' + JSON.stringify(searchItemsResponse['SearchResult']['Items'], null, 1));
        // console.log('Total Items:: ', searchItemsResponse['SearchResult']['Items'].length);
        if (searchItemsResponse["Errors"] !== undefined) {
          console.log("Errors:");
          console.log(
            "Complete Error Response: " +
              JSON.stringify(searchItemsResponse["Errors"], null, 1)
          );
          console.log("Printing 1st Error:");
          var error_0 = searchItemsResponse["Errors"][0];
          console.log("Error Code: " + error_0["Code"]);
          console.log("Error Message: " + error_0["Message"]);
          reject(error_0["Message"]);
        }
        resolve(searchItemsResponse["SearchResult"]["Items"]);
      }
    };
    api.searchItems(searchItemsRequest, callback);
  });
};

const getMostCommon = (itemList = []) => {
  const count = {};
  let mostCommonItemCount = 0;
  let mostCommon;

  itemList.forEach((item) => {
    if (count[item] === undefined) count[item] = 1;
    else count[item] = count[item] + 1;
    if (count[item] > mostCommonItemCount) {
      mostCommonItemCount = count[item];
      mostCommon = item;
    }
  });
  console.log(
    `Most common category is ${mostCommon} found ${mostCommonItemCount} times`
  );

  return mostCommon;
};

const filterProducts = (products) => {
  const filteredProducts = new Array();
  const categories = products.map(
    (product) =>
      product.BrowseNodeInfo &&
      product.BrowseNodeInfo.BrowseNodes &&
      product.BrowseNodeInfo.BrowseNodes[0].ContextFreeName
  );
  // console.log(`Categories:: `, categories);
  console.log(`Category list: ${categories}`);
  const seletedCategory = getMostCommon(categories);
  products.forEach((product) => {
    const category =
      product.BrowseNodeInfo &&
      product.BrowseNodeInfo.BrowseNodes &&
      product.BrowseNodeInfo.BrowseNodes[0].ContextFreeName;
    if (category === seletedCategory) filteredProducts.push(product);
  });
  console.log(`Total filteredProducts: `, filteredProducts.length);
  console.log(filteredProducts[0]);
  return filteredProducts;
};

const fetchProducts = async (keyword) => {
  console.log(`BatchService::FetchProducts::Start for "${keyword}"`);
  const pages = 3; // pages to read
  const productBundels = [];
  let currentPage = 1;
  const search = async () => {
    const items = await searchItems(keyword, currentPage);
    productBundels.push(items);
    currentPage++;
    if (currentPage <= pages) {
      return search();
    } else {
      let products = [];
      console.log("Total Product Pages: ", productBundels.length);
      productBundels.forEach((bundel) => {
        products = products.concat(bundel);
      });
      console.log(`All Products: `, products.length);
      const filteredProducts = filterProducts(products);

      return filteredProducts;
    }
  };
  const products = await search();
  return products;
};

module.exports = {
  fetchProducts,
};
