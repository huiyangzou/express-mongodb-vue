<template>
    <div style="display: flex;flex-direction: column;" :style="{ height: screenHeight + 'px' }">
        <keep-alive>
            <router-view>
                <!-- 所有路径匹配到的视图组件都会被缓存！ -->
            </router-view>
        </keep-alive>

    </div>
</template>

<script>
    var _ = require('lodash');
    import routes from "../router";
    export default {
        name: "mainPage",
        data() {
            return {
                queryTreeData:{
                },
                moduleList:[],
                count:0,
                screenHeight: document.body.clientHeight,
                editableTabsValue: '1',
                editableTabs: [{
                    title: '首页',
                    name: 'boardPage',
                }],
                tabIndex: 1,
                routerInfo:[]

            }
        },
        created() {
            this.$router.push('likemovie');
            this.routerInfo=routes;
            this.$bus.$on('eventName', (data) => {
                // this.skipTo(data)
                const {type,info}=data;
                console.log(info,'yxyxyxyxy')
                if(!_.find(this.editableTabs,{name:type})){
                    let rou=_.find(routes[1].children,{name:type})
                    this.editableTabs.push({
                        title: rou.realName,
                        name: type,
                    });
                }
                this.editableTabsValue = type;
                // this.$router.push('video?q='+link)
                this.$router.push({name:'video',params:info})
            })
            this.getData();
            console.log(this.$cookies.keys(),'cookie');

        },
        methods:{
            getData(){
                this.$fetch('/v1/moduleManager/tree', this.queryTreeData)
                    .then((response) => {
                        console.log(response)
                        this.moduleList = response.data;
                        // this.totalItem = response.data.total
                        // this.currentPage = response.data.currentPage;
                    })
                // this.$fetch('/v1/moduleManager', this.queryData)
                //     .then((response) => {
                //         console.log(response,'moduleManager')
                //
                //         this.tableData = response.data.data;
                //         this.totalItem = response.data.total
                //         this.currentPage = response.data.currentPage;
                //     })
            },
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
        },
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
