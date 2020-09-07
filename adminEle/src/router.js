import create from "./pages/user/create";
import deletePage from "./pages/user/deletePage";
import updatePage from "./pages/user/updatePage";
import boardPage from "./pages/boardPage";
import mainPage from "./pages/mainPage";
import appList from "./pages/app/appList";
import appUpdate from "./pages/app/appUpdate";
import appVersionUpdate from "./pages/app/appVersionUpdate";
import android from "./pages/tools/android";
import baoming from "./pages/tools/baoming";
import questionType from "./pages/tools/questionType";
import login from './pages/user/login'
import fileManager from "./pages/tools/fileManager";
import userList from "./pages/user/userList";

const routes = [
    {
        path: '/', component: login,
    },

    {
        path: '/home', component: mainPage,

        children: [
            {path: '/boardPage', component: boardPage, name:'boardPage',realName:'首页'},
            {path: '/create', component: create, name:'create',realName:'创建'},
            {path: '/delete', component: deletePage, name:'delete',realName:'删除'},
            {path: '/update', component: updatePage, name:'update',realName:'更新'},
            {path: '/appList', component: appList, name:'appList',realName:'应用列表'},
            {path: '/appUpdate', component: appUpdate, name:'appUpdate',realName:'应用热更新'},
            {path: '/appVersionUpdate', component: appVersionUpdate, name:'appVersionUpdate',realName:'应用版本更新'},
            {path: '/question', component: android, name:'question',realName:'面试题大集合'},
            {path: '/baoming', component: baoming, name:'baoming',realName:'报名'},
            {path: '/questionType', component: questionType, name:'questionType',realName:'问题类型'},
            {path: '/userList', component: userList, name:'userList',realName:'用户列表'},
            {path: '/fileManager', component: fileManager, name:'fileManager',realName:'文件管理'},
        ]
    }

]
export default routes;
