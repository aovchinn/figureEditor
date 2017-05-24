define(['public/javascripts/collections/diagram'], function (Diagram) {

    describe('Diagram', function () {
        const diagramConfig = {
            title: 'My diagram 1',
            components: [
                {
                    type: 'ellipse',
                    properties: {
                        x: 60,
                        y: 40,
                        rx: 50,
                        ry: 50,
                        fill: '#BDBBB8',
                        'stroke-color': '#0000ff',
                        'stroke-width': 2,
                        'stroke-style': 'dashed'
                    }
                },
                {
                    type: 'ellipse',
                    properties: {
                        x: 60,
                        y: 40,
                        rx: 50,
                        ry: 50,
                        fill: '#BDBBB8',
                        'stroke-color': '#0000ff',
                        'stroke-width': 2,
                        'stroke-style': 'dashed'
                    }
                },
                {
                    type: 'line',
                    properties: {
                        start: {
                            x: 100,
                            y: 90
                        },
                        end: {
                            x: 200,
                            y: 150
                        },
                        'stroke-color': '#2196F3',
                        'stroke-width': 2,
                        'stroke-style': 'solid'
                    }
                }
            ]
        };
        let diagram;
        beforeEach(function() {
            diagram = new Diagram(diagramConfig, { parse: true });
        });

        it('selects shape', function () {
            const EXISTING_INDEX = 0;

            diagram.selectShape(EXISTING_INDEX);

            assert.equal(diagram.getSelected(), EXISTING_INDEX);
        }); // selects shape

        it('selecting unexisting shape', function (){
            const INDEX_OF_BOUNDS = 10;

            diagram.selectShape(INDEX_OF_BOUNDS);

            assert.equal(diagram.getSelected(), null);
        }); //selecting unexisting shape
        
    }); // Diagram
});
