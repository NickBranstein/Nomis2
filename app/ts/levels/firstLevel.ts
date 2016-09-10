namespace Engine {
    export class FirstLevel implements ILevel {
        public sprites: Array<Engine.IGetClicked>;      
        private game: Game; 
        private characterIndex: number;
        private text: string;
        private lastTimeStamp: number;

        constructor(game: Game) {
            this.sprites = [];
            this.game = game;
            this.text = "After a hard fought battle, you were able to successfully decommission the mech-suit built by renegade Russian scientist Simon. But in the final moments of the battle, Simon slipped away and activated the base's backup defense protocols. Your primary mission remains: Capture Simon and bring him to justice. Now, armed with a malfunctioning mech suit, you have just 15 minutes to find Simon, capture him, and escape the base before it self destructs. Good luck Nomis. We're all counting on you.";
            
            let startButtonHeight = 30;
            let x = (this.game.canvasWidth / 2) - 50;
            let y = 550;

            this.sprites.push(new Button(x, y, 'CONTINUE', startButtonHeight, '#ffffff', () => {
                this.end();
            }));

            this.game.sprites = this.sprites;
            this.characterIndex = 0;
        }

        start(): void {
            // do anything you need on start
        }

        end(): void {
            this.game.currentLevel = this.game.levels[2];
            this.game.currentLevel.start();
        }
        
        public render(context: CanvasRenderingContext2D, timestamp): void {
            if(isNaN(this.lastTimeStamp)) {
                this.lastTimeStamp = timestamp;
            }

            let words = this.text.split(' ');
            let difference = timestamp - this.lastTimeStamp;
            let h = 50;
            let y = h + 40;
            let x = 25;

            if(difference > 75)
            {
                // If meeting the end of the text
                if(this.characterIndex >= (this.text.length + 1))
                {    
                    Engine.Drawing.wrapText(context, this.text, x, y, 775, h);
                    
                    if(difference > 100)
                    {
                        this.sprites.forEach((sprite) => {
                            sprite.render(context, timestamp);
                        });

                        this.lastTimeStamp = timestamp;
                    }

                    return;
                }                             

                let character = this.text.substring(0, this.characterIndex + 1);
                this.characterIndex++;

                Engine.Drawing.wrapText(context, character, x, y, 775, h);
                this.lastTimeStamp = timestamp;
                return;
            }
            
            // Print what I already have
            let character = this.text.substring(0, this.characterIndex + 1);

            Engine.Drawing.wrapText(context, character, x, y, 775, h);

            if(difference > 100)
                if(this.characterIndex >= (this.text.length + 1))
                {
                    this.sprites.forEach((sprite) => {
                        sprite.render(context, timestamp);
                    });

                    this.lastTimeStamp = timestamp;
                }
        }
    }
}