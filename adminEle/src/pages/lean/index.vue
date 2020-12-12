<template>
    <div class="bg" style="align-items: center;width: 100%;display: flex;flex-direction: column">
        <div style="margin-top: 50px;">
            <span style="font-size: 50px;color: #409EFF;text-align: center;padding: 40px;">Android 知识仓库</span>

        </div>


        <div style="margin-top: 40px;width: 70%">
            <el-input placeholder="请输入内容" v-model="queryData.csdnblogName" class="input-with-select" clearable>
                <el-select v-model="select" slot="prepend"  style="width:150px;" @change="change">
                    <el-option label="Android面试题" value="1" ></el-option>
                    <el-option label="Android博客" value="2"></el-option>


                </el-select>
                <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
        </div>
        <el-button v-if="select!=='1'" type="primary" style="width: 70%;margin-top: 10px;" disabled plain >{{`发现结果：${totalItem}`}}</el-button>
        <el-button v-else type="primary" style="width: 70%;margin-top: 10px;" disabled plain >{{`发现结果：${facetotalItem}`}}</el-button>
        <div v-if="select!=='1'" style="width: 70%;height: 600px;margin-top: 10px;overflow-y:auto;background-color: #ecf5ff">
            <ol >
                <li style="text-decoration: none;margin-left: -25px" v-for="(item,index) in tableData" class="infinite-list-item">

                    <a class="alink" :href="item.csdnblogLink">
                        <div style="justify-content: space-around">
                            <span style="display: block;font-size: 18px">{{`第(${index+1})篇 文章标题：${item.csdnblogName}`}}</span>
                            <span style="display: block;font-size: 16px">{{`简介：${item.des}`}}</span>
                            <div >
                                <span>{{`阅读量:${item.read_count}`}}</span>
                                <span>{{`评论数量:${item.comment_count}`}}</span>
                            </div>

                        </div>
                    </a>
                </li>
            </ol>
        </div>

        <div v-else style="width: 70%;height: 600px;margin-top: 10px;overflow-y:auto;background-color: #ecf5ff">
            <ol >
                <li style="text-decoration: none;margin-left: -25px" v-for="(item,index) in facetableData" class="infinite-list-item">

                    <a class="alink" :href="item.csdnblogLink">
                        <div style="justify-content: space-around">
                            <span style="display: block;font-size: 18px">{{`问题${index+1}：${item.question}`}}</span>
                            <span style="display: block;font-size: 16px">{{`答案：${item.answer}`}}</span>


                        </div>
                    </a>
                </li>
            </ol>
        </div>
        <el-button type="primary" style="width: 70%;margin-top: 10px;" plain @click="loadMore" :disabled="disabled" >{{disabled?"没有更多数据":"点击加载更多"}}</el-button>


    </div>
</template>

<script>
    export default {
        name: "index",
        data () {
            return {
                queryFaceData: {
                    typeOne: null,
                    typeTwo: null,
                    currentPage: 1,
                    pageSize: 20,
                    question: null,
                },
                disabled:false,
                select:'2',
                count: 20,
                queryData: {
                    currentPage: 1,
                    pageSize: 20,
                    csdnblogName: null,
                },
                tableData: [],
                totalItem: 0,
                currentPage: 1,
                facetableData: [],
                facetotalItem: 0,
                facecurrentPage: 1,

            }
        },
        created() {
            this.search ()
        },
        methods: {
            change(e,item){
                console.log('xxx','yyy')
                this.search()
            },
            loadMore(){
                if(this.select=='1'){
                    this.queryFaceData.currentPage++;
                    this.getFaceData();
                }else{
                    this.queryData.currentPage++;
                    this.getData();
                }

            },
            search(){
                this.tableData=[]
                this.facetableData=[]
                if(this.select=='1'){
                    this.queryFaceData.currentPage=1;
                    this.queryFaceData.question=this.queryData.csdnblogName;
                    this.getFaceData();
                }else{
                    this.queryData.currentPage=1;
                    this.getData();
                }

            },
            getData () {
                this.$fetch('/v1/csdnblog', this.queryData)
                    .then((response) => {
                        // console.log(response)
                        this.tableData = this.tableData.concat(response.data.data)
                        this.totalItem = response.data.total

                        this.currentPage = response.data.currentPage;
                        if(this.totalItem/20<=this.currentPage){
                            this.disabled=true;
                        }else{
                            this.disabled=false;
                        }
                    })
            },
            getFaceData(){
                this.$fetch('/v1/android', this.queryFaceData)
                    .then((response) => {
                        // console.log(response)
                        this.facetableData = this.facetableData.concat(response.data.data)
                        this.facetotalItem = response.data.total

                        this.facecurrentPage = response.data.currentPage;

                        if(this.facetotalItem/20<=this.facecurrentPage){
                            this.disabled=true;
                        }else{
                            this.disabled=false;
                        }
                    })
            }
        }
    }
</script>

<style scoped>
.bg{
    width: 100%;
    height: 100%;
    background-color: white;
}

.el-select .el-input {
    width: 130px;
}
.input-with-select .el-input-group__prepend {
    background-color: #fff;
}
    .infinite-list-item{
        padding: 5px;
        width: 100%;
        display: flex;
        font-size: 18px;
        border-bottom: white 3px dashed;


    }
    .infinite-list-item span{
        color: black;
        padding: 5px;
    }
    .infinite-list-item a{
        text-decoration: none;
    }
    .alink{

    }
</style>