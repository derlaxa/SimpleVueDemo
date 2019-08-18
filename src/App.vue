<template>
  <div id="app">
      <el-container>

          <vheader v-bind:titleOnly="$store.state.titleOnly" class="header"></vheader>
          <el-main id="main">
              <transition >
                  <router-view></router-view>
              </transition>
          </el-main>

          <el-footer id="footer">
              <el-row class="footer-row">
                  <el-col :span="6" :class="{'footer-col':true, 'footer-item-active':footer_active[0]} " @click.native="footerItemStyle(0)">
                      <router-link to="/" class="icon-box">
                          <div>
                              <span class="el-icon el-icon-s-home"></span>
                              <div>首页</div>
                          </div>
                      </router-link>

                  </el-col>
                  <el-col :span="6" :class="{'footer-col':true, 'footer-item-active':footer_active[1]}" @click.native="footerItemStyle(1)">
                      <router-link to="/user" class="icon-box">
                          <div>
                              <span class="el-icon el-icon-s-custom"></span>
                              <div>用户</div>
                          </div>
                      </router-link>
                  </el-col>
                  <el-col :span="6" :class="{'footer-col':true, 'footer-item-active':footer_active[2]}" @click.native="footerItemStyle(2)">
                      <router-link to="/cart" class="icon-box">
                          <div>
                              <el-badge :value="$store.getters.sumCount" :max="99" class="cart-item-badge">
                                  <span class="el-icon el-icon-shopping-cart-2"></span>
                                  <div>购物车</div>
                              </el-badge>
                          </div>
                      </router-link>
                  </el-col>
                  <el-col :span="6" :class="{'footer-col':true, 'footer-item-active':footer_active[3]}" @click.native="footerItemStyle(3)">
                      <router-link to="/search" class="icon-box">
                          <div>
                              <span class="el-icon el-icon-search"></span>
                              <div>搜索</div>
                          </div>
                      </router-link>
                  </el-col>
              </el-row>
          </el-footer>
      </el-container>
  </div>
</template>
<script>
    import Header from './components/Header.vue'
    export default {
        name:'app',
        data(){
            return{

                footer_active:[true,false,false,false]
            }
        },
        methods:{
            footerItemStyle(id){

                this.footer_active = [false,false,false,false];
                this.footer_active[id] = true;

          }
        },
        components:{
            'vheader':Header
        },
        created(){

        },
        beforeMount(){
            let i = JSON.parse(localStorage.getItem('cart')|| '[]');
            console.log(i)
            this.$store.state.cart = i
            console.log(this.$store.state.cart)
            this.$store.commit('titleOnlySetter',true);
        },
        mounted(){
            this.$router.push({name:'home'});
        }
    }
</script>
<style >
    html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
        /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;


    }
    a{
        text-decoration: none;
    }
    .header{
        height: 10%;
        max-height: 10%;
        display: flex;
    }


    #main{
        height: 80%;
        padding: 0;
    }
    #footer{
        padding: 0;
        width: 100%;
        height: 10%;

        background-color: #00bfff;

    }
    .footer-row,.footer-col{
        height: 100%;
    }
    .icon-box{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .el-icon{
        font-size: 24px;
    }
    .footer-item-active{
        background-color: #009fff;
    }
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    .v-enter{
        opacity: 0;
        transform: translateX(100%);
        overflow-x: hidden;
    }
    .v-leave-to{
        opacity: 0;
        transform: translateX(-100%);
        position: absolute;
        overflow-x: hidden;
    }
    .v-enter-active,.v-leave-active{
        transition: all 0.5s;
    }
</style>
