module Engine {
    export class Player extends Sprite {
            private keys = {};
            private keyMap = {65: 'a', 68: 'd'};
            private movementSpeed: number;

        constructor(public x: number, public y: number, public frameWidth: number, public frameHeight: number, source: string, frames?: number, fps?: number, protected callback?: () => any) {
            super(x, y, frameWidth, frameHeight, source, frames, fps, callback);

            this.movementSpeed = 10;

            window.addEventListener('keydown', (event: KeyboardEvent)=>{
                this.keys[this.keyMap[event.keyCode]] = true;
            });

            window.addEventListener('keyup', (event: KeyboardEvent)=>{
                this.keys[this.keyMap[event.keyCode]] = false;
            });
        }

        public render(context: CanvasRenderingContext2D, timestamp): void {    
            if (this.lastTimestamp == null || this.lastTimestamp == undefined) {
                this.lastTimestamp = timestamp;
            }
            
            let elapsedTime =  (timestamp - this.lastTimestamp) / 10;
            this.lastTimestamp = timestamp;
            
            if(this.frames != null && elapsedTime > (1000 / this.fps)){
                    this.animate(context);    
                    this.lastTimestamp = timestamp;    
            }

            // acceleration?
            let speedX = 0;
            if (this.keys['a']) {
                speedX = -this.movementSpeed;
            }
            if (this.keys['d']) {
                speedX = this.movementSpeed;
            }

            this.x += speedX * elapsedTime;

            if(this.x > 766)
                this.x = 766;
            if(this.x < 0)
                this.x = 0;

            context.fillStyle = '#ff0000';
            context.lineWidth = 2;
            context.fillRect(this.x, this.y, 32, 32);
        }
    }
}