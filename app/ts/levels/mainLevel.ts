module Engine {
    export class MainLevel implements ILevel {
        public sprites: Array<Engine.IGetClicked>;
        private upgrades;
        private sm: Engine.SoundManager;
        private bugsSquashed: number;
        private previousSquashed: number;
        private lastTimestamp: any;
        private nomis: Sprite;
        private movingRight; boolean;
        private error: ErrorBox;
        private game: Game;
        private lastErrorTime: number;

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

            this.game = game;
            this.game.sprites = this.sprites;
        }

        start(): void {
            this.sm.playBg();
            this.bugsSquashed = this.previousSquashed = 10;
            this.lastTimestamp = 0;
            this.movingRight = true;
            this.lastErrorTime = 0;

            this.createError();
        }

        end(): void {
            this.sm.stopBg();
        }

        public render(context: CanvasRenderingContext2D, timestamp): void {
            let elapsed = timestamp - this.lastErrorTime;
            let fixesPerSecond = (this.bugsSquashed - this.previousSquashed) / (elapsed / 1000);

            this.lastTimestamp = timestamp;

            Engine.Drawing.rect(context, 0, 0, 300, this.upgrades.length * 23, false, 'rgba(0,0,0,1)');
            Engine.Drawing.rect(context, 800, 0, -300, 60, false, 'rgba(0,0,0,1)');

            Engine.Drawing.text(context, `${this.bugsSquashed} Bug Bounty`, 550, 30, 20);
            Engine.Drawing.text(context, `${fixesPerSecond.toFixed(2)} Fixes/Sec`, 550, 52, 20);

            let yPos = 20;
            for (let i = 0; i < this.upgrades.length; i++) {
                Engine.Drawing.text(context, 'X - ' + this.upgrades[i].name + ' - ' + this.upgrades[i].clicks, 55, yPos);
                yPos += 22;
            }

            this.moveNomis(context);
            this.createError();

            this.createLaser(context);

            this.sprites.forEach((sprite) => {
                sprite.render(context, timestamp);
            });
        }

        private errorClicked(): void {
            this.sm.playSound(Engine.Sounds.Ping);
            this.previousSquashed = this.bugsSquashed;
            this.bugsSquashed += 1;
            this.lastErrorTime = this.lastTimestamp;

            this.sprites.splice(this.sprites.indexOf(this.error));
            this.error = null;
        }

        private createError(): void {
            if ((((this.lastTimestamp - this.lastErrorTime) > (Math.random() * 10000)) && this.error == null)
                || (this.lastTimestamp == 0 && this.error == null)) {
                this.error = new ErrorBox(400, 400, 'Error!', 50, '#3fc56e', () => { this.errorClicked(); });
                this.sprites.push(this.error);
                this.sm.playSound(Sounds.Blip);
            }
        }

        private createLaser(context: CanvasRenderingContext2D): void {               
            let radius = Math.random() *20 + 5;
            let x = 500, y = 500;

            //Time for some colors
            for(let i = 0; i < 20; i++){
                context.beginPath();
                let gradient = context.createRadialGradient(x, y, 0, x, y, radius);
                gradient.addColorStop(0, 'white');
                gradient.addColorStop(0.4, 'white');
                gradient.addColorStop(0.4, '#2efc45'); //random color?
                gradient.addColorStop(1, 'black');

                context.fillStyle = gradient;
                context.arc(x, y, radius, Math.PI*2, 360, false);
                context.fill();
                x += 10;
                y -= 10;
            }
            
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
        }
    }
}