'use strict';

const $ = require("jquery");
const angular = require("angular");
const moment = require("moment");
require("angular-route");

const MOMENT_FORMAT = "MMM DD YYYY @ hh:mm";

// style sheets
require("bootstrap-webpack");
require("../scss/main.scss");

// index.html
require("../index.html");

const dashboardView = require("./dashboardView");
const sensorListView = require("./sensorListView");

var currentView;
var $currentViewScope;

var App = require("./app");
window.app = new App({
  refresh: function () {
    $currentViewScope.$apply();
  }
});

angular
  .module("app", [
    'ngRoute'
  ])
  .controller('DashboardViewCtrl', ['$scope', function ($scope) {
    $currentViewScope = $scope;
    currentView = dashboardView;
    $.when(app.initialized).done(function () {
      dashboardView.init(app, $scope);
    });
  }])
  .controller('SensorListViewCtrl', ['$scope', function ($scope) {
    $currentViewScope = $scope;
    currentView = sensorListView;
    $.when(app.initialized).done(function () {
      sensorListView.init(app, $scope);
    });
  }])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/dashboard', { controller: 'DashboardViewCtrl', templateUrl: dashboardView.templateUrl } )
      .when('/sensors', { controller: 'SensorListViewCtrl', templateUrl: sensorListView.templateUrl } )
      .otherwise({ redirectTo: '/dashboard' }); 
  }])
  .filter('moment', function () {
    return function (datestr) {
      return moment(datestr).format(MOMENT_FORMAT);
    };
  }); 