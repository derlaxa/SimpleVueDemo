<template>

    <div> {{msg}}</div>

</template>

<style></style>

<script>

    export default {
        data() {
            return {msg: '用户页'}
        },
        beforeMount(){
            this.$store.commit('titleOnlySetter',true);
        }
    }

</script>
