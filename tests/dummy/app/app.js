import Ember from 'ember';
import Resolver from './resolver';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';

let App;

Ember.$ = $;
Ember.Component.$ = $;
Ember.__loader.require('ember-views/system/jquery').default = $;

['width', 'height'].forEach(function(dimension) {
  var Dimension = dimension.replace(/./, function(m) { return m[0].toUpperCase(); });
  $.fn['outer' + Dimension] = function(margin) {
    var elem = this;
    if (elem) {
      var size = elem[dimension]();
      var sides = {'width': ['left', 'right'], 'height': ['top', 'bottom']};
      sides[dimension].forEach(function(side) {
        if (margin) {
          size += parseInt(elem.css('margin-' + side), 10);
        }
      });
      return size;
    } else {
      return null;
    }
  };
});

Ember.MODEL_FACTORY_INJECTIONS = true;

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver
});

loadInitializers(App, config.modulePrefix);

export default App;
