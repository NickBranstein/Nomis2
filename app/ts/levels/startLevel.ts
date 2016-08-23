module Engine {
    export class StartLevel implements ILevel {
            public sprites: Array<Engine.IGetClicked>;       
            
            constructor(game: Game) {
                this.sprites = [];
                this.sprites.push(new Button(375, 55, 'START', 30, '#ffffff', () => {
                    this.end(game);
                }));

                game.sprites = this.sprites;
            }

            start(game: Game): void {
                // do anything you need on start
            }

            end(game: Game): void {
                game.currentLevel = game.levels[1];
                game.currentLevel.start(game);
            }
            
            public render(context: CanvasRenderingContext2D, timestamp): void {    
                this.sprites.forEach((sprite) => {
                    sprite.render(context, timestamp);
                });
            }
        }
}