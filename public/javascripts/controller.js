define([
    'jquery',
    'underscore',
    'backbone',
    'collections/diagrams',
    'models/diagram',
    'view'
], function($, _, Backbone, diagrams, Diagram, View) {
    // trying to implement router & controllers the way it done here
    // http://pragmatic-backbone.com/routing-and-controllers

    var renderAndFetchComponents = function(diagram) {
        var view = new View({model: diagram});
        console.log(diagram);
        diagram.components.fetch({
            success: function() {
                //rendering from the controller is not the best solution
                //for some reason change or sync event dont trigger rendering
                //maybe there creates a copy of diagram and changes in view.diagram
                // doesn't interfere with changes on diagram here, in controller.
                view.render();
            }
        });
    }

    // The controller itself. This is what gets exported.
    var viewDiagramsController = function(diagramId) {
        console.log('viewDiagramsController called');
        var diagram = diagrams.get(diagramId); //need to check is this work at all
        if (diagram) {
            renderAndFetchComponents(diagram, $container);
        } else {
            // Diagram isn't in the collection. Fetch it
            // before rendering a collection.
            diagram = new Diagram({id: diagramId});
            diagram.fetch({
                success: function() {
                    console.log('fetch succeeded, diagam:');
                    console.log(diagram);

                    // Add the diagram to the global collection.
                    diagrams.add(diagram);
                    renderAndFetchComponents(diagram);
                },
                errror: function () {
                    console.log('error fetching');
                }
            });
        }
    }

    return viewDiagramsController;
});
