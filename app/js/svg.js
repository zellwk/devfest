var svgInjector = require('svg-injector');

var svgsToInject = document.getElementsByClassName('.jsSvgInject');

if (svgsToInject) {
  svgInjector(svgsToInject);
}
