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
        var start = new Engine.StartLevel(this);
        this.currentLevel = start;

        var sprite = new Engine.Sprite(150, 150, 80, 78, 'images/meteor.png');
        sprite.frames = 4;
        sprite.fps = 5;
        this.sprites.push(sprite);
        
        var s = new Engine.Sprite(300, 150, 80, 78, 'images/meteor.png');
        s.frames = 4;
        s.fps = 20;
        this.sprites.push(s);
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
        this.context.strokeStyle = '#ffffff';
        this.context.lineWidth = 2;
        this.context.fillRect(0, 0, 300, 50);
        this.context.fillRect(800, 0, -300, 50);

        this.context.font = '24px Arial';
        this.context.fillStyle = "#000000";
        this.context.fillText('this is the score area', 510, 30);

        this.context.font = '24px Arial';
        this.context.fillStyle = "#000000";
        this.context.fillText('this is the command area', 10, 30);
    }

    private click(event: MouseEvent) : void {
        this.currentLevel.sprites.forEach((sprite) => {
            if(sprite.checkCollision(event.offsetX, event.offsetY)){
                sprite.click(event);
            }
        });
    }
}