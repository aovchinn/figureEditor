define([
     'backbone', 'router'
], function(Backbone, Router) {
    var initialize = function() {
        new Router();
        Backbone.history.start();
    }

    return { initialize };
});
