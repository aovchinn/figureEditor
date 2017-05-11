define([
    'jquery', 'underscore', 'backbone', 'view', 'router'
], function($, _, Backbone, View, Router) {
    var initialize = function() {
        // new View();
        new Router();
        Backbone.history.start();
    }

    return {initialize: initialize};
});
