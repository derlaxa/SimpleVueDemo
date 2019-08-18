<template>

    <div class="photolist">
        <el-tabs tab-position="top" type="card" v-model="tabid" >
            <el-tab-pane v-for="item in photoClassList" :key="item.id" :label="item.title" >
                <div class="demo-image__lazy photo-board">
                    <div v-for="item in photoList" :key="item.id" class="photo-item-box" v-loading="loading">
                        <el-image  :src="item.img_url" fit="fill" lazy class="photo-item" @click="toPhotoInfo(item.id)"></el-image>
                        <el-row class="photo-item-text">
                            <el-row class="photo-item-text-title">
                                <el-col>{{item.title}}</el-col>
                            </el-row>
                            <el-row class="photo-item-text-main">
                                <el-col>{{item.zhaiyao}}</el-col>
                            </el-row>
                        </el-row>
                    </div>
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>

</template>

<style scoped>
    .photolist{
        height: 100%;
    }
    .photo-item-box{
        position: relative;
        text-align: center;
    }
    .photo-item{
        background-color: rgba(218,218,218,0.73);
        margin: 1vh 0;
        padding: 1%;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        width: 94%;
    }
    .photo-item-text{
        width: 95%;
        text-align: left;
        position: absolute;
        bottom: 0%;
        margin: 1vh 0 1vh 2%;
        padding: 1%;
        background-color: rgba(0,0,0,0.4);
        color: white;
    }
    .photo-item-text-main{
        font-size: small;
    }
</style>

<script>

    export default {
        data() {
            return {
                loading:true,
                tabid: '0',
                photoClassList:[],
                photoList:[]
            }
        },
        methods:{
            getPhotoClassList(){
                this.$axios.get('/getimgcategory')
                    .then(res=>{
                        if(res.data.status == 0){
                            this.photoClassList = res.data.message;
                            this.photoClassList.unshift({title: '全部',id: 0});
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            getPhotoListById(id){
                this.loading = true;
                this.$axios.get('/getimages/'+id)
                    .then(res=>{
                        if(res.data.status === 0){
                            this.photoList = res.data.message;
                            this.loading = false;
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })

            },
            toPhotoInfo(id){
                this.$router.push({name: 'photoInfo',params:{id:id}});
            }
        },
        watch:{
            tabid: function (newval,oldval) {
                this.loading = true;
                this.photoList = [];
                this.getPhotoListById(this.photoClassList[newval].id)

            }
        },
        created(){
            this.getPhotoClassList();
            this.getPhotoListById(0);
            this.$store.commit('titleOnlySetter',false);
        }
    }

</script>
