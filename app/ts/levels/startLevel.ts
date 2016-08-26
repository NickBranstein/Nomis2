namespace Engine {
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
                let x = 375, y = 300, h = 80, text = 'Nomis2';
                let dx = Math.random() * 5 + 5 * (timestamp % 2 === 0 ? 0 : -1), dy = Math.random() * 5;                                   

                // random color too?
                Engine.Drawing.text(context, 'Nomis2', x, y, h, '#fff');
                Engine.Drawing.text(context, 'Nomis2', x + dx, y + dy, h);

                this.sprites.forEach((sprite) => {
                    sprite.render(context, timestamp);
                });
            }
        }
}