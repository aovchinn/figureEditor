define([
    "underscore",
    "backbone",
    "bluebird",
    "../collections/shapes",
    "./stateManager"
], function(_, Backbone, Promise, Shapes, StateManager) {
    const Diagram = Backbone.Model.extend({
        id: null,
        urlRoot: "/api/diagrams/",
        defaults: {
            selectedShape: null,
            initialShapes: [],
        },

        fetchDiagram() {
            return Promise.resolve(this.fetch())
                .then(() => {
                    this.shapes = new Shapes(this.get("initialShapes"), {
                        url: this.url(),
                        parseModel: true,
                    });
                    this.stateManager = new StateManager({
                        initialShapes: this.shapes.toJSON()
                    });
                });
        },

        saveDiagram() {
            this.save({
                title: this.get("title"),
                components: this.shapes.unparse(),
            }, { patch: true });
            this.stateManager.clearStates();
        },

        saveState() {
            const state = this.shapes.toJSON().map(model => {
                return _.omit(model, "selected");
            });
            this.stateManager.addState(state);
        },

        undoState(stateIndex) {
            const newState = this.stateManager.getUndoState();
            this.shapes.reset(newState);
        },

        redoState(stateIndex) {
            const newState = this.stateManager.getRedoState();
            this.shapes.reset(newState);
        },

        parse(response) {
            return {
                title: response.title,
                initialShapes: response.components
            };
        },

        changeShapeProperties(shape, props) {
            //maybe we need some kind of validation
            shape.set(props);
        },

        selectShape(shape) {
            shape.set("selected", true);
            this.set("selectedShape", shape);
        },

        deselect() {
            if (this.get("selectedShape")) {
                this.get("selectedShape").set("selected", false);
                this.set("selectedShape", null);
            }
        },

        cancelChanges() {
            this.shapes.set(this.get("initialShapes"), { parseModel: true });
            this.stateManager.clearStates();
        },
    });

    return Diagram;
});
