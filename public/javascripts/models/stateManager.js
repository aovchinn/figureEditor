define(["underscore", "backbone"],
  function(_, Backbone) {
      const StateManager = Backbone.Model.extend({
          defaults: {
              "initialShapes": {}
          },

          initialize(options) {
              this.set("initialShapes", options.initialShapes);
              this.clearStates();
          },

          addState(state) {
              let newStates = _.clone(this.get("states"));
              if (this.get("index") < this.getLength() - 1) {
                  newStates = newStates.slice(0, this.get("index") + 1);
              }
              newStates.push(state);
              this.set("states", newStates);
              this.set("index", this.get("index") + 1);
          },

          getRedoState() {
              this.set("index", this.get("index") + 1);
              return this.get("states")[this.get("index")];
          },

          getUndoState() {
              this.set("index", this.get("index") - 1);
              return this.get("states")[this.get("index")];
          },

          getLength() {
              return this.get("states").length;
          },

          clearStates() {
              this.set("states", [this.get("initialShapes")]);
              this.set("index", 0);
              console.log("index: " + this.get("index"), "length: " + this.getLength());
          }
      });

      return StateManager;
  });
