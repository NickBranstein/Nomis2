module Engine {
    export class StartLevel implements ILevel {
            public sprites: Array<Engine.IGetClicked>;      
            private game: Game; 
            
            constructor(game: Game) {
                this.sprites = [];
                this.sprites.push(new Button(375, 55, 'START', 30, '#ffffff', () => {
                    this.end();
                }));

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
                this.sprites.forEach((sprite) => {
                    sprite.render(context, timestamp);
                });
            }
        }
}