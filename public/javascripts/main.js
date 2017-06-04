require.config({
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore', 'jquery'
            ],
            exports: 'Backbone'
        }
    },
    paths: {
        text: '/source/text/text',
        jquery: '/source/jquery/dist/jquery.min',
        underscore: '/source/underscore/underscore-min',
        backbone: '/source/backbone/backbone-min',
        d3: '/source/d3/build/d3.min',
        bluebird: '/source/bluebird/js/browser/bluebird.min'
    }

});

require(['app'], function(App) {
    App.initialize();
});
