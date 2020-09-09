<template>
    <div style="display: flex;flex-direction: column;height: 1024px;">
        <el-container style=" border: 1px solid #eee">
            <el-header style=" width:100%;font-size: 12px;display: flex;">
                <span style="font-size: 34px;color:#ffffff">知识仓库</span>

                <div
                        style="flex: 1;text-align: right"
                >
                    <el-dropdown>
                        <i class="el-icon-setting" style="margin-right: 15px"></i>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>查看</el-dropdown-item>
                            <el-dropdown-item>新增</el-dropdown-item>
                            <el-dropdown-item>删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <span>王小虎</span>

                </div>

            </el-header>

            <el-container style="flex-direction: row;flex: 1">

                <el-aside  style="width:202px;background-color: rgb(238, 241, 246)">

                    <!--                <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">-->
                    <!--                    <el-submenu index="1">-->
                    <!--                        <template slot="title">-->
                    <!--                            <i class="el-icon-location"></i>-->
                    <!--                            <span slot="title">导航一</span>-->
                    <!--                        </template>-->
                    <!--                        <el-menu-item-group>-->
                    <!--                            <span slot="title">分组一</span>-->
                    <!--                            <el-menu-item index="1-1">选项1</el-menu-item>-->
                    <!--                            <el-menu-item index="1-2">选项2</el-menu-item>-->
                    <!--                        </el-menu-item-group>-->
                    <!--                        <el-menu-item-group title="分组2">-->
                    <!--                            <el-menu-item index="1-3">选项3</el-menu-item>-->
                    <!--                        </el-menu-item-group>-->
                    <!--                        <el-submenu index="1-4">-->
                    <!--                            <span slot="title">选项4</span>-->
                    <!--                            <el-menu-item index="1-4-1">选项1</el-menu-item>-->
                    <!--                        </el-submenu>-->
                    <!--                    </el-submenu>-->
                    <!--                    <el-menu-item index="2">-->
                    <!--                        <i class="el-icon-menu"></i>-->
                    <!--                        <span slot="title">导航二</span>-->
                    <!--                    </el-menu-item>-->
                    <!--                    <el-menu-item index="3" disabled>-->
                    <!--                        <i class="el-icon-document"></i>-->
                    <!--                        <span slot="title">导航三</span>-->
                    <!--                    </el-menu-item>-->
                    <!--                    <el-menu-item index="4">-->
                    <!--                        <i class="el-icon-setting"></i>-->
                    <!--                        <span slot="title">导航四</span>-->
                    <!--                    </el-menu-item>-->
                    <!--                </el-menu>-->

                    <el-menu  default-active="4-0" class="el-menu-vertical-demo" style="text-align: left" :unique-opened="true" >
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span slot="title">android知识库</span>

                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="4-0" @click="skipTo('boardPage')">首页</el-menu-item>
                                <el-menu-item index="4-1" @click="skipTo('question')">面试题大合集</el-menu-item>
                                <el-menu-item index="4-2" @click="skipTo('questionType')">问题类型</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>


                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-setting"></i>
                                <span slot="title">宝宝</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="5-1" @click="skipTo('baoming')">报名</el-menu-item>
                            </el-menu-item-group>
                            <el-menu-item-group>
                                <el-menu-item index="5-2" @click="skipTo('fileManager')">文件管理</el-menu-item>
                            </el-menu-item-group>

                            <el-menu-item-group>
                                <el-menu-item index="5-3" @click="skipTo('userList')">用户列表</el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-container>
                    <el-main style="">
                        <el-tabs  v-model="editableTabsValue" type="card" closable  @edit="handleTabsEdit" @tab-click="skipTo(editableTabsValue)" style="flex: 1;height: 60px;">
                            <el-tab-pane

                                    :key="item.name"
                                    v-for="(item) in editableTabs"
                                    :label="item.title"
                                    :name="item.name"
                            >
                            </el-tab-pane>
                        </el-tabs>
                        <router-view>

                        </router-view>
                    </el-main>
                </el-container>

            </el-container>
        </el-container>

    </div>
</template>

<script>
    var _ = require('lodash');
    import routes from "../router";
    export default {
        name: "mainPage",
        data() {
            return {
                editableTabsValue: '1',
                editableTabs: [{
                    title: '首页',
                    name: 'boardPage',
                }],
                tabIndex: 1
            }
        },
        created() {
            this.$router.push('boardPage');
        },
        methods:{
            skipTo(name){

                this.handleTabsEdit(name,'add')
            },
            handleTabsEdit(targetName, action) {
                if (action === 'add') {
                    if(!_.find(this.editableTabs,{name:targetName})){
                        let rou=_.find(routes[1].children,{name:targetName})
                        this.editableTabs.push({
                            title: rou.realName,
                            name: targetName,
                        });
                    }

                    this.editableTabsValue = targetName;
                    this.$router.push(targetName);
                }
                if (action === 'remove') {
                    let tabs = this.editableTabs;
                    let activeName = this.editableTabsValue;
                    if (activeName === targetName) {
                        tabs.forEach((tab, index) => {
                            if (tab.name === targetName) {
                                let nextTab = tabs[index + 1] || tabs[index - 1];
                                if (nextTab) {
                                    activeName = nextTab.name;
                                }
                            }
                        });
                    }
                    this.editableTabsValue = activeName;
                    this.editableTabs = tabs.filter(tab => tab.name !== targetName);
                    if(this.editableTabs.length!=0){
                        this.$router.push(activeName);
                    }else{
                        this.editableTabs.push({
                            title:'首页',
                            name: 'boardPage',
                        });
                        this.$router.push('boardPage');
                    }

                }

            }

        }

    }
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        height: 100%;
    }
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
