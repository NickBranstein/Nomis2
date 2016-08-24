module Engine {
    export interface ILevel extends IRender {
        sprites: Array<Engine.IGetClicked>;
        start: () => void;
        end: () => void;
    }
}