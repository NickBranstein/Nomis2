module Engine {
   export class Sprite implements IAnimate, IRender, IGetClicked {
       public frames: number;
       public fps: number;
       public image: HTMLImageElement;
       private currentFrame: number;
       lastTimestamp;
       public flip: boolean;
       
        constructor(public x: number, public y: number, public frameWidth: number, public frameHeight: number, source: string, frames?: number, fps?: number, protected callback?: () => any) {
            this.image = new Image();
            this.image.src = source;
            this.currentFrame = 0;
            this.frames = frames;
            this.fps = fps;
            this.lastTimestamp = 0;
            this.flip = false;
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

            if(this.flip === true){
                context.save();
                context.scale(-1, 1);
            }
            
             // render the sprite
            context.drawImage(this.image, this.currentFrame * this.frameWidth, 0, this.frameWidth, this.image.height, 
               this.flip ? this.x * -1 : this.x, this.y, this.flip ? this.frameWidth * -1 : this.frameWidth, this.image.height);

            if(this.flip === true){
                context.restore();
            }
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
            if (this.callback != null) {
                this.callback();    
            }
        }
    }   
}