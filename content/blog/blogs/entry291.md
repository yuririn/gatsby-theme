---
title: CSSスプライトのコードは Sass の Mixin にとりあえずまとめとけ！
date: 2019-01-17
hero: thumbnail/2019/entry291.png
pagetype: blog
cateId: 'web-developer'
tags: ["SCSS","CSS","Gulp"]
description: 毎度のことですがウェブサイトが重くなる原因の一つに画像の読み込みが挙げられます。そこでCSSスプライトで gulp と Sass を利用してサイトを減量する方法をメモしておきます。
lead: ["毎度のことですがウェブサイトが重くなる原因の一つに画像の読み込みが挙げられます。そこでCSSスプライトで gulp と Sass を利用してサイトを減量する方法をメモしておきます。"]
---

## CSSスプライトってなんぞ？
CSSスプライトとは、複数のアイコンなどをまとめた画像を一枚で読み込んで好きな部位だけ切り取って利用する CSS の技術です。

一般的なサーバーでは、画像などのデータファイルは一個ずつ転送されて始めてブラウザに表示されます。

なのでちまちま一個ずつの画像を作るより、まとめた方がブラウザに表示されるまでが格段に早くなります。

通常画像ファイルは imgタグで個々に出力しますが、CSSスプライトは CSS で背景としてほしい箇所だけ切り取って表示させます。

結果サイトは軽くなるし、**複数のアイコンをオリジナルで作るときに向いています**。

やり方としては以下のようなコード。

```scss
background: url(assets/images/common/slice.png) no-repeat;
background-size: auto 60px;
background-position: 60px 0;
background-color: #2e683a;
width: 60px;
height: 60px;
```
`background-image`で背景を設定して、`background-position`で切り取る位置を指定します。

backgroundはショートハンドで書いてもOKです！<br>
スマフォやRetina対応も必要なので、`width`や`height`に対しての画像サイズ、`background-size`を縮小してガビらないような気遣いもお忘れなく。

## 仕様が変わってすぐCSSスプライトのアイコンが増える時はSCSSの変数とミックスインで回避
制作あるあるだと思いますが、途中デザインや出力項目が変わってアイコンが増えたりします。<br>
CSSスプライトの面倒なところは、アイコンが増えると他のアイコンの表示のために毎回CSSを書き換えたり設定を変えないといけないところです。

それはとても面倒なのでSCSSの変数やミックスインで管理するのがオススメ。これはアイコンが正方形の場合の例です。
縦横アイコンの数を予め変数に入れておく。

```scss
// CSSスプライトの設定 ​​​​​​
$icon-col: 3; //横の数
$icon-row: 6; //縦の数
```
表示するアイコンの位置をミックスインで管理すれば、変更に強くなります。
```
// $url 画像のパス
// $size 表示したい画像のサイズ
// $posX 横の位置
// $posY 縦の位置
@mixin slice($url, $size, $posX, $posY){
  $posX: $posX;
  $posY: $posY;
  height: $size;
  width: $size;
  background: url($url) no-repeat;
  background-size: $size*$icon-col $size*$icon-row;
  background-position :#{-$size*$posX} #{-$size*$posY};
}
```
`background-position: 0 0;`で左端の画像が取れるので1個目の画像を撮りたい場合は以下のようなコードになります。

```scss
@include slice('../images/common/icons.png', 100px, 0, 0);
```
## 画像は gulp で圧縮する
私は基本、サイトにアップする画像は`gulp`で一気に圧縮しています。<br>
どんな方法でもいいので画像の圧縮は絶対やった方がいいです。読み込み速度が格段に違いますので！

gulp インストールしていることが前提です。

gulp にモジュールをインストールします。
```bash
npm install gulp-imagemin -D
```
gulpfile.jsに以下コードをよしなに追加するだけです。

```js
// モジュールの呼び出し
const imagemin = require('gulp-imagemin')//開発用ディレクトリ
const devDir = 'dev/'
const dev = {
  'imgs': devDir + 'assets/images'
}//リリース用ディレクトリ
const destDir = 'dest/'
const dest = {
  'imgs': destDir + 'assets/images'
}// 画像の圧縮
function imageMin(done) {
  gulp.src([dev.imgs + '/*.+(jpg|jpeg|png|gif)'])
    .pipe(changed(destDir))
    .pipe(imagemin([
    ]))
    .pipe(gulp.dest(dest.imgs ))
  done()
}// デフォルトタスク
gulp.task('default',
  gulp.series(
    gulp.parallel(imageMin)
  )
)
```

## まとめ
昨今、ウェブサイトはスマフォで閲覧されます。<br>
なのでどんな環境下でも3秒以内に表示されるような努力がクリエーターには必要ですね。<br>
小さな努力の積み重ねで表示速度は変わりますし、離脱率の改善に繋がります。

最後までお読みいただきありがとうございました。
