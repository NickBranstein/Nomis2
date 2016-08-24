module Engine {
   export class ErrorBox implements IRender, IGetClicked {
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
            let color1 ='#bbb', color2 ='#aaa', color3 = '#ccc', color4 = '#000000';
            let btnPadH = 10, btnPadW = 30;
            let boxPadH = 50, boxPadW = 150;
            let btnHeight =18;
            context.fillStyle= color3;
            context.strokeStyle = color2;
            let btnYOffset = ((btnPadH/2)+btnHeight);
            let boxX = this.x-(boxPadW-btnPadW);
            let boxY = this.y-(this.height+btnHeight+(boxPadH/2));
            let errorHeight = 12;

            //outer bounding box
            context.fillRect(boxX,boxY,this.width+boxPadW,this.height+boxPadH);
            context.strokeRect(
                this.x-(this.width-btnPadW),
                boxY,
                this.width+boxPadW, 
                this.height+boxPadH
            );
            //error message
            context.strokeStyle = color4;
            context.fillStyle=color4;
            context.fillText(this.text, boxX, boxY+errorHeight, this.width);    

            //error button
            context.font = `${btnHeight}px Arial`;
            context.strokeStyle = color2;
            context.fillStyle = color1;
            context.fillRect(
                this.x-(btnPadW/2), 
                this.y-btnYOffset, 
                this.width+btnPadW, 
                btnHeight+btnPadH
            );
            context.strokeRect(
                this.x-(btnPadW/2), 
                this.y-btnYOffset, 
                this.width+btnPadW, 
                btnHeight+btnPadH
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