var svgInjector = require('svg-injector');

var svgsToInject = document.getElementsByClassName('jsSvgInject');

console.log(svgsToInject);

if (svgsToInject) {
  svgInjector(svgsToInject);
}
