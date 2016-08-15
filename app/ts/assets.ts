module Engine {
    export interface IGetClicked extends IRender {
        click(event: MouseEvent): void;
        checkCollision(x: number, y: number) : boolean 
    }
}