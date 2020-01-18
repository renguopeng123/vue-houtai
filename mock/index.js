import Mock from 'mockjs'
import mocks from './mocks'
import { param2Obj } from '../src/utils'

const MOCK_API_BASE = '/mock'

export function mockXHR() {
    // 修复在使用 MockJS 情况下，设置 withCredentials = true，且未被拦截的跨域请求丢失 Cookies 的问题
    // https://github.com/nuysoft/Mock/issues/300
    Mock.XHR.prototype.proxy_send = Mock.XHR.prototype.send
    Mock.XHR.prototype.send = function() {
        if (this.custom.xhr) {
            this.custom.xhr.withCredentials = this.withCredentials || false

            if (this.responseType) {
                this.custom.xhr.responseType = this.responseType
            }
        }
        this.proxy_send(...arguments)
    }

    function XHR2ExpressReqWrap(respond) {
        return function(options) {
            let result = null
            if (respond instanceof Function) {
                const { body, type, url } = options
                // https://expressjs.com/en/4x/api.html#req
                result = respond({
                    method: type,
                    body: JSON.parse(body),
                    query: param2Obj(url)
                })
            } else {
                result = respond
            }
            return Mock.mock(result)
        }
    }

    for (const i of mocks) {
        Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response))
    }
}

const responseFake = (url, type, respond) => {
    return {
        url: new RegExp(`${MOCK_API_BASE}${url}`),
        type: type || 'get',
        response(req, res) {
            res.json(Mock.mock(respond instanceof Function ? respond(req, res) : respond))
        }
    }
}

//[].map(); 基本用法跟forEach方法类似，对注册的需要模拟数据的地址进行遍历后通过mock接管
export default mocks.map(route => {
    return responseFake(route.url, route.type, route.response)
})