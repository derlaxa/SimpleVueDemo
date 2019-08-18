<template>

    <div class="photoinfo">
        <el-row class="photoinfo-header">
            <el-col>
                <el-row class="photoinfo-title">
                    <h3>{{photo_item.title}}</h3>
                </el-row>
                <el-row class="photoinfo-date-line">
                    <el-col :span="16" class="photoinfo-time">发表时间：{{photo_item.add_time| dateFormat}}</el-col>
                    <el-col :span="7" :offset="1" class="photoinfo-click">点击：{{photo_item.click}}</el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="photoinfo-main">
            <el-row class="photoinfo-item-img">
                <el-col>
                    <el-image v-for="item in image_list" :key="item.src" fit="fill" style="width: 10vh; height: 10vh;margin: 10px 2vw" :src="item" :preview-src-list="image_list">

                    </el-image>
                </el-col>
            </el-row>
            <el-row class="photoinfo-item-text">
                <el-col>
                    <p v-html="photo_item.content"></p>
                </el-col>
            </el-row>
        </el-row>
        <comm :id="id"></comm>
    </div>

</template>

<style scoped>
    .photoinfo{
        width: 100%;
        height: 100%;
        background-color: #fafbff;

    }
    .photoinfo-header,.photoinfo-main{
        background-color: white;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: 2vh 1vw;
    }
    .photoinfo-header{

    }
    .photoinfo-header .el-col{
        height: 100%;
    }
    .photoinfo-main{
        height: auto;
        padding: 5px 0px;

    }
    .photoinfo-main p{
        text-align: left;
    }
    .photoinfo-item-img{
        text-align: left;
    }
    .photoinfo-title,.photoinfo-date-line{
        margin: 1vh 1vw;
    }
    .photoinfo-title{
        height: 50%;
        color: red;
    }
    .photoinfo-date-line{
        height: 20%;
        font-size: small;
        color: #009fff;
    }
    .photoinfo-time{
        text-align: left;
    }
    .photoinfo-click{
        text-align: right;
    }

</style>

<script>



    export default {
        data() {
            return {
                id: this.$route.params.id,
                page:1,
                comment:'',
                btn_enable: false,
                image_list: [],
                photo_item:{
                },

            }
        },
        methods:{
            page_refresh(){
                this.$axios.get('/getimageInfo/'+this.$route.params.id)
                    .then(response=>{
                        if(response.data.status === 0){
                            this.photo_item = response.data.message[0];
                        }
                    }).catch(err=>{
                    console.log(err);
                });
            },
            getImageList(){
                this.$axios.get('/getthumimages/'+this.id)
                    .then(res=>{
                        if(res.data.status === 0){
                            res.data.message.forEach(item=>{
                                this.image_list.push(item.src);
                            })

                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            }
        },
        created(){
            this.$store.commit('titleOnlySetter',false);
            this.page_refresh();
            this.getImageList();
        }
    }

</script>
