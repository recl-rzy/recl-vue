import request from '@/utils/request'

export default {
    getMusic(musicId, userId) {
        return request({
            url: `/eduservice/music-front/music/${musicId}/${userId}`,
            method: 'get'
        })
    },
    pageMusicFactor(current, limit, musicQuery) {
        return request({
            url: `/eduservice/music-front/pageMusicFactor/${current}/${limit}`,
            method: 'post',
            data: musicQuery
        })
    },
    musicSift(limit, musicQuery) {
        return request({
            url: `/eduservice/music-front/musicSift/${limit}`,
            method: 'post',
            data: musicQuery
        })
    },
    addMusicCollect(musicId, userId) {
        return request({
            url: `/eduservice/music-front/addMusicCollect/${musicId}/${userId}`,
            method: 'post'
        })
    },
    delMusicCollect(musicId, userId) {
        return request({
            url: `/eduservice/music-front/${musicId}/${userId}`,
            method: 'delete'
        })
    },
    addMusicComment(musicComment) {
        return request({
            url: `/eduservice/music-front/addMusicComment`,
            method: 'post',
            data: musicComment
        })
    },
    getMusicComment(id) {
        return request({
            url: `/eduservice/music-front/getMusicComment/${id}`,
            method: 'get'
        })
    },
    navMusic(id) {
        return request({
            url: `/eduservice/music-front/navMusic/${id}`,
            method: 'get'
        })
    }
}