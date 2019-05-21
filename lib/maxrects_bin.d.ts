import { IOption } from "./maxrects_packer";
import { Rectangle } from "./geom/Rectangle";
import { Bin } from "./abstract_bin";
export declare class MaxRectsBin<T extends Rectangle = Rectangle> extends Bin {
    maxWidth: number;
    maxHeight: number;
    padding: number;
    options: IOption;
    width: number;
    height: number;
    freeRects: Rectangle[];
    rects: T[];
    private verticalExpand;
    private stage;
    constructor(maxWidth?: number, maxHeight?: number, padding?: number, options?: IOption);
    add(rect: T): T | undefined;
    add(width: number, height: number, data: any): Rectangle | undefined;
    private findNode;
    private splitNode;
    private pruneFreeList;
    private updateBinSize;
    private expandFreeRects;
}
