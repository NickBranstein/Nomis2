namespace Engine {
   export class ErrorBox implements Engine.IRender, IGetClicked {
       lastTimestamp;
       width: number;
       outPad: number
       hPad:number;
       fPad:number;
        constructor(public x: number, public y: number, public text: string, public height: number, public color: string, private callback?: () => any) {
            this.outPad = 5;
            this.hPad = 15;
        }
        
        public render(context: CanvasRenderingContext2D, timestamp): void {    
            // render the sprite
            let color1 ='#ccc', color2 ='#bbb', color3 = '#aac';
            let btnColor = '#a8a8a8' 
            let txtColor = '#000'
            let errorHeight = 12;
            let btnWidth = 50, btnHeight = 18, btnPad = 5;
            let boxPad = 10, boxHeading = 12;
            let boxWidth = (this.width + btnWidth) + (boxPad*2) + 200;

            let boxY = (this.y-this.height)-boxPad;
            let boxX = (this.x + btnWidth - (boxWidth))-boxPad;

            let headingHeight = 32;
            Engine.Drawing.rect(context, boxX, boxY-headingHeight, boxWidth, headingHeight, true, color3)

            //outer bounding box
            Engine.Drawing.rect(context, boxX, boxY, boxWidth, this.height+btnHeight, true, color1);
            Engine.Drawing.rect(context, boxX, boxY-headingHeight, boxWidth, (this.height+btnHeight)+headingHeight, false, color2 );
            
            //error message
            context.fillStyle=txtColor;
            context.fillText(this.text, boxX+boxPad, (boxY+errorHeight)+boxPad, this.width);    

            let btnX = this.x-20;
            let btnY = this.y-(btnHeight);
            //error button
            context.font = `${btnHeight}px Wawati SC`;
            
            Engine.Drawing.rect(context, btnX-btnPad, btnY-btnPad, btnWidth+(btnPad*2), btnHeight+(btnPad*2),true, btnColor);
            Engine.Drawing.rect(context, btnX-btnPad, btnY-btnPad, btnWidth+(btnPad*2), btnHeight+(btnPad*2),false, color2);
            
            context.fillStyle = txtColor;
            context.fillText('OK', btnX+2, this.y);
            this.width = context.measureText(this.text).width;
        }

        public checkCollision(x: number, y: number) : boolean {
            if (y >= this.y - this.height && y <= this.y && x >= this.x && x <= this.x + this.width)
                return true;
            return false;
        }

        public click(event: MouseEvent) : void {
            if (this.callback != null) {
                this.callback();    
            }
        }
    }   
}