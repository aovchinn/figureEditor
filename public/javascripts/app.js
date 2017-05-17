define([
     'backbone', 'router'
], function(Backbone, Router) {
    const initialize = function() {
        new Router();
        Backbone.history.start();
    }

    return { initialize };
});
