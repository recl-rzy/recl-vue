import request from '@/utils/request'

export default {
    getChatMsg(sendUserId, receiveUserId) {
        return request({
            url: `/chat/msg/getChatMsg/${sendUserId}/${receiveUserId}`,
            method: 'get'
        })
    },
    getChatUser(id) {
        return request({
            url: `/chat/user/getChatUser/${id}`,
            method: 'get'
        })
    },
    chat(chatText) {
        return request({
            url: `/model/chat`,
            method: 'get'
        })
    }
}