module Engine {
    export interface ILevel extends IRender {
        sprites: Array<Engine.IGetClicked>;
        start: (game: Game) => void;
        end: (game: Game) => void;
    }
}