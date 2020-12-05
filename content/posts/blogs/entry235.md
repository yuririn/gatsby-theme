---
title: WordPressで画像をリサイズする
date: 2015-11-19
hero: 2014/entry211.png
pagetype: blog
category: 'CMS'
cateId: 'cms'
tags: ["WordPress"]
description: WordPressのカスタムフィールドに登録した画像のリサイズの仕方についてメモっておきます。
lead: ["WordPressのカスタムフィールドに登録した画像のリサイズの仕方についてメモっておきます。"]
---
## functions.phpにリサイズを登録
画像のリサイズをできるようにするためにはまず、アイキャッチを有効にしなければいけません。

functions.phpに以下コードを追記します。
```
add_theme_support('post-thumbnails');//アイキャッチを有効にする
```
WordPressでは画像をアップロードしたときに、リサイズした画像を生成できます。

### リサイズする画像の登録
なので`add_image_size()`でリサイズする画像サイズを登録します。

`add_image_size( $name, $width, $height, $crop );`

* $name…新しい画像サイズの名前
* $width…画像の幅（px）
* $height…画像の高さ（px）
* $crop…画像を切り抜くか否か(初期値はfalse)

ただ、画像サイズ名に予約名があるのでそれ以外で指定します。

* thumb
* thumbnail
* medium
* large
* post-thumbnail

ということで、「newResizeImage」という名前で画像サイズを作るとするとこんな感じになります。

```
get_post_meta($post->ID, 'customImage', true);
```

### カスタムフィールドの画像情報を取得
出力したいカスタムフィールドの画像情報を取得します。

`get_post_meta($post_id, $key, $single);`

* $post_id…カスタムフィールドを取得したい投稿のID
* $key…取得したい値のキー名の文字列。オプションで初期値はnull
* $single…初期値はfalse。falseでカスタムフィールドの配列を返す。true をセットした場合、文字列として単一の結果を返す。

わざわざ配列にする必要はないのでtrueをセット。
IDは時と場合によるのでですが、whileなどで回してなりして取得します。今回は割愛します。

あとは画像を`wp_get_attachment_image_src()`で画像情報を取得します。

取得できる値は配列で以下のようになってます。

* [0] => url
* [1] => width
* [2] => height
* [3] => 真偽値: リサイズされいている場合は true、元のサイズの場合は false

なのでパスを取得してimgタグなどに出力したい時は以下のような感じになります。
```
$imagepath = wp_get_attachment_image_src(get_post_meta($post->ID, 'photo1', true), 'newResizeImage');
echo '<img src="' . $imagepath[0] . '" width="' . $imagepath[1]. '" height="' . $imagepath[2]. '">';
```
パスだけ取得できたら、JSなどにも応用できて便利です。
