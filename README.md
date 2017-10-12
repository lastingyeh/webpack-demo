### 安裝

yarn add --dev webpack 

### Loader (對單一檔案協助轉換)

1. 檔案結構 module/rules/

2. js 編譯 
 
yarn add --dev babel-core babel-loader babel-preset-es2015

3. sass 編譯

yarn add --dev css-loader style-loader sass-loader node-sass

設定 loaders 的陣列實際上會反過來逐一執行：

sass-loader - 編譯 Sass 成為 CSS
css-loader - 解析 CSS 轉換成 Javascript 同時解析相依的資源
style-loader - 輸出 CSS 到 document 的 <style> 元素內

＊想成像下面這樣調用 function 	
 
styleLoader(cssLoader(sassLoader('source')))

4. 圖片｜檔案 編譯

yarn add --dev url-loader file-loader

＊下載圖片測試

curl http://i.imgur.com/5Hk42Ct.png --output src/code.png

### 設定環境

1. "start": "webpack --watch"
		
2. "build": "webpack -p"

3. open index.html (測試)

### Plugins (針對轉換後的程式碼片段作處理)

1. webpack -p 實際執行內建 plugins

UglifyJsPlugin

2. commons-chunk-plugin 是另一個內建的核心套件，可以將多個 Entry point 中共用模組的部分抽出來獨立成一個模組。

3. 輸出 CSS 檔案

extract-text-webpack-plugin 將模組匯出成檔案

  3.1 安裝

  yarn add --dev extract-text-webpack-plugin

  3.2 webpack.config.js

  const extractCSS = new ExtractTextPlugin('[name].bundle.css');

  *module/rules

    加入 loader 設定
		loader: extractCSS.extract(['css-loader', 'sass-loader']),

    取消原本 use 設定
    // use: ['style-loader', 'css-loader', 'sass-loader']

  *plugins

    加入 plugins
    plugins: [..., extractCSS]

4. 延遲載入模組

  System.import('./dashboard') 以及 setTimeout 模擬

  ＊因為線上路徑為 dist/dashboard.js 

    webpack.config.js/output

    加入 publicPath:'/dist/'

  ＊測試

  python -m SimpleHTTPServer

5. 開發階段

yarn add webpack-dev-server --dev

package.json > "start": "webpack-dev-server --inline"

6. 熱替換

Ｑ：正在開發付款流程的頁面，分別有 4 個步驟，我們的元件在第 3 步，於是每當我們一修改，所有狀態因為重載的關係回到預設，然後我們就只好反覆執行步驟 1

Ａ：理想的開發流程應該是：每當我們修改我們的模組，然後應該只要編譯該模組，在不刷新瀏覽器，不影響其他模組的情況下把新的程式碼換上去，當我們需要 reset 狀態時在重載頁面。大致上這就是 HMR 的功能。

作法：

1. package.json > "start": "webpack-dev-server --inline --hot"

2. App.js > 加入以下程式碼

  if(module.hot){
    module.hot.accept()
  }

3. webpack.config.js > 加入以下程式碼 （可在 console 看出哪個檔案被更新）

plugins:[...,new webpack.NamedModulesPlugin()]

4. 可加入 input element 測試（先輸入字）再修改 people.js 觀察結果

#### 參考資料

https://andyyou.github.io/2017/02/17/webpack-2-beginner-guide/