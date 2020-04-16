"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("tslib");
var __1 = require("..");
describe('postman-echo', function () {
    it('req string res string', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postReq, resput, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postReq = '123';
                    return [4 /*yield*/, __1.httpRequest('PUT', 'http://postman-echo.com/put', postReq, {
                            "Content-type": "text/plain; charset=UTF-8"
                        })];
                case 1:
                    resput = _a.sent();
                    expect(resput.status).toBe(200);
                    expect(typeof resput.headers).toBe("object");
                    res = JSON.parse(resput.response);
                    expect(res.data).toBe('123');
                    return [2 /*return*/];
            }
        });
    }); });
    it('req string res Uint8Array', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postReq, resput, str, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postReq = '123';
                    return [4 /*yield*/, __1.httpRequest('PUT', 'http://postman-echo.com/put', postReq, {
                            "Content-type": "text/plain; charset=UTF-8"
                        }, true)];
                case 1:
                    resput = _a.sent();
                    expect(resput.status).toBe(200);
                    expect(typeof resput.headers).toBe("object");
                    expect(typeof resput.response).toBe("object");
                    expect(resput.response instanceof Uint8Array).toBeTruthy();
                    str = Buffer.from(resput.response).toString();
                    res = JSON.parse(str);
                    expect(res.data).toBe('123');
                    return [2 /*return*/];
            }
        });
    }); });
    it('req Uint8Array res string', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postReq, resput, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postReq = Uint8Array.from([49, 50, 51]);
                    return [4 /*yield*/, __1.httpRequest('PUT', 'http://postman-echo.com/put', postReq, {
                            "Content-type": "text/plain; charset=UTF-8"
                        })];
                case 1:
                    resput = _a.sent();
                    expect(resput.status).toBe(200);
                    expect(typeof resput.headers).toBe("object");
                    res = JSON.parse(resput.response);
                    expect(res.data).toBe('123');
                    return [2 /*return*/];
            }
        });
    }); });
    it('req Uint8Array res Uint8Array', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postReq, resput, str, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postReq = Uint8Array.from([49, 50, 51]);
                    return [4 /*yield*/, __1.httpRequest('PUT', 'http://postman-echo.com/put', postReq, {
                            "Content-type": "text/plain; charset=UTF-8"
                        }, true)];
                case 1:
                    resput = _a.sent();
                    expect(resput.status).toBe(200);
                    expect(typeof resput.headers).toBe("object");
                    expect(typeof resput.response).toBe("object");
                    expect(resput.response instanceof Uint8Array).toBeTruthy();
                    str = Buffer.from(resput.response).toString();
                    res = JSON.parse(str);
                    expect(res.data).toBe('123');
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=postman-echo.test.js.map