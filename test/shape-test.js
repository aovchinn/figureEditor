define(["public/javascripts/models/shape"], function(Shape) {
    describe("Element._getStrokeDashArray", function() {
        let elem;
        before(function() {
            elem = new Shape();
        });

        it("should return 0 when gets stroke that it didn't know", function() {
            assert.equal(elem._getStrokeDashArray(undefined), 0);
        });

        it('should return "1, 4" for "dotted" stroke', function() {
            assert.equal(elem._getStrokeDashArray("dotted"), "1, 4");
        });

        it('should return "8, 10" for "dashed" stroke', function() {
            assert.equal(elem._getStrokeDashArray("dashed"), "8, 10");
        });

    });
});
