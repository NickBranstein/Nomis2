module Engine {
    export interface IAnimate{
        frames: number;
        fps: number;
        lastTimestamp: number;
        
        animate(context: CanvasRenderingContext2D): void;
    }
}