import {
    getToken
} from '@/utils/auth'

import {
    getInfo
} from '@/api/user'

import {
    MessageBox
} from 'element-ui'

export default {

    //判断权限
    async getUser() {

        var token = getToken();

        if (!token) {

            MessageBox.alert('您已被登出，请重新登录。', '用户失效', {
                confirmButtonText: '重新登录',
                type: 'warning',
                callback: action => {
                    window.location.href = "/"
                }
            });

            return null;
        }
        try {

            const user = await this.userInfo();
            return user;

        } catch (error) {
            MessageBox.alert('获取用户错误, 请稍后重试。', '获取不到用户', {
                confirmButtonText: '返回首页',
                type: 'warning',
                callback: action => {
                    window.location.href = "/"
                }
            });
        }

    },

    userInfo() {
        return new Promise((resolve, reject) => {
            getInfo(
                getToken()
            ).then(response => {

                const {
                    username
                } = response

                if (!username || username == "anonymousUser") {

                    MessageBox.alert('认证失败, 请重新登陆。', '用户失效', {
                        confirmButtonText: '重新登录',
                        type: 'warning',
                        callback: action => {
                            window.location.href = "/"
                        }
                    });

                }

                const {
                    authorities,
                    name,
                    id
                } = response

                // 角色不能为空
                if (!authorities || authorities.length <= 0) {
                    MessageBox.alert('用户信息异常，角色为空。', '用户失效', {
                        confirmButtonText: '重新登录',
                        type: 'warning',
                        callback: action => {
                            window.location.href = "/"
                        }
                    });
                }

                var roles = [];
                var admin_role = false;
                for (var i = 0; i < authorities.length; i++) {
                    if (authorities[i].authority == "ROLE_ADMIN") {
                        admin_role = true;
                    }
                    roles.push(authorities[i].authority);
                }

                if (!admin_role) {
                    MessageBox.alert('当前用户不是管理员用户，无法操作此页面。', '用户异常', {
                        confirmButtonText: '返回首页',
                        type: 'warning',
                        callback: action => {
                            window.location.href = "/"
                        }
                    });
                }

                resolve(response)
            }).catch(error => {
                reject(error)
            })
        })

    }

}