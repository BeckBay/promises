/*
 * Write a function WITH NO CALLBACKS that,
 * (1) reads a GitHub username from a `readFilePath`
 *     (the username will be the first line of the file)
 * promiseConstructorFunctions
 * (2) then, sends a request to the GitHub API for the user's profile
 * // getGitHubProfile
 * (3) then, writes the JSON response of the API to `writeFilePath`
 *
 * HINT: We exported some similar promise-returning functions in previous exercises
 */

var fs = require('fs');
var Promise = require('bluebird');
var promiseConstructorFunctions = require('./promiseConstructor');
var pluckFirstLineFromFileAsync = promiseConstructorFunctions.pluckFirstLineFromFileAsync;
var promisifyFunctions = require('./promisification');
var getGitHubProfileAsync = promisifyFunctions.getGitHubProfileAsync;
// var fsWriteFileAsyn = ;


var fetchProfileAndWriteToFile = function(readFilePath, writeFilePath) {
  return pluckFirstLineFromFileAsync(readFilePath)
    .then((username) => {
      return getGitHubProfileAsync(username);
    })
    .then((body) => {
      return Promise.promisify(fs.writeFile)(writeFilePath, JSON.stringify(body));
    });
  // return new Promise(function(resolve, reject) {
  //   fs.readFile(readFilePath, 'utf8', function(err, data) {
  //     if (err) {
  //       reject(err);
  //     } else {
  //       var username = data.trim();
  //       var options = {
  //         hostname: 'api.github.com',
  //         path: '/users/' + username,
  //         method: 'GET',
  //         headers: {
  //           'User-Agent': 'MyApp'
  //         }
  //       };
  //       var req = https.request(options, function (response) {
  //         var responseData = '';

  //         response.on('data', function (chunk) {
  //           responseData += chunk;
  //         });
  //         response.on('end', function () {

  //           fs.writeFile(writeFilePath, JSON.stringify(JSON.parse(responseData), null, 2), function (err) {
  //             if (err) {
  //               reject(err);
  //             } else {
  //               resolve('Profile data written successfully to ' + writeFilePath);
  //             }
  //           });
  //         });
  //       });

  //       req.on('error', function (error) {
  //         reject(error);
  //       });

  //       req.end();
  //     }
  //   });
  // });
};

// Export these functions so we can test them
module.exports = {
  fetchProfileAndWriteToFile: fetchProfileAndWriteToFile
};
