<template>

    <div>
        <comm :id="id"></comm>
    </div>

</template>

<style></style>

<script>

    export default {
        data() {
            return {
                id: this.$route.params.id
            }
        },
        created(){
            this.$store.commit('titleOnlySetter',false);
        }
    }

</script>
