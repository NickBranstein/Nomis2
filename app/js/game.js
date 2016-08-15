var Game = (function () {
    function Game(context, width, height) {
        var _this = this;
        this.context = context;
        this.width = width;
        this.height = height;
        this.context.canvas.addEventListener('click', function (event) { _this.click(event); });
        this.sprites = [];
        this.renderer = new Engine.Renderer(context, width, height, function (timestamp) { _this.renderWorld(timestamp); }); // wrap in a method ot preserve the reference to the class
        // Start Screen
        var start = new Engine.StartLevel(this);
        this.currentLevel = start;
        // var sprite = new Engine.Sprite(150, 150, 80, 78, 'images/meteor.png');
        // sprite.frames = 4;
        // sprite.fps = 5;
        // this.sprites.push(sprite);
        // var s = new Engine.Sprite(300, 150, 80, 78, 'images/meteor.png');
        // s.frames = 4;
        // s.fps = 20;
        // this.sprites.push(s);
        // var button = new Engine.Button(500, 500, 50, 50, 'Start');
        // this.sprites.push(button);
    }
    Game.prototype.start = function () {
        this.renderer.start();
    };
    Game.prototype.stop = function () {
        this.renderer.stop();
    };
    Game.prototype.renderWorld = function (timestamp) {
        // this.sprites.forEach((sprite) => {
        //     sprite.render(this.context, timestamp);
        // });
        this.currentLevel.render(this.context, timestamp);
    };
    ;
    Game.prototype.click = function (event) {
        this.currentLevel.sprites.forEach(function (sprite) {
            if (sprite.checkCollision(event.offsetX, event.offsetY)) {
                sprite.click(event);
            }
        });
    };
    return Game;
}());

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImdhbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7SUFLSSxjQUFvQixPQUFpQyxFQUFVLEtBQWEsRUFBVSxNQUFjO1FBTHhHLGlCQW1EQztRQTlDdUIsWUFBTyxHQUFQLE9BQU8sQ0FBMEI7UUFBVSxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUNoRyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFpQixJQUFNLEtBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUEsQ0FBQSxDQUFDLENBQUMsQ0FBQztRQUMxRixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztRQUVsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxVQUFDLFNBQVMsSUFBTSxLQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQywwREFBMEQ7UUFFdEssZUFBZTtRQUNmLElBQUksS0FBSyxHQUFHLElBQUksTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsWUFBWSxHQUFHLEtBQUssQ0FBQztRQUUxQix5RUFBeUU7UUFDekUscUJBQXFCO1FBQ3JCLGtCQUFrQjtRQUNsQiw2QkFBNkI7UUFFN0Isb0VBQW9FO1FBQ3BFLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2Qsd0JBQXdCO1FBRXhCLDZEQUE2RDtRQUM3RCw2QkFBNkI7SUFDakMsQ0FBQztJQUVNLG9CQUFLLEdBQVo7UUFDSSxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFTSxtQkFBSSxHQUFYO1FBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUN6QixDQUFDO0lBRU8sMEJBQVcsR0FBbkIsVUFBb0IsU0FBUztRQUN6QixxQ0FBcUM7UUFDckMsOENBQThDO1FBQzlDLE1BQU07UUFDTixJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQ3RELENBQUM7O0lBRU8sb0JBQUssR0FBYixVQUFjLEtBQWlCO1FBQzNCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxVQUFDLE1BQU07WUFDckMsRUFBRSxDQUFBLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBLENBQUM7Z0JBQ3BELE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDeEIsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUNMLFdBQUM7QUFBRCxDQW5EQSxBQW1EQyxJQUFBIiwiZmlsZSI6ImdhbWUuanMiLCJzb3VyY2VSb290IjoiL3RzIn0=
