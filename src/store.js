import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);


export default new Vuex.Store({
    state: {
        titleOnly: false,
        cart: [],
        count: 0
    },
    mutations: {
        titleOnlySetter(state,val){
            state.titleOnly = val;
        },
        itemAddToCart(state,val){
            let i = false;
            console.log(val)
            state.cart.some(item=>{

                if(item.id == val.id){
                    item.num += val.num;
                    i = true;
                    return true;
                }

            })
            if(!i){
                state.cart.push(val)
            }
            state.count = 0;
            state.cart.forEach(item=>{
                state.count +=item.num;
            });
            localStorage.setItem('cart',JSON.stringify(state.cart));
            console.log(state.cart);
        },
        updateItemNum(state,val){
            state.cart.some(item=>{
                if(item.id == val.id){
                    item.num = val.num;
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        delItem(state,id){
            state.cart.some((item,key)=>{
                if(item.id == id){
                    state.cart.splice(key,1);
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart));
        },
        updateItemSelected(state,val){
            state.cart.some(item=>{
                if(item.id == val.id){
                    item.selected = val.selected;
                }
            })
            localStorage.setItem('cart',JSON.stringify(state.cart));
        }
    },
    getters:{
        sumCount(state){
            let count = 0;
            state.cart.forEach(item=>{
                count += item.num;
            })
            return count;
        },
        getNum(state){
            let num_list = {};
            state.cart.forEach(item=>{
                num_list[item.id] = item.num;
            })
            return num_list
        },
        getSeletced(state){
            let selected_list = {};
            state.cart.forEach(item=>{
                selected_list[item.id] = item.selected;
            })
            return selected_list
        },
        getTotalNum(state){
            let num = 0;
            state.cart.forEach(item=>{
                if(item.selected){
                    num += item.num;
                }
            })
            return num;
        },
        getTotalPrice(state){
            let price = 0;
            state.cart.forEach(item=>{
                if(item.selected){
                    price += item.num * item.sell_price;
                }
            })
            return price;
        }
    },
    actions: {

    }
})
