import request from '@/utils/request'

export default {
    loginUser(userInfo) {
        return request({
            url: `/educenter/member/login`,
            method: 'post',
            data: userInfo
        })
    } ,
    getUserInfo() {
        return request({
            url: `/educenter/member/getUserInfo`,
            method: 'get'
        })
    }
}