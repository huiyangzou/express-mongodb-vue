<template>
    <div style="">
        <!--        查询-->
        <el-row>
            <el-col :span="4">
                <div style="display: flex;flex-direction: row;align-items: center;">
                    <el-input
                            style="flex:4;margin-right: 20px;"
                            placeholder="好物推荐名称"
                            v-model="queryData.haowuSuggestName"
                            clearable>
                    </el-input>
                </div>
            </el-col>
            <el-col :span="4">
                <div style="display: flex;flex-direction: row;align-items: center;">
                    <el-select v-model="queryData.source" placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>

            <el-col :span="4">
                <div style="display: flex;flex-direction: row;align-items: center;">
                    <el-select v-model="queryData.sort" placeholder="请选择">
                        <el-option
                                v-for="item in sorts"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </el-col>

            <div style="text-align: right;">
                <el-button type="primary" icon="el-icon-delete" @click="clearQuery">清空</el-button>
                <el-button type="primary" icon="el-icon-search" @click="search">搜索</el-button>
            </div>
        </el-row>

        <!--        新增-->
        <div style="flex-direction: row;justify-content: space-between;display: flex;margin-top: 20px;margin-bottom: 20px;">
            <el-button type="primary" icon="el-icon-plus" @click="addHaowuSuggest">添加好物推荐</el-button>
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
                    prop="title"
                    label="好物推荐名称"
                    width="300">
                <template slot-scope="scope">
                   <span>{{scope.row.title.substring(0,10)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="好物推荐链接"
                    :show-overflow-tooltip="true"
                    width="260">

            </el-table-column>
            <el-table-column
                    label="好物推荐图片"
                    width="150">
                <template slot-scope="scope">
                    <el-image :src="scope.row.img_url" style="width: 100px;height: 100px;"></el-image>
                </template>
            </el-table-column>
            <el-table-column
                    label="价格"
                    width="80">
                <template slot-scope="scope">
                    <span>{{getPrice(scope.row.price)}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="佣金"

                    width="80">
                <template slot-scope="scope">
                    <span>{{getPrice(scope.row.commission)}}</span>
                </template>
            </el-table-column>

            <el-table-column
                    label="佣金比例"
                    :show-overflow-tooltip="true"
                    width="80">
                <template slot-scope="scope">
                    <span>{{getRadio(scope.row.commission,scope.row.price)}}</span>
                </template>
            </el-table-column>
            <el-table-column
                    label="操作"
                    width="150"
                    fixed="right"
                    show-overflow-tooltip>
                <template slot-scope="scope">
                    <el-button   v-clipboard:copy="scope.row.url"
                                 v-clipboard:success="onCopy" type="text" size="small">复制</el-button>
<!--                    <el-button @click="deleteClick(scope.row)" type="text" size="small">删除</el-button>-->
                </template>
            </el-table-column>
        </el-table>

        <!--        分页-->
        <div class="block" style="text-align: right;margin-top: 30px;">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryData.currentPage"
                    :page-sizes="[18,10, 20, 30, 40]"
                    :page-size="queryData.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="totalItem">
            </el-pagination>
        </div>

        <!--        对话框-->
        <el-dialog
                title="添加好物推荐"
                :visible.sync="dialogVisible"
                width="40%">
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">好物推荐名称</span>
                        <el-input style="flex:4;margin-left: 20px;" v-model="formData.haowuSuggestName"
                                  placeholder="请输入内容"></el-input>
                    </div>

                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">好物推荐链接</span>
                        <el-input style="flex:4;margin-left: 20px;" type="text"
                                   v-model="formData.haowuSuggestLink"
                                  placeholder="请输入内容"></el-input>
                    </div>
                    <div style="display: flex;flex-direction: row;align-items: center;margin-top: 20px;">
                        <span style="flex: 1;text-align: center">好物推荐图片</span>
                        <el-input style="flex:4;margin-left: 20px;" type="text"
                                   v-model="formData.haowuSuggestImage"
                                  placeholder="请输入内容"></el-input>
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
                sorts:[{
                    label: '佣金',
                    value: 'commission'
                },{
                    label: '综合',
                    value: ''
                }],
                options: [ {
                    label: '淘宝',
                    value: 'taobao'
                }, {
                    label: '拼多多',
                    value: 'pinduoduo'
                }, {
                    label: '有赞',
                    value: 'youzan'
                },{
                    label: '京东',
                    value: 'jingdong'
                }],
                queryData: {
                    currentPage: 1,
                    pageSize:18,
                    haowuSuggestName: "",
                    source: "jingdong",
                    sort: "",
                },
                formData: {
                    id: '',
                    haowuSuggestName: "",
                    haowuSuggestLink: "",
                    haowuSuggestImage: "",
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
            onCopy(e) {
                this.$message('复制成功： ' + e.text);
            },
            getPrice(money){
              return _.divide(_.toNumber(money), 100);
            },
            getRadio(commission,price){
              return `${ _.divide(_.toNumber(commission), _.toNumber(price))}%`;
            },
            //添加好物推荐
            addHaowuSuggest() {
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
                var url=`https://www.zhihu.com/api/v4/mcn/search?source=${this.queryData.source}&producer=&cid1=&cid2=&keyword=${this.queryData.haowuSuggestName}&url=&sort_name=${this.queryData.sort}&page_index=${this.queryData.currentPage}&search_param=&city_id=&city_out_id=&county_out_id=&area_out_id=`
                // 'https://www.zhihu.com/api/v4/mcn/search?source=jingdong&producer=&cid1=&cid2=&keyword=%E6%B8%B8%E6%88%8F%E7%AC%94%E8%AE%B0%E6%9C%AC&url=&sort_name=&page_index=450&search_param=&city_id=&city_out_id=&county_out_id=&area_out_id='
                //https://www.zhihu.com/api/v4/mcn/search?source=pinduoduo&producer=&cid1=&cid2=&keyword=&url=&sort_name=&page_index=1&search_param=&city_id=&city_out_id=&county_out_id=&area_out_id=
                //https://www.zhihu.com/api/v4/mcn/search?source=pinduoduo&producer=&cid1=&cid2=&keyword=&url=&sort_name=&page_index=1&search_param=&city_id=&city_out_id=&county_out_id=&area_out_id=
                //https://www.zhihu.com/api/v4/mcn/search?source=jingdong&producer=&cid1=&cid2=&keyword=&url=&sort_name=&page_index=1&search_param=&city_id=&city_out_id=&county_out_id=&area_out_id=
                this.$fetch(url)
                    .then((response) => {
                        console.log(response,"=============")
                        this.tableData = response.data;
                        this.totalItem = 500;
                    })

            },
            //添加/修改提交
            submit() {
                console.log("formData", this.formData);
                this.dialogVisible = false;
                if (_.isEmpty(this.formData._id)) {
                    this.$post('/v1/haowuSuggest', this.formData)
                        .then((response) => {
                            console.log(response)
                            this.getData();
                        })
                } else {
                    this.$put('/v1/haowuSuggest/' + this.formData._id, this.formData)
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

                this.$fetch('/v1/haowuSuggest', {_id: tab._id})
                    .then((response) => {
                        console.log(response)
                        this.formData = response.data.data[0];
                    })
                this.dialogVisible = true;
            },
            //删除条目
            deleteClick(tab, event) {
                console.log(tab, event);
                this.$delete('/v1/haowuSuggest/' + tab._id)
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
