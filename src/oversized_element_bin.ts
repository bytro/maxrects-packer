import { IRectangle, Rectangle } from "./geom/Rectangle";
import { IOption } from "./maxrects_packer";
import { Bin } from "./abstract_bin";

export class OversizedElementBin<T extends IRectangle = Rectangle> extends Bin {
    public width: number;
    public height: number;
    public data: any;
    public maxWidth: number;
    public maxHeight: number;
    public options: IOption;
    public rects: T[] = [];
    public freeRects: IRectangle[];

    constructor (rect: T);
    constructor (width: number, height: number, data: any);
    constructor (...args: any[]) {
        super();
        if (args.length === 1) {
            if (typeof args[0] !== 'object') throw new Error("OversizedElementBin: Wrong parameters");
            const rect = args[0];
            this.rects = [rect];
            this.width = rect.width;
            this.height = rect.height;
            this.data = rect.data;
            rect.oversized = true;
        } else {
            this.width = args[0];
            this.height = args[1];
            this.data = args.length > 2 ? args[2] : null;
            const rect: any = new Rectangle(0, 0, this.width, this.height);
            rect.oversized = true;
            rect.data = this.data;
            this.rects.push(rect);
        }
        this.freeRects = [];
        this.maxWidth = this.width;
        this.maxHeight = this.height;
        this.options = { smart: false, pot: false, square: false };
    }

    add () { return undefined; }
}
