var _ = require('underscore');

/**
 * Middleware handler for intercepting API routes.
 */
module.exports = apiProxy;

function apiProxy(dataAdapter, apiVersion) {
  console.log('new api proxy', apiVersion)
  var separator = '/'+apiVersion+'/';
  return function(req, res, next) {
    var api;

    api = _.pick(req, 'query', 'method', 'body');

    api.path = apiProxy.getApiPath(req.path, separator);
    api.api = apiProxy.getApiName(req.path, separator);

    dataAdapter.request(req, api, {
      convertErrorCode: false
    }, function(err, response, body) {
      if (err) return next(err);

      // Pass through statusCode.
      res.status(response.statusCode);
      res.json(body);
    });
  };
};

apiProxy.getApiPath = function getApiPath(path, separator) {
  var sepIndex = path.indexOf(separator),
      substrIndex = sepIndex === -1 ? 0 : sepIndex + separator.length - 1;
  return path.substr(substrIndex);
};

apiProxy.getApiName = function getApiName(path, separator) {
  var sepIndex = path.indexOf(separator),
      apiName = null;
  if (sepIndex > 0) {
    apiName = path.substr(1, sepIndex - 1);
  }
  return apiName;
};
