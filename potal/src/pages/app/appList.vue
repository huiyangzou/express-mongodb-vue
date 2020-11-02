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
                id="elMain"
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
                    prop="_id"
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
                    <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
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
                width="40%"
                >
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <div style="display: flex;flex-direction: row;align-items: center">
                        <span style="flex: 1;text-align: center">标题备注*</span>
                        <el-tooltip content="仅用于管理平台备注" placement="top">
                        <el-input style="flex:4;margin-left: 20px;" v-model="formData.remark" placeholder="仅用于管理平台备注"></el-input>
                        </el-tooltip>
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">APPKEY*</span>
                        <el-tooltip content="请输入内容" placement="top">
                            <el-input style="flex:4;margin-left: 20px;" v-model="formData.appkey" placeholder="请输入内容"></el-input>
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
                            <span style="flex: 1;text-align: center">闪屏广告图片</span>
                            <el-tooltip   style="flex:4;margin-left: 20px;" content="闪屏广告图片：留空则不显示闪屏广告。" placement="top">
                                <el-upload
                                        class="avatar-uploader"
                                        action="https://jsonplaceholder.typicode.com/posts/"
                                        :show-file-list="false"

                                        :on-success="handleAvatarSuccess"
                                        :before-upload="beforeAvatarUpload">
                                    <img v-if="imageUrl" :src="formData.adPic" class="avatar">
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                </el-upload>

                            </el-tooltip>

                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">闪屏显示时间</span>
                            <el-tooltip content="打开应用时显示APP闪屏广告的时间，留空默认：2秒。" placement="top">
                                <el-select  style="flex:4;margin-left: 20px;" v-model="formData.adTime" clearable placeholder="请选择">
                                    <el-option
                                            v-for="item in options"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-tooltip>

                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">闪屏跳过按钮</span>
                            <el-tooltip content="闪屏广告是否显示时间倒计时及跳过等待的按钮。" placement="top">
                                <el-radio-group  style="flex:4;margin-left: 20px;" v-model="formData.showSkipBtn">
                                    <el-radio :label="true">显示跳过</el-radio>
                                    <el-radio :label="false">隐藏跳过</el-radio>
                                </el-radio-group>
                            </el-tooltip>

                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">闪屏点击打开</span>
                            <el-tooltip content="点击闪屏广告时打开的js页面路径，如：ad.js或https://abc.com/ad.js。" placement="top">
                                <el-input style="flex:4;margin-left: 20px;" v-model="formData.targetUrl" placeholder="请输入内容"></el-input>
                            </el-tooltip>

                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">闪屏有效时限</span>

                            <el-tooltip content="设置闪屏广告在指定时间范围内显示。" placement="top">


                                <el-date-picker
                                        value-format=" yyyy-MM-dd HH:mm"
                                        format="yyyy-MM-dd HH:mm"
                                        v-model="formData.timeLimit"
                                        style="flex:4;margin-left: 20px;"
                                        type="datetimerange"
                                        :picker-options="pickerOptions"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期"
                                        align="right">
                                </el-date-picker>
                            </el-tooltip>

                        </div>

                    </div>
                </el-tab-pane>

            </el-tabs>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitApp()">提交</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        name: "appList",
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]},
                formData:{
                    id:'',
                    remark:'',
                    appkey:'',
                    adTime:1,
                    adPic:'',
                    showSkipBtn:true,
                    targetUrl:'',
                    timeLimit:[]
                },
                radio: 3,
                options: [{value: '0.5',label: '0.5秒'}, {value: '1',label: '1秒'}, {value: '1.5',label: '1.5秒'}, {value: '2',label: '2秒'}, {
                    value: '2.5',label: '2.5秒'}, { value: '3',label: '3秒'}, {value: '4',label: '4秒'}, {value: '5',label: '5秒'
                }, {value: '6', label: '6秒'}, { value: '7',label: '7秒'}, {value: '8',label: '8秒'}, {value: '9',label: '9秒'}, {value: '10',label: '10秒'}],
                value: '',
                dateTime:[],
                activeName: 'first',
                dialogVisible: false,
                tableData: [],
                multipleSelection: []
            }
        },
        created() {
            this.getData();

        },
        methods: {
            getData(){
                this.$fetch('/v1/app')
                    .then((response) => {
                        console.log(response)
                        this.tableData=response.data;
                    })
            },
            submitApp(){
                console.log("formData",this.formData);
                this.dialogVisible = false;
                this.$post('/v1/app',this.formData)
                    .then((response) => {
                        console.log(response)
                        this.getData();
                        this.formData={};
                    })
            },
            handleClick(tab, event) {
                console.log(tab, event);

            },
            deleteClick(tab, event) {
                console.log(tab, event);
                this.$delete('/v1/app/'+tab._id)
                    .then((response) => {
                        console.log(response)
                        this.getData();
                    })
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
        border: 1px dashed #d9d9d9;
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
