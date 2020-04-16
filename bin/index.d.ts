export interface HttpResponse<RESPONSE extends Uint8Array | string> {
    status: number;
    statusText: string;
    headers: Record<string, string>;
    response: RESPONSE;
}
export declare function httpRequest(method: string, url: string, requestData: Uint8Array | string, requestHeaders: Record<string, string>, responseIsBinary: true): Promise<HttpResponse<Uint8Array>>;
export declare function httpRequest(method: string, url: string, requestData?: Uint8Array | string, requestHeaders?: Record<string, string>, responseIsBinary?: false | undefined): Promise<HttpResponse<string>>;
export declare function getAjax(): any;
export declare function configServiceEntrypoint(service: string, url: string): void;
export declare function invokeOperation<A, P>(service: string, operatation: string, args: A): Promise<P>;
