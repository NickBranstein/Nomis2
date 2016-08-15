var Engine;
(function (Engine) {
    var Button = (function () {
        function Button(x, y, text, callback) {
            this.x = x;
            this.y = y;
            this.text = text;
            this.callback = callback;
        }
        Button.prototype.render = function (context, timestamp) {
            // render the sprite
            this.height = 30;
            context.font = this.height + "px Arial";
            context.fillText(this.text, this.x, this.y);
            this.width = context.measureText(this.text).width;
        };
        Button.prototype.checkCollision = function (x, y) {
            if (y >= this.y - this.height && y <= this.y && x >= this.x && x <= this.x + this.width)
                return true;
            return false;
        };
        Button.prototype.click = function (event) {
            console.log('Button Got Clicked');
            if (this.callback != null) {
                this.callback();
            }
        };
        return Button;
    }());
    Engine.Button = Button;
})(Engine || (Engine = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJ1dHRvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFPLE1BQU0sQ0ErQlo7QUEvQkQsV0FBTyxNQUFNLEVBQUMsQ0FBQztJQUNaO1FBS0ssZ0JBQW1CLENBQVMsRUFBUyxDQUFTLEVBQVMsSUFBWSxFQUFVLFFBQW9CO1lBQTlFLE1BQUMsR0FBRCxDQUFDLENBQVE7WUFBUyxNQUFDLEdBQUQsQ0FBQyxDQUFRO1lBQVMsU0FBSSxHQUFKLElBQUksQ0FBUTtZQUFVLGFBQVEsR0FBUixRQUFRLENBQVk7UUFDakcsQ0FBQztRQUVNLHVCQUFNLEdBQWIsVUFBYyxPQUFpQyxFQUFFLFNBQVM7WUFDdEQsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sQ0FBQyxJQUFJLEdBQU0sSUFBSSxDQUFDLE1BQU0sYUFBVSxDQUFDO1lBQ3hDLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUN0RCxDQUFDO1FBRU0sK0JBQWMsR0FBckIsVUFBc0IsQ0FBUyxFQUFFLENBQVM7WUFDdEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNwRixNQUFNLENBQUMsSUFBSSxDQUFDO1lBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUM7UUFDakIsQ0FBQztRQUVNLHNCQUFLLEdBQVosVUFBYSxLQUFpQjtZQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFbEMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDcEIsQ0FBQztRQUNMLENBQUM7UUFDTCxhQUFDO0lBQUQsQ0E3QkQsQUE2QkUsSUFBQTtJQTdCVyxhQUFNLFNBNkJqQixDQUFBO0FBQ0wsQ0FBQyxFQS9CTSxNQUFNLEtBQU4sTUFBTSxRQStCWiIsImZpbGUiOiJidXR0b24uanMiLCJzb3VyY2VSb290IjoiL3RzIn0=
