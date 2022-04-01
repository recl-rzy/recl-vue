import request from '@/utils/request'

export default {
    getCollectArticle(id) {
        return request({
            url: `/eduservice/main-front/getCollectArticle/${id}`,
            method: 'get'
        })
    },
    getCollectScale(id) {
        return request({
            url: `/eduservice/main-front/getCollectScale/${id}`,
            method: 'get'
        })
    },
    getCollectMusic(id) {
        return request({
            url: `/eduservice/main-front/getCollectMusic/${id}`,
            method: 'get'
        })
    },
    getOwnArticle(id) {
        return request({
            url: `/eduservice/main-front/getOwnArticle/${id}`,
            method: 'get'
        })
    },
    getOwnMusic(id) {
        return request({
            url: `/eduservice/main-front/getOwnMusic/${id}`,
            method: 'get'
        })
    },
    getPersonalData(id) {
        return request({
            url: `/eduservice/main-front/getPersonalData/${id}`,
            method: 'get'
        })
    }
}