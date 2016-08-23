module Engine {
    export class MainLevel implements ILevel {
        public sprites: Array<Engine.IGetClicked>;       
        private upgrades;
        private sm: Engine.SoundManager;
            
            constructor(game: Game) {
                this.sprites = [];
                this.upgrades = UpgradesJson.upgrades;
                this.sm = new Engine.SoundManager();

                game.sprites = this.sprites;
            }

            start(game: Game): void {
                this.sm.playBg();
            }

            end(game: Game): void {
                this.sm.stopBg();
            }
            
            public render(context: CanvasRenderingContext2D, timestamp): void {    
                // var background = new Image();
                
                // // background.src = 'images/meteor.png';
                // // context.drawImage(background, 0, 0);
                Engine.Drawing.rect(context, 0, 0, 300, this.upgrades.length*23, false, 'rgba(0,0,0,1)');
                Engine.Drawing.rect(context, 800, 0, -300, 60, false, 'rgba(0,0,0,1)');

                Engine.Drawing.text(context, '298,329 Bug Bounty', 550, 30, 20);
                Engine.Drawing.text(context, '2,016 Fixes/Sec', 550, 52, 20);

                let yPos = 20;
                for (let i=0;i<this.upgrades.length;i++){
                    this.sprites.push(new Button(10, yPos, 'BUY |', 16, "#00ff00", () => {
                        console.log('new game callback');
                    }));
                    Engine.Drawing.text(context, 'X - ' + this.upgrades[i].name + ' - ' + this.upgrades[i].clicks, 55, yPos);
                    yPos += 22;
                }

                this.sprites.forEach((sprite) => {
                    sprite.render(context, timestamp);
                });
            }
    }
}