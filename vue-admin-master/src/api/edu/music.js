import request from '@/utils/request'


export default {
    delMusic(id) {
        return request ({ 
            url: `/eduservice/edu-music/${id}`,
            method: 'delete'
        })
    },
    getAllMusic() {
        return request ({ 
            url: `/eduservice/edu-music/getAllMusic`,
            method: 'get'
        })
    },
    getMusic(id) {
        return request ({ 
            url: `/eduservice/edu-music/getMusic/${id}`,
            method: 'get'
        })
    },
    getMusicListPage(MusicQuery, current, limit) {
        return request ({ 
            url: `/eduservice/edu-music/pageMusicFactor/${current}/${limit}`,
            method: 'post',
            data: MusicQuery
        })
    },
    getCheckMusicListPage(MusicQuery, current, limit) {
        return request ({ 
            url: `/eduservice/edu-music/pageCheckMusicFactor/${current}/${limit}`,
            method: 'post',
            data: MusicQuery
        })
    },
    updateMusic(eduMusic) {
        return request ({ 
            url: `/eduservice/edu-music/updateMusic`,
            method: 'post',
            data: eduMusic
        })
    },
    addMusic(eduMusic) {
        return request ({ 
            url: `/eduservice/edu-music/addMusic`,
            method: 'post',
            data: eduMusic
        })
    },
    getAllMusicClassify() {
        return request ({ 
            url: `/eduservice/edu-music/getAllMusicClassify`,
            method: 'get'
        })
    },
    delMusicClassify(id) {
        return request ({ 
            url: `/eduservice/edu-music/delMusicClassify/${id}`,
            method: 'delete',
        })
    },
    publishMusic(id) {
        return request ({ 
            url: `/eduservice/edu-music/publishMusic/${id}`,
            method: 'put',
        })
    }
}