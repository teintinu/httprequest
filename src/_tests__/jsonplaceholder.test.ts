import "tslib"
import { httpRequest } from ".."

describe('jsonplaceholder', () => {

  it('POST /create', async () => {
    const postReq = {
      title: 'foo',
      body: 'bar',
      userId: 1
    }
    const res = await httpRequest('POST', 'http://jsonplaceholder.typicode.com/posts', JSON.stringify(postReq), {
      "Content-type": "application/json; charset=UTF-8"
    })
    expect(res.status).toBe(201)
    expect(typeof res.headers).toBe("object")
    const postRes = JSON.parse(res.response)
    expect(postRes.title).toBe(postReq.title)
    expect(postRes.body).toBe(postReq.body)
    expect(postRes.userId).toBe(postReq.userId)
    expect(postRes.id).toBeDefined()
  })

  it('GET /todos/1', async () => {
    const res = await httpRequest('GET', 'http://jsonplaceholder.typicode.com/todos/1')
    expect(res.status).toBe(200)
    expect(typeof res.headers).toBe("object")
    const todos = JSON.parse(res.response)
    expect(todos.id).toBeDefined()
    expect(todos.title).toBeDefined()
  })

})