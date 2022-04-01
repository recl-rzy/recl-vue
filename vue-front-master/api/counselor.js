import request from '@/utils/request'

export default {
    getPageCounselorFactor(current, limit) {
        return request({
            url: `/eduservice/counselor-front/indexPageCounselorFactor/${current}/${limit}`,
            method: 'post'
        })
    }        
}
