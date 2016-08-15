class Game {
    private renderer: Engine.Renderer;
    private currentLevel : Engine.ILevel;
    public sprites: Array<Engine.IGetClicked>;

    constructor(private context: CanvasRenderingContext2D, private width: number, private height: number) {
        this.context.canvas.addEventListener('click', (event: MouseEvent) => {this.click(event)});
        this.sprites = [];

        this.renderer = new Engine.Renderer(context, width, height, (timestamp) => {this.renderWorld(timestamp);}); // wrap in a method ot preserve the reference to the class

        // Start Screen
        var start = new Engine.StartLevel(this);
        this.currentLevel = start;

        // var sprite = new Engine.Sprite(150, 150, 80, 78, 'images/meteor.png');
        // sprite.frames = 4;
        // sprite.fps = 5;
        // this.sprites.push(sprite);
        
        // var s = new Engine.Sprite(300, 150, 80, 78, 'images/meteor.png');
        // s.frames = 4;
        // s.fps = 20;
        // this.sprites.push(s);

        // var button = new Engine.Button(500, 500, 50, 50, 'Start');
        // this.sprites.push(button);
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
    };

    private click(event: MouseEvent) : void {
        this.currentLevel.sprites.forEach((sprite) => {
            if(sprite.checkCollision(event.offsetX, event.offsetY)){
                sprite.click(event);
            }
        });
    }
}