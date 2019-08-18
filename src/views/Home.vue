<template>
    <div class="home">
        <el-carousel id="pic" height="20vh">
            <el-carousel-item v-for="item in list" :key="item.id">
                <a :href="item.url"><img :src="item.img" class="car-img" ></a>
            </el-carousel-item>
        </el-carousel>
        <el-row type="flex" class="link-btn-list">
            <el-col :span="8" class="btn-list-item">
                <router-link to="/home/news">
                    <img src="../assets/menu1.png" class="">
                    <div>新闻资讯</div>
                </router-link>
            </el-col>
            <el-col :span="8" class="btn-list-item">
                <router-link to="/home/photolist">
                    <img src="../assets/menu2.png">
                    <div>图片分享</div>
                </router-link>
            </el-col>
            <el-col :span="8" class="btn-list-item">
                <router-link to="/home/goodslist">
                    <img src="../assets/menu3.png">
                    <div>商品购买</div>
                </router-link>

            </el-col>
        </el-row>
        <el-row type="flex" class="link-btn-list">
            <el-col :span="8" class="btn-list-item">
                <img src="../assets/menu4.png">
                <div>留言反馈</div>
            </el-col>
            <el-col :span="8" class="btn-list-item">
                <img src="../assets/menu5.png">
                <div>视频专区</div>
            </el-col>
            <el-col :span="8" class="btn-list-item">
                <img src="../assets/menu6.png">
                <div>联系我们</div>
            </el-col>
        </el-row>
    </div>
</template>
<style scoped>
    #pic{

    }
    .car-img {
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    .link-btn-list{
        margin-top: 5vh;
    }
    .btn-list-item img{
        width:20vw;
        height: 20vw;

    }
    a{
        text-decoration: none;
        color: black;
    }
</style>
<script>
// @ is an alias to /src


export default {
    name: 'home',
        data(){
            return{
                list:[]
            }
    },
    components: {

    },
    methods:{

    },
    created(){
        this.$axios.get('/getlunbo')
            .then(response=>{
                if(response.data.status == 0){
                    this.list = response.data.message;
                }
            }).catch(err=>{
            console.log(err);
        });
    },
    beforeMount() {
        this.$store.commit('titleOnlySetter',true);
    }
}
</script>
