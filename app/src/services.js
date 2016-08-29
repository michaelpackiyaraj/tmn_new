"use strict";

angular.module("myApp.services", []).factory("cmntsService", function() {
  var STORAGE_KEY = 'StorageReviews', factory = { };
  
  factory.get = function() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
  };
  
  factory.put = function(frmscope) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(frmscope));
  };
  
  return factory;
});
