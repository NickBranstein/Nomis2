module Engine {
    export interface IRender {        
        render(context: CanvasRenderingContext2D, elapsedTime): void;
    }
    
    export class Renderer {
        private animationFrame: number;
        private running: boolean;
        
        constructor(private context: CanvasRenderingContext2D, private width: number, private height: number, public render: (elapsedTime) => void) {
        }
        
        public start() : any {
            this.running = true;
            this.animationFrame = window.requestAnimationFrame((timestamp) => this.renderLoop(timestamp));
        }
        
        public renderLoop(timestamp) {            
            if (this.running) {
                this.clear();         
                this.render(timestamp);
                window.requestAnimationFrame((time) => this.renderLoop(time));
            }
        }
        
        public stop(){
            this.clear()
            window.cancelAnimationFrame(this.animationFrame);
            this.running = false;
        }
        
        private clear(){
            this.context.clearRect(0, 0, this.width, this.height);
        }
    }
}