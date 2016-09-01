namespace Engine {
    export class StartLevel implements ILevel {
            public sprites: Array<Engine.IGetClicked>;      
            private game: Game; 
            
            constructor(game: Game) {
                this.sprites = [];
                this.game = game;

                let startButtonHeight = 30;
                let x = (this.game.canvasWidth / 2) - 50;
                let y = (this.game.canvasHeight / 2) - (startButtonHeight / 2) + 60;

                this.sprites.push(new Button(x, y, 'START', startButtonHeight, '#ffffff', () => {
                    this.end();
                }));

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
                let h = 80, text = 'Nomis2';
                let textMetrics = context.measureText(text);
                let x = (context.canvas.clientWidth / 2) - (textMetrics.width) - 30;
                let y = (context.canvas.clientHeight / 2);
                let dx = Math.random() * 5 + 5 * (timestamp % 2 === 0 ? 0 : -1), dy = Math.random() * 5;                                   

                // random color too?
                Engine.Drawing.text(context, text, x, y, h, '#fff');
                Engine.Drawing.text(context, text, x + dx, y + dy, h);

                this.sprites.forEach((sprite) => {
                    sprite.render(context, timestamp);
                });
            }
        }
}