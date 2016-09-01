namespace Engine {
    export class FirstLevel implements ILevel {
            public sprites: Array<Engine.IGetClicked>;      
            private game: Game; 
            private characterIndex: number;
            private text: string;

            constructor(game: Game) {
                this.sprites = [];
                this.game = game;
                this.text = "testing";
                this.game.sprites = this.sprites;
            }

            start(): void {
                // do anything you need on start
            }

            end(): void {
                this.game.currentLevel = this.game.levels[2];
                this.game.currentLevel.start();
            }
            
            public render(context: CanvasRenderingContext2D, timestamp): void {
                if(this.characterIndex >= (this.text.length + 1))
                    return;

                let h = 80;
                let character = this.text.substring(this.characterIndex, 1);
                this.characterIndex++;
                let textMetrics = context.measureText(character);
                let x = (context.canvas.clientWidth / 2) - (textMetrics.width) - 30;
                let y = (context.canvas.clientHeight / 2);
                let dx = Math.random() * 5 + 5 * (timestamp % 2 === 0 ? 0 : -1), dy = Math.random() * 5;                                   

                // random color too?
                Engine.Drawing.text(context, character, x, y, h, '#fff');
            }
        }
}