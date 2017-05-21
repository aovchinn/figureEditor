define([
    'collections/diagram',
    'views/diagram-view',
    'bluebird'
], function ( Diagram, View, Promise) {
    const viewDiagramsController = function (diagramId) {
        const diagram = new Diagram();
        diagram.setId(diagramId);
        const view = new View({
            'collection' : diagram
        });

        Promise.resolve(diagram.fetch())
            .then(function (res) {
                console.log('fetch succeeded');
            })
            .catch(() => {
                console.error('fetch failed');
            });
    }

    return viewDiagramsController;
});
