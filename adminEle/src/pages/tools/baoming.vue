<template>
    <div>
        <el-row>

            <el-col :span="12">
<!--                <div style="display:flex;flex-direction: column;">-->
<!--                    <span class="input_title">标题备注</span>-->
<!--                    <el-input-->
<!--                            placeholder="请输入内容"-->
<!--                            v-model="input"-->
<!--                            clearable>-->
<!--                    </el-input>-->
<!--                </div>-->
                <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                    <span style="flex: 1;text-align: center">题目类型一级</span>

                    <el-select  style="flex:4;margin-left: 20px;" v-model="queryData.typeOne" clearable placeholder="请选择" @change="gettypeList">
                        <el-option
                                v-for="item in typesOne"
                                :key="item._id"
                                :label="item.questionTypeName"
                                :value="item._id">
                        </el-option>
                    </el-select>

                </div>
            </el-col>

            <el-col :span="12">
<!--                <div style="display:flex;flex-direction: column;margin-left: 20px;">-->
<!--                    <span class="input_title">APPKEY</span>-->
<!--                    <el-input-->
<!--                            placeholder="请输入内容"-->
<!--                            v-model="input"-->
<!--                            clearable>-->
<!--                    </el-input>-->
<!--                </div>-->
                <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                    <span style="flex: 1;text-align: center">题目类型二级</span>
                    <el-select filterable  style="flex:4;margin-left: 20px;" v-model="queryData.typeTwo" clearable placeholder="请选择">
                        <el-option
                                v-for="item in typesTwo"
                                :key="item._id"
                                :label="item.questionTypeName"
                                :value="item._id">
                        </el-option>
                    </el-select>

                </div>
            </el-col>


        </el-row>
        <div style="flex-direction: row;justify-content: space-between;display: flex;margin-top: 20px;">

            <el-button type="primary" icon="el-icon-plus" @click="addQuestion">添加面试题</el-button>
            <div>
                <el-button type="primary" icon="el-icon-delete" @click="clearQuery">清空</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>

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
                    prop="name"
                    label="姓名"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="phone"
                    label="手机号"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="number"
                    label="人数"
                    width="120">
            </el-table-column>

            <el-table-column
                    prop="mark"
                    label="备注"
                    width="120">
            </el-table-column>

            <el-table-column
                    label="操作"
                    fixed="right"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">统计</el-button>
                    <el-button @click="handleClick(scope.row)" type="text" size="small">修改</el-button>
                    <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

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
        <el-dialog
                title="添加问题"
                :visible.sync="dialogVisible"
                width="40%"
                >
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">

                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">题目类型一级</span>

                            <el-select  style="flex:4;margin-left: 20px;" v-model="formData.typeOne" clearable placeholder="请选择" @change="gettypeList">
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
                            <el-select filterable style="flex:4;margin-left: 20px;" v-model="formData.typeTwo" clearable placeholder="请选择">
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
                            <el-input style="flex:4;margin-left: 20px;" v-model="formData.question" placeholder="请输入内容"></el-input>
                    </div>

                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">答案</span>
                            <el-input style="flex:4;margin-left: 20px;"   type="textarea"
                                      :autosize="{ minRows:5, maxRows: 5}" v-model="formData.answer" placeholder="请输入内容"></el-input>

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
                queryData:{
                    typeOne:null,
                    typeTwo:null,
                    currentPage:1,
                    pageSize:5
                },
                formData:{
                    id:'',
                    question:'',
                    answer:'',
                    type:0,
                    typeOne:"",
                    typeTwo:"",
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
                typesOne: [{value: 'Java部分',label: 'Java部分'}, {value: '1',label: '1秒'}, {value: '1.5',label: '1.5秒'}, {value: '2',label: '2秒'}, {
                    value: '2.5',label: '2.5秒'}, { value: '3',label: '3秒'}, {value: '4',label: '4秒'}],
                typesTwo: [{value: '0.5',label: '0.5秒'}, {value: '1',label: '1秒'}, {value: '1.5',label: '1.5秒'}, {value: '2',label: '2秒'}, {
                    value: '2.5',label: '2.5秒'}, { value: '3',label: '3秒'}, {value: '4',label: '4秒'}],
                value: '',
                dateTime:[],
                activeName: 'first',
                dialogVisible: false,
                tableData: [],
                totalItem:0,
                currentPage:1,
                multipleSelection: []
            }
        },
        created() {
            this.getData();

        },
        methods: {
            addQuestion(){
                this.dialogVisible = true;
                this.formData={}
            },
            clearQuery(){
              this.queryData.typeOne=null
              this.queryData.typeTwo=null
            },
            search(){
              this.queryData.currentPage=1;
              this.getData();
            },
            getData(){
                this.$fetch('/v1/baoming',this.queryData)
                    .then((response) => {
                        console.log(response)
                        this.tableData=response.data;
                        this.totalItem=response.data.length;
                        // this.currentPage=response.data.currentPage;

                    })

                this.$fetch('/v1/questionType',{level:'l1'})
                    .then((response) => {
                        console.log(response)
                        this.typesOne=response.data;
                    })


            },
            gettypeList(id){
                this.$fetch('/v1/questionType',{level:'l2',fartherid:id})
                    .then((response) => {
                        console.log(response)
                        this.typesTwo=response.data;
                    })
            },
            submitApp(){
                console.log("formData",this.formData);
                this.dialogVisible = false;
                if(_.isEmpty(this.formData._id)){
                    this.$post('/v1/baoming',this.formData)
                        .then((response) => {
                            console.log(response)
                            this.getData();
                            this.formData={};
                        })
                }else {
                    this.$put('/v1/baoming/'+this.formData._id,this.formData)
                        .then((response) => {
                            console.log(response)
                            this.getData();
                            this.formData={};
                        })
                }

            },
            handleClick(tab, event) {
                console.log(tab, event);
                console.log("xxxx"+tab._id)

                this.$fetch('/v1/baoming',{_id:tab._id})
                    .then((response) => {
                        console.log(response)
                        this.formData=response.data.data[0];
                    })
                this.dialogVisible = true;
            },
            deleteClick(tab, event) {
                console.log(tab, event);
                this.$delete('/v1/baoming/'+tab._id)
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
                this.queryData.pageSize=val
                this.getData();
            },
            handleCurrentChange(val) {
                //当前页
                console.log(`当前页: ${val}`);
                this.queryData.currentPage=val
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
