module.exports = {
  capitals: function(str) {
    return str.toUpperCase();
  },

  // http://doginthehat.com.au/2012/02/comparison-block-helper-for-handlebars-templates/
  compare: function(lvalue, rvalue, options) {

    if (arguments.length < 3)
      throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

    operator = options.hash.operator || "==";

    var operators = {
      '==': function(l, r) {
        return l == r;
      },
      '===': function(l, r) {
        return l === r;
      },
      '!=': function(l, r) {
        return l != r;
      },
      '<': function(l, r) {
        return l < r;
      },
      '>': function(l, r) {
        return l > r;
      },
      '<=': function(l, r) {
        return l <= r;
      },
      '>=': function(l, r) {
        return l >= r;
      },
      'typeof': function(l, r) {
        return typeof l == r;
      }
    }

    if (!operators[operator])
      throw new Error("Handlerbars Helper 'compare' doesn't know the operator " + operator);

    var result = operators[operator](lvalue, rvalue);

    if (result) {
      return options.fn(this);
    } else {
      return options.inverse(this);
    }

  },

  titleCase: function(str) {
    return str.replace(/\w\S*/g, function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  },

  loop: function(count, options) {
    var output = "";
    while (count--) {
      output += options.fn();
    }

    return output;
  },
  /*
   * Item helper.
   *
   * @return n elements
   */
  listItems: function(from, to, context, options) {
    var item = "";
    for (var i = from, j = to; i < j; i++) {
      item = item + options.fn(context[i]);
    }
    return item;
  }
}
