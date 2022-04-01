import request from '@/utils/request'

export default {
    getPageListenerFactor(current, limit) {
        return request({
            url: `/eduservice/listener-front/indexPageListenerFactor/${current}/${limit}`,
            method: 'post'
        })
    }        
}
