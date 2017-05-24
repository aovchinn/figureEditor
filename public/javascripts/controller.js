define([
    'collections/diagram',
    'views/diagram-view',
    'views/edit-el-view',
    'bluebird'
], function (Diagram, View, EditElView, Promise) {
    const viewDiagramsController = function (diagramId) {
        const diagram = new Diagram();
        diagram.setId(diagramId);
        new View({
            collection: diagram
        });
        new EditElView({
            collection: diagram
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
