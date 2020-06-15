<template>
    <div>
        <span @click="skipTo('create')">新增用户</span>
        <span @click="skipTo('delete')">删除用户</span>
        <span @click="skipTo('update')">修改用户</span>
        <router-view>

        </router-view>
    </div>
</template>

<script>
    export default {
        name: "mainPage",
        methods:{
            skipTo(path){
                this.$router.push(path);
            }
        }

    }
</script>

<style scoped>

</style>
