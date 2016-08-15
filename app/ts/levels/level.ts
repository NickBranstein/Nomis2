module Engine {
    export interface ILevel extends IRender {
        sprites: Array<Engine.IGetClicked>;
    }

    export class StartLevel implements ILevel {
            public sprites: Array<Engine.IGetClicked>;       
            
            constructor(game: Game) {
                this.sprites = [];
                this.sprites.push(new Button(50, 500, 'New Game', () => {
                  console.log('new game callback');
                }));
                this.sprites.push(new Button(350, 500, 'Continue Game', () => {
                    console.log('continue game callback');
                }));
                
                game.sprites = this.sprites;
            }
            
            public render(context: CanvasRenderingContext2D, timestamp): void {    
                var background = new Image();
                
                background.src = 'images/meteor.png';
                context.drawImage(background, 0, 0);

                this.sprites.forEach((sprite) => {
                    sprite.render(context, timestamp);
                });
            }
        }
}