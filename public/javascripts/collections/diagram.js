define(["backbone", "underscore", "../models/ellipse", "../models/line"],
 function(Backbone, _, Ellipse, Line) {
     const Diagram = Backbone.Collection.extend({
         url: "/api/diagrams/0",
         title: "diagram-name",
         id: "0",
         selectedShape: null,

         model: function(attrs, options) {
             const Model = {
                 ellipse: Ellipse,
                 line: Line
             };
             if (Model[attrs.type]) {
                 return new Model[attrs.type](attrs, { parse: true });
             } else {
                 throw new Error(`can't create model of type: ${attrs.type}`);
             }
         },

         initialize(models, options) {
             this.title = options.title;
         },

         getTitle() {
             return this.title;
         },

         selectShape(shape) {
             shape.set("selected", true);
             this.selectedShape = shape;
         },

         changeShapeProperties(shape, props) {
             shape.set(props);
         },

         deselect() {
             this.selectedShape.set("selected", false);
             this.selectedShape = null;
         },

         getSelected() {
             return this.selectedShape;
         },

         save() {
             this.sync("update", this);
         }
     });
     return Diagram;
 });
