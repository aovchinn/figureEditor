define([
    'jquery', 'underscore', 'backbone', 'model', 'view'
], function($, _, Backbone, Model, View) {
    var initialize = function() {
        // new Model();
        new View();
    }

    return {initialize: initialize};
});
