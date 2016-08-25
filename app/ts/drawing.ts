namespace Engine {
    export class Drawing {
        private static get rectStyle(): string {return '#ffffff'};
        private static get textStyle(): string {return '#000000'};

        public static rect(context: CanvasRenderingContext2D, x: number, y: number, w: number, h: number,
                fill: boolean, style?: string){
            context.lineWidth = 2;
            
            if(fill){
                context.fillStyle = style != null ? style : this.rectStyle;
                context.fillRect(x, y, w, h);
            }else{
                context.strokeStyle = style != null ? style : this.rectStyle;
                context.strokeRect(x, y, w, h);
            }
        }
        public static text(context: CanvasRenderingContext2D, text: string, x: number, y: number, size?: number, style?: string){
            context.font = `${size != null ? size : 16}px Wawati SC`;
            context.fillStyle = style != null ? style : this.textStyle;
            context.fillText(text, x, y);
        }

        public static DrawErrorBox(context: CanvasRenderingContext2D, x,y, pad, heading, message){
            let w = 300, h = 150;
            let hPad = 24, fPad = 32;
            let c1 = '#cccccc', c2 = "#aaaaaa", c3 = "#dddddd", tc = "#222222"
            let f1 = 16, f2 = 32;
            let headSize = '16px', msgSize = '12px'
            let ff = 'Arial'

            context.fillStyle = c1;
            context.strokeStyle = c2;
            context.strokeRect(x,y,w,h+fPad);
            context.fillRect(x,y,w,h+fPad);

            context.fillStyle = c3;
            context.fillRect(x,y+pad+hPad,w,h-(pad*2)-hPad);
            
            context.font = `${headSize} ${ff}`;
            context.fillStyle = tc;
            context.fillText(heading, x+pad, y+pad+16);
            context.font = `${msgSize} ${ff}`;
            context.fillText(message, x+pad, y+hPad+pad+16);


        }
    }
}