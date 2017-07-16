define(["underscore", "backbone"],
  function(_, Backbone) {
      const eventDispatcher = _.clone(Backbone.Events);
      return eventDispatcher;
  });
