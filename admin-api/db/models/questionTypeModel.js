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
const QuestionTypeSchema = new Schema({
    questionTypeName: { type: Schema.Types.String, required: false, description: "The 标题备注 of app"},
    fartherid: { type: Schema.Types.String, required: false, description: "The 标题备注 of app"},
    level: { type: Schema.Types.String, required: false, description: "The 标题备注 of app"},
});

module.exports = mongoose.model('questionType', QuestionTypeSchema, 'questionType');
