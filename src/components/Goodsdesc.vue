<template>

    <div class="goods-desc">
        <el-row class="goods-desc-title"><el-col>{{title}}</el-col></el-row>
        <el-row class="goods-desc-main" v-html="desc"></el-row>
    </div>

</template>

<style>
    .goods-desc{
        height: auto;
    }
    .goods-desc-title{
        color: deepskyblue;
        font-size: large;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 8vh;
        margin: 2vh 2vw;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .goods-desc img{
        width: 100%;
        height: 100%;
        object-fit: fill;
    }
    .goods-desc-divider{
        margin: 4px 0;
    }
    .el-divider{
        margin: 4px 0;
    }
    .goods-desc-main{
        margin: 2vh 2vw;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        text-align: left;
    }
</style>

<script>

    export default {
        data() {
            return {
                id:this.$route.params.id,
                title: '',
                desc:''
            }
        },
        methods:{

        },
        created(){
            this.$store.commit('titleOnlySetter',false);
            this.$axios.get('/goods/getdesc/'+this.id)
                .then(res=>{
                    if(res.data.status === 0){
                        this.title = res.data.message[0].title;
                        this.desc = res.data.message[0].content;
                    }
                })
                .catch(err=>{
                    console.log(err)
                })
        }
    }

</script>
