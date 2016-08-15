module Engine {
   export class Button implements IRender, IGetClicked {
       lastTimestamp;
       height: number;
       width: number;
       
        constructor(public x: number, public y: number, public text: string, private callback?: () => any) {
        }
        
        public render(context: CanvasRenderingContext2D, timestamp): void {    
            // render the sprite
            this.height = 30;
            context.font = `${this.height}px Arial`;
            context.fillText(this.text, this.x, this.y);
            this.width = context.measureText(this.text).width;
        }

        public checkCollision(x: number, y: number) : boolean {
            if (y >= this.y - this.height && y <= this.y && x >= this.x && x <= this.x + this.width)
                return true;
            return false;
        }

        public click(event: MouseEvent) : void {
            console.log('Button Got Clicked');

            if (this.callback != null) {
                this.callback();    
            }
        }
    }   
}