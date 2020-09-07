'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AppsSchema = new Schema({
    id: { type: Schema.Types.String, required: false, description: "The ID of app" },
    remark: { type: Schema.Types.String, required: false, description: "The 标题备注 of app"},
    appkey: { type: Schema.Types.String, required: false, description: "The APPKEY of app"},
    adTime: { type: Schema.Types.Number, required: false, description: "The APP闪屏广告 of app"},
    adPic: { type: Schema.Types.String, required: false, description: "The PIC of app"},
    showSkipBtn: { type: Schema.Types.Boolean, required: false, description: "The 跳过按钮 of app"},
    targetUrl: { type: Schema.Types.String, required: false, description: "The 跳转链接 of app"},
    timeLimit: { type: Schema.Types.Array, required: false, description: "The 启用时间 of app"},
    todayCount: { type: Schema.Types.Number, required: false, description: "The 今日启动 of app"},
    yesterdayCount: { type: Schema.Types.Number, required: false, description: "The 昨日启动 of app"},
    totalCount: { type: Schema.Types.Number, required: false, description: "The 累计启动 of app"}
});

module.exports = mongoose.model('apps', AppsSchema, 'apps');
