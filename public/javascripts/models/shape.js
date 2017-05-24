define(['backbone'],
    function (Backbone) {
        const Shape = Backbone.Model.extend({
            _getStrokeDashArray(strokeStyle) {
                const strokes = {
                    'dashed': '8, 10',
                    'dotted': '1, 4',
                    'solid': '0'
                };
                return strokes[strokeStyle] || strokes.solid;
            }
        });
        return Shape;
    }
);
