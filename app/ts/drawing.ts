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
        public static wrapText(context: CanvasRenderingContext2D, text: string, x: number, y, maxWidth, lineHeight) {
                var words = text.split(' ');
                var line = '';

                for(var n = 0; n < words.length; n++) {
                var testLine = line + words[n] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > maxWidth && n > 0) {
                    context.fillText(line, x, y);
                    line = words[n] + ' ';
                    y += lineHeight;
                }
                else {
                    line = testLine;
                }
                }
                context.fillText(line, x, y);
        }
    }
}