var Engine;
(function (Engine) {
    var StartLevel = (function () {
        function StartLevel(game) {
            this.sprites = [];
            this.sprites.push(new Engine.Button(50, 500, 'New Game', function () {
                console.log('new game callback');
            }));
            this.sprites.push(new Engine.Button(350, 500, 'Continue Game', function () {
                console.log('continue game callback');
            }));
            game.sprites = this.sprites;
        }
        StartLevel.prototype.render = function (context, timestamp) {
            var background = new Image();
            background.src = 'images/meteor.png';
            context.drawImage(background, 0, 0);
            this.sprites.forEach(function (sprite) {
                sprite.render(context, timestamp);
            });
        };
        return StartLevel;
    }());
    Engine.StartLevel = StartLevel;
})(Engine || (Engine = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxldmVscy9sZXZlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0ErQlo7QUEvQkQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUtYO1FBR1Esb0JBQVksSUFBVTtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQU0sQ0FBQyxFQUFFLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRTtnQkFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLGVBQWUsRUFBRTtnQkFDcEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1lBQzFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFSixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDaEMsQ0FBQztRQUVNLDJCQUFNLEdBQWIsVUFBYyxPQUFpQyxFQUFFLFNBQVM7WUFDdEQsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLEVBQUUsQ0FBQztZQUU3QixVQUFVLENBQUMsR0FBRyxHQUFHLG1CQUFtQixDQUFDO1lBQ3JDLE9BQU8sQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUVwQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07Z0JBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3RDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQztRQUNMLGlCQUFDO0lBQUQsQ0F6QkosQUF5QkssSUFBQTtJQXpCUSxpQkFBVSxhQXlCbEIsQ0FBQTtBQUNULENBQUMsRUEvQk0sTUFBTSxLQUFOLE1BQU0sUUErQloiLCJmaWxlIjoibGV2ZWxzL2xldmVsLmpzIiwic291cmNlUm9vdCI6Ii90cyJ9
