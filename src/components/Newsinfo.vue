<template>

    <div class="newsinfo">
        <el-row class="newsinfo-header">
            <el-col>
                <el-row class="newsinfo-title">
                    <h3>{{news_item.title}}</h3>
                </el-row>
                <el-row class="newsinfo-date-line">
                    <el-col :span="16" class="newsinfo-time">发表时间：{{news_item.add_time| dateFormat}}</el-col>
                    <el-col :span="7" :offset="1" class="newsinfo-click">点击：{{news_item.click}}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="newsinfo-main">
            <el-col>
                <p v-html="news_item.content"></p>
            </el-col>
        </el-row>
        <comm :id="this.id"></comm>

    </div>

</template>

<style scoped lang="scss">
    .newsinfo{
        width: 100%;
        height: 100%;
        background-color: #fafbff;

    }
    .newsinfo-header,.newsinfo-main{
        background-color: white;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: 2vh 1vw;
    }
    .newsinfo-header{

    }
    .newsinfo-header .el-col{
        height: 100%;
    }
    .newsinfo-main{
        height: auto;
        min-height: 80%;
        padding: 5px 0px;


    }
    .newsinfo-main p{
        text-align: left;
    }
    .newsinfo-title,.newsinfo-date-line{
        margin: 1vh 1vw;
    }
    .newsinfo-title{
        height: 50%;
        color: red;
    }
    .newsinfo-date-line{
        height: 20%;
        font-size: small;
        color: #009fff;
    }
    .newsinfo-time{
        text-align: left;
    }
    .newsinfo-click{
        text-align: right;
    }

</style>

<script>



    export default {
        data() {
            return {
                id: this.$route.params.id,
                news_item:{
                    id: 0,
                    title: '',
                    click: 0,
                    add_time: new Date(),
                    content: ''
                },
            }
        },
        methods:{
            page_refresh(){
                this.$axios.get('/getnew/'+this.$route.params.id)
                    .then(response=>{
                        if(response.data.status == 0){
                            this.news_item = response.data.message[0];

                        }
                    }).catch(err=>{
                    console.log(err);
                });
            },
        },
        created(){
            this.$store.commit('titleOnlySetter',false);
            this.page_refresh();
        }
    }

</script>
