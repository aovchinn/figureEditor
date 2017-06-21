define([
    "backbone", "router", "controller"
], function(Backbone, Router, controller) {
    function initialize() {
        new Router();
        controller.initialize();
        Backbone.history.start();
    };

    return { initialize };
});
