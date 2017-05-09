define([
    'jquery', 'underscore', 'backbone', 'd3', 'models/diagram'
], function($, _, Backbone, d3, Diagram) {
    var View = Backbone.View.extend({
        el: 'svg',

        initialize: function() {
            console.log('initializing view');
            //two id's for now you can pass '0' or '1'
            this.diagram = new Diagram({id: 0}); //TODO should pass id in the router?
            this.diagram.fetch({
                success: function(collection, response, options) {
                    console.log('success');
                },
                error: function(collection, response, options) {
                    console.log('error fetching diagram');
                }
            });
            console.log('diagram: ');
            console.log(this.diagram);

            //TODO time to connect bluebird because 'diagram.components' don't loaded yet
            // they will be loaded in success callback inside the Diagram model
            // somewhere in my life I went the wrong way
            console.log('ellipses: ');
            console.log(this.diagram.components.getEllipses());
            console.log('lines: ');
            console.log(this.diagram.components.getLines());

            // this.render();
            //TODO do 'change' event include changes outside of 'attributes'
            // it looks fine, because d3 render components, but if components
            // change some day will 'diagram' model fire change event ?
            this.listenTo(this.diagram, 'change', this.render);
        },

        render: function() {
            var svgContainer = d3.select('svg').attr('width', 300).attr('height', 200);
            //TODO think how we can add new elements (rectangle for example)
            // and render them without changing render
            // for exmple grab type from model and add attributes that model has

            svgContainer.selectAll('ellipse')
            .data(this.diagram.components
                .getEllipses())
                .enter()
                .append('ellipse')
                .attr('cx', d => d.get('cx'))
                .attr('cy', d => d.get('cy'))
                .attr('rx', d => d.get('rx'))
                .attr('ry', d => d.get('ry'))
                .attr('fill', d => d.get('fill'))
                .attr('stroke', d => d.get('stroke'))
                .attr('stroke-width', d => d.get('stroke-width'))
                .attr('stroke-dasharray', d => d.get('stroke-dasharray'));

            svgContainer.selectAll('line')
            .data(this.diagram.components.getLines())
            .enter().append('line')
            .attr('x1', d => d.get('x1'))
            .attr('y1', d => d.get('y1'))
            .attr('x2', d => d.get('x2'))
            .attr('y2', d => d.get('y2'))
            .attr('stroke', d => d.get('stroke'))
            .attr('stroke-width', d => d.get('stroke-width'))
            .attr('stroke-dasharray', d => d.get('stroke-dasharray'));
        }
    });

    return View;
});
