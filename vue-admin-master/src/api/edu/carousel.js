import request from '@/utils/request'

export default {
    pageCarousel(current, limit, carouselQuery) {
        return request({
            url: `/eduservice/carousel-figure/pageCarousel/${current}/${limit}`,
            method: 'post',
            data: carouselQuery
        })
    },
    delCarousel(id) {
        return request({
            url: `/eduservice/carousel-figure/${id}`,
            method: 'delete'
        })
    },
    delCarousel(id) {
        return request({
            url: `/eduservice/carousel-figure/${id}`,
            method: 'delete'
        })
    },
    updateCarousel(carousel) {
        return request({
            url: `/eduservice/carousel-figure/updateCarousel`,
            method: 'post',
            data: carousel
        })
    },
    addCarousel(carousel) {
        return request({
            url: `/eduservice/carousel-figure/addCarousel`,
            method: 'post',
            data: carousel
        })
    },
    getCarousel(id) {
        return request({
            url: `/eduservice/carousel-figure/getCarousel/${id}`,
            method: 'get'
        })
    },
    pullCarousel(id) {
        return request({
            url: `/eduservice/carousel-figure/pullCarousel/${id}`,
            method: 'put'
        })
    },
    publishCarousel(id) {
        return request({
            url: `/eduservice/carousel-figure/publishCarousel/${id}`,
            method: 'put'
        })
    },
}