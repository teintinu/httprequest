export declare function httpRequest(method: string, url: string, requestData: Uint8Array | string, requestHeaders: Record<string, string>, responseIsBinary: true): Promise<{
    status: number;
    headers: Record<string, string>;
    response: Uint8Array;
}>;
export declare function httpRequest(method: string, url: string, requestData?: Uint8Array | string, requestHeaders?: Record<string, string>, responseIsBinary?: false | undefined): Promise<{
    status: number;
    headers: Record<string, string>;
    response: string;
}>;
export declare function getAjax(): any;
