interface IRectangle {
    width: number;
    height: number;
    x: number;
    y: number;
    [propName: string]: any;
}
declare class Rectangle implements IRectangle {
    /**
     * Oversized tag on rectangle which is bigger than packer itself.
     *
     * @type {boolean}
     * @memberof Rectangle
     */
    oversized: boolean;
    /**
     * Creates an instance of Rectangle.
     *
     * @param {number} [width=0]
     * @param {number} [height=0]
     * @param {number} [x=0]
     * @param {number} [y=0]
     * @param {boolean} [rot=false]
     * @param {boolean} [allowRotation=false]
     * @memberof Rectangle
     */
    constructor(width?: number, height?: number, x?: number, y?: number, rot?: boolean, allowRotation?: boolean | undefined);
    /**
     * Test if two given rectangle collide each other
     *
     * @static
     * @param {IRectangle} first
     * @param {IRectangle} second
     * @returns
     * @memberof Rectangle
     */
    static Collide(first: IRectangle, second: IRectangle): any;
    /**
     * Test if the first rectangle contains the second one
     *
     * @static
     * @param {IRectangle} first
     * @param {IRectangle} second
     * @returns
     * @memberof Rectangle
     */
    static Contain(first: IRectangle, second: IRectangle): any;
    /**
     * Get the area (w * h) of the rectangle
     *
     * @returns {number}
     * @memberof Rectangle
     */
    area(): number;
    /**
     * Test if the given rectangle collide with this rectangle.
     *
     * @param {IRectangle} rect
     * @returns {boolean}
     * @memberof Rectangle
     */
    collide(rect: IRectangle): boolean;
    /**
     * Test if this rectangle contains the given rectangle.
     *
     * @param {IRectangle} rect
     * @returns {boolean}
     * @memberof Rectangle
     */
    contain(rect: IRectangle): boolean;
    protected _width: number;
    get width(): number;
    set width(value: number);
    protected _height: number;
    get height(): number;
    set height(value: number);
    protected _x: number;
    get x(): number;
    set x(value: number);
    protected _y: number;
    get y(): number;
    set y(value: number);
    protected _rot: boolean;
    /**
     * If the rectangle is rotated
     *
     * @type {boolean}
     * @memberof Rectangle
     */
    get rot(): boolean;
    /**
     * Set the rotate tag of the rectangle.
     *
     * note: after `rot` is set, `width/height` of this rectangle is swaped.
     *
     * @memberof Rectangle
     */
    set rot(value: boolean);
    protected _allowRotation: boolean | undefined;
    /**
     * If the rectangle allow rotation
     *
     * @type {boolean}
     * @memberof Rectangle
     */
    get allowRotation(): boolean | undefined;
    /**
     * Set the allowRotation tag of the rectangle.
     *
     * @memberof Rectangle
     */
    set allowRotation(value: boolean | undefined);
    protected _data: any;
    get data(): any;
    set data(value: any);
    protected _dirty: number;
    get dirty(): boolean;
    setDirty(value?: boolean): void;
}
interface IBin {
    width: number;
    height: number;
    maxWidth: number;
    maxHeight: number;
    freeRects: IRectangle[];
    rects: IRectangle[];
    options: IOption;
    [propName: string]: any;
}
declare abstract class Bin<T extends IRectangle> implements IBin {
    width: number;
    height: number;
    maxWidth: number;
    maxHeight: number;
    freeRects: IRectangle[];
    rects: T[];
    options: IOption;
    abstract add(rect: T): T | undefined;
    abstract add(width: number, height: number, data: any): T | undefined;
    abstract reset(deepRest: boolean): void;
    abstract repack(): T[] | undefined;
    data?: any;
    tag?: string;
    protected _dirty: number;
    get dirty(): boolean;
    /**
     * Set bin dirty status
     *
     * @memberof Bin
     */
    setDirty(value?: boolean): void;
}
declare enum PACKING_LOGIC {
    MAX_AREA = 0,
    MAX_EDGE = 1
} /**
 * Options for MaxRect Packer
 * @property {boolean} options.smart Smart sizing packer (default is true)
 * @property {boolean} options.pot use power of 2 sizing (default is true)
 * @property {boolean} options.square use square size (default is false)
 * @property {boolean} options.allowRotation allow rotation packing (default is false)
 * @property {boolean} options.tag allow auto grouping based on `rect.tag` (default is false)
 * @property {boolean} options.border atlas edge spacing (default is 0)
 * @property {PACKING_LOGIC} options.logic MAX_AREA or MAX_EDGE based sorting logic (default is MAX_EDGE)
 * @export
 * @interface Option
 */
/**
 * Options for MaxRect Packer
 * @property {boolean} options.smart Smart sizing packer (default is true)
 * @property {boolean} options.pot use power of 2 sizing (default is true)
 * @property {boolean} options.square use square size (default is false)
 * @property {boolean} options.allowRotation allow rotation packing (default is false)
 * @property {boolean} options.tag allow auto grouping based on `rect.tag` (default is false)
 * @property {boolean} options.border atlas edge spacing (default is 0)
 * @property {PACKING_LOGIC} options.logic MAX_AREA or MAX_EDGE based sorting logic (default is MAX_EDGE)
 * @export
 * @interface Option
 */
