define([
    'jquery', 'underscore', 'backbone', 'controller'
], function($, _, Backbone, viewDiagrams) {
    var Router = Backbone.Router.extend({
        routes: {
            //TODO need to think about id
            'my-diagram-:id': 'viewDiagramsController',
        },

        viewDiagramsController: function (id) {
            viewDiagrams(id - 1);
        }
    });

    return Router;
});
