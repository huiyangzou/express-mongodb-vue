<template>
    <div>
        <el-row>

            <el-col :span="12">
                <div style="display:flex;flex-direction: column;">
                    <span class="input_title">标题备注</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="input"
                            clearable>
                    </el-input>
                </div>

            </el-col>

            <el-col :span="12">
                <div style="display:flex;flex-direction: column;margin-left: 20px;">
                    <span class="input_title">APPKEY</span>
                    <el-input
                            placeholder="请输入内容"
                            v-model="input"
                            clearable>
                    </el-input>
                </div>

            </el-col>
        </el-row>
        <div style="flex-direction: row;justify-content: space-between;display: flex;margin-top: 20px;">

            <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加应用</el-button>
            <el-button type="primary" icon="el-icon-search">搜索</el-button>
        </div>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="id"
                    label="ID"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="remark"
                    label="标题备注"
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="appkey"
                    label="APPKEY"
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="adTime"
                    label="APP闪屏广告"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="todayCount"
                    label="今日启动"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="yesterdayCount"
                    label="昨日启动"
                    width="120">
            </el-table-column> <el-table-column
                    prop="totalCount"
                    label="累计启动"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="操作"
                    fixed="right"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">统计</el-button>
                    <el-button type="text" size="small">修改</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block" style="text-align: right;margin-top: 30px;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage4"
                    :page-sizes="[100, 200, 300, 400]"
                    :page-size="100"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400">
            </el-pagination>
        </div>
        <el-dialog
                title="添加应用"
                :visible.sync="dialogVisible"
                width="30%"
                >
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <div style="display: flex;flex-direction: row;align-items: center">
                        <span style="flex: 1;text-align: center">标题备注*</span>
                        <el-tooltip content="仅用于管理平台备注" placement="top">
                        <el-input style="flex:4;margin-left: 20px;" v-model="input" placeholder="仅用于管理平台备注"></el-input>
                        </el-tooltip>
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">APPKEY*</span>
                        <el-tooltip content="配置文件 中的appkey。" placement="top">
                            <el-input style="flex:4;margin-left: 20px;" v-model="input" placeholder="配置文件 中的appkey。"></el-input>
                        </el-tooltip>

                    </div>
                </el-tab-pane>
                <el-tab-pane label="闪屏广告" name="second">
                    <div style="flex-direction: column">
                        <el-alert
                                title="注意：闪屏广告修改后在第2次启动app生效（修改后的第1次启动时生成缓存）。"
                                type="warning"
                                :closable="false"
                                show-icon>
                        </el-alert>

                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">APPKEY*</span>
                            <el-tooltip   style="flex:4;margin-left: 20px;" content="闪屏广告图片：留空则不显示闪屏广告。" placement="top">
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"

                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="imageUrl" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>

                            </el-tooltip>

                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">APPKEY*</span>
                            <el-tooltip content="配置文件 中的appkey。" placement="top">
                                <el-input style="flex:4;margin-left: 20px;" v-model="input" placeholder="配置文件 中的appkey。"></el-input>
                            </el-tooltip>

                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">APPKEY*</span>
                            <el-tooltip content="配置文件 中的appkey。" placement="top">
                                <el-input style="flex:4;margin-left: 20px;" v-model="input" placeholder="配置文件 中的appkey。"></el-input>
                            </el-tooltip>

                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">APPKEY*</span>
                            <el-tooltip content="配置文件 中的appkey。" placement="top">
                                <el-input style="flex:4;margin-left: 20px;" v-model="input" placeholder="配置文件 中的appkey。"></el-input>
                            </el-tooltip>

                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">APPKEY*</span>
                            <el-tooltip content="配置文件 中的appkey。" placement="top">
                                <el-input style="flex:4;margin-left: 20px;" v-model="input" placeholder="配置文件 中的appkey。"></el-input>
                            </el-tooltip>

                        </div>

                    </div>
                </el-tab-pane>

            </el-tabs>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">提交</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "appList",
        data() {
            return {
                activeName: 'first',
                dialogVisible: false,
                tableData: [{
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄',
                    totalCount:100,
                    yesterdayCount:30,
                    todayCount:10,
                    adTime:'5秒',
                    appkey:'xxxxx',
                    remark:'xxxx',
                    id:'xxxx',
                }, {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-08',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-06',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-07',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }],
                multipleSelection: []
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            },
            addApp(){

            },
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {

                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                //每页多少条
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                //当前页
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #ff0033;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 80px;
        height: 80px;
        line-height: 80px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
    .input_title {
        margin-bottom: 10px;
    }

    &
    :last-child {
        margin-bottom: 0;

    }

    .bg-purple-dark {
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
