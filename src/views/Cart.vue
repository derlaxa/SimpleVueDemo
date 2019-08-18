<template>

    <div class="cart">
        <el-row class="cart-item" v-for="item in cartList" :key="item.id">
            <el-col :span="2" class="cart-item-checkbox-box">
                <el-checkbox class="cart-item-checkbox" :value="$store.getters.getSeletced[item.id]" @change="cartItemChangeSelected($event,item.id)"> </el-checkbox>
            </el-col>
            <el-col :span="5">
                <el-image :src="item.thumb_path" fit="fill"></el-image>
            </el-col>
            <el-col :span="17">
                <el-row class="cart-item-title"><span>{{item.title}}</span></el-row>
                <el-row class="cart-item-price-box">
                    <el-col :span="6" class="cart-item-sellprice">￥{{item.sell_price}}</el-col>
                    <el-col :span="14" class="cart-item-numinput">
                        <el-input-number :min="1" :max="99" size="mini" :value="$store.getters.getNum[item.id]" @change="cartItemChangeNum($event,item.id)" >

                        </el-input-number>
                    </el-col>
                    <el-col :span="4" class="cart-item-del"><a href="" @click.prevent="delItem(item.id)">删除</a></el-col>
                </el-row>
            </el-col>
        </el-row>
        <el-row class="cart-total-box">
            <el-col :span="16" class="cart-total-box-left">
                <el-row><span>总计(不含运费)</span></el-row>
                <el-row>
                    <el-col><span>已勾选商品</span><span class="cart-total-num">{{$store.getters.getTotalNum}}</span><span>件，总价：</span><span class="cart-total-price">￥{{this.$store.getters.getTotalPrice}}</span></el-col>
                </el-row>
            </el-col>
            <el-col :span="7" class="cart-total-box-right"><el-button type="danger" size="small">去结算</el-button></el-col>
        </el-row>
    </div>

</template>

<style>
    .cart{

    }
    .cart-item{
        width: 96%;
        height: auto;
        display: flex;
        justify-content: center;
        align-items: center;
        border: #d7dae2 solid 1px;
        margin: 2vh auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .cart-item .el-col{
        height: 100%;
    }
    .cart-item-checkbox-box{
        height: 100%;
    }
    .cart-item-checkbox{
        height: 100%;
        width: 100%;
        padding: 5px;
    }
    .cart-item-title{
        text-align: left;
        height: 50%;
        margin: 1vh 1vw;
    }
    .cart-item-price-box{
        height: 50%;
        margin: 1vh 1vw;
        display: flex;
        align-items: center;
    }
    .cart-item-sellprice{
        text-align: left;
    }
    .cart-item-del{
        text-align: right;
    }
    .cart-total-box{
        width: 96%;
        border: #d7dae2 solid 1px;
        margin: 2vh auto;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }
    .cart-total-box-left{
        text-align: left;
        flex-direction: column;
        margin: 1vh 1vw;
        height: 100%;
    }
    .cart-total-box-right{
        height: 100%;
        display: flex;
        justify-content: space-around;
        margin: 2vh 0;
    }
    .cart-total-num,.cart-total-price{
        color: red;
    }
</style>

<script>

    export default {
        data() {
            return {
                cartList: [],
                totalNum: 0,
                totalPrice: 0
            }
        },
        methods:{
            getCartItemDesc(){
                let idList = [];
                this.$store.state.cart.forEach(item=>{
                    idList.push(item.id);
                })
                if(idList.length == 0){
                    this.cartList = [];
                    return
                }
                this.$axios.get('/goods/getshopcarlist/'+idList.join(','))
                    .then(res=>{
                        if(res.data.status === 0){
                            this.cartList = res.data.message;
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                    })
            },
            cartItemChangeNum(e,id){
                this.$store.commit('updateItemNum',{id: id,num: e})
            },
            cartItemChangeSelected(e,id){
                this.$store.commit('updateItemSelected',{id: id,selected: e})
            },
            delItem(id){

                this.$store.commit('delItem',id);
                this.getCartItemDesc();
            }
        },
        created(){
            //this.$store.state.
            this.getCartItemDesc();

        },
        beforeMount(){
            this.$store.commit('titleOnlySetter',true);
        }
    }

</script>
