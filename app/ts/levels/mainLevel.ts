namespace Engine {
    export class MainLevel implements ILevel {
        public sprites: Array<Engine.IGetClicked>;
        private upgrades: Utils.Dictionary<IUpgrade>;
        private sm: Engine.SoundManager;
        private game: Game;
        private lastTimestamp: any;
        private secondTimestamp: any;
        private muteButton: Button;

        // calculations
        private bugsSquashed: number;
        private totalBugsSquashed: number;
        private fixesPerSecond: number;
        private units: Array<string> = ['k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'];

        // sprite
        private nomis: Sprite;
        private movingRight; boolean;
        private targetLocation: any = null;
        private lastTimeStoppedMoving: number = 0;
        private delayToMove: number = 200000;
        private dx: number;
        private dy: number;
        private firingLaser: boolean = false;

        // error message
        private error: ErrorBox;
        private lastErrorTime: number;
        private nextErrorDelay: number;

        constructor(game: Game) {
            this.sprites = [];
            this.upgrades = this.getUpgrades();
            this.sm = new Engine.SoundManager();
            this.muteButton = new Button(375, 30, 'Mute', 24, '#FF9842', () => { 
                if(this.sm.muted){
                    this.sm.unMuteAll();
                    this.muteButton.text = 'Mute';
                }else{
                    this.sm.muteAll();
                    this.muteButton.text = 'Unmute';
                }
            });
            this.sprites.push(this.muteButton);

            let yPos = 20;

            this.upgrades.keys().forEach(key => {
                this.sprites.push(new Button(10, yPos, 'BUY', 16, '#5BD95B', () => {
                    let upgrade = <IUpgrade>this.upgrades[key];

                    if (this.bugsSquashed >= upgrade.clicks){
                        this.bugsSquashed -= upgrade.clicks;
                        this.fixesPerSecond += upgrade.improvementFactor;
                        this.sm.playSound(Engine.Sounds.PowerUp);
                        
                        upgrade.clicks += Math.round(upgrade.clicks * .10); // make upgrade 10% more expensive
                        upgrade.owned += 1;

                        if(upgrade.owned == 1){
                            upgrade.onFirstUpgrade();
                        }
                    } 
                }));

                yPos += 22;
            });

            this.game = game;
            this.game.sprites = this.sprites;
        }

        start(): void {
            this.sm.playBg();
            this.bugsSquashed = 1110;
            this.totalBugsSquashed = 1110;
            this.fixesPerSecond = 0;
            this.lastTimestamp = 0;
            this.secondTimestamp = 0;
            this.movingRight = true;
            this.lastErrorTime = 0;

            this.createError();
        }

        end(): void {
            this.sm.stopBg();
        }

        public render(context: CanvasRenderingContext2D, timestamp): void {
            let elapsed = timestamp - this.lastErrorTime;

            this.lastTimestamp = timestamp;
            if ((timestamp - this.secondTimestamp) / 1000 > 1){
                this.bugsSquashed += this.fixesPerSecond;
                this.totalBugsSquashed += this.fixesPerSecond;
                this.secondTimestamp = timestamp;
            }

            this.moveNomis(context);
            this.createError();

            this.sprites.forEach((sprite) => {
                sprite.render(context, timestamp);
            });

            Engine.Drawing.rect(context, 0, 0, 300, this.upgrades.values().length * 23, false, 'rgba(0,0,0,0)');
            Engine.Drawing.rect(context, 800, 0, -300, 60, false, 'rgba(0,0,0,0)');

            Engine.Drawing.text(context, `${this.formatNum(this.bugsSquashed)} Bug Bounty`, 550, 30, 20);
            Engine.Drawing.text(context, `${this.formatNum(this.fixesPerSecond)} Fixes/Sec`, 550, 52, 20);

            let yPos = 20;
            this.upgrades.keys().forEach(key => {
                if ((key / 2) >= this.totalBugsSquashed){
                    Engine.Drawing.text(context, '??' + ' - ' + '??????????????' + ' - ' + '?????', 55, yPos);
                }
                else{
                    Engine.Drawing.text(context, this.formatNum(this.upgrades[key].owned) + ' - ' + this.upgrades[key].name + ' - ' + this.formatNum(this.upgrades[key].clicks), 55, yPos);
                }
                
                yPos += 22;
            });

            // this will make the laser render on top of everything else
            if (this.error != null && this.nomis != null && this.upgrades[100].owned > 0) {
                this.createLaser(context);
            }
        }

        private errorClicked(): void {
            this.bugsSquashed += 1;
            this.totalBugsSquashed += 1;
            this.lastErrorTime = this.lastTimestamp; 
            this.sprites.splice(this.sprites.indexOf(this.error), 1);
            this.error = null;
            this.nextErrorDelay = Math.random() * 10000;
        }

        private createError(): void {
            if ((((this.lastTimestamp - this.lastErrorTime) > (this.nextErrorDelay)) && this.error == null)
                || (this.lastTimestamp == 0 && this.error == null)) {
                    this.error = new ErrorBox(600, 450, 100, '#3fc56e', () => { this.errorClicked(); });
                    this.sprites.push(this.error);
                    //this.sm.playSound(Engine.Sounds.PowerUp);
            }
        }

        private createLaser(context: CanvasRenderingContext2D): void {            
            if(!this.firingLaser)
                return;

            if(Math.random() < .019){
                this.errorClicked();
                this.firingLaser = false;
                return;
            } 

            let radius = Math.random() * 20;
            let x = this.nomis.x, y = this.nomis.y + this.nomis.frameHeight / 2;
            let targetX = this.error.x, targetY = this.error.y;   //Should be coordinates of error box

            if(targetX < x && this.movingRight){
                this.nomis.flip = true;
            } else{
                this.nomis.flip = false;
                x += this.nomis.frameWidth;
            }

            let numberOfPoints = Math.sqrt(Math.abs((targetX - x) * (targetX - x)) + Math.abs((targetY - y) * (targetY - y))) / 10;

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
                x += (targetX - x) / (numberOfPoints - i);
                y += (targetY - y) / (numberOfPoints - i);
            }

            context.globalCompositeOperation = 'source-over'; //reset to default
        }

        private moveNomis(context: CanvasRenderingContext2D) {
            if (this.nomis == null || (this.targetLocation == null && (this.lastTimestamp - this.lastTimeStoppedMoving) < (Math.random() * this.delayToMove))){
                this.firingLaser = true;
                return; // not time to move yet
            }

            if (this.targetLocation == null) {
                this.generateRandomLocationToMove();
            }
             // update the current position and keep moving
             // dx and dy should really be on the sprite
            
            if(this.dx >= 0) {
                this.movingRight = true;
                this.nomis.flip = false;
            }
            else {
                this.movingRight = false;
                this.nomis.flip = true;
            }

            this.nomis.x += this.dx;
            this.nomis.y += this.dy;

           if((this.movingRight && this.nomis.x >= this.targetLocation.x) || (!this.movingRight && this.nomis.x <= this.targetLocation.x)){
               this.lastTimeStoppedMoving = this.lastTimestamp;
               this.targetLocation = null;
           }
        }

        private generateRandomLocationToMove(): void{
            let randX = Math.random() * (800 - this.nomis.frameWidth), randY = Math.random() * (600 - this.nomis.frameHeight);
            
            this.targetLocation = { x: Math.round(randX < 0 ? 0 : randX), y: Math.round(randY < 0 ? 0 : randY) };
            this.dx = (this.targetLocation.x - this.nomis.x) / 100; 
            this.dy = (this.targetLocation.y - this.nomis.y) / 100;
            this.firingLaser = false;
        }

        private formatNum(num): string {
            let decimal;

            for (var i = this.units.length - 1; i >= 0; i--) {
                decimal = Math.pow(1000, i + 1);

                if (num <= -decimal || num >= decimal) {
                    return +(num / decimal).toFixed(3) + this.units[i];
                }
            }

            return num;
        }

        private getUpgrades(): Utils.Dictionary<IUpgrade> {
            return new Utils.Dictionary<IUpgrade>([{
                key: 10, value: <IUpgrade>{
                    name: "Nomis",
                    text: "Nomis AutoClick Bot",
                    clicks: 10,
                    improvementFactor: 1,
                    owned: 0,
                    onFirstUpgrade: () =>{
                        this.nomis = new Sprite(400, 500, 69, 69, '../images/NomisSpriteSheet.png', 3, 10);
                        this.sprites.push(this.nomis);
                        this.generateRandomLocationToMove();
                    }
                }
            },
                {
                    key: 100, value: <IUpgrade>{
                        name: "NomisLaser",
                        text: "Nomis Laser Beams",
                        clicks: 100,
                        improvementFactor: 10,
                        owned: 0
                    }
                },
                {
                    key: 1000, value: <IUpgrade>{
                        name: "Refactored",
                        text: "Refactored Circuitry",
                        clicks: 1000,
                        improvementFactor: 100,
                        owned: 0
                    }
                },
                {
                    key: 50000, value: <IUpgrade>{
                        name: "CertifiedQA",
                        text: "Certified Software Quality Analyst (CSQA)",
                        clicks: 50000,
                        improvementFactor: 1000,
                        owned: 0
                    }
                },
                {
                    key: 100000, value: <IUpgrade>{
                        name: "Download",
                        text: "Download the whole internet",
                        clicks: 100000,
                        improvementFactor: 5000,
                        owned: 0
                    }
                },
                {
                    key: 500000, value: <IUpgrade>{
                        name: "Manager",
                        text: "Department Manager",
                        clicks: 500000,
                        improvementFactor: 10000,
                        owned: 0
                    }
                },
                {
                    key: 1000000, value: <IUpgrade>{
                        name: "PullRequest",
                        text: "Pull Request",
                        clicks: 1000000,
                        improvementFactor: 50000,
                        owned: 0
                    }
                },
                {
                    key: 5000000, value: <IUpgrade>{
                        name: "SixSigma",
                        text: "Six Sigma Black Belt Certified",
                        clicks: 5000000,
                        improvementFactor: 100000,
                        owned: 0
                    }
                },
                {
                    key: 50000000, value: <IUpgrade>{
                        name: "SearchEngineFu",
                        text: "Search Engine-Fu Sensei",
                        clicks: 50000000,
                        improvementFactor: 250000,
                        owned: 0
                    }
                },
                {
                    key: 100000000, value: <IUpgrade>{
                        name: "MinorTextFixes",
                        text: "Minor Text Fixes",
                        clicks: 100000000,
                        improvementFactor: 1000000,
                        owned: 0
                    }
                },
                {
                    key: 500000000, value: <IUpgrade>{
                        name: "UnicornFart",
                        text: "Unicorn Fart Beam",
                        clicks: 500000000,
                        improvementFactor: 50000000,
                        owned: 0
                    }
                },
                {
                    key: 100000000000, value: <IUpgrade>{
                        name: "JS13kGamesJudge",
                        text: "JS 13k Games Judge",
                        clicks: 100000000000,
                        improvementFactor: 999999999,
                        owned: 0
                    }
                },
            ]);
        }
    }
}