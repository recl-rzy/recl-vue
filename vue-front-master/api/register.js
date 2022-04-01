import request from '@/utils/request'

export default {
    //验证码发送
    sendCode(phone) {
        return request({
            url: `/edumsm/msm/send/${phone}`,
            method: 'get'
        })
    },
    registerUser(userInfo) {
        return request({
            url: `/educenter/member/register`,
            method: 'post',
            data: userInfo
        })
    }
}