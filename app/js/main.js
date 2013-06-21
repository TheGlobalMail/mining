requirejs.config({
  paths: {
    jquery: '../components/jquery/jquery',
    lodash: '../components/lodash/lodash',
    backbone: '../components/backbone/backbone'
  },
  shim: {
    backbone: { deps: ['jquery', 'lodash'] }
  }
});

requirejs([
  'jquery',
  './app/main'
],
function ($, app) {
    $(app.init);
});
