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
            let color1 ='#AAA', color2 ='#888', color3 = '#ccc', color4 = '#000000';
            let btnHeight = 18;
            context.fillStyle= color3;
            context.strokeStyle = color2;
            let btnYOffset = (btnHeight);
            let errorHeight = 12;
            let btnWidth = 50;
            let boxWidth = this.width + btnWidth + 50;
            let boxY = this.y-this.height;
            let btnX = this.x;
            let boxX = this.x + btnWidth - (boxWidth);
            //outer bounding box
            context.fillRect(
                boxX,
                boxY,
                boxWidth,
                this.height);
            context.strokeRect(
                boxX,
                boxY,
                boxWidth, 
                this.height
            );
            //error message
            context.strokeStyle = color4;
            context.fillStyle=color4;
            context.fillText(this.text, boxX, boxY+errorHeight, this.width);    

            //error button
            context.font = `${btnHeight}px Wawati SC`;
            context.strokeStyle = color2;
            context.fillStyle = color1;
            context.fillRect(
                btnX, 
                this.y-btnYOffset, 
                btnWidth,
                btnHeight
            );
            context.strokeRect(
                btnX, 
                this.y-btnYOffset, 
                btnWidth,
                btnHeight
            )
            context.fillStyle = color4;
            context.fillText('ok', this.x, this.y);
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