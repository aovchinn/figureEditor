define(["backbone", "bluebird", "../collections/shapes"],
    function(Backbone, Promise, Shapes) {
        const Diagram = Backbone.Model.extend({
            id: null,
            urlRoot: "/api/diagrams/",
            defaults: {
                initialShapes: [],
                selectedShape: null,
            },

            fetchDiagram() {
                return Promise.resolve(this.fetch())
                .then(() => {
                    this.shapes = new Shapes(this.get("initialShapes"), {
                        url: this.url(),
                        parseModel: true,
                    });
                });
            },

            saveDiagram() {
                this.save({
                    title: this.get("title"),
                    components: this.shapes.unparse(),
                }, { patch: true });
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
            },
        });

        return Diagram;
    });
