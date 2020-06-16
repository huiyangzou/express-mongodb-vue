<template>
    <div style="height: 1024px;">
        <el-container style="height: 100%; border: 1px solid #eee">
            <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
                <el-menu  style="text-align: left" >
                    <el-submenu index="1" >
                        <template slot="title" ><i class="el-icon-message" ></i>管理首页</template>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title"><i class="el-icon-menu"></i>APP管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="2-1" @click="skipTo('appList')">APP列表</el-menu-item>
                            <el-menu-item index="2-2" @click="skipTo('appUpdate')" >APP热更新</el-menu-item>
                            <el-menu-item index="2-3" @click="skipTo('appVersionUpdate')">APP版本更新</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-setting"></i>插件管理</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1"  @click="skipTo('create')">插件列表</el-menu-item>
                            <el-menu-item index="3-2"  @click="skipTo('delete')">插件列表1.x</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>

                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-setting"></i>开发工具</template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">图标工具</el-menu-item>
                            <el-menu-item index="3-2">启动图工具</el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header style=" font-size: 12px;display: flex;">
                    <span style="font-size: 34px;color:#ffffff">吉祥应用管理平台</span>

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

                <el-main style="">
                    <el-tabs v-model="editableTabsValue" type="card" closable  @edit="handleTabsEdit" @tab-click="skipTo(editableTabsValue)" style="flex: 1;height: 60px;">
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
        methods:{
            skipTo(name){

                this.handleTabsEdit(name,'add')
            },
            handleTabsEdit(targetName, action) {
                if (action === 'add') {
                    if(!_.find(this.editableTabs,{name:targetName})){
                        let rou=_.find(routes[0].children,{name:targetName})
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
    .el-header {
        background-color: #B3C0D1;
        color: #333;
        line-height: 60px;
    }

    .el-aside {
        color: #333;
    }
</style>
