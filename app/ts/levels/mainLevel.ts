module Engine {
    export class MainLevel implements ILevel {
        public sprites: Array<Engine.IGetClicked>;
        private upgrades;
        private sm: Engine.SoundManager;
        private bugsSquashed: number;
        private lastTimestamp: any;
        private nomis: Sprite;
        private movingRight; boolean;
        private error: ErrorBox;

        constructor(game: Game) {
            this.sprites = [];
            this.upgrades = UpgradesJson.upgrades;
            this.sm = new Engine.SoundManager();
            this.nomis = new Sprite(400, 500, 95, 95, '../images/NomisSpriteSheet.png', 3, 10);

            this.sprites.push(this.nomis);

            let yPos = 20;
            for (let i = 0; i < this.upgrades.length; i++) {
                this.sprites.push(new Button(10, yPos, 'BUY |', 16, "#00ff00", () => {
                    console.log('new game callback');
                }));
                yPos += 22;
            }

            game.sprites = this.sprites;
        }

        start(game: Game): void {
            this.sm.playBg();
            this.bugsSquashed = 10;
            this.lastTimestamp = 0;
            this.movingRight = true;

            let error = new ErrorBox(400, 400, 'Error!', 50, '#3fc56e', () => { this.errorClicked(); });
            this.error = error;
            this.sprites.push(this.error);
        }

        end(game: Game): void {
            this.sm.stopBg();
        }

        public render(context: CanvasRenderingContext2D, timestamp): void {
            let fixesPerSecond = 0;

            if (this.lastTimestamp !== 0) {
                // do some calculations in here
                fixesPerSecond = Math.random() * 1000;
            }

            this.lastTimestamp = timestamp;
            // var background = new Image();

            // // background.src = 'images/meteor.png';
            // // context.drawImage(background, 0, 0);
            Engine.Drawing.rect(context, 0, 0, 300, this.upgrades.length * 23, false, 'rgba(0,0,0,1)');
            Engine.Drawing.rect(context, 800, 0, -300, 60, false, 'rgba(0,0,0,1)');

            Engine.Drawing.text(context, `${this.bugsSquashed} Bug Bounty`, 550, 30, 20);
            Engine.Drawing.text(context, `${fixesPerSecond} Fixes/Sec`, 550, 52, 20);

            let yPos = 20;
            for (let i = 0; i < this.upgrades.length; i++) {
                Engine.Drawing.text(context, 'X - ' + this.upgrades[i].name + ' - ' + this.upgrades[i].clicks, 55, yPos);
                yPos += 22;
            }

            this.moveNomis(context);

            this.sprites.forEach((sprite) => {
                sprite.render(context, timestamp);
            });
        }

        private errorClicked(): void {
            this.sm.playSound(Engine.Sounds.Ping);
            console.log('error clicked');
        }

        private moveNomis(context: CanvasRenderingContext2D) {
            if (this.movingRight === true && this.nomis.x <= (800 - this.nomis.frameWidth)) {
                this.nomis.x += 10;
            } else {
                this.nomis.x -= 10;
                this.nomis.flip = true;
                this.movingRight = false;

                if (this.nomis.x <= (0)) {
                    this.movingRight = true;
                    this.nomis.flip = false;
                }
            }
            // how do we flip the sprite?
        }
    }
}