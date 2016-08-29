"use strict";
var myApp = angular.module('myApp',['ngRoute','myApp.controllers','myApp.services','myApp.directives']);
myApp.config(function($routeProvider){
		$routeProvider.when('/',{
			templateUrl:'/tmn_new/app/src/templates/home.tpl.html'
		}).otherwise({
     		 redirectTo: '/'
 		 });
});
