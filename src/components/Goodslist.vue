<template>

    <div >
        <div class="goods-list" >
            <div class="goods" v-for="item in goodslist" :key="item.id" @click="toGoodInfo(item.id)">
                <el-row class="goods-img-title-container">
                    <el-row class="goods-img-box" >
                        <el-image :src="item.img_url" fit="fill" class="goods-img">

                        </el-image>
                    </el-row>
                    <el-row class="goods-title">
                        <h5>{{item.title}}</h5>
                    </el-row>
                </el-row>
                <el-row class="goods-description">
                    <el-row class="goods-price">
                        <el-col>
                            <span class="goods-price-now">￥{{item.sell_price}}</span>
                            <del class="goods-price-last">￥{{item.market_price}}</del>
                        </el-col>
                    </el-row>
                    <el-row class="goods-left-num">
                        <el-col class="goods-description-hot" :span="12">
                            <span >热卖中</span>
                        </el-col>
                        <el-col class="goods-description-num" :span="12">
                            <span >剩余{{item.stock_quantity}}件</span>
                        </el-col>
                    </el-row>
                </el-row>
            </div>
        </div>
        <el-row class="goods-getmore">
            <el-col>
                <el-button :type="btn_type" class="goods-getmore-btn" @click="getGoodsList" :disabled="btn_disabled">加载更多</el-button>
            </el-col>
        </el-row>
    </div>

</template>

<style >
    .goods-list{
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
    }
    .goods{
        width: 45%;
        height: auto;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        margin: 1vh 2vw;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .goods-img{
        width: 100%;
        height: 100%;
        min-height: 100%;
    }
    .goods-title{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .goods-title h5{
        text-align: left;
    }
    .goods-img-box{
        width: 100%;
        height: 80%;
        min-height: 80%;
    }
    .goods-img-title-container{
        min-height: 70%;
    }
    .goods-description{
        background-color: #f3f5f6;
        height: 20%;
    }
    .goods-price,.goods-description-hot{
        text-align: left;
    }
    .goods-price-now{
        color: red;
        margin-right: 1vh;
    }
    .goods-price-last{
        font-size: small;

    }
    .goods-description-num{
        text-align: right;
    }
    .goods-price,.goods-left-num{
        padding: 1vh 0;
        height: 50%;
    }
    .goods-left-num{
        font-size: 12px;
        margin-left: 2vw;
        margin-right: 2vw;
    }
    .goods-getmore-btn{
        width: 100%;
    }
</style>

<script>

    export default {
        data() {
            return {
                btn_disabled: false,
                btn_type: 'danger',
                page: 1,
                goodslist:[
                ]
            }
        },
        methods:{
            getGoodsList(){
                this.$axios.get('/getgoods',{params:{pageindex: this.page}})
                    .then(res=>{
                        if(res.data.status === 0){

                            if(res.data.message.length == 0) {
                                let btn = document.getElementsByClassName('goods-getmore-btn')[0];

                                this.btn_type = 'info';
                                this.btn_disabled = true;
                                btn.innerHTML = '没有更多了';

                                console.log(btn)
                            }else{
                                this.page++;
                                this.goodslist = this.goodslist.concat(res.data.message);

                            }




                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            toGoodInfo(id){
                this.$router.push({name:'goodsinfo',params:{id:id}})
            }
        },
        created(){
            this.$store.commit('titleOnlySetter',false);
            this.getGoodsList();
        },
    }

</script>
