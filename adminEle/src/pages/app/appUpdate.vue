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

            <div>
                <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加更新</el-button>

                <el-button type="primary" plain>说明文档</el-button>
            </div>

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
                    prop="remark"
                    label="标题备注"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="appName"
                    label="更新的应用"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="appVersion"
                    label="更新的版本"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="usePlatform"
                    label="适用平台"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="debugVersion"
                    label="DEBUG版本"
                    width="120">
            </el-table-column>
            <el-table-column
                prop="enableState"
                label="启用状态"
                width="120">
        </el-table-column>
            <el-table-column
                    prop="updateMode"
                    label="更新模式"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="updateFinish"
                    label="更新完成后"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="hasUpdateCount"
                    label="已更新数量"
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
                title="添加更新"
                :visible.sync="dialogVisible"
                width="40%"
        >
            <div style="display: flex;flex-direction: row;align-items: center">
                <span style="flex: 1;text-align: center">标题备注</span>
                <el-input style="flex:4;margin-left: 20px;" v-model="formData.remark" placeholder="标题仅用于管理平台备注"></el-input>
            </div>
            <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                <span style="flex: 1;text-align: center">更新应用</span>


                    <el-select  style="flex:4;margin-left: 20px;" v-model="formData._id" clearable placeholder="选择要更新的APP">
                        <el-option
                                v-for="item in options"
                                :key="item._id"
                                :label="item.remark"
                                :value="item._id">
                        </el-option>
                    </el-select>

            </div>

            <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                <span style="flex: 1;text-align: center">应用版本</span>
                <el-input style="flex:4;margin-left: 20px;" v-model="formData.remark" placeholder="输入要更新APP版本号，如：12"></el-input>
            </div>

            <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                <span style="flex: 1;text-align: center">上传更新包</span>
                <el-upload
                        style="flex:4;margin-left: 20px;"
                        class="upload-demo"
                        action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :before-remove="beforeRemove"
                        multiple
                        :limit="1"
                        :on-exceed="handleExceed"
                        :file-list="fileList">
                    <el-button size="small" type="primary">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传zip文件，且不超过500kb</div>
                </el-upload>
            </div>

            <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                <span style="flex: 1;text-align: center">更新平台</span>
                <el-checkbox-group v-model="checkList"  style="flex:4;margin-left: 20px;" >
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


            <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                <span style="flex: 1;text-align: center">启用状态</span>
                <el-radio-group  style="flex:4;margin-left: 20px;" v-model="radio">
                    <el-radio :label="1">启用</el-radio>
                    <el-radio :label="2">暂停</el-radio>
                    <el-radio :label="3">撤回</el-radio>
                </el-radio-group>
            </div>

            <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                <span style="flex: 1;text-align: center">更新模式</span>
                <el-radio-group  style="flex:4;margin-left: 20px;" v-model="radio">
                    <el-radio :label="1">自动触发</el-radio>
                    <el-radio :label="2">客户触发</el-radio>

                </el-radio-group>
            </div>
            <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                <span style="flex: 1;text-align: center">更新完成后</span>
                <div style="display:flex;flex-direction: column;flex:4;margin-left: 20px;">
                    <el-radio-group   v-model="radio">
                        <el-radio :label="1">静默</el-radio>
                        <el-radio :label="2">自动重启</el-radio>
                        <el-radio :label="3">提示重启</el-radio>

                    </el-radio-group>
                    <el-radio-group   style="margin-top: 20px;" v-model="radio">
                        <el-radio :label="1">清除缓存</el-radio>
                        <el-radio :label="2">保留缓存</el-radio>


                    </el-radio-group>

                </div>


            </div>


            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitApp()">提交</el-button>
  </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "appUpdate",
        data() {
            return {
                checkList: ['android'],
                fileList: [],
                formData:{
                    id:'',
                    remark:'',
                    appkey:'',
                    adTime:0,
                    todayCount:0,
                    yesterdayCount:0,
                    totalCount:0,
                },
                radio: 3,
                options: [],
                value: '',
                dataTime:0,
                activeName: 'first',
                dialogVisible: false,
                tableData: [{
                    appName:'xiquedao',
                    appVersion:'2.0.0',
                    usePlatform:'android',
                    debugVersion:'1.0.0',
                    enableState:true,
                    updateMode:'full',
                    updateFinish:true,
                    hasUpdateCount:'0'}
                ],
                multipleSelection: []
            }
        },
        created() {
            this.getData();

        },
        methods: {
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            },
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
