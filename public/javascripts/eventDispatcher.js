define(["backbone"],
  function(Backbone) {
      const eventDispatcher = _.clone(Backbone.Events);
      return eventDispatcher;
  });
