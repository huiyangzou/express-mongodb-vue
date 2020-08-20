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

            <el-button type="primary" icon="el-icon-plus" @click="dialogVisible = true">添加问题类型</el-button>
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
                    prop="questionTypeName"
                    label="类型名称"
                    width="360">
            </el-table-column>
            <el-table-column
                    prop="level"
                    label="级别"
                    width="360">
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
                title="添加问题"
                :visible.sync="dialogVisible"
                width="40%"
                >
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <div style="display: flex;flex-direction: row;align-items: center">
                        <span style="flex: 1;text-align: center">类型名称</span>
                        <el-tooltip content="仅用于管理平台备注" placement="top">
                        <el-input style="flex:4;margin-left: 20px;" v-model="formData.questionTypeName" placeholder="请输入内容"></el-input>
                        </el-tooltip>
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">级别</span>
                        <el-tooltip content="" placement="top">
                            <el-select  style="flex:4;margin-left: 20px;" v-model="formData.level" clearable placeholder="请选择" @change="changeVisible">
                                <el-option
                                        v-for="item in levels"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </el-tooltip>

                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;" v-show="visible">
                        <span style="flex: 1;text-align: center">父类型</span>
                        <el-tooltip content="" placement="top">
                            <el-select  style="flex:4;margin-left: 20px;" v-model="formData.fartherid" clearable placeholder="请选择" >
                                <el-option
                                        v-for="item in farthers"
                                        :key="item._id"
                                        :label="item.questionTypeName"
                                        :value="item._id">
                                </el-option>
                            </el-select>
                        </el-tooltip>

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
                visible:true,
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
                    questionTypeName:'',
                    fartherid:'0',
                    level:"",
                },
                radio: 3,
                levels: [{value: 'l1',label: '一级'}, {value: 'l2',label: '二级'}],
                farthers:[],
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
            changeVisible(event,item){
                console.log("xxxxxxxxxxxxxxxxxx")

                if(event === 'l1'){
                    this.visible=false;
                    console.log(event)
                }else{
                    this.visible=true;
                    console.log(event)
                }
            },
            getData(){
                this.$fetch('/v1/questionType')
                    .then((response) => {
                        console.log(response)
                        this.tableData=response.data;
                    })

                this.$fetch('/v1/questionType',{level:'l1'})
                    .then((response) => {
                        console.log(response)
                        this.farthers=response.data;
                    })
            },
            submitApp(){
                console.log("formData",this.formData);
                this.dialogVisible = false;
                this.$post('/v1/questionType',this.formData)
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
                this.$delete('/v1/questionType/'+tab._id)
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
