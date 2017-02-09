var express = require('express');
var router = express.Router();
var axios = require('axios');

// Test Route
router.get('/test', function(req, res) {
  res.send('test is fine');
})

// Example API Route Passthrough
router.get('/fake', function(req, res) {

  var queryUrl = 'https://jsonplaceholder.typicode.com/posts';

  console.log('------');
  console.log('API Calling: ' + queryUrl);

  axios.get(queryUrl, [{timeout: 1500}])
  .then(function (response) {
    console.log(response.data);
    res.json(response.data);
  })
  .catch(function (error) {
    console.log(error);
    if(error.response.status === 404) {
      res.json({error: 404});
    }
    res.send('Error: Something went wrong');
  });

});

module.exports = router;
