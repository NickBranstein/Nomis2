class Game {
    private renderer: Engine.Renderer;
    public currentLevel : Engine.ILevel;
    public levels : Array<Engine.ILevel>;
    public sprites: Array<Engine.IGetClicked>;
    public canvasHeight: number;
    public canvasWidth: number;

    constructor(private context: CanvasRenderingContext2D, private width: number, private height: number) {
        this.context.canvas.addEventListener('click', (event: MouseEvent) => {this.click(event)});
        this.sprites = [];
        this.renderer = new Engine.Renderer(context, width, height, (timestamp) => {this.renderWorld(timestamp);}); // wrap in a method ot preserve the reference to the class
        this.canvasHeight = 600;
        this.canvasWidth = 800;

        // setup all the levels
        this.levels = [new Engine.StartLevel(this), new Engine.FirstLevel(this), new Engine.MainLevel(this)];

        // Start Level
        this.currentLevel = this.levels[0];
        this.currentLevel.start();
    }
    
    public start(){
        this.renderer.start();
    }
    
    public stop() {
        this.renderer.stop();
    }
    
    private renderWorld(timestamp): void{
        this.currentLevel.render(this.context, timestamp);
    };

    private click(event: MouseEvent) : void {
        this.currentLevel.sprites.forEach((sprite) => {
            if(sprite.checkCollision(event.offsetX, event.offsetY)){
                sprite.click(event);
            }
        });
    }
}