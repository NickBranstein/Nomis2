var Engine;
(function (Engine) {
    var Renderer = (function () {
        function Renderer(context, width, height, render) {
            this.context = context;
            this.width = width;
            this.height = height;
            this.render = render;
        }
        Renderer.prototype.start = function () {
            var _this = this;
            this.running = true;
            this.animationFrame = window.requestAnimationFrame(function (timestamp) { return _this.renderLoop(timestamp); });
        };
        Renderer.prototype.renderLoop = function (timestamp) {
            var _this = this;
            if (this.running) {
                this.clear();
                this.render(timestamp);
                window.requestAnimationFrame(function (time) { return _this.renderLoop(time); });
            }
        };
        Renderer.prototype.stop = function () {
            this.clear();
            window.cancelAnimationFrame(this.animationFrame);
            this.running = false;
        };
        Renderer.prototype.clear = function () {
            this.context.clearRect(0, 0, this.width, this.height);
        };
        return Renderer;
    }());
    Engine.Renderer = Renderer;
})(Engine || (Engine = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJlbmRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0FtQ1o7QUFuQ0QsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUtYO1FBSUksa0JBQW9CLE9BQWlDLEVBQVUsS0FBYSxFQUFVLE1BQWMsRUFBUyxNQUE2QjtZQUF0SCxZQUFPLEdBQVAsT0FBTyxDQUEwQjtZQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7WUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFRO1lBQVMsV0FBTSxHQUFOLE1BQU0sQ0FBdUI7UUFDMUksQ0FBQztRQUVNLHdCQUFLLEdBQVo7WUFBQSxpQkFHQztZQUZHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxjQUFjLEdBQUcsTUFBTSxDQUFDLHFCQUFxQixDQUFDLFVBQUMsU0FBUyxJQUFLLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsRUFBMUIsQ0FBMEIsQ0FBQyxDQUFDO1FBQ2xHLENBQUM7UUFFTSw2QkFBVSxHQUFqQixVQUFrQixTQUFTO1lBQTNCLGlCQU1DO1lBTEcsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNiLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxVQUFDLElBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQXJCLENBQXFCLENBQUMsQ0FBQztZQUNsRSxDQUFDO1FBQ0wsQ0FBQztRQUVNLHVCQUFJLEdBQVg7WUFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDWixNQUFNLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUM7UUFFTyx3QkFBSyxHQUFiO1lBQ0ksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxDQUFDO1FBQ0wsZUFBQztJQUFELENBN0JBLEFBNkJDLElBQUE7SUE3QlksZUFBUSxXQTZCcEIsQ0FBQTtBQUNMLENBQUMsRUFuQ00sTUFBTSxLQUFOLE1BQU0sUUFtQ1oiLCJmaWxlIjoicmVuZGVyLmpzIiwic291cmNlUm9vdCI6Ii90cyJ9
