define(['public/javascripts/models/element'], function (Element) {
    describe('Element._getStrokeDashArray', function () {
        let elem;
        before(function () {
            // runs before all tests in this block
            elem = new Element();
        });

        it('should return 0 when gets stroke that it didn\'t know', function () {
            assert.equal(elem._getStrokeDashArray(undefined), 0, 'returned 0');
        });

        it('should return "1, 4" for "dotted" stroke', function () {
            assert.equal(elem._getStrokeDashArray('dotted'), '1, 4', 'do I need to write here anything?');
        });

        it('should return "8, 10" for "dashed" stroke', function () {
            assert.equal(elem._getStrokeDashArray('dashed'), '8, 10');
        });

    });
});
