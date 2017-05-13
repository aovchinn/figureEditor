define([
    'collections/diagrams',
    'models/diagram',
    'view'
], function (diagrams, Diagram, View) {

    var bindDataToView = function (diagram) {
        var view = new View({
            model: diagram
        });
        view.render();
        diagram.fetch();
    }

    // This function gets exported.
    var viewDiagramsController = function (diagramId) {
        var diagram = diagrams.get(diagramId);
        if (diagram) {
            bindDataToView(diagram);
        } else {
            // Diagram isn't in the collection. Fetch it
            diagram = new Diagram({
                id: diagramId
            });
            diagram.fetch({
                success: function () {
                    console.log(diagram);
                    // Add the diagram to the global collection.
                    diagrams.add(diagram);
                    bindDataToView(diagram);
                },
                errror: function () {
                    console.error('error fetching');
                }
            });
        }
    }

    return viewDiagramsController;
});
