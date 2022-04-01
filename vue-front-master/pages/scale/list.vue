<template>

    <div id="list">

        <CommNav :userInfo="userInfo"/>

        <div class="list">
          
            <Leftlist/>

            <Rightlist/>
            
        </div>

        <Footer/>

    </div>

</template>

<script>
import CommNav from '@/components/common/CommNav.vue'
import Footer from '@/components/views/index/Footer.vue'
import Leftlist from '@/components/views/scale/Leftlist.vue'
import cookie from 'js-cookie'
import Rightlist from '@/components/views/scale/Rightlist.vue'

export default {
    components: {
        CommNav,
        Footer,
        Leftlist,
        Rightlist
    },
    data() {
        return {
            userInfo: {}
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.getUserInfoByCookie()
        },
        getUserInfoByCookie() {
            var userInfoStr = cookie.get('recl_ucenter')
            if(userInfoStr) {
                //将用户信息字符串转json对象
                this.userInfo = JSON.parse(userInfoStr)
            }
        }
    }
}
</script>

<style scoped>

.list {
    background-color: white;
    display: flex;
    min-height: 100%;
    position: relative;
}

a {
    text-decoration: none;
    background: none;
    color: #333;
}

a:hover {
    text-decoration: none;
    background: none;
}

</style>