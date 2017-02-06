app.controller('controller', function($scope, dataService) {
    $scope.data = null;
    $scope.preferences = {};
    $scope.submit = function(where) {
      dataService.getData().then(function(response) {
          $scope.data = response;
      });
    };

    $scope.makeCharts = function(dataa, preferences) {
      var myNode = document.getElementById("chartContainer");
      while (myNode.firstChild) {
          myNode.removeChild(myNode.firstChild);
      }

      var pref = capturePref($scope);
      var i=0;
      var eligibilityCount = 0;
      var myEl = angular.element(document.querySelector('#chartContainer'));
      for (prop in dataa) {
        if (checkEligibility(dataa[prop], pref)) {

          var a = '<div id="chartContainer'+eligibilityCount+'" style="height: 300px; width: 100%;"></div>';
          myEl.append(a);

          var chart = new CanvasJS.Chart("chartContainer"+eligibilityCount, {
            title:{
              text: "Individual spending as per interests USER:"+prop
            },
            data: [
            {
              type: "column",
              dataPoints: [
                { label: "Music",  y: dataa[prop]['music']['totalExpense']  },
                { label: "Movies", y: dataa[prop]['movies']['totalExpense']   },
                { label: "Food", y: dataa[prop]['food']['totalExpense']   },
                { label: "Student",  y: dataa[prop]['student']['totalExpense']   },
                { label: "Irregular",  y: dataa[prop]['unstable']['totalExpense']   },
                { label: "Reading",  y: dataa[prop]['reading']['totalExpense']   },
                { label: "Fitness&Sports",  y: dataa[prop]['sportsFitness']['totalExpense']   },
                { label: "Gaming",  y: dataa[prop]['gamer']['totalExpense']   },
                { label: "Arts",  y: dataa[prop]['arts']['totalExpense']   }
              ]
            }
            ]
          });
          chart.render();
          eligibilityCount++;
        }
        i++;
      }
      console.log('ELIGIBILT COUNT IS>>>>>', eligibilityCount);
    }
});

function capturePref($scope){
  var obj = $scope.traits;
  var pref = {
    music : checkIfExists('music', obj),
    movies : checkIfExists('movies', obj),
    food : checkIfExists('food', obj),
    gamer : checkIfExists('gamer', obj),
    sportsFitness : checkIfExists('sportsFitness', obj),
    arts : checkIfExists('arts', obj),
    party : checkIfExists('party', obj),
    married_parent : checkIfExists('married_parent', obj),
    reading : checkIfExists('reading', obj),
    unstable : checkIfExists('unstable', obj),
    ownsPet : checkIfExists('ownsPet', obj),
    student : checkIfExists('student', obj)
  };
  return pref;
}

function checkIfExists(trait, obj) {
  if(obj.hasOwnProperty(trait)) {
    return obj[trait];
  } else {
    return false;
  }
}

function checkEligibility(data, preferences) {
  for (key in preferences) {
    if(preferences[key] === true) {
      if(data[key]['isPresent'] !== true) {
        return false;
      }
    }
  }
  return true;
}
