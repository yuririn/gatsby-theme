---
title: 【WordPress】スプシから取得したデータを Ajax で更新する
date: 2025-01-27
pageType: blog
hero: thumbnail/2025/entry539.jpg
cateId: web-developer
tags: ["WordPress", 'GAS']
description: WordPress で Ajax でやり取り。スプシをAPI化して更新するデータをJSONで取得しDBに格納します。
---
スプシとGASで作ったデータをPHPで取り込んできましたが、ローディング時間が長くサイトが重くなってしまうのがネックでした。

JSで呼び出すにせよ、ロード時間も長い。。。

月に数度とか更新頻度の低いものであれば、データベースに格納してそれを使ったほうがいい。

WordPress には Ajax でやり取りする方法があるので、それを利用してスプシのデータを格納します。

<prof></prof>

前提として、ログイン時のみの仕様となります。

json の作り方はこちらを参照してください。今回は説明は省きます。

<card id="/blogs/entry481/"></card>

## 更新用のボタンを Admin Bar に実装
まずは更新用のボタンを実装します。

このボタンをクリックしたら、データを更新するようにします。Admin Bar にボタンを追加します。今回はクリックイベント用のボタンなので特にリンクなどは実装しません。
```PHP:title=function.php
function create_admin_bar_menu( $wp_admin_bar ) {
	$wp_admin_bar->add_node( array(
		'id'    => 'dataReflesh',
		'title' => 'データを更新する',
	));
}
add_action(' admin_bar_menu', 'create_admin_bar_menu', 200 );
```

![更新用のボタンを Admin Bar に実装](./images/2025/01/entry539-1.jpg)
## Ajax 通信に使う JS を登録

まずはファイルの登録です。ログイン時だけしか使えないように、`is_user_logged_in()` で制限をします。

```PHP:title=function.php
/**
 * Ajax通信に使う JS を登録
*/
function register_script() {
	if( is_user_logged_in() ) {
		wp_enqueue_script( 'ajax-reflesh-js', get_template_directory_uri() . '/assets/js/ajax.js', array(), null, 'all' );
	}
}
add_action( 'wp_enqueue_scripts', 'register_script' );
```

続けてサーバー側のデータをどうファイルに渡せるようにします。ポイントは`ajax-reflesh-js`でこのIDが一致したJSに値が渡せます。
```PHP:title=function.php
function create_localize_script() {
	if( is_user_logged_in() ) {
		$data = array(
			'ajax_url' => admin_url(  'admin-ajax.php' ),
			'nonce'    => wp_create_nonce( 'reflesh-nonce' )
		);
		wp_localize_script( 'ajax-reflesh-js', 'ajax_object', $data );
	}
}
add_action( 'wp_enqueue_scripts', 'create_localize_script' );
```
続いて管理画面側です。コードはほぼ一緒ですが、フックは `admin_enqueue_scripts` 管理画面用となっています。
```PHP:title=function.php
function add_admin_script(){
  wp_enqueue_script( 'ajax-reflesh-admin-js', get_template_directory_uri() . '/assets/js/ajax.js', array(), null, 'all');
}
add_action( 'admin_enqueue_scripts', 'add_admin_script' );

function create_admin_localize_script() {
	$data = array(
		'ajax_url' => admin_url( 'admin-ajax.php' ),
		'nonce'    => wp_create_nonce( 'reflesh-nonce' )
	);
	wp_localize_script( 'ajax-reflesh-admin-js', 'ajax_object', $data );
}
add_action( 'admin_enqueue_scripts', 'create_admin_localize_script' );
```
## スプシデータを ajax 化
今回は仕様の都合上 `theme_mod` 内に格納しました。 `option` 内でもいいと思います。
```PHP:title=function.php
function update_data() {
	//APIのURL
	$sreadsheet_data = 'https://script.googleusercontent.com/xxxxx.....';

	//外部ファイルはwp_remote_getで取得できる
	$array = wp_remote_get( $sreadsheet_data );

	//1秒待つ。処理によっては不要
	sleep( 1 );

	// レスポンスがエラーの場合は処理終了
	if( is_wp_error( $array ) ) {
		echo 'error';
		wp_die();
	}

	$json = json_decode( $array['body'] );

	//データを json を配列にして格納
	$data = array();
	foreach ( $json as $value ) {
		$data[] = $value;
	}
	// 配列化したデータを my_data に格納
	if ( get_theme_mod( 'my_data' ) !== $taiken || empty( get_theme_mod( 'my_data' ) ) ) {
		set_theme_mod( 'my_data', $taiken );
	}
	// my_data が殻ではなく配列の場合処理成功
	if( get_theme_mod( 'my_data' ) !== null && is_array( get_theme_mod( 'my_data' ) ) ) {
		echo 'success';
	// 処理したらエラー
	} else {
		echo 'error';
	}
	wp_die();
}
add_action( 'wp_ajax_update_data_action', 'update_data' );
```
`add_action`に記載するアクションは `wp_ajax_関数名_action` となります。

## クリックイベント を実装
Admin Bar に実装したボタンをクリックしたら データを更新できるようにします。

ボタンは管理画面のページによっては非表示になるので、要素がないときには処理しないようにします。

ボタンのIDは接頭辞に `wp-admin-bar-` が付与されます。

`params` には先程設定したアクション（Ajax処理）とnonceの値を格納します。

アクションは `関数名_action` となるみたいですが、指定方法をきちんと検証していないので後日修正するかもしれません。

```js:title=ajax.js
document.addEventListener("DOMContentLoaded", () => {
  //要素がない時は未処理
  if( document.querySelector('#wp-admin-bar-dataReflesh') === null ) return;
  //ボタン取得
  const button = document.querySelector('#wp-admin-bar-dataReflesh');
  // クリック後の処理
  button.addEventListener('click', () => {
    //paramの中にnonceとactionの値を格納
    const params = new URLSearchParams([
      [ 'action', 'update_data_action' ],
      // ajax_object に格納した nonce 情報
      [ 'nonce', ajax_object.nonce ]
    ]);
    // ajax_object に格納した ajax URL 情報
    fetch( ajax_object.ajax_url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        body: params
    })
    .then(res => res.text() )
    .then(text =>{
      // Ajaxからのステータスデバッグ
      console.log( text )
      // `success` が返った場合
      if(text === 'success') alert('更新完了しました')
      // `error` が返った場合
      else alert('更新失敗しました')
    })
    .catch((error) => {
      console.log(error)
      alert('更新失敗しました')
    });
  });
});
```
適宜値を削除したり確認しながらやってみてください。
```php:title=function.php
//データを削除
remove_theme_mod( 'my_data' )
//データを確認
var_dump( get_theme_mod( 'my_data') );
```
## まとめ・WP-Cron と合わせて処理しておくと手間がいらない！
今回は手動で更新する方法をご紹介させていただきました。

WordPress には `WP-Cron` という一定の時間にアクセスがあったら処理が走るという便利機能もあるので合わせて設定しておくと良いですね。

`WP-Cron` に関してはまた記事化しようと思います。

この記事がみなさんのコーディングライフの一助となれば幸いです。

最後までお読みいただきありとうございました。
