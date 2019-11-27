import { hostname } from "os";

declare const window: any
declare const require: any

export function httpRequest(
    method: string,
    url: string,
    requestData: Uint8Array | string,
    requestHeaders: Record<string, string>,
    responseIsBinary: true
): Promise<{
    status: number,
    headers: Record<string, string>,
    response: Uint8Array,
}>
export function httpRequest(
    method: string,
    url: string,
    requestData?: Uint8Array | string,
    requestHeaders?: Record<string, string>,
    responseIsBinary?: false | undefined
): Promise<{
    status: number,
    headers: Record<string, string>,
    response: string,
}>
export function httpRequest(
    method: string,
    url: string,
    requestData?: Uint8Array | string,
    requestHeaders?: Record<string, string>,
    responseIsBinary?: boolean | undefined
): Promise<{
    status: number,
    headers: Record<string, string>,
    response: Uint8Array | string,
}> {
    const isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    const req = isBrowser ? browserHttpRequest : nodeHttpRequest
    return req(method, url, requestData, requestHeaders, responseIsBinary)
}

function browserHttpRequest(
    method: string,
    url: string,
    requestData?: Uint8Array | string,
    requestHeaders?: Record<string, string>,
    responseIsBinary?: boolean | undefined
): Promise<{
    status: number,
    headers: Record<string, string>,
    response: Uint8Array | string,
}> {

    const responseType = responseIsBinary ? 'arraybuffer' : 'string'

    return new Promise<{
        status: number,
        headers: Record<string, string>,
        response: Uint8Array | string,
    }>((resolve, reject) => {
        try {
            let ajax = getAjax()
            ajax.onreadystatechange = function () {
                const res = this
                if (res.readyState === 4) {
                    resolve({
                        status: res.status,
                        headers: res.headers,
                        response: res.response,
                    })
                }
            }
            ajax.open(method, url, true)
            ajax.responseType = responseType
            if (requestHeaders) Object.keys(requestHeaders).forEach((h) => {
                ajax.setRequestHeader(h, requestHeaders[h])
            })
            if (requestData) ajax.send(requestData)
        } catch (error) {
            reject(error)
        }
    })
}

export function getAjax() {
    const wind: any = window
    if (wind.XMLHttpRequest) {
        return new wind.XMLHttpRequest()
    } else if (wind.ActiveXObject) {
        try {
            return wind.ActiveXObject('Msxml2.XMLHTTP.6.0')
        } catch (e) {
            return wind.ActiveXObject('Msxml2.XMLHTTP.3.0')
        }
    }
    throw new Error('no XMLHttpRequest support')
}

function nodeHttpRequest(
    method: string,
    url: string,
    requestData?: Uint8Array | string,
    requestHeaders?: Record<string, string>,
    responseIsBinary?: boolean | undefined
): Promise<{
    status: number,
    headers: Record<string, string>,
    response: Uint8Array | string,
}> {
    return new Promise<{
        status: number,
        headers: Record<string, string>,
        response: Uint8Array | string,
    }>((resolve, reject) => {
        try {
            const urlp = require('url').parse(url);
            const httpReq: any = require(urlp.protocol.replace(':', '')).request;

            const options: any = {
                hostname: urlp.hostname,
                port: urlp.port || 80,
                path: urlp.path,
                method: method,
            };
            if (requestHeaders) options.headers = requestHeaders

            const req = httpReq(options, (res: any) => {
                const chunks: any[] = []

                res.on('data', (d: any) => chunks.push(d))
                res.on('end', () => {
                    const response = responseIsBinary ? Uint8Array.from(Array.prototype.concat(...chunks)) : chunks.join('')
                    resolve({
                        status: res.statusCode,
                        headers: res.headers,
                        response
                    })
                });
            });

            req.on('error', reject);
            if (requestData) req.write(requestData)
            req.end();

        } catch (error) {
            reject(error)
        }
    });
}