define([
    'collections/diagrams',
    'models/diagram',
    'view',
    'bluebird'
], function (diagrams, Diagram, View, Promise) {


    const bindDataToView = function (diagram) {
        const view = new View({
            model: diagram
        });
        //render so user can see something while we updating data
        view.render();
        // wrap fetch in resolve() to get bluebird Promise
        // fetch returns jqXHR obj with .done .fail .always methods
        // not sure that I need bluebird here, but
        // for the sake of consistency in the future
        // and tech project description suggest it

        //do we need promise here? because we don't do anything with it
        // view listens to 'update' and 'change' so we don't need to bother about it
        Promise.resolve(diagram.fetch())
            .then(function (res) {
                console.log('fetch suceeded');
            })
            .catch(() => {
                console.error('fetch failed');
            });
    }

    // This function gets exported.
    const viewDiagramsController = function (diagramId) {
        let diagram = diagrams.get(diagramId);
        if (diagram) {
            bindDataToView(diagram);
        } else {
            // Diagram isn't in the collection. Fetch it
            diagram = new Diagram({
                id: diagramId
            });
            Promise.resolve(diagram.fetch())
                .then(function (res) {
                    diagrams.add(diagram);
                    bindDataToView(diagram);
                })
                .catch(() => {
                    console.error('fetch failed');
                });
        }
    }

    return viewDiagramsController;
});
