define(["backbone", "eventDispatcher"],
 function(Backbone, eventDispatcher) {
     const Router = Backbone.Router.extend({
         routes: {
             "my-diagram-:id": "showDiagram",
         },

         showDiagram(id) {
             eventDispatcher.trigger("show:diagram", (id - 1));
         }
     });

     return Router;
 });
