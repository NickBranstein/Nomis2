class Game {
    private renderer: Engine.Renderer;
    private currentLevel : Engine.ILevel;
    private showUI: boolean;
    private sm: Engine.SoundManager;
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

        this.sm = new Engine.SoundManager();
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
        Engine.Drawing.rect(this.context, 0, 0, 300, 50, true);
        Engine.Drawing.rect(this.context, 800, 0, -300, 50, false, 'rgba(0,250,0,0.7)');

        Engine.Drawing.text(this.context, '298,329 Bug Bounty', 550, 30, 20);
        Engine.Drawing.text(this.context, '2,016 Fixes/Sec', 550, 52, 20);

        Engine.Drawing.text(this.context, '5 - Nomis - 90 bugs', 55, 20);
        Engine.Drawing.text(this.context, '1 - Unicorn Fart Beam - 300 bugs', 55, 42);
        Engine.Drawing.text(this.context, '0 - QA Certification - 1k bugs', 55, 64);
        Engine.Drawing.text(this.context, '0 - Six Sigma Black Belt - 100k bugs', 55, 86);
        Engine.Drawing.text(this.context, 'x - etc - x bugs', 55, 108);
        Engine.Drawing.text(this.context, 'ERROR', 500, 300, 20, '#ff0000');
        Engine.Drawing.text(this.context, 'BOX', 500, 400, 20);
        Engine.Drawing.DrawErrorBox(this.context,40,200,6, "Unknown is not a command");
    }

    private click(event: MouseEvent) : void {
        this.currentLevel.sprites.forEach((sprite) => {
            if(sprite.checkCollision(event.offsetX, event.offsetY)){
                sprite.click(event);
            }
        });
    }
}