import request from '@/utils/request'

export default {

    // 咨询师分页
    getListenerListPage(current, limit, listenerQuery) {
        return request({
            url: `/eduservice/edu-listener/pageListenerFactor/${current}/${limit}`,
            method: 'post',
            data: listenerQuery
          })
    },
    deleteListenerById(id) {
        return request({
            url: `/eduservice/edu-listener/${id}`,
            method: 'delete',
        })
    },
    addListener(listener) {
        return request({
            url: `/eduservice/edu-listener/addListener`,
            method: 'post',
            data: listener
        })
    },
    getListener(id) {
        return request({
            url: `/eduservice/edu-listener/getListener/${id}`,
            method: 'get',

        })
    },
    updateListener(listener) {
        return request({
            url: `/eduservice/edu-listener/updateListener`,
            method: 'post',
            data: listener
        })
    },
    getClassify() {
        return request({
            url: `/eduservice/edu-listener/getClassify`,
            method: 'get',
        })
    }

}
