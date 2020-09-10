<template>
    <div style="">
<!--        查询-->
        <el-row>
            <el-col :span="4">
                <div style="display: flex;flex-direction: row;align-items: center;">
                    <el-select style="flex:4;" v-model="queryData.typeOne" clearable placeholder="一级题目类型"
                               @change="gettypeList">
                        <el-option
                                v-for="item in typesOne"
                                :key="item._id"
                                :label="item.questionTypeName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="4">
                <div style="display: flex;flex-direction: row;align-items: center;">
                    <el-select filterable style="flex:4;margin-left: 20px;" v-model="queryData.typeTwo" clearable
                               placeholder="二级题目类型">
                        <el-option
                                v-for="item in typesTwo"
                                :key="item._id"
                                :label="item.questionTypeName"
                                :value="item._id">
                        </el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="4">
                <div style="display: flex;flex-direction: row;align-items: center;">
                    <el-input
                            style="flex:4;margin-left: 20px;"
                            placeholder="文章标题"
                            v-model="queryData.question"
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
            <el-button type="primary" icon="el-icon-plus" @click="addQuestion">添加问题</el-button>
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
                    prop="question"
                    label="问题"
                    width="500">
            </el-table-column>
            <el-table-column
                    prop="answer"
                    label="答案"
                    :show-overflow-tooltip="true"

                    width="800">
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
                title="添加问题"
                :visible.sync="dialogVisible"
                width="40%">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">

                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">题目类型一级</span>

                        <el-select style="flex:4;margin-left: 20px;" v-model="formData.typeOne" clearable
                                   placeholder="请选择" @change="gettypeList">
                            <el-option
                                    v-for="item in typesOne"
                                    :key="item._id"
                                    :label="item.questionTypeName"
                                    :value="item._id">
                            </el-option>
                        </el-select>

                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">题目类型二级</span>
                        <el-select filterable style="flex:4;margin-left: 20px;" v-model="formData.typeTwo" clearable
                                   placeholder="请选择">
                            <el-option
                                    v-for="item in typesTwo"
                                    :key="item._id"
                                    :label="item.questionTypeName"
                                    :value="item._id">
                            </el-option>
                        </el-select>
                    </div>

                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">题目</span>
                        <el-input style="flex:4;margin-left: 20px;" v-model="formData.question"
                                  placeholder="请输入内容"></el-input>
                    </div>

                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">答案</span>
                        <el-input style="flex:4;margin-left: 20px;" type="textarea"
                                  :autosize="{ minRows:5, maxRows: 5}" v-model="formData.answer"
                                  placeholder="请输入内容"></el-input>
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
                queryData: {
                    typeOne: null,
                    typeTwo: null,
                    currentPage: 1,
                    pageSize: 5,
                    question: null,
                },
                formData: {
                    id: '',
                    question: '',
                    answer: '',
                    typeOne: "",
                    typeTwo: "",
                },
                typesOne: [],
                typesTwo: [],
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
            //添加问题
            addQuestion() {
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
                this.$fetch('/v1/goods', this.queryData)
                    .then((response) => {
                        console.log(response)
                        this.tableData = response.data.data;
                        this.totalItem = response.data.total
                        this.currentPage = response.data.currentPage;
                    })

                this.$fetch('/v1/questionType', {level: 'l1'})
                    .then((response) => {
                        console.log(response)
                        this.typesOne = response.data;
                    })
            },
            //查询问题类型
            gettypeList(id) {
                this.$fetch('/v1/questionType', {level: 'l2', fartherid: id})
                    .then((response) => {
                        console.log(response)
                        this.typesTwo = response.data;
                    })
            },
            //添加/修改提交
            submitApp() {
                console.log("formData", this.formData);
                this.dialogVisible = false;
                if (_.isEmpty(this.formData._id)) {
                    this.$post('/v1/goods', this.formData)
                        .then((response) => {
                            console.log(response)
                            this.getData();
                        })
                } else {
                    this.$put('/v1/goods/' + this.formData._id, this.formData)
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

                this.$fetch('/v1/goods', {_id: tab._id})
                    .then((response) => {
                        console.log(response)
                        this.formData = response.data.data[0];
                    })
                this.dialogVisible = true;
            },
            //删除条目
            deleteClick(tab, event) {
                console.log(tab, event);
                this.$delete('/v1/goods/' + tab._id)
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

    &:last-child {
        margin-bottom: 0;

    }

    .bg-purple-dark {
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
</style>
