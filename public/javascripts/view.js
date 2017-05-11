define([
    'jquery', 'underscore', 'backbone', 'd3', 'collections/components'
], function($, _, Backbone, d3, Components) {
    var View = Backbone.View.extend({
        el: 'svg',

        initialize: function() {
            console.log('initializing view');
        },

        render: function() {
            console.log('render components: ');
            if (this.model) {

                var svgContainer = d3.select('svg').attr('width', 300).attr('height', 200);
                //TODO think how we can add new elements (rectangle for example)
                // and render them without changing render
                // for exmple grab type from model and add attributes that model has

                //removing all elements from svg
                //there should be a better way to do this
                d3.selectAll("svg > *").remove();

                svgContainer.selectAll('ellipse')
                .data(this.model.components.getEllipses())
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
                .data(this.model.components.getLines())
                .enter().append('line')
                .attr('x1', d => d.get('x1'))
                .attr('y1', d => d.get('y1'))
                .attr('x2', d => d.get('x2'))
                .attr('y2', d => d.get('y2'))
                .attr('stroke', d => d.get('stroke'))
                .attr('stroke-width', d => d.get('stroke-width'))
                .attr('stroke-dasharray', d => d.get('stroke-dasharray'));
            }
        }
    });

    return View;
});
