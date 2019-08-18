<template>

    <div class="goods-info">
        <el-row class="goods-info-img-box">
            <el-carousel >
                <el-carousel-item v-for="item in img_list" :key="item.src" ><img :src="item.src" class="goods-info-img"></el-carousel-item>
            </el-carousel>
        </el-row>

        <el-row class="goods-info-price-box">
            <el-row class="goods-info-price-title">
                <span>{{title}}</span>
            </el-row>
            <el-divider class="goods-info-divider"></el-divider>
            <el-row >
                <el-row class="goods-info-price-price">
                    <span>市场价:</span>
                    <del>{{last_price}}</del>
                    <span>销售价:</span>
                    <span style="color: red">{{sell_price}}</span>
                </el-row>
                <el-row class="goods-info-price-buynum">
                    <span>购买数量:&nbsp</span>
                    <el-input-number :min=1 :max= stock_num v-model:value="buy_num" size="mini" id="ball_animation_start">

                    </el-input-number>
                </el-row>
                <el-row class="goods-info-price-btngroup">
                    <el-button type="primary" size="small">立即购买</el-button>
                    <el-button type="danger" size="small" @click="addToCart">加入购物车</el-button>
                </el-row>
            </el-row>

        </el-row>
        <el-row class="goods-info-desc-box">
            <el-row class="goods-info-desc-title">
                <span>商品参数</span>
            </el-row>
            <el-divider class="goods-info-divider"></el-divider>
            <el-row class="goods-info-desc-no"><span>商品编号&nbsp:&nbsp</span><span>{{goods_no}}</span></el-row>
            <el-row class="goods-info-desc-stock"><span>库存数量&nbsp:&nbsp</span><span>{{stock_num}}</span></el-row>
            <el-row class="goods-info-desc-addtime"><span>上架时间&nbsp:&nbsp</span><span>{{add_time |dateFormat}}</span></el-row>
            <el-divider class="goods-info-divider"></el-divider>
            <el-row class="goods-info-desc-detail"><el-button type="primary" plain @click="desc">图文介绍</el-button></el-row>
            <el-row class="goods-info-desc-comm"><el-button type="danger" plain  @click="comm">商品评论</el-button></el-row>

        </el-row>
        <transition name="cart-ball" @before-enter="cart_ball_beforeEnter" @enter="cart_ball_Enter" @after-enter="cart_ball_AfterEnter">
            <div class="cart-ball" v-show="ball_show"></div>
        </transition>

    </div>

</template>

<style >
    .goods-info{
        margin-top: 0;
        height: 100%;
        width: 100%;
        background-color: #f3f5f6;
        display: flex;
        flex-direction: column;
        overflow-y: scroll;
    }
    .goods-info-img-box{
        background-color: white;
        justify-content: space-around;
        width: 94%;
        height: auto;
        margin: 1vh auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .goods-info-img{
        width: auto;
        height: 100%;
        object-fit: fill;
    }
    .goods-info-price-box{

        width: 94%;
        text-align: left;
        font-weight: bold;
        font-size: large;
        margin: 1vh auto;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .goods-info-price-title{
        padding: 2vh 2vw;
    }
    .goods-info-price-price,.goods-info-price-buynum,.goods-info-price-btngroup{
        margin: 1vh 1vw;
        font-size: small;
    }
    .goods-info-price-price *{
        margin-right: 3vw;
    }
    .goods-info-divider{
        margin: 10px 0;
    }
    .goods-info-desc-box{
        width: 94%;
        text-align: left;
        font-weight: bold;
        font-size: large;
        margin: 1vh auto;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
    }
    .goods-info-desc-title{
        padding: 2vh 2vw;
    }
    .goods-info-desc-no,.goods-info-desc-stock,.goods-info-desc-addtime{
        margin: 2vh 4vw;
        font-size: small;
        color: darkgray;
    }
    .goods-info-desc-detail,.goods-info-desc-comm{
        margin: 2vh 4vw;

    }
    .goods-info-desc-detail *{
        width: 100%;
    }
    .goods-info-desc-comm *{
        width: 100%;
    }
    .cart-ball{
        width: 1.5vh;
        height: 1.5vh;
        border-radius: 50%;
        background-color: #dd6161;
        position: absolute;
    }
</style>

<script>

    export default {
        data() {
            return {
                id: this.$route.params.id,
                img_list: [],
                goods_no: '',
                stock_num: 0,
                last_price: 0,
                sell_price: 0,
                title: '',
                add_time: '',
                buy_num: 1,
                ball_show: false
            }
        },
        methods:{
           getimg(){
                this.$axios.get('/getthumimages/'+this.id)
                    .then(res=>{
                        if(res.data.status === 0){
                            this.img_list = res.data.message

                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
           },
            getdesc(){
               this.$axios.get('/goods/getinfo/'+this.id)
                   .then(res=>{
                       if(res.data.status === 0){
                           this.title = res.data.message[0].title;
                           this.goods_no = res.data.message[0].goods_no;
                           this.stock_num = res.data.message[0].stock_quantity;
                           this.last_price = res.data.message[0].market_price;
                           this.sell_price = res.data.message[0].sell_price;
                           this.add_time = res.data.message[0].add_time;

                       }
                   })
                   .catch(err=>{
                       console.log(err);
                   })
            },
            desc(){
               this.$router.push({name: 'goodsdesc',params:{id:this.id}})
            },
            comm(){
               this.$router.push({name: 'goodscomm',params:{id:this.id}})
            },
            addToCart(e){
                let el = document.getElementsByClassName('cart-ball')[0];
                let start = document.getElementById('ball_animation_start');
                let start_rect = start.getBoundingClientRect();
                el.style.top = ((start_rect.top + start_rect.bottom)/2).toString() + 'px';
                el.style.left = ((start_rect.left + start_rect.right)/2).toString() + 'px';
                this.ball_show = true;
                let item = {id:this.id ,sell_price: this.sell_price,num: this.buy_num,selected: false};
                this.$store.commit('itemAddToCart',item);
            },
            cart_ball_beforeEnter(el){

                el.style.transform = 'translate(0,0)';

            },
            cart_ball_Enter(el,done){
                el.offsetWidth;
                let end = document.getElementsByClassName('cart-item-badge')[0].getElementsByClassName('el-badge__content')[0];
                let end_rect = end.getBoundingClientRect();

                el.style.transform = `translate(${ (end_rect.left + end_rect.right) / 2 - el.offsetLeft}px, ${ (end_rect.top + end_rect.bottom) / 2  - el.offsetTop}px)`
                //el.style.transform = "translate("+ (end_rect.left).toString() +","+ (end_rect.top).toString() +" )"

                el.style.transition = 'all 1s cubic-bezier(.46,-0.37,.55,1.04)';


                done();
            },
            cart_ball_AfterEnter(){
               this.ball_show = false;
            }
        },
        created(){
            this.getimg();
            this.getdesc();
            this.$store.commit('titleOnlySetter',false);
        },
        mounted(){

        }
    }

</script>
