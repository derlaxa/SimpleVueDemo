<template>

    <div>
        <el-row class="comment">
            <el-col>
                <el-row class="comment-sub-text">
                    <el-col>
                        <el-input placeholder="请输入要BB的话(不超过120个字)" type="textarea" v-model="comment" class="comment-textaera" >

                        </el-input>
                    </el-col>
                </el-row>
                <el-row class="comment-sub-btn">
                    <el-col>
                        <el-button type="primary" class="comment-btn" @click="sub_comm" :disabled="!btn_enable">发表评论</el-button>
                    </el-col>
                </el-row>
                <el-row class="comment-list">
                    <el-col v-for="item in commentlist" :key="item.add_time" class="comment-item">
                        <el-row class="comment-item-title">
                            <span style="float: left">{{item.user_name}}</span>
                            <span style="float: right">{{item.add_time | dateFormat}}</span>
                        </el-row>
                        <el-row class="comment-item-content">
                            <p class="comment-item-content-text">{{item.content | emptyComment}}</p>
                        </el-row>
                    </el-col>
                </el-row>
                <el-row class="comment-getmore">
                    <el-col>
                        <el-button :type="btn_type" class="comment-getmore-btn" @click="get_comm" :disabled="btn_disabled" :plain="btn_plain">{{btn_txt}}</el-button>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>

</template>

<style>
    .comment-sub-text,.comment-sub-btn{
        margin: 1vh 1vw;
    }
    .comment-btn{
        width: 100%;
    }
    .comment-item{
        padding: 0 1vw;
    }
    .comment-item-title{
        padding: 2vh 1vw;
        background-color: #d7dae2;
        border-radius: 4px
    }
    .comment-item-content{
        margin: 2vh 1vw;
        padding-left: 2vw;
        text-align: left;
        border-radius: 4px

    }
    .comment-item-content-text{

    }
    .comment-getmore-btn{
        width: 100%;
    }
</style>

<script>

    export default {
        props:['id'],
        data() {
            return {
                btn_enable: false,
                btn_type: 'danger',
                btn_plain: false,
                btn_txt: '加载更多',
                btn_disabled: false,
                page:1,
                commentlist:[],
                comment:'',

            }
        },
        methods:{
            get_comm(){
                this.$axios.get('/getcomments/'+this.$route.params.id,{params:{pageindex:this.page}})
                    .then(res=>{
                        if(res.data.status == 0){
                            if(res.data.message.length == 0){
                                this.btn_disabled = true;
                                this.btn_txt = '没有更多了';
                                this.btn_type = 'info';
                                this.btn_plain = true;
                            }else{
                                this.commentlist = this.commentlist.concat(res.data.message);
                                this.page++;
                            }

                        }
                    })
            },
            sub_comm(){
                if(this.comment != ''){
                    this.$axios.post('/postcomment/'+this.id,{content:this.comment})
                        .then(res=>{
                            if(res.data.status == 0){
                                this.$message.success({
                                    message: '评论发布成功',
                                    type: 'success'
                                });
                                this.page = 1;
                                this.comment = '';
                                this.commentlist = [];
                                this.get_comm();

                            }else{
                                this.$message.error({
                                    message: '评论发布失败',

                                })
                            }
                        }).catch(err=>{
                        console.log(err);
                        this.$message.error({message:'评论发布出错'})
                    })
                }
            }
        },
        created(){
            this.get_comm();
        },
        watch:{
            comment: function(newval,oldval){
                if(newval != ''){
                    this.btn_enable = true;
                }else{
                    this.btn_enable = false;
                }
            }
        },
        filters:{
            emptyComment:function (data) {
                if(data == ''){
                    data = '此用户很懒，什么都没有写呢!!!'
                }

                return data;
            }
        }
    }

</script>
