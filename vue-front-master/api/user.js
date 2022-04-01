import request from '@/utils/request'

export default {
    updateUserInfo(userInfo) {
        return request({
            url: `/educenter/member/updateUserInfo`,
            method: 'post',
            data: userInfo
        })
    },
    updatePw(userInfo) {
        return request({
            url: `/educenter/member/updatePw`,
            method: 'post',
            data: userInfo
        })
    }
}