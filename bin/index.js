"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function httpRequest(method, url, requestData, requestHeaders, responseIsBinary) {
    var isBrowser = typeof window !== 'undefined' && typeof window.document !== 'undefined';
    var req = isBrowser ? browserHttpRequest : nodeHttpRequest;
    return req(method, url, requestData, requestHeaders, responseIsBinary);
}
exports.httpRequest = httpRequest;
function browserHttpRequest(method, url, requestData, requestHeaders, responseIsBinary) {
    var responseType = responseIsBinary ? 'arraybuffer' : 'string';
    return new Promise(function (resolve, reject) {
        try {
            var ajax_1 = getAjax();
            ajax_1.onreadystatechange = function () {
                var res = this;
                if (res.readyState === 4) {
                    if (res.status === 0)
                        reject(new Error('Connection error with ' + url));
                    else
                        resolve({
                            status: res.status,
                            statusText: res.statusText,
                            headers: res.headers,
                            response: res.response,
                        });
                }
            };
            ajax_1.open(method, url, true);
            ajax_1.responseType = responseType;
            if (requestHeaders)
                Object.keys(requestHeaders).forEach(function (h) {
                    ajax_1.setRequestHeader(h, requestHeaders[h]);
                });
            if (requestData)
                ajax_1.send(requestData);
        }
        catch (error) {
            reject(error);
        }
    });
}
function getAjax() {
    var wind = window;
    if (wind.XMLHttpRequest) {
        return new wind.XMLHttpRequest();
    }
    else if (wind.ActiveXObject) {
        try {
            return wind.ActiveXObject('Msxml2.XMLHTTP.6.0');
        }
        catch (e) {
            return wind.ActiveXObject('Msxml2.XMLHTTP.3.0');
        }
    }
    throw new Error('no XMLHttpRequest support');
}
exports.getAjax = getAjax;
function nodeHttpRequest(method, url, requestData, requestHeaders, responseIsBinary) {
    return new Promise(function (resolve, reject) {
        try {
            var urlp = require('url').parse(url);
            var httpReq = require(urlp.protocol.replace(':', '')).request;
            var options = {
                hostname: urlp.hostname,
                port: urlp.port || 80,
                path: urlp.path,
                method: method,
            };
            if (requestHeaders)
                options.headers = requestHeaders;
            var req = httpReq(options, function (res) {
                var chunks = [];
                res.on('data', function (d) { return chunks.push(d); });
                res.on('end', function () {
                    var response = responseIsBinary ? (function () {
                        var _a;
                        chunks = chunks.map(function (c) { return Array.from(c); });
                        return Uint8Array.from((_a = Array.prototype).concat.apply(_a, chunks));
                    })() : chunks.join('');
                    resolve({
                        status: res.statusCode,
                        statusText: res.statusMessage,
                        headers: res.headers,
                        response: response
                    });
                });
            });
            req.on('error', reject);
            if (requestData instanceof Uint8Array)
                requestData = Buffer.from(requestData);
            if (requestData)
                req.write(requestData);
            req.end();
        }
        catch (error) {
            reject(error);
        }
    });
}
var serviceEntrypoints = {};
function configServiceEntrypoint(service, url) {
    serviceEntrypoints[service] = url;
}
exports.configServiceEntrypoint = configServiceEntrypoint;
function invokeOperation(service, operatation, args) {
    return httpRequest('POST', serviceEntrypoints[service] + '/' + operatation, JSON.stringify(args))
        .then(function (res) { return JSON.parse(res.response); });
}
exports.invokeOperation = invokeOperation;
//# sourceMappingURL=index.js.map