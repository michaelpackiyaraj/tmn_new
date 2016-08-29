"use strict";
var app = angular.module("myApp.controllers", []);

app.controller('rootCtrl', function ($scope,$rootScope,$http,cmntsService) {
    $scope.dispFlag = false;
    /* get site content from json file */
    $http.get("/tmn_new/json/ratings_reviews.json").success(function(data) {
      $scope.response = data;
    });

    /* Sorting option dynamically change here... */
    $scope.predicate    = '-dateval';
    $scope.itemSelected = '-dateval';
    $scope.onSortChange = function (itemSelected) {
        $scope.predicate = itemSelected;
    };

    /* collect all the dats from localstorage... */
    $scope.comments = cmntsService.get();
   
    /* Finding Overall star ratings starts here... */
    var cmntslist = $scope.comments;
    var total_num_stars    = 0;
    var fiveStar  = 0;
    var fourStar  = 0;
    var threeStar = 0;
    var twoStar   = 0;
    var oneStar   = 0;
    var indivitual_total_stars     = 0;

    for (var i=0; i<cmntslist.length; i++){
        indivitual_total_stars   = parseInt(cmntslist[i].priceCount)+parseInt(cmntslist[i].valueCount)+parseInt(cmntslist[i].qualityCount);
        var caseVal = Math.round(indivitual_total_stars/3);
        switch (caseVal) {
            case 5:fiveStar++;break;
            case 4:fourStar++;break;
            case 3:threeStar++;break;
            case 2:twoStar++;break;
            default: oneStar++;
        }
        total_num_stars  = parseInt(total_num_stars)+indivitual_total_stars;
    }
    $scope.helpfuloption = true;
    $scope.starRatingoverAll = Math.round(total_num_stars/parseInt(cmntslist.length * 3));
    $scope.fiveStar  = fiveStar;
    $scope.fourStar  = fourStar;
    $scope.threeStar = threeStar;
    $scope.twoStar   = twoStar;
    $scope.oneStar   = oneStar;
    /* Finding Overall star ratings ends here... */

    $scope.showDialog = function() {
      $scope.dispFlag = true;
    };

    $scope.hideDialog = function() {
      $scope.dispFlag = false;
    };

    $scope.saveComments = function(frmscope,frmreviews) {
          var arr = [];
          var priceCount    = frmreviews.price.$modelValue;
          var valueCount    = frmreviews.value.$modelValue;
          var qualityCount  = frmreviews.quality.$modelValue;
          var helpfuloption = frmreviews.helpfuloption.$modelValue;
          var ratingArr     = {"priceCount":priceCount,"valueCount":valueCount,"qualityCount":qualityCount,"helpfuloption":helpfuloption,"dateval":new Date()};
          var concatObj     = angular.extend(frmscope, ratingArr);
          var curScope      = $scope.comments;
          /* converting object to array*/
            for (var prop in curScope) {
                arr.push(curScope[prop]);
            }
          arr.push(concatObj);
          $scope.comments = arr;
          $scope.dispFlag = false;
          window.location.reload();
    };

    $scope.$watch('comments', function (newValue,oldValue) {
      if (newValue !== oldValue) {
        cmntsService.put($scope.comments);
      }
    }, true);

});

app.controller("ratingCtrl", ['$scope', function ($scope) {
    $scope.starRatingPrice = 0;
    $scope.starRatingValue = 0;
    $scope.starRatingQuality = 0;

    $scope.clickPrice = function (param) {
         $scope.starRatingPrice = param;
    };
    $scope.clickValue = function (param) {
        $scope.starRatingValue = param;
    };
    $scope.clickQuality = function (param) {
        $scope.starRatingQuality = param;
    };
}]);

