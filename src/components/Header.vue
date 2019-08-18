<template>

    <div id="Header">
        <el-row class="header-row">
            <el-col :span="3" class="header-back" v-show="!titleOnly" @click.native="back"><div><i class="el-icon-arrow-left" style="font-size: large"></i></div></el-col>
            <el-col :span="18"  :class="{'header-title':true,'el-col-offset-3':titleOnly}"><h3>一个傻屌项目</h3></el-col>
        </el-row>
    </div>

</template>

<style>
    *{
        margin: 0;
        padding: 0;
    }
    #Header{
        height: inherit;
        background-color: deepskyblue;
    }
    .header-row{
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
    }
    .header-title{
        height: 100%;
        font-size: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
    .header-back{
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
    }
</style>

<script>



    export default {
        props:['titleOnly'],
        data() {
            return {

            }
        },
        methods:{
            back(){
                this.$router.back(-1);
            }
        }
    }

</script>
