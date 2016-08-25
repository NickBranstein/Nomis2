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
            let color1 ='#aaa', color2 ='#999';
            let errorHeight = 12;
            let btnWidth = 50;
            let btnHeight = 18;
            let boxPad = 10;
            let boxWidth = (this.width + btnWidth) + (boxPad*2) + 100;
            let boxY = (this.y-this.height)-boxPad;
            let boxX = (this.x + btnWidth - (boxWidth))-boxPad;
            //outer bounding box
            Engine.Drawing.rect(context, boxX, boxY, boxWidth, this.height+btnHeight, true, color1);
            Engine.Drawing.rect(context, boxX, boxY, boxWidth, this.height+btnHeight, false, color2 );
            
            //error message
            context.fillStyle='#000';
            context.fillText(this.text, boxX, boxY+errorHeight, this.width);    

            
            let btnX = this.x-20;
            let btnY = this.y-(btnHeight);
            //error button
            context.font = `${btnHeight}px Wawati SC`;
            
            Engine.Drawing.rect(context, btnX, btnY , btnWidth, btnHeight,true, color1);
            Engine.Drawing.rect(context, btnX, btnY, btnWidth, btnHeight,false, color2);
            
            context.fillStyle = '#000';
            context.fillText('OK', btnX, this.y);
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