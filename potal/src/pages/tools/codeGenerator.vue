<template>
    <div style="">
        <!--        查询-->
        <el-row>
            <el-col :span="4">
                <div style="display: flex;flex-direction: row;align-items: center;">
                    <el-input
                            style="flex:4;margin-right: 20px;"
                            placeholder="代码生成器名称"
                            v-model="queryData.codeGeneratorModuleName"
                            clearable>
                    </el-input>
                </div>
            </el-col>

            <div style="text-align: right;">
                <el-button type="primary" icon="el-icon-delete" @click="clearQuery">清空</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
        </el-row>

        <!--        新增-->
        <div style="flex-direction: row;justify-content: space-between;display: flex;margin-top: 20px;margin-bottom: 20px;">
            <el-button type="primary" icon="el-icon-plus" @click="addCodeGenerator">添加代码生成器</el-button>
        </div>

        <!--        表格-->
        <el-table
                id="elMain"
                ref="multipleTable"
                :data="tableData"
                max-height="600"
                tooltip-effect="dark"
                style="width: 100%;"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="80">
            </el-table-column>

            <el-table-column
                    prop="codeGeneratorModuleName"
                    label="模块名称"
                    width="200">
            </el-table-column>
            <el-table-column
                    prop="codeGeneratorKey"
                    label="唯一标识"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="modelFilePath"
                    label="modelFilePath"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="moduleFilePath"
                    label="moduleFilePath"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="bussnessFilePath"
                    label="bussnessFilePath"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="routerFilePath"
                    label="routerFilePath"
                    width="400">
            </el-table-column>
            <el-table-column
                    prop="vueFilePath"
                    label="vueFilePath"
                    width="400">
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="150"
                    fixed="right"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <!--        分页-->
        <div class="block" style="text-align: right;margin-top: 30px;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryData.currentPage"
                    :page-sizes="[5,10, 20, 30, 40]"
                    :page-size="queryData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalItem">
            </el-pagination>
        </div>

        <!--        对话框-->
        <el-dialog
                title="添加代码生成器"
                :visible.sync="dialogVisible"
                width="40%">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">唯一标识</span>
                        <el-input style="flex:4;margin-left: 20px;" v-model="formData.codeGeneratorKey"
                                  placeholder="请输入内容,例如：activity"></el-input>
                    </div>

                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">模块名称</span>
                        <el-input style="flex:4;margin-left: 20px;" type="text"
                                   v-model="formData.codeGeneratorModuleName"
                                  placeholder="请输入内容,例如：活动"></el-input>
                    </div>
                </el-tab-pane>

            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit()">提交</el-button>
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
                queryData: {
                    currentPage: 1,
                    pageSize: 5,
                    codeGeneratorName: null,
                },
                formData: {
                    id: '',
                    codeGeneratorKey: "",
                    codeGeneratorModuleName: "",
                },
                activeName: 'first',
                dialogVisible: false,
                tableData: [],
                totalItem: 0,
                currentPage: 1,
                multipleSelection: []
            }
        },
        created() {
            this.getData();
        },
        methods: {
            //添加代码生成器
            addCodeGenerator() {
                this.dialogVisible = true;
                this.formData = {}
            },
            //清空查询
            clearQuery() {
                this.queryData.typeOne = ""
                this.queryData.typeTwo = ""
                this.queryData.question = ""
            },
            //模糊搜索
            search() {
                this.queryData.currentPage = 1;
                this.getData();
            },
            //获取列表数据
            getData() {
                this.$fetch('/v1/codeGenerator', this.queryData)
                    .then((response) => {
                        console.log(response)
                        this.tableData = response.data.data;
                        this.totalItem = response.data.total
                        this.currentPage = response.data.currentPage;
                    })

            },
            //添加/修改提交
            submit() {
                console.log("formData", this.formData);
                this.dialogVisible = false;
                if (_.isEmpty(this.formData._id)) {


                    this.$post('/v1/codeGenerator', this.formData)
                        .then((response) => {
                            console.log(response)
                            this.getData();
                        })
                } else {
                    this.$put('/v1/codeGenerator/' + this.formData._id, this.formData)
                        .then((response) => {
                            console.log(response)
                            this.getData();
                        })
                }

            },
            //编辑条目
            handleClick(tab, event) {
                console.log(tab, event);
                console.log("xxxx" + tab._id)

                this.$fetch('/v1/codeGenerator', {_id: tab._id})
                    .then((response) => {
                        console.log(response)
                        this.formData = response.data.data[0];
                    })
                this.dialogVisible = true;
            },
            //删除条目
            deleteClick(tab, event) {
                console.log(tab, event);
                this.$delete('/v1/codeGenerator/' + tab._id)
                    .then((response) => {
                        console.log(response)
                        this.getData();
                    })
            },
            //全选/全不选
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            //
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //每页多少条
            handleSizeChange(val) {
                //每页多少条
                console.log(`每页 ${val} 条`);
                this.queryData.pageSize = val
                this.getData();
            },
            // 当前页
            handleCurrentChange(val) {
                //当前页
                console.log(`当前页: ${val}`);
                this.queryData.currentPage = val
                this.getData();
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
