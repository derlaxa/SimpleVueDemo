<template>

    <div>
        <el-row v-for="item in list" :key="item.id" class="newslist">
            <router-link :to="'/home/newsinfo/'+item.id">
                <el-col :span="4">
                    <el-image class="image" :src="item.img_url"></el-image>
                </el-col>
                <el-col :span="19" :offset="1">
                    <el-row>
                        <el-col>
                            <div class="news-title">{{item.title}}</div>
                        </el-col>
                    </el-row>
                    <el-row class="news-date-line">
                        <el-col :span="16">发表时间：{{item.add_time| dateFormat}}</el-col>
                        <el-col :span="7" :offset="1">点击：{{item.click}}</el-col>
                    </el-row>
                </el-col>
            </router-link>

        </el-row>
    </div>

</template>

<style scoped>
    a{
        color: black;
    }
    .newslist{
        margin: 1vh 2vw;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid #d7dae2;
    }
    .image{
        height: 100%;
    }
    .news-title{
        white-space: nowrap;
        text-overflow:ellipsis;
        overflow-x: hidden;
        text-align: left;
    }
    .news-date-line{
        font-size: small;
        color: #009fff;
    }
</style>

<script>

    export default {
        data() {
            return {
                list:[

                ]
            }
        },
        methods:{
            dateFormat(data){

            }
        },
        created(){
            this.$axios.get('/getnewslist')
                .then((response)=>{
                    if(response.data.status == 0){

                        this.list = response.data.message;

                    }
                }).catch(err=>{
                    console.log(err);
            })
        },
        beforeMount(){
            this.$store.commit('titleOnlySetter',false);
        }
    }

</script>
