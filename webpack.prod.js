const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const path = require("path");

module.exports = merge(common, {
    mode: 'production',
    resolve: {
        alias: {
            [path.resolve(__dirname, "src/environments/environment.ts")]: path.resolve(__dirname, "src/environments/environment.production.ts")
        }
    }
});
