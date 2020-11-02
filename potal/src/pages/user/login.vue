<template>
    <div style="margin:auto 0px;width: 100%;display:flex;flex-direction: column;justify-items: center;align-items: center;justify-content: center;" :style="{ height: screenHeight + 'px' }">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input type="text" v-model="form.username" placeholder="请输入用户名"></el-input>
            </el-form-item>

            <el-form-item label="密 码">
                <el-input type="password" v-model="form.password" placeholder="请输入用户密码"></el-input>
            </el-form-item>
            <el-button type="primary" style="width: 100%" @click="login">登录</el-button>
        </el-form>


    </div>

</template>

<script>
    export default {
        name: "login.vue",
        data() {
            return {
                screenHeight: document.body.clientHeight,
                form: {
                    username: '',
                    password: ''
                }
            }
        },
        methods:{
          login(){
              this.$post('/v1/login',this.form)
                  .then((response) => {
                      if(response.code==1000){

                          
                          this.$router.replace('home');
                      }
                      console.log(response)

                  })
          }
        },
        mounted () {
            const that = this
            window.onresize = () => {
                return (() => {
                    window.screenHeight = document.body.clientHeight
                    that.screenHeight = window.screenHeight
                })()
            }
        },
        watch: {
            screenHeight (val) {
                // 为了避免频繁触发resize函数导致页面卡顿，使用定时器
                if (!this.timer) {
                    // 一旦监听到的screenWidth值改变，就将其重新赋给data里的screenWidth
                    this.screenHeight = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        // 打印screenWidth变化的值
                        console.log(that.screenHeight)
                        that.timer = false
                    }, 400)
                }
            }
        }

    }
</script>

<style scoped>

</style>
