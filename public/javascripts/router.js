define([
    'backbone', 'controller'
], function (Backbone, viewDiagramsController) {
    const Router = Backbone.Router.extend({
        routes: {
            'my-diagram-:id': 'viewDiagramsController',
        },

        viewDiagramsController: function (id) {
            viewDiagramsController(id - 1);
        }
    });

    return Router;
});
