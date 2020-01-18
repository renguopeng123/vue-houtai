const tokens = {
    admin: {
        token: 'admin'
    },
    user: {
        token: 'user'
    }
}


// {
//   roles: ['admin'], editor
//   introduction: 'I am a super administrator',
//   avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
//   name: 'Super Admin'
// }

const users = {
    //管理员
    'admin': {
        "account": "admin",
        "authorities": [{
            "authority": "ROLE_ADMIN"
        }, {
            "authority": "ROLE_USER"
        }],
        "enabled": true,
        "id": "admin",
        "name": "管理员",
        "status": "ENABLE",
        "username": "admin"
    },
    //普通用户
    'user': {
        "account": "user",
        "authorities": [{
            "authority": "ROLE_USER"
        }],
        "enabled": true,
        "id": "user",
        "name": "普通用户",
        "status": "ENABLE",
        "username": "user"
    },
    //匿名用户
    'anonymous': {
        "authorities": [{
            "authority": "ROLE_ANONYMOUS"
        }],
        "enabled": true,
        "password": "",
        "username": "anonymousUser"
    }
}

export default [
    // user login
    {
        url: '/auth/login-processing',
        type: 'post',

        //如果是POST请求，使用options.body获取请求数据
        //如果是get请求，使用options.query获取请求数据
        response: (options) => {

            //如果是json可以直接定义
            // const {
            //     username
            // } = options.body

            console.log("url = " + options.url);
            console.log("method = " + options.method);

            const body = options.body
            const query = options.query

            console.log("body = " + JSON.stringify(body));
            console.log("query = " + JSON.stringify(query));

            const username = body.username
            const token = tokens[username]

            // mock error
            if (!token) {

                return {
                    code: 401,
                    data: "",
                    message: "没有此用户",
                    success: false
                }
            }

            console.log("username = " + username);
            console.log("user token=" + token.token);

            return users[token.token]
        }
    },

    // get user info
    {
        url: '/auth/login-user',
        type: 'get',
        response: (options) => {
            const {
                token
            } = options.query
            const info = users[token]

            // mock error
            if (!info) {
                return users["anonymous"]
            }

            return info
        }
    },

    // user logout
    {
        url: '/auth/logout',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]