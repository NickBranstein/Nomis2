namespace Engine {
    export class MainLevel implements ILevel {
        public sprites: Array<Engine.IGetClicked>;
        private upgrades: Utils.Dictionary<IUpgrade>;
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
            this.upgrades = this.getUpgrades();
            this.sm = new Engine.SoundManager();
            this.nomis = new Sprite(400, 500, 69, 69, '../images/NomisSpriteSheet.png', 3, 10);

            this.sprites.push(this.nomis);

            let yPos = 20;
            for (let i = 0; i < this.upgrades.values().length; i++) {
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

            Engine.Drawing.rect(context, 0, 0, 300, this.upgrades.values().length * 23, false, 'rgba(0,0,0,1)');
            Engine.Drawing.rect(context, 800, 0, -300, 60, false, 'rgba(0,0,0,1)');

            Engine.Drawing.text(context, `${this.bugsSquashed} Bug Bounty`, 550, 30, 20);
            Engine.Drawing.text(context, `${fixesPerSecond.toFixed(2)} Fixes/Sec`, 550, 52, 20);

            let yPos = 20;
            this.upgrades.keys().forEach(key => {
                Engine.Drawing.text(context, 'X - ' + this.upgrades[key].name + ' - ' + this.upgrades[key].clicks, 55, yPos);
                yPos += 22;
            });

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
            let radius = Math.random() * 20;
            let x = Math.round(this.nomis.x + 50), y = 500;
            let targetX = 200, targetY = 200;   //Should be coordinates of error box
            let numberOfPoints = Math.sqrt(Math.abs((targetX-x)*(targetX-x)) + Math.abs((targetY-y)*(targetY-y)))/10;

            //Time for some colors
            for (let i = 0; i < numberOfPoints; i++) {
                context.beginPath();
                context.globalCompositeOperation = 'overlay';
                let gradient = context.createRadialGradient(x, y, 0, x, y, radius + i);
                gradient.addColorStop(0, 'white');
                gradient.addColorStop(1, '#2efc45');

                context.fillStyle = gradient;
                context.arc(x, y, radius + i, Math.PI * 2, 360, false);
                context.fill();
                x += (targetX-x)/(numberOfPoints-i);
                y += (targetY-y)/(numberOfPoints-1);
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

        private getUpgrades(): Utils.Dictionary<IUpgrade> {
            return new Utils.Dictionary<IUpgrade>([{ // clicks is the key?
                key: 10, value: <IUpgrade>{
                    name: "Nomis",
                    text: "Nomis AutoClick Bot",
                    clicks: 10,
                    improvementFactor: .01
                }}, 
                {
                key: 100, value: <IUpgrade>{
                    name: "NomisLaser",
                    text: "Nomis Laser Beams",
                    clicks: 100,
                    improvementFactor: .02
                }},
                {
                key: 250, value: <IUpgrade>{
                    name: "Refactored",
                    text: "Refactored Circuitry",
                    clicks: 250,
                    improvementFactor: .03
                }},
                {
                key: 500, value: <IUpgrade>{
                    name: "CertifiedQA",
                    text: "Certified Software Quality Analyst (CSQA)",
                    clicks: 500,
                    improvementFactor: .04
                }},
                {
                key: 750, value: <IUpgrade>{
                    name: "Download",
                    text: "Download the whole internet",
                    clicks: 750,
                    improvementFactor: .05
                }},
                {
                key: 1000, value: <IUpgrade>{
                    name: "Manager",
                    text: "Department Manager",
                    clicks: 1000,
                    improvementFactor: .06
                }},
                {
                key: 1250, value: <IUpgrade>{
                    name: "PullRequest",
                    text: "Pull Request",
                    clicks: 1250,
                    improvementFactor: .07
                }},
                {
                key: 50000, value: <IUpgrade>{
                    name: "SixSigma",
                    text: "Six Sigma Black Belt Certified",
                    clicks: 50000,
                    improvementFactor: .09
                }},
                {
                key: 75000, value: <IUpgrade>{
                    name: "SearchEngineFu",
                    text: "Search Engine-Fu Sensei",
                    clicks: 75000,
                    improvementFactor: .1
                }},
                {
                key: 150000, value: <IUpgrade>{
                    name: "MinorTextFixes",
                    text: "Minor Text Fixes",
                    clicks: 150000,
                    improvementFactor: .11
                }},
                {
                key: 250000, value: <IUpgrade>{
                    name: "UnicornFart",
                    text: "Unicorn Fart Beam",
                    clicks: 250000,
                    improvementFactor: .12
                }},
                {
                key: 500000, value: <IUpgrade>{
                    name: "JS13kGamesJudge",
                    text: "JS 13k Games Judge",
                    clicks: 500000,
                    improvementFactor: .13
                }},
            ]);
        }
    }
}