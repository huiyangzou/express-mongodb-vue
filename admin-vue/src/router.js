import create from "./pages/user/create";
import deletePage from "./pages/user/deletePage";
import updatePage from "./pages/user/updatePage";
import boardPage from "./pages/boardPage";
import mainPage from "./pages/mainPage";
import appList from "./pages/app/appList";
import appUpdate from "./pages/app/appUpdate";
import appVersionUpdate from "./pages/app/appVersionUpdate";

const routes = [
    {
        path: '/', component: mainPage,
        children: [
            {path: '/boardPage', component: boardPage, name:'boardPage',realName:'首页'},
            {path: '/create', component: create, name:'create',realName:'创建'},
            {path: '/delete', component: deletePage, name:'delete',realName:'删除'},
            {path: '/update', component: updatePage, name:'update',realName:'更新'},
            {path: '/appList', component: appList, name:'appList',realName:'应用列表'},
            {path: '/appUpdate', component: appUpdate, name:'appUpdate',realName:'应用热更新'},
            {path: '/appVersionUpdate', component: appVersionUpdate, name:'appVersionUpdate',realName:'应用版本更新'},
        ]
    }

]
export default routes;
