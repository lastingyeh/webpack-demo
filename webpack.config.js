const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 把這兩個 entry point 中共用的模組抽出來產生第三隻檔案 commons.js。
const extractCommons = new webpack.optimize.CommonsChunkPlugin({
	name: 'commons',
	filename: 'commons.js'
});

const extractCSS = new ExtractTextPlugin('[name].bundle.css');

const config = {
	// 預設執行路徑
	context: path.join(__dirname, 'src'),
	// src 預設 所以路徑不須寫成 './src/app.js'
	entry: { app: './app.js', admin: './admin.js' },
	// 輸出路徑
	// see index.html <script src="dist/bundle.js"></script>
	output: {
		path: path.join(__dirname, 'dist'),
		// 加上 output.publicPath 的設定，這樣才會是 http://example.com/dist/dashboard.js。
		publicPath: '/dist/',
		// 產生 app.bundle.js 和 admin.bundle.js
		filename: '[name].bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							// loose: 提供 loose 編譯模式，該模式啟動下 Babel 會盡可能產生較精簡的 ES5 程式碼，預設 false 會盡可能產出接近 ES2015 規範的程式碼。
							// modules: 轉換 ES2015 module 的語法（import）為其它類型，預設為 true 轉換為 commonjs。
							presets: [['es2015', { modules: false, loose: false }]]
						}
					}
				]
			},
			{
				test: /\.scss$/,
				// 轉換成 css 靜態檔案
				loader: extractCSS.extract(['css-loader', 'sass-loader'])
				/**
       * use 屬性是用來套用，串接多個 loaders。
       * v2 為了相容的因素保留 loaders 屬性，loaders 為 use 的別名，
       * 盡可能的使用 use 代替 loaders
       */
				// use: ['style-loader', 'css-loader', 'sass-loader']
			},
			{
				// 舉例 .png?limit=123 符合以下規則
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000 /* 小於 10kB 的圖片轉成 base64 */
						}
					}
				]
			}
		]
	},
	plugins: [extractCommons, extractCSS, new webpack.NamedModulesPlugin()]
};

module.exports = config;
