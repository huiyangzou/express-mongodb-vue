const fs = require('fs')
const MODEL_PATH='/admin-api/db/models/'
const MODULE_PATH='/admin-api/db/modules/'
const BUSSINESS_PATH='/admin-api/bussiness/'
const ROUTER_PATH='/admin-api/router/'
const VUE_PATH='/adminEle/src/pages/tools/'
const API_PATH='/admin-api/'
const VUE_ROUTER_PATH='/adminEle/src/'
const MAIN_NAV_PATH='/adminEle/src/pages/tools/'

const TEMPLATE_PATH='/template/'

const REPLACE_KEY='android'




console.log("hello generator")
// 打印 process.argv。
// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
// });
const moduleName=process.argv[2];
const realName=process.argv[3];

console.log("输入模块名称"+moduleName)
console.log("输入模块真实名称"+realName)

const API_IMPORT_TARGET=`const androidRouter = require('./router/androidRouter');`
const API_CODE_TARGET=`app.use('/', androidRouter)`

const VUE_RROUTER_IMPORT_TARGET=`import android from "./pages/tools/android";`;
const VUE_RROUTER_CONFIG_TARGET=`{path: '/android', component: android, name:'android',realName:'${realName}'},`;

createFile(moduleName)

function createFile(moduleName) {
    //创建Model文件
    const modelFilePath=`${__dirname}`+MODEL_PATH+moduleName+"Model.js";
    const copymodelFilePath=`${__dirname}`+TEMPLATE_PATH+"androidModel.js";

    //创建Module文件
    const moduleFilePath=`${__dirname}`+MODULE_PATH+moduleName+"Module.js";
    const copymoduleFilePath=`${__dirname}`+TEMPLATE_PATH+"androidModule.js";

    //创建Bussiness文件
    const bussnessFilePath=`${__dirname}`+BUSSINESS_PATH+moduleName+".js";
    const copybussnessFilePath=`${__dirname}`+TEMPLATE_PATH+"android.js";

    //创建Router文件
    const routerFilePath=`${__dirname}`+ROUTER_PATH+moduleName+"Router.js";
    const copyrouterFilePath=`${__dirname}`+TEMPLATE_PATH+"androidRouter.js";

    //创建Api文件
    const apiFilePath=`${__dirname}`+API_PATH+"api.js";
    const copyapiFilePath=`${__dirname}`+API_PATH+"api.js";


    //创建Page文件
    const vueFilePath=`${__dirname}`+VUE_PATH+moduleName+".vue";
    const copyvueFilePath=`${__dirname}`+TEMPLATE_PATH+"android.vue";

    //创建router文件
    const vueRouterPath=`${__dirname}`+VUE_ROUTER_PATH+"router.js";

    clone(modelFilePath,copymodelFilePath);
    clone(moduleFilePath,copymoduleFilePath);
    clone(bussnessFilePath,copybussnessFilePath);
    clone(routerFilePath,copyrouterFilePath);
    clone(vueFilePath,copyvueFilePath);

    addImport(apiFilePath,copyapiFilePath,API_IMPORT_TARGET,'//import');
    addRouter(apiFilePath,copyapiFilePath,API_CODE_TARGET,'//useRouter');

    addImport(vueRouterPath,vueRouterPath,VUE_RROUTER_IMPORT_TARGET,'//import');
    addRouter(vueRouterPath,vueRouterPath,VUE_RROUTER_CONFIG_TARGET,'//router');
}


function clone(destFilePath,targetFilePath){
    let readData=fs.readFileSync(targetFilePath).toString();
    // console.log(readData)
    var regExp1=new RegExp(REPLACE_KEY,'g');
    readData=readData.replace(regExp1,moduleName);
    const upperModuleName=moduleName.charAt(0).toUpperCase() + moduleName.slice(1)
    const upperREPLACE_KEY=REPLACE_KEY.charAt(0).toUpperCase() + REPLACE_KEY.slice(1)
    var regExp2=new RegExp(upperREPLACE_KEY,'g');
    readData=readData.replace(regExp2,upperModuleName);
    if(realName!=''){
        var regExp3=new RegExp("商品",'g');
        readData= readData.replace(regExp3,realName);
    }
    fs.writeFileSync(destFilePath, readData);
}


function addImport(destFilePath,targetFilePath,target,tag){
    var regExp1=new RegExp(REPLACE_KEY,'g');
    var replace1=target.replace(regExp1,moduleName);
    console.log(replace1)
    var replace2=replace1+'\n'+tag
    let readData=fs.readFileSync(targetFilePath).toString();
    console.log(target)
    var regExp2=new RegExp(tag,'g');
    readData=readData.replace(regExp2,replace2);
    console.log(readData)
    fs.writeFileSync(destFilePath, readData);
}

function addRouter(destFilePath,targetFilePath,target,tag){
    var regExp1=new RegExp(REPLACE_KEY,'g');
    var replace1=target.replace(regExp1,moduleName);
    var replace2=replace1+'\n    '+tag
    let readData=fs.readFileSync(targetFilePath).toString();
    console.log(target)
    var regExp2=new RegExp(tag,'g');
    readData=readData.replace(regExp2,replace2);
    console.log(readData)
    fs.writeFileSync(destFilePath, readData);
}

