class Game {
    private renderer: Engine.Renderer;
    private currentLevel : Engine.ILevel;
    private showUI: boolean;
    public sprites: Array<Engine.IGetClicked>;

    constructor(private context: CanvasRenderingContext2D, private width: number, private height: number) {
        this.context.canvas.addEventListener('click', (event: MouseEvent) => {this.click(event)});
        this.sprites = [];
        this.showUI = true;

        this.renderer = new Engine.Renderer(context, width, height, (timestamp) => {this.renderWorld(timestamp);}); // wrap in a method ot preserve the reference to the class

        // Start Screen
        var start = new Engine.MainLevel(this);
        this.currentLevel = start;

        this.context.canvas.style.backgroundColor = 'rgba(250,250,250, .8)';
        
        var sprite = new Engine.Sprite(500, 300, 80, 78, 'images/meteor.png');
        sprite.frames = 4;
        sprite.fps = 0;
        this.sprites.push(sprite);
    }
    
    public start(){
        this.renderer.start();
    }
    
    public stop() {
        this.renderer.stop();
    }
    
    private renderWorld(timestamp): void{
        // this.sprites.forEach((sprite) => {
        //     sprite.render(this.context, timestamp);
        // });
        this.currentLevel.render(this.context, timestamp);

        if (this.showUI == true){
           this.renderUI()
        }
    };

    private renderUI(): void{
        this.context.fillStyle = '#ffffff';
        this.context.lineWidth = 2;
        this.context.fillStyle = "rgba(250,250,250,0)";
        this.context.fillRect(0, 0, 300, 50);
        this.context.fillRect(800, 0, -300, 50);

        this.context.font = '20px Arial';
        this.context.fillStyle = "#000000";
        this.context.fillText('298,329 Bug Bounty', 550, 30);
        this.context.fillText('2,016 Fixes/Sec', 550, 52);

        this.context.font = '16px Arial';
        this.context.fillStyle = "#000000";
        this.context.fillText('5 - Nomis - 90 bugs', 55, 20);
        this.context.fillText('1 - Unicorn Fart Beam - 300 bugs', 55, 42);
        this.context.fillText('0 - QA Certification - 1k bugs', 55, 64);
        this.context.fillText('0 - Six Sigma Black Belt - 100k bugs', 55, 86);
        this.context.fillText('x - etc - x bugs', 55, 108);

        this.context.font = '20px Arial';
        this.context.fillStyle = "#000000";
        this.context.fillText('ERROR', 500, 300);
        this.context.fillText('BOX', 500, 400);
    }

    private click(event: MouseEvent) : void {
        this.currentLevel.sprites.forEach((sprite) => {
            if(sprite.checkCollision(event.offsetX, event.offsetY)){
                sprite.click(event);
            }
        });
    }
}