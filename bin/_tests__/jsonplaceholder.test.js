"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("tslib");
var __1 = require("..");
describe('jsonplaceholder', function () {
    it('POST /create', function () { return __awaiter(void 0, void 0, void 0, function () {
        var postReq, res, postRes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    postReq = {
                        title: 'foo',
                        body: 'bar',
                        userId: 1
                    };
                    return [4 /*yield*/, __1.httpRequest('POST', 'http://jsonplaceholder.typicode.com/posts', JSON.stringify(postReq), {
                            "Content-type": "application/json; charset=UTF-8"
                        })];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(201);
                    expect(typeof res.headers).toBe("object");
                    postRes = JSON.parse(res.response);
                    expect(postRes.title).toBe(postReq.title);
                    expect(postRes.body).toBe(postReq.body);
                    expect(postRes.userId).toBe(postReq.userId);
                    expect(postRes.id).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
    it('GET /todos/1', function () { return __awaiter(void 0, void 0, void 0, function () {
        var res, todos;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, __1.httpRequest('GET', 'http://jsonplaceholder.typicode.com/todos/1')];
                case 1:
                    res = _a.sent();
                    expect(res.status).toBe(200);
                    expect(typeof res.headers).toBe("object");
                    todos = JSON.parse(res.response);
                    expect(todos.id).toBeDefined();
                    expect(todos.title).toBeDefined();
                    return [2 /*return*/];
            }
        });
    }); });
});
//# sourceMappingURL=jsonplaceholder.test.js.map