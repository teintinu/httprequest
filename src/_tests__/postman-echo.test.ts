import "tslib"
import { httpRequest } from ".."

describe('postman-echo', () => {

    it('req string res string', async () => {
        const postReq = '123'
        const resput = await httpRequest('PUT', 'http://postman-echo.com/put', postReq, {
            "Content-type": "text/plain; charset=UTF-8"
        })
        expect(resput.status).toBe(200)
        expect(typeof resput.headers).toBe("object")
        const res: any = JSON.parse(resput.response)
        expect(res.data).toBe('123')
    })

    it('req string res Uint8Array', async () => {
        const postReq = '123'
        const resput = await httpRequest('PUT', 'http://postman-echo.com/put', postReq, {
            "Content-type": "text/plain; charset=UTF-8"
        }, true)
        expect(resput.status).toBe(200)
        expect(typeof resput.headers).toBe("object")
        expect(typeof resput.response).toBe("object")
        expect(resput.response instanceof Uint8Array).toBeTruthy()
        const str = Buffer.from(resput.response).toString()
        const res: any = JSON.parse(str)
        expect(res.data).toBe('123')
    })

    it('req Uint8Array res string', async () => {
        const postReq = Uint8Array.from([49, 50, 51])
        const resput = await httpRequest('PUT', 'http://postman-echo.com/put', postReq, {
            "Content-type": "text/plain; charset=UTF-8"
        })
        expect(resput.status).toBe(200)
        expect(typeof resput.headers).toBe("object")
        const res: any = JSON.parse(resput.response)
        expect(res.data).toBe('123')
    })

    it('req Uint8Array res Uint8Array', async () => {
        const postReq = Uint8Array.from([49, 50, 51])
        const resput = await httpRequest('PUT', 'http://postman-echo.com/put', postReq, {
            "Content-type": "text/plain; charset=UTF-8"
        }, true)
        expect(resput.status).toBe(200)
        expect(typeof resput.headers).toBe("object")
        expect(typeof resput.response).toBe("object")
        expect(resput.response instanceof Uint8Array).toBeTruthy()
        const str = Buffer.from(resput.response).toString()
        const res: any = JSON.parse(str)
        expect(res.data).toBe('123')
    })
})