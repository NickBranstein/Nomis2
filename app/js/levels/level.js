var Engine;
(function (Engine) {
    var StartLevel = (function () {
        function StartLevel(game) {
            this.sprites = [];
            this.sprites.push(new Engine.Button(350, 500, 'Start', function () {
                console.log('new game callback');
            }));
            game.sprites = this.sprites;
        }
        StartLevel.prototype.render = function (context, timestamp) {
            var background = new Image();
            // background.src = 'images/meteor.png';
            // context.drawImage(background, 0, 0);
            this.sprites.forEach(function (sprite) {
                sprite.render(context, timestamp);
            });
        };
        return StartLevel;
    }());
    Engine.StartLevel = StartLevel;
})(Engine || (Engine = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxldmVscy9sZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0E0Qlo7QUE1QkQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUtYO1FBR1Esb0JBQVksSUFBVTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLE9BQU8sRUFBRTtnQkFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDaEMsQ0FBQztRQUVNLDJCQUFNLEdBQWIsVUFBYyxPQUFpQyxFQUFFLFNBQVM7WUFDdEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUU3Qix3Q0FBd0M7WUFDeEMsdUNBQXVDO1lBRXZDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFVBQUMsTUFBTTtnQkFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDLENBQUM7WUFDdEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDO1FBQ0wsaUJBQUM7SUFBRCxDQXRCSixBQXNCSyxJQUFBO0lBdEJRLGlCQUFVLGFBc0JsQixDQUFBO0FBQ1QsQ0FBQyxFQTVCTSxNQUFNLEtBQU4sTUFBTSxRQTRCWiIsImZpbGUiOiJsZXZlbHMvbGV2ZWwuanMiLCJzb3VyY2VSb290IjoiL3RzIn0=
