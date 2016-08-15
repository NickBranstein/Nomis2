var Engine;
(function (Engine) {
    var Sprite = (function () {
        function Sprite(x, y, frameWidth, frameHeight, source, frames, fps, callback) {
            this.x = x;
            this.y = y;
            this.frameWidth = frameWidth;
            this.frameHeight = frameHeight;
            this.callback = callback;
            this.image = new Image();
            this.image.src = source;
            this.currentFrame = 0;
            this.frames = frames;
            this.fps = fps;
            this.lastTimestamp = 0;
        }
        Sprite.prototype.render = function (context, timestamp) {
            if (this.lastTimestamp == null || this.lastTimestamp == undefined) {
                this.lastTimestamp = timestamp;
            }
            var elapsedTime = timestamp - this.lastTimestamp;
            if (this.frames != null && elapsedTime > (1000 / this.fps)) {
                this.animate(context);
                this.lastTimestamp = timestamp;
            }
            // render the sprite
            context.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.image.height, this.x, this.y, this.frameWidth, this.image.height);
        };
        Sprite.prototype.animate = function (context) {
            // advance the sprite animation
            this.currentFrame++;
            if (this.currentFrame >= this.frames) {
                this.currentFrame = 0;
            }
        };
        Sprite.prototype.checkCollision = function (x, y) {
            if (y >= this.y && y <= this.y + this.frameHeight && x >= this.x && x <= this.x + this.frameWidth)
                return true;
            return false;
        };
        Sprite.prototype.click = function (event) {
            console.log('Sprite Got Clicked');
            if (this.callback != null) {
                this.callback();
            }
        };
        return Sprite;
    }());
    Engine.Sprite = Sprite;
})(Engine || (Engine = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNwcml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0F5RFo7QUF6REQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUNaO1FBT0ssZ0JBQW1CLENBQVMsRUFBUyxDQUFTLEVBQVMsVUFBa0IsRUFBUyxXQUFtQixFQUFFLE1BQWMsRUFBRSxNQUFlLEVBQUUsR0FBWSxFQUFVLFFBQW9CO1lBQS9KLE1BQUMsR0FBRCxDQUFDLENBQVE7WUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1lBQVMsZUFBVSxHQUFWLFVBQVUsQ0FBUTtZQUFTLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1lBQXlELGFBQVEsR0FBUixRQUFRLENBQVk7WUFDOUssSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLEtBQUssRUFBRSxDQUFDO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxHQUFHLE1BQU0sQ0FBQztZQUN4QixJQUFJLENBQUMsWUFBWSxHQUFHLENBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztZQUNyQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFTSx1QkFBTSxHQUFiLFVBQWMsT0FBaUMsRUFBRSxTQUFTO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxhQUFhLElBQUksU0FBUyxDQUFDLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLGFBQWEsR0FBRyxTQUFTLENBQUM7WUFDbkMsQ0FBQztZQUVELElBQUksV0FBVyxHQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO1lBRWxELEVBQUUsQ0FBQSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLFdBQVcsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQSxDQUFDO2dCQUNuRCxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUN2QyxDQUFDO1lBRUEsb0JBQW9CO1lBQ3JCLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3BHLElBQUksQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUQsQ0FBQztRQUVNLHdCQUFPLEdBQWQsVUFBZSxPQUFpQztZQUM1QywrQkFBK0I7WUFDL0IsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXBCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUM7UUFDTCxDQUFDO1FBRU0sK0JBQWMsR0FBckIsVUFBc0IsQ0FBUyxFQUFFLENBQVM7WUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUM5RixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVNLHNCQUFLLEdBQVosVUFBYSxLQUFpQjtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0F2REQsQUF1REUsSUFBQTtJQXZEVyxhQUFNLFNBdURqQixDQUFBO0FBQ0wsQ0FBQyxFQXpETSxNQUFNLEtBQU4sTUFBTSxRQXlEWiIsImZpbGUiOiJzcHJpdGUuanMiLCJzb3VyY2VSb290IjoiL3RzIn0=
