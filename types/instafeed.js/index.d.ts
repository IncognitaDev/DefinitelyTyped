export as namespace Instafeed;

export = Instafeed;

declare class Instafeed<T = Instafeed.InstafeedDefaultItem> {
    constructor(options?: Instafeed.InstafeedOptions<T>);

    _options: Instafeed.InstafeedOptions<T>;
    _state: Instafeed.InstafeedState<T>;

    run(): boolean;
    hasNext(): boolean;
    next(): void;
    _showNext(callback: (err: string | null) => void): void;
    _processData(data: Instafeed.InstagramResponseData): { items: T[]; unused: T[] };
    _extractTags(str: string): string[];
    _getItemData(data: Instafeed.InstagramDataItem): Instafeed.InstafeedDefaultItem;
    _renderData(items: Instafeed.InstafeedDefaultItem[]): void;
    _basicRender(data: T): string;
    _valueForKeyPath(keyPath: string, data: unknown): string;
    _fail(err: unknown): void;
    _start(): void;
    _finish(): void;
    _success(data: Instafeed.InstagramResponseData): void;
    _makeApiRequest(url: string, callback: (err: unknown, data: Instafeed.InstagramResponseData) => void): void;
    _getAccessToken(callback: (err: unknown, token: string) => void): void;
    _debug(): void;
    _runHook(hookname: string, data: unknown): boolean;
}

declare namespace Instafeed {
    interface InstafeedOptions<T = Instafeed.InstafeedDefaultItem> {
        accessToken: string | ((accessTokenReceiver: (err: unknown, value: string) => void) => void);
        accessTokenTimeout?: number;
        after?: () => void;
        apiTimeout?: number;
        apiLimit?: number;
        before?: () => void;
        debug?: boolean;
        error?: (err: unknown) => any;
        filter?: (item: InstagramDataItem) => boolean;
        limit?: number;
        mock?: boolean;
        render?: (item: T, options: Instafeed.InstafeedOptions) => string;
        sort?: (a: T, b: T) => number;
        success?: (data: InstagramResponseData) => void;
        target?: string | Element;
        template?: string;
        templateBoundaries?: string[];
        transform?: (item: InstagramDataItem) => Record<string, unknown>;
    }

    interface InstafeedDefaultItem {
        caption: string;
        tags: string[];
        id: string;
        image: string;
        link: string;
        model: InstagramDataItem;
        timestamp: string;
        type: string;
        username: string;
    }

    interface InstafeedState<T> {
        node: Element;
        paging: Instafeed.InstagramPaging[];
        pool: T[];
        running: boolean;
        token: string;
    }

    interface InstagramDataItem {
        caption: string;
        id: string;
        media_type: string;
        media_url: string;
        permalink: string;
        timestamp: string;
        username: string;
    }

    interface InstagramPaging {
        cursors: {
            after?: string;
            before?: string;
        };
        next?: string;
        previous?: string;
    }

    interface InstagramResponseData {
        data: InstagramDataItem[];
        paging: InstagramPaging;
    }
}
