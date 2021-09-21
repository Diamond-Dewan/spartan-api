let paapi = require('paapi5-nodejs-sdk');
let client = paapi.ApiClient.instance;

client.accessKey = 'AKIAI5E7KWB3DBRMDQAQ';
client.secretKey = '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';
client.host = 'webservices.amazon.com';
client.region = 'us-east-1';

let api = new paapi.DefaultApi();

var callback = function (error, data, response) {
  if (error) {
    console.log('Error calling PA-API 5.0!');
    console.log('Printing Full Error Object:\n' + JSON.stringify(error, null, 1));
    console.log('Status Code: ' + error['status']);
    if (error['response'] !== undefined && error['response']['text'] !== undefined) {
      console.log('Error Object: ' + JSON.stringify(error['response']['text'], null, 1));
    }
  } else {
    console.log('API called successfully.');
    var searchItemsResponse = paapi.SearchItemsResponse.constructFromObject(data);
    console.log('Complete Response: \n' + JSON.stringify(searchItemsResponse['SearchResult']['Items'], null, 1));
    console.log('Total Items:: ', searchItemsResponse['SearchResult']['Items'].length);
    if (searchItemsResponse['Errors'] !== undefined) {
      console.log('Errors:');
      console.log('Complete Error Response: ' + JSON.stringify(searchItemsResponse['Errors'], null, 1));
      console.log('Printing 1st Error:');
      var error_0 = searchItemsResponse['Errors'][0];
      console.log('Error Code: ' + error_0['Code']);
      console.log('Error Message: ' + error_0['Message']);
    }
  }
};

const fetchProduct = async (keyword) => {
  console.log(`Batch.Service::FetchProductData::Start`);
  console.log(`Query data for ${keyword}`);
  var searchItemsRequest = new paapi.SearchItemsRequest();
  searchItemsRequest['PartnerTag'] = 'cameratool-20';
  searchItemsRequest['PartnerType'] = 'Associates';
  searchItemsRequest['Keywords'] = keyword;
  searchItemsRequest['SearchIndex'] = 'All';
  searchItemsRequest['ItemCount'] = 15;
  searchItemsRequest['Resources'] = ['Images.Primary.Medium', 'ItemInfo.Title', 'Offers.Listings.Price'];

  api.searchItems(searchItemsRequest, callback);

  return keyword;
};

module.exports = {
  fetchProduct,
}