interface IOption {
    smart?: boolean;
    pot?: boolean;
    square?: boolean;
    allowRotation?: boolean;
    tag?: boolean;
    border?: number;
    logic?: PACKING_LOGIC;
}
declare class MaxRectsPacker<T extends IRectangle = Rectangle> {
    width: number;
    height: number;
    padding: number;
    options: IOption;
    /**
     * The Bin array added to the packer
     *
     * @type {Bin[]}
     * @memberof MaxRectsPacker
     */
    bins: Bin<T>[];
    /**
     * Creates an instance of MaxRectsPacker.
     * @param {number} width of the output atlas (default is 4096)
     * @param {number} height of the output atlas (default is 4096)
     * @param {number} padding between glyphs/images (default is 0)
     * @param {IOption} [options={}] (Optional) packing options
     * @memberof MaxRectsPacker
     */
    constructor(width?: number, height?: number, padding?: number, options?: IOption);
    /**
     * Add a bin/rectangle object with data to packer
     * @param {number} width of the input bin/rectangle
     * @param {number} height of the input bin/rectangle
     * @param {*} data custom data object
     * @memberof MaxRectsPacker
     */
    add(width: number, height: number, data: any): T;
    /**
     * Add a bin/rectangle object extends IRectangle to packer
     * @template T Generic type extends IRectangle interface
     * @param {T} rect the rect object add to the packer bin
     * @memberof MaxRectsPacker
     */
    add(rect: T): T;
    /**
     * Add an Array of bins/rectangles to the packer.
     *
     * `Javascript`: Any object has property: { width, height, ... } is accepted.
     *
     * `Typescript`: object shall extends `MaxrectsPacker.IRectangle`.
     *
     * note: object has `hash` property will have more stable packing result
     *
     * @param {IRectangle[]} rects Array of bin/rectangles
     * @memberof MaxRectsPacker
     */
    addArray(rects: T[]): void;
    /**
     * Reset entire packer to initial states, keep settings
     *
     * @memberof MaxRectsPacker
     */
    reset(): void;
    /**
     * Repack all elements inside bins
     *
     * @param {boolean} [quick=true] quick repack only dirty bins
     * @returns {void}
     * @memberof MaxRectsPacker
     */
    repack(quick?: boolean): void;
    /**
     * Stop adding new element to the current bin and return a new bin.
     *
     * note: After calling `next()` all elements will no longer added to previous bins.
     *
     * @returns {Bin}
     * @memberof MaxRectsPacker
     */
    next(): number;
    /**
     * Load bins to the packer, overwrite exist bins
     * @param {MaxRectsBin[]} bins MaxRectsBin objects
     * @memberof MaxRectsPacker
     */
    load(bins: IBin[]): void;
    /**
     * Output current bins to save
     * @memberof MaxRectsPacker
     */
    save(): IBin[];
    /**
     * Sort the given rects based on longest edge or surface area.
     *
     * If rects have the same sort value, will sort by second key `hash` if presented.
     *
     * @private
     * @param {T[]} rects
     * @param {PACKING_LOGIC} [logic=PACKING_LOGIC.MAX_EDGE] sorting logic, "area" or "edge"
     * @returns
     * @memberof MaxRectsPacker
     */
    private sort;
    private _currentBinIndex;
    /**
     * Return current functioning bin index, perior to this wont accept any new elements
     *
     * @readonly
     * @type {number}
     * @memberof MaxRectsPacker
     */
    get currentBinIndex(): number;
    /**
     * Returns dirty status of all child bins
     *
     * @readonly
     * @type {boolean}
     * @memberof MaxRectsPacker
     */
    get dirty(): boolean;
    /**
     * Return all rectangles in this packer
     *
     * @readonly
     * @type {T[]}
     * @memberof MaxRectsPacker
     */
    get rects(): T[];
}
declare class MaxRectsBin<T extends IRectangle = Rectangle> extends Bin<T> {
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
    private border;
    constructor(maxWidth?: number, maxHeight?: number, padding?: number, options?: IOption);
    add(rect: T): T | undefined;
    add(width: number, height: number, data: any): T | undefined;
    repack(): T[] | undefined;
    reset(deepReset?: boolean, resetOption?: boolean): void;
    private place;
    private findNode;
    private splitNode;
    private pruneFreeList;
    private updateBinSize;
    private expandFreeRects;
}
declare class OversizedElementBin<T extends IRectangle = Rectangle> extends Bin<T> {
    width: number;
    height: number;
    data: any;
    maxWidth: number;
    maxHeight: number;
    options: IOption;
    rects: T[];
    freeRects: IRectangle[];
    constructor(rect: T);
    constructor(width: number, height: number, data: any);
    add(): undefined;
    reset(deepReset?: boolean): void;
    repack(): T[] | undefined;
}
export { Rectangle, IRectangle, MaxRectsPacker, PACKING_LOGIC, IOption, Bin, IBin, MaxRectsBin, OversizedElementBin };
