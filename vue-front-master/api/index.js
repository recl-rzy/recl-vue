import request from '@/utils/request'

export default {
    getIndexData() {
        return request({
            url: `/eduservice/index-front/index`,
            method: 'get'
        })
    },
}