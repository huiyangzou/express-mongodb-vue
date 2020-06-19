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
                    <span class="input_title">更新应用</span>
                        <el-select   v-model="formData._id" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in options"
                                    :key="item._id"
                                    :label="item.remark"
                                    :value="item._id">
                            </el-option>
                        </el-select>

                </div>

            </el-col>
        </el-row>
        <div style="flex-direction: row;justify-content: space-between;display: flex;margin-top: 20px;">

            <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加版本更新</el-button>
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
                    prop="_id"
                    label="ID"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="tipsTitle"
                    label="提示标题"
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="updateApp"
                    label="更新的应用"
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="updateVersion"
                    label="更新的版本"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="userPlatform"
                    label="适合平台"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="debugVersion"
                    label="DEBUG版本"
                    width="120">
            </el-table-column>
            <el-table-column
                prop="tipsTemplate"
                label="提示模板"
                width="120">
            </el-table-column>
                <el-table-column
                        prop="mustUpdate"
                        label="强制更新"
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
                title="添加版本更新"
                :visible.sync="dialogVisible"
                width="40%"
        >
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="更新应用" name="first">
                    <div style="display: flex;flex-direction: row;align-items: center">
                        <span style="flex: 1;text-align: center">更新应用*</span>
                        <el-tooltip content="仅用于管理平台备注" placement="top">
                            <el-select  style="flex:4;margin-left: 20px;" v-model="formData._id" clearable placeholder="选择要版本更新的APP">
                                <el-option
                                        v-for="item in options"
                                        :key="item._id"
                                        :label="item.remark"
                                        :value="item._id">
                                </el-option>
                            </el-select>
                        </el-tooltip>

                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">应用版本</span>
                        <el-tooltip content="请输入内容" placement="top">
                            <el-input style="flex:4;margin-left: 20px;" v-model="formData.appkey" placeholder="输入要版本更新的APP版本号，如：12"></el-input>
                        </el-tooltip>

                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">更新平台</span>
                        <el-checkbox-group  v-model="checkList"  style="flex:4;margin-left: 20px;" >
                            <el-checkbox label="Android"></el-checkbox>
                            <el-checkbox label="iOS"></el-checkbox>

                        </el-checkbox-group>
                    </div>

                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">DEBUG版本</span>
                        <el-radio-group  style="flex:4;margin-left: 20px;" v-model="radio">
                            <el-radio :label="1">排除</el-radio>
                            <el-radio :label="2">包含</el-radio>
                            <el-radio :label="3">仅DEBUG</el-radio>
                        </el-radio-group>
                    </div>
                </el-tab-pane>
                <el-tab-pane label="更新设置" name="second">
                    <div style="flex-direction: column">
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">提示标题</span>

                            <el-input style="flex:4;margin-left: 20px;" v-model="input" placeholder="例如:发现新版本"></el-input>

                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">更新内容</span>

                            <el-input
                                    style="flex:4;margin-left: 20px;"
                                    type="textarea"
                                    :autosize="{ minRows:5, maxRows: 5}"
                                    placeholder="例如：
1.修复已知bug
2.全新我的UI页面
3.更好的用户体验
4.提升启动数据刷新流畅度"
                                    v-model="formData.updateContent">
                            </el-input>
                        </div>

                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">下载地址</span>

                            <el-input
                                    style="flex:4;margin-left: 20px;"
                                    type="textarea"
                                    :autosize="{ minRows:2, maxRows: 2}"
                                    placeholder="填写新版app下载地址"
                                    v-model="formData.appDownLoadUrl">
                            </el-input>
                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">提示模板</span>
                            <el-radio-group  style="flex:4;margin-left: 20px;" v-model="radio">
                                <el-radio :label="1">模板1</el-radio>
                                <el-radio :label="2">模板2</el-radio>
                                <el-radio :label="3">模板3</el-radio>
                                <el-radio :label="4">模板4</el-radio>
                                <el-radio :label="5">模板5</el-radio>
                            </el-radio-group>
                        </div>
                        <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                            <span style="flex: 1;text-align: center">强制更新</span>
                            <el-radio-group  style="flex:4;margin-left: 20px;" v-model="radio">
                                <el-radio :label="1">自由更新</el-radio>
                                <el-radio :label="2">强制更新</el-radio>
                            </el-radio-group>
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
    export default {
        name: "appVersionUpdate",
        data() {
            return {
                checkList:[],
                formData:{
                    _id:'',
                    id:'',
                    remark:'',
                    appkey:'',
                    adTime:0,
                    todayCount:0,
                    yesterdayCount:0,
                    totalCount:0,
                    updateContent:'',
                    appDownLoadUrl:'',
                },
                radio: 3,
                options: [],
                value: '',
                dataTime:0,
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
                        this.options=response.data;
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
