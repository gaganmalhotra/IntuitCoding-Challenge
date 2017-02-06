var fs = require("fs");
var host = "127.0.0.1";
var port = 1338;
var express = require("express");
var router = express.Router();
const Promise = require('promise');
const csvParse = require('babyparse');
const csv = require('csv-parser');
const _ = require('lodash');
const categories = require('./static/categories.json');
const resultCategories = require('./static/resultCategories.json');

var app = express();
app.use(express.static(__dirname + "/public")); //use static files in ROOT/public folder

app.get("/getName", function(request, response) { //root dir
  //var res = main.init();
  var obj = {
    name: "gagan",
    age: 16
  }
  response.send(res);

});

app.get('/name', function(req, res, next) {

      var path = "./rit-challenge/transaction-data/";
      var parsedMap = new Map();

      // read and parse the list of csv files into a map with user
      fs.readdir(path, function(err, items) {
          for (var i = 1; i < items.length; i++) {
              var file = path + '/' + items[i];

              var ff = fs.readFileSync(file, {
                  encoding: 'utf8'
              });
              csvParse.parse(ff, {
                  complete: function(results) {
                      //Map insertion with authid as key
                      parsedMap.set(results.data[1][0], results.data);
                  }
              });
          }

          var p1 = new Promise(
              function(resolve, reject) {
                  resolve(execute(parsedMap));
              }
          );

          return p1.then(function(result) {
            res.send(JSON.stringify(strMapToObj(result)));
            return result;
          });
      });

});

function strMapToObj(strMap) {
    let obj = Object.create(null);
    for (let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}

app.listen(port, host);

function execute(map) {
    var resultMap = new Map();
    for (var [key, value] of map.entries()) {
        var eachStat = executeEachUser(key, value);
        resultMap.set(key, eachStat);
    }

    //console.log(resultMap.get('624'));
    return resultMap;
}

function getTransformedMap() {
    var transformedMap = new Map();
    for (var keys in categories) {
        _.forEach(categories[keys], function(eachVal) {
            transformedMap.set(eachVal, keys);
        });
    }

    return transformedMap;
}

function executeEachUser(id, list) {

    var categoryMap = getTransformedMap();
    var userStats = _.cloneDeep(resultCategories);

    _.forEach(list, function(value) {
        if (value[2] !== undefined && value[2].trim() !== 'Vendor') {

            var eachVal = value[2].toLowerCase();
            var cost = Math.abs(value[3]);
            var totalExpenses
            for (var [key, value] of categoryMap.entries()) {
                if (eachVal.includes(key)) {
                    userStats[value]['isPresent'] = true;
                    userStats[value]['totalExpense'] = userStats[value]['totalExpense'] + cost;
                    userStats[value]['frequency'] = userStats[value]['frequency'] + 1;
                    break;
                }
            }
        }
    });

    return userStats;
}
