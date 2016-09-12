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
        private units: Array<string> = ['k', 'M', 'B', 'T', 'q', 'Q', 's', 'S'];

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

        // shake
        private lastShakeStart: number = 0;
        private lastShakeEnd: number = 0;
        private shaking: boolean = false;
        private shake: boolean = false;

        // black belt
        private blackBelt: boolean = false;

        // search
        private search: boolean = false;
        private searchRadius: number = 0;
        private searchX: number = 0;
        private searchY: number = 0; 

        // progress
        private progress: boolean = false;
        private width: number = 0;

        // fartBeam
        private fartBeam: boolean = false;
        private farting: boolean = false;
        private fartStartTime: number = 0;
        private fartColors: Array<string> = ['#FF0000', '#FF7F00', '#FFFF00', '#00FF00', '#0000FF', '#4B0082', '#9400D3'];

        //jk13kgames judge
        private judge: boolean = false;
        private judgeBlink: boolean = false;
        private judgeTimestamp: any;

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

            let yPos = 30;

            this.upgrades.keys().forEach(key => {
                this.sprites.push(new Button(10, yPos, 'BUY', 20, '#5BD95B', () => {
                    let upgrade = <IUpgrade>this.upgrades[key];

                    if (this.bugsSquashed >= upgrade.clicks){
                        this.bugsSquashed -= upgrade.clicks;
                        this.fixesPerSecond += upgrade.improvementFactor;
                        this.sm.playSound(Engine.Sounds.PowerUp);

                        upgrade.clicks += Math.round(upgrade.clicks * .10); // make upgrade 10% more expensive
                        upgrade.owned += 1;

                        if(upgrade.onFirstUpgrade != null && upgrade.owned == 1){
                            upgrade.onFirstUpgrade();
                        }

                        if(upgrade.text === "Minor Text Fixes"){
                            var newName = "";
                            var nameLength = upgrade.name.length;
                            for (var i=0; i<nameLength; i++){
                                var ran = Math.floor(Math.random()*upgrade.name.length);
                                newName += upgrade.name[ran];
                                upgrade.name = upgrade.name.slice(0, ran) + upgrade.name.slice(ran+1, upgrade.name.length);
                            }
                            upgrade.name = newName;
                        }
                    }
                }));

                yPos += 35;
            });

            this.game = game;
            this.game.sprites = this.sprites;
        }

        start(): void {
            this.sm.playBg();
            this.bugsSquashed = 0;
            this.totalBugsSquashed = 0;
            this.fixesPerSecond = 0;
            this.lastTimestamp = 0;
            this.secondTimestamp = 0;
            this.judgeTimestamp = 0;
            this.movingRight = true;
            this.lastErrorTime = 0;

            this.createError();
        }

        end(): void {
            this.sm.stopBg();
        }

        public render(context: CanvasRenderingContext2D, timestamp): void {
            let elapsed = timestamp - this.lastErrorTime;

            this.startShake(context, timestamp);

            this.lastTimestamp = timestamp;

            if (timestamp - this.judgeTimestamp > 200){
                this.judgeBlink = !this.judgeBlink;
                this.judgeTimestamp = timestamp;
            }

            if (timestamp - this.secondTimestamp > 1000){
                this.bugsSquashed += this.fixesPerSecond;
                this.totalBugsSquashed += this.fixesPerSecond;
                this.secondTimestamp = timestamp;
            }

            this.moveNomis(context);
            this.createError();
            this.drawRadar(context);
            this.drawProgress(context);

            if(this.fartBeam && this.nomis != null 
                && (this.farting || this.targetLocation == null)){ // nomis is stopped
                if(!this.farting){
                    this.fartStartTime = timestamp;
                }

                this.farting = true;
                this.drawFartBeam(context, timestamp);
            }

            if (this.judge && this.judgeBlink){
                Engine.Drawing.text(context, "YOU'RE WINNER", 250, 100, 40, "#d3c906");
                Engine.Drawing.text(context, "1th Place", 300, 150, 40, "#d3c906");
            }

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
                    Engine.Drawing.text(context, '??' + ' - ' + '??????????????' + ' - ' + '?????' , 70, yPos);
                    yPos +=15;
                    Engine.Drawing.text(context, '??' + ' - ' + '??????????????' + ' - ' + '?????' , 70, yPos);
                }
                else{
                    Engine.Drawing.text(context, `${this.formatNum(this.upgrades[key].owned)} - ${this.upgrades[key].name}`, 70, yPos);
                    yPos += 15
                    Engine.Drawing.text(context, `${this.formatNum(this.upgrades[key].improvementFactor)} fixes/sec ea. - Cost: ${this.formatNum(this.upgrades[key].clicks)}`, 70, yPos);
                }
                
                yPos += 20;
            });

            // this will make the laser render on top of everything else
            if (this.error != null && this.nomis != null && this.upgrades[100].owned > 0) {
                this.createLaser(context);
            }

            if(this.shake && this.shaking){
                context.restore();
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
                    this.error = new ErrorBox(725, 350, 100, '#3fc56e', () => { this.errorClicked(); });
                    this.sprites.push(this.error);
                    this.sm.playSound(Engine.Sounds.Error);
            }
        }

        private createLaser(context: CanvasRenderingContext2D): void {            
            if(!this.firingLaser)
                return;

            if(Math.random() < .01){
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
            let r = (46 - 110) / numberOfPoints, g = (252 - 0) / numberOfPoints, b = (69 - 191) / numberOfPoints;
            context.globalCompositeOperation = 'overlay';

            //Time for some colors
            for (let i = 0; i < numberOfPoints; i++) {
                let j = i+1;
                let gradient = context.createRadialGradient(x, y, 0, x, y, radius + i);

                context.beginPath();
                gradient.addColorStop(0, 'white');
                gradient.addColorStop(this.blackBelt ? .75 : 1.0, `rgb(${Math.floor(110 + (r * j))}, 
                    ${Math.floor(0 + (g * j))}, ${Math.floor(191 + (b * j))})`);
                
                if(this.blackBelt){
                    gradient.addColorStop(1, 'black');
                }
                
                context.fillStyle = gradient;
                context.arc(x, y, radius + i, Math.PI * 2, 360, false);
                context.fill();
                x += (targetX - x) / (numberOfPoints - i);
                y += (targetY - y) / (numberOfPoints - i);
            }

            context.globalCompositeOperation = 'source-over'; //reset to default
        }

        private drawFartBeam(context: CanvasRenderingContext2D, timestamp: number): void{
            if(!this.farting){
                return;
            }

            let e = timestamp - this.fartStartTime;

            if(e > 500){
                this.farting = false;
                this.fartStartTime = timestamp;
            }

            let dr = -3;
            let y = this.nomis.y + this.nomis.frameHeight / 2;

            for (let i = 0; i < this.fartColors.length - 1; i++) {
                context.beginPath();
                context.strokeStyle = this.fartColors[i];
                !this.nomis.flip 
                    ? context.arc(this.nomis.x + 20, y + this.nomis.frameHeight, 60 + (dr * i), (1 + (500 - e) / 1000) * Math.PI, 1.5 * Math.PI) 
                    : context.arc(this.nomis.x + this.nomis.frameWidth - 20, y + this.nomis.frameHeight, 60 + (dr * i), 1.5 * Math.PI, (1.5 + e / 1000) * Math.PI);
                context.stroke();
            }
        }

        private moveNomis(context: CanvasRenderingContext2D) {
            if (this.nomis == null || (this.targetLocation == null 
                && (this.lastTimestamp - this.lastTimeStoppedMoving) < (Math.random() * this.delayToMove))){
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

        private startShake(context: CanvasRenderingContext2D, timestamp): void{
            if(!this.shake){
                return;
            }
            
            if((timestamp - this.lastShakeEnd > 15000) && !this.shaking){
                this.lastShakeStart = timestamp;
                this.shaking = true;
            }else if(this.shaking && (timestamp - this.lastShakeStart > 800)){
                this.lastShakeEnd = timestamp;
                this.shaking = false;
                context.restore();
            } else if(this.shaking){
                let dt = timestamp - this.lastShakeStart;
                let dx = (Math.cos(dt * 0.102) + Math.cos(dt * 0.289)) * 15;
                let dy = (Math.cos(dt * 0.04) + Math.cos(dt * 0.06192)) * 15;
                context.save();  
                context.translate(dx, dy); 
            }
        }

        private drawProgress(context: CanvasRenderingContext2D): void {
            if(this.progress){
                this.width = Engine.Drawing.progressBar(context, 25, this.game.canvasHeight - 50, this.width);
            }
        }

        private drawRadar(context: CanvasRenderingContext2D): void{
            if(!this.search || this.nomis == null){
                return;
            }

            if(this.searchRadius >= 250 && this.firingLaser){
                this.searchRadius = 0;
                this.searchX = this.nomis.x + this.nomis.frameWidth / 2;
                this.searchY = this.nomis.y + this.nomis.frameHeight / 2;
            }

            this.searchRadius += 2;

            context.beginPath();
            context.arc(this.searchX, this.searchY, this.searchRadius, 0, 2 * Math.PI);
            context.strokeStyle = '#5BD95B';
            context.stroke();
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
                        owned: 0,
                        onFirstUpgrade: () => {
                            this.shake = true;
                        }
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
                        owned: 0,
                        onFirstUpgrade: () => {
                            this.progress = true;
                        }
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
                        owned: 0,
                        onFirstUpgrade: () => {
                            this.blackBelt = true;

                            let canvas = document.createElement('canvas');
                            let context = canvas.getContext('2d');

                            context.drawImage(this.nomis.image, 0, 0);

                            let data = context.getImageData(0, 0, this.nomis.image.width, this.nomis.image.height);

                            // convert to greyscale because why not?
                            for (var i = 0; i < data.data.length; i += 4) {
                                let avg = (data.data[i] + data.data[i + 1] + data.data[i + 2]) / 3;
                                data.data[i] = avg; // red
                                data.data[i + 1] = avg; // green
                                data.data[i + 2] = avg; // blue
                            }

                            context.putImageData(data, 0, 0);
                            this.nomis.image.src = canvas.toDataURL();
                        }
                    }
                },
                {
                    key: 50000000, value: <IUpgrade>{
                        name: "SearchEngineFu",
                        text: "Search Engine-Fu Sensei",
                        clicks: 50000000,
                        improvementFactor: 250000,
                        owned: 0, 
                        onFirstUpgrade: () => {
                            this.search = true;
                            this.searchX = this.nomis.x;
                            this.searchY = this.nomis.y;
                        }
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
                        owned: 0,
                        onFirstUpgrade: () => {
                            this.fartBeam = true;
                        }
                    }
                },
                {
                    key: 100000000000, value: <IUpgrade>{
                        name: "JS13kGamesJudge",
                        text: "JS 13k Games Judge",
                        clicks: 100000000000,
                        improvementFactor: 999999999,
                        owned: 0,
                        onFirstUpgrade: () => {
                            this.judge =true;
                        }
                    }
                },
            ]);
        }
    }
}