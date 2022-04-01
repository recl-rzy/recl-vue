import request from '@/utils/request'

export default {
    getCarousel() {
        return request({
            url: `/eduservice/carousel-front/getCarousel`,
            method: 'get'
        })
    }
}