module Engine {
    export class MainLevel implements ILevel {
        public sprites: Array<Engine.IGetClicked>;       
            
            constructor(game: Game) {
                this.sprites = [];
                // // this.sprites.push(new Button(350, 500, 'Continue Game', () => {
                // //     console.log('continue game callback');
                // // }));
                
                // this.sprites.push(new Button(350, 500, 'Start', () => {
                //   console.log('new game callback');
                // }));

                // game.sprites = this.sprites;
                var upgradeCount = UpgradesJson.upgrades.length;
                var yPos = 20;
                for (var i=0;i<upgradeCount;i++) {
                    this.sprites.push(new Button(10, yPos, 'BUY |', 16, "#00ff00", () => {
                        console.log('new game callback');
                    }));
                    yPos+=22;
                }
                // let errorBox = new ErrorBox(350, 500, 'brokening',50, "grey", () => {
                //     console.log('continue game callback');
                // })
                // this.sprites.push(errorBox);
                game.sprites = this.sprites;
            }
            
            public render(context: CanvasRenderingContext2D, timestamp): void {    
                // var background = new Image();
                
                // // background.src = 'images/meteor.png';
                // // context.drawImage(background, 0, 0);

                this.sprites.forEach((sprite) => {
                    sprite.render(context, timestamp);
                });
            }
    }
}