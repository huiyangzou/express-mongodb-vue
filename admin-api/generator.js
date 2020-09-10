const fs = require('fs')
const MODEL_PATH='/db/models/'
const MODULE_PATH='/db/modules/'
const BUSSINESS_PATH='/bussiness/'
const ROUTER_PATH='/router/'
const REPLACE_KEY='android'
console.log("hello generator")
// 打印 process.argv。
// process.argv.forEach((val, index) => {
//     console.log(`${index}: ${val}`);
// });
const moduleName=process.argv[2];

console.log("输入模块名称"+moduleName)

createFile(moduleName)

function createFile(moduleName) {
    //创建Model文件
    const modelFilePath=`${__dirname}`+MODEL_PATH+moduleName+"Model.js";
    const copymodelFilePath=`${__dirname}`+MODEL_PATH+"androidModel.js";

    //创建Module文件
    const moduleFilePath=`${__dirname}`+MODULE_PATH+moduleName+"Module.js";
    const copymoduleFilePath=`${__dirname}`+MODULE_PATH+"androidModule.js";

    //创建Bussiness文件
    const bussnessFilePath=`${__dirname}`+BUSSINESS_PATH+moduleName+".js";
    const copybussnessFilePath=`${__dirname}`+BUSSINESS_PATH+"android.js";

    //创建Router文件
    const routerFilePath=`${__dirname}`+ROUTER_PATH+moduleName+"Router.js";
    const copyrouterFilePath=`${__dirname}`+ROUTER_PATH+"questionRouter.js";

    clone(modelFilePath,copymodelFilePath);
    clone(moduleFilePath,copymoduleFilePath);
    clone(bussnessFilePath,copybussnessFilePath);
    clone(routerFilePath,copyrouterFilePath);
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
    fs.writeFile(destFilePath, readData, (err) => {
        if (err) throw err;
        console.log('信息已写入');
    });
}



