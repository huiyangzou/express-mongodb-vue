import create from "./pages/user/create";
import deletePage from "./pages/user/deletePage";
import updatePage from "./pages/user/updatePage";
import boardPage from "./pages/boardPage";
import mainPage from "./pages/mainPage";
import appList from "./pages/app/appList";
import appUpdate from "./pages/app/appUpdate";
import appVersionUpdate from "./pages/app/appVersionUpdate";
import android from "./pages/tools/android";
import category from "./pages/tools/category";
import baoming from "./pages/tools/baoming";
import questionType from "./pages/tools/questionType";
import login from './pages/user/login'
import leanIndex from './pages/lean/index'
import fileManager from "./pages/tools/fileManager";
import goods from "./pages/tools/goods";
import userList from "./pages/user/userList";
import player from "./pages/tools/player";
import activity from "./pages/tools/activity";
import codeGenerator from "./pages/tools/codeGenerator";
import game from "./pages/tools/game";
import editQuestion from "./pages/tools/editQuestion";
import videoList from "./pages/tools/videoList";
import haowuSuggest from "./pages/tools/haowuSuggest";
import csdnblog from "./pages/tools/csdnblog";
import moduleManager from "./pages/tools/moduleManager";
import shareMoney from "./pages/tools/shareMoney";
import picture from "./pages/tools/picture";
import likemovie from "./pages/tools/likemovie";
import likevideoplayer from "./pages/tools/likevideoplayer";
import moviePage from "./pages/moviePage";
//import

const routes = [
    {
        path: '/', component: login, name: 'login',
    },

    {
        path: '/home', component: mainPage, name: 'home', realName: '主页',

        children: [
            {path: '/boardPage', component: boardPage, name: 'boardPage', realName: '首页'},
            // {path: '/create', component: create, name:'create',realName:'创建'},
            // {path: '/delete', component: deletePage, name:'delete',realName:'删除'},
            // {path: '/update', component: updatePage, name:'update',realName:'更新'},
            // {path: '/appList', component: appList, name:'appList',realName:'应用列表'},
            // {path: '/appUpdate', component: appUpdate, name:'appUpdate',realName:'应用热更新'},
            // {path: '/appVersionUpdate', component: appVersionUpdate, name:'appVersionUpdate',realName:'应用版本更新'},
            {path: '/question', component: android, name: 'question', realName: '试题大合集'},
            {path: '/editQuestion', component: editQuestion, name: 'editQuestion', realName: '编辑问题'},
            {path: '/baoming', component: baoming, name: 'baoming', realName: '报名'},
            {path: '/questionType', component: questionType, name: 'questionType', realName: '问题类型'},
            {path: '/goods', component: goods, name: 'goods', realName: '产品信息'},
            {path: '/category', component: category, name: 'category', realName: '分类'},
            {path: '/userList', component: userList, name: 'userList', realName: '用户列表'},
            {path: '/fileManager', component: fileManager, name: 'fileManager', realName: '文件管理'},
            {
                path: '/video', component: player, name: 'video', realName: '视频播放', props: {}
                , meta: {
                    keepAlive: false // 不需要被缓存
                }
            },
            {path: '/activity', component: activity, name: 'activity', realName: '活动'},
            {path: '/codeGenerator', component: codeGenerator, name: 'codeGenerator', realName: '代码生成器'},
            {path: '/game', component: game, name: 'game', realName: '游戏'},
            {path: '/videoList', component: videoList, name: 'videoList', realName: '视频列表'},
            {path: '/haowuSuggest', component: haowuSuggest, name: 'haowuSuggest', realName: '好物推荐'},
            {path: '/csdnblog', component: csdnblog, name: 'csdnblog', realName: 'CSDN博客'},
            {path: '/moduleManager', component: moduleManager, name: 'moduleManager', realName: '模块管理'},
            {path: '/shareMoney', component: shareMoney, name: 'shareMoney', realName: '引流方案'},
            {path: '/picture', component: picture, name: 'picture', realName: '图片合集'},
            // {path: '/likemovie', component: likemovie, name:'likemovie',realName:'喜欢影院'},

            //router
        ]
    },
    {
        path: '/learn', component: leanIndex, name: 'learn', realName: '学习',
    },
    {
        path: '/movies', component: moviePage, name: 'learn', realName: '学习',
        children: [
            {
                path: '/likemovie', component: likemovie, name: 'likemovie', realName: '喜欢影院'
            },
            {
                path: '/likevideoplayer',
                component: likevideoplayer,
                name: 'likevideoplayer',
                realName: '喜欢播放器',
                props: {},
                meta: {
                    keepAlive: false // 不需要被缓存
                }
            },
        ]
    },


]
export default routes;
