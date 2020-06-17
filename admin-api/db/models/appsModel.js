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
const AppsSchema = new Schema({
    id: { type: Schema.Types.String, required: false, description: "The ID of app" },
    remark: { type: Schema.Types.String, required: false, description: "The 标题备注 of app"},
    appkey: { type: Schema.Types.String, required: false, description: "The APPKEY of app"},
    adTime: { type: Schema.Types.Number, required: false, description: "The APP闪屏广告 of app"},
    todayCount: { type: Schema.Types.Number, required: false, description: "The 今日启动 of app"},
    yesterdayCount: { type: Schema.Types.Number, required: false, description: "The 昨日启动 of app"},
    totalCount: { type: Schema.Types.Number, required: false, description: "The 累计启动 of app"}
});

module.exports = mongoose.model('apps', AppsSchema, 'apps');
