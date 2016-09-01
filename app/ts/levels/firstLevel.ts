namespace Engine {
    export class FirstLevel implements ILevel {
            public sprites: Array<Engine.IGetClicked>;      
            private game: Game; 
            
            constructor(game: Game) {
                this.sprites = [];
                this.game = game;

                this.game.sprites = this.sprites;
            }

            start(): void {
                // do anything you need on start
            }

            end(): void {
                this.game.currentLevel = this.game.levels[1];
                this.game.currentLevel.start();
            }
            
            public render(context: CanvasRenderingContext2D, timestamp): void {
                
            }
        }
}