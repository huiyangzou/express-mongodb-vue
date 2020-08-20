'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// id ID
// remark 标题备注
// appkey APPKEY
// adTime APP闪屏广告
// todayCount 今日启动
// yesterdayCount 昨日启动
// totalCount 累计启动
// id:'',
//     remark:'',
//     appkey:'',
//     adTime:0,
//     adPic:'',
//     showSkipBtn:false,
//     targetUrl:'',
//     timeLimit:[]
const AndroidSchema = new Schema({
    id: { type: Schema.Types.String, required: false, description: "The ID of android" },
    question: { type: Schema.Types.String, required: false, description: "The 标题备注 of app"},
    answer: { type: Schema.Types.String, required: false, description: "The APPKEY of app"},
    typeOne: { type: Schema.Types.String, required: false, description: "The APPKEY of app"},
    typeTwo: { type: Schema.Types.String, required: false, description: "The APPKEY of app"}
});

module.exports = mongoose.model('android', AndroidSchema, 'android');
