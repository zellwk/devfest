let $ = global.jQuery;
let _ = require('lodash');
let templateFn = require('./templates/jobs.handlebars');

var Handlebars = require("hbsfy/runtime");

Handlebars.registerHelper('truncate', function(str, len) {
  if (str.length > len && str.length > 0) {
    var new_str = str + " ";
    new_str = str.substr(0, len);
    new_str = str.substr(0, new_str.lastIndexOf(" "));
    new_str = (new_str.length > 0) ? new_str : str.substr(0, len);

    return new Handlebars.SafeString (new_str + '...'); 
  }
  return str;
});

$(document).ready(function() {
  'use-strict';
  let $featuredJobs = $('#featured-jobs');

  if ($featuredJobs.length) {
    let data = require('../handlebars/data.json');
    let companies = _.where(data.jobs, {type: 'company'});
    let company = _.sample(companies, [3]);
    let html = templateFn(company);

    // console.log(html);

    $featuredJobs.append(html);
  }
});
