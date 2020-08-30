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
const BaomingSchema = new Schema({
    id: { type: Schema.Types.String, required: false, description: "The ID of android" },
    name: { type: Schema.Types.String, required: false, description: "name"},
    phone: { type: Schema.Types.String, required: false, description: "phone"},
    number: { type: Schema.Types.String, required: false, description: "number"},
    mark: { type: Schema.Types.String, required: false, description: "mark"}
});

module.exports = mongoose.model('baoming', BaomingSchema, 'baoming');
