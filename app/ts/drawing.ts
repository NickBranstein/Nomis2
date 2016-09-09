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
                }}

                context.fillText(line, x, y);
        }

        public static progressBar(context: CanvasRenderingContext2D, x: number, y: number, previousWidth?: number): number{
            let w = previousWidth;
            let maxWidth = 200;
            let rand = Math.random();

            if(w == null || w == 0){
                w = rand * 55;
            }
            else{
                let dx = .5 * (rand > .5 ? -1 : 1);
                w += dx;
                if(w < 0){
                    w = 0;
                } else if(w > maxWidth){
                    w = rand * 55;
                }
            }

            this.rect(context, x, y, maxWidth, 25, false, '#000');
            this.rect(context, x, y, w, 25, true, 'green');

            return w;
        }
    }
}