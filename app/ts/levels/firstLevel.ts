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
            var words = this.text.split(' ');
            var difference = timestamp - this.lastTimeStamp;
            let h = 50;

            if(difference > 125)
            {
                if(this.characterIndex >= (this.text.length + 1))
                {
                    let textMetrics = context.measureText(this.text);
                    let x = context.canvas.clientWidth - (textMetrics.width) - 10;
                    let y = h + 40; 
                    Engine.Drawing.text(context, this.text, x, y, h, '#fff');
                    return;
                }                             

                let character = this.text.substring(0, this.characterIndex + 1);
                this.characterIndex++;
                let textMetrics = context.measureText(character);
                let x = context.canvas.clientWidth - (textMetrics.width) - 10;
                let y = h + 40;
                Engine.Drawing.text(context, character, x, y, h, '#fff');

                this.lastTimeStamp = timestamp;
                return;
            }

            let character = this.text.substring(0, this.characterIndex + 1);
            let textMetrics = context.measureText(character);
            let x = context.canvas.clientWidth - (textMetrics.width) - 10;
            let y = h + 40; 
            Engine.Drawing.text(context, character, x, y, h, '#fff');
        }
    }
}