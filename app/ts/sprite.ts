module Engine {
   export class Sprite implements IAnimate, IRender, IGetClicked {
       public frames: number;
       public fps: number;
       public image: HTMLImageElement;
       private currentFrame: number;
       lastTimestamp;
       
        constructor(public x: number, public y: number, public frameWidth: number, public frameHeight: number, source: string, frames?: number, fps?: number, private callback?: () => any) {
            this.image = new Image();
            this.image.src = source;
            this.currentFrame = 0;
            this.frames = frames;
            this.fps = fps;
            this.lastTimestamp = 0;
        }
        
        public render(context: CanvasRenderingContext2D, timestamp): void {    
            if (this.lastTimestamp == null || this.lastTimestamp == undefined) {
                this.lastTimestamp = timestamp;
            }
            
            let elapsedTime =  timestamp - this.lastTimestamp;
            
            if(this.frames != null && elapsedTime > (1000 / this.fps)){
                    this.animate(context);    
                    this.lastTimestamp = timestamp;    
            }
            
             // render the sprite
            context.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.image.height, 
                this.x, this.y, this.frameWidth, this.image.height);
        }
        
        public animate(context: CanvasRenderingContext2D): void {
            // advance the sprite animation
            this.currentFrame++;
            
            if (this.currentFrame >= this.frames) {
                this.currentFrame = 0;
            }
        }

        public checkCollision(x: number, y: number) : boolean {
            if (y >= this.y && y <= this.y + this.frameHeight && x >= this.x && x <= this.x + this.frameWidth)
                return true;
            return false;
        }

        public click(event: MouseEvent) : void {
            console.log('Sprite Got Clicked');
            
            if (this.callback != null) {
                this.callback();    
            }
        }
    }   
}