---
title: 【WordPress】管理画面に独自メニューを追加して、ajax（非同期）で値を保存する
date: 2021-05-24
hero: 2021/entry465.jpg
pagetype: blog
cateId: 'cms'
tags: ["WordPress"]
description: WordPressでサイトごとの独自の値を登録できるようにしたいですよね？今回は管理画面のサイドバーにメニューを追加方法し独自の値を登録できるようにするためのページの作成方法を紹介します。登録方法はユーザビリティを考え、ajaxを使いました。よろしければご一読ください。
lead: ["WordPressでサイトごとの独自の値を登録できるようにしたいですよね？","今回は管理画面のサイドバーにメニューを追加方法し独自の値を登録できるようにするためのページの作成方法を紹介します。登録方法はユーザビリティを考え、ajaxを使いました。","よろしければご一読ください。"]
---
<div class="msg-baloon">
<p><img src="/static/ecd737bbd9e6b99fd33fbd308f2b88e8/f836f/camille.jpg">かみーゆ</p>
<p>今回は管理画面でサイトの値を保存して、さらに値をajax（jQuery）で保存します！</p>
</div>

この記事では基本WordPressのコーディング規約を守ってコードを紹介しています。エスケープ処理なども含め、よくわからない方はこちらの記事も合わせて参考にしてください。

<a class="article-link" href="/blogs/entry452/">
<section><div class="article-link__img"><img alt="WordPress phpcsでコーディング規約を守るコード" src="/static/4e7d7db8849ad47fcf44a549cf857b2a/2244e/entry452.jpg" width="150" height="113" class=""></div><div class="article-link__main">
<div class="article-link__main__title">WordPress phpcsでコーディング規約を守るコード</div>
<p class="description">この記事はWordPressのコーディング規約をphpcs導入して入れたものの、エラー英語だしよくわかんないって･･･</p>
<p>
<time datetime="2021-04-058">2021.04.05</time>
</p>
</div>
</section></a>

## まずはWordPressの管理画面にメニューを作ろう！
メニューの作り方です。

function.phpなどに追記するとメニューが追加されます。
```php
function my_admin_menu() {
	add_menu_page(
		'My page name',//管理画面のページのタイトルタグ
		'My page name',//メニューのラベル
		'manage_options',//権限。ユーザーレベルは非推奨
		'my_admin_menu',//メニューのスラッグ
		'add_my_admin_menu',//こいつが重要。メニューページを表示する際に実行される関数
		'dashicons-calendar-alt',//メニューアイコン
		20//メニューの位置
	);
}
add_action( 'admin_menu', 'my_admin_menu' );
```
メニューアイコンは自作してもいいですが、WordPressにはあらかじめかなりの数が用意されているのでこちらを使うのが賢いかも。

[Dashicons](https://developer.wordpress.org/resource/dashicons/#heading)

もしオリジナルが使いたいときはメニューアイコンを以下のように書き換えます。

あとはプラグインなど格納されているフォルダーに格納しておけばOKです。

```php
plugins_url( 'myplugin/images/icon.png' ),
```
## 管理画面で出力するページを作成
次に管理画面用のページを作っていきます。さっき設置した`add_my_admin_menu`（もちろん名前は任意）と関数としてページの内容を書いていきます。

```php
function add_my_admin_menu() {
  ?>
  <div class="status"></div>
  <div class="wrap">
    <form action="<?php echo esc_url( home_url( 'wp-admin' ) ); ?>/admin.php?page=<?php echo esc_html( 'my_admin_menu' ); ?>" method="POST" id="saveData">
    ここにコード
    </form>
  </div>
  <?php
}
```
ページ共通の設定の場合はoptionに登録するのがオススメです。*ここにコード*へ次のよう、サイトごとの値登録に必要なコードを追記します。


```php
<table class="form-table" role="presentation">
  <tr class="row">
    <th>サイトの基本情報</th>
    <td>
      <input type="text" name="my-site-data-1" value="<?php echo esc_html( get_option( 'my-site-data-1' ) ); ?>">
    </td>
  </tr>
</table>
<button class="button-primary" data-save="saveBtn">保存</button>
```
同じWordPress内で共通の値を保村するときはoption系の関数が便利です。

|関数名|用途|使い方|
|-|-|-|
|*get_option*|そのサイト（テーマ）の独自の値を取得|`get_option(キー,値)`|
|*update_option*|そのサイト（テーマ）の独自の値を更新・新規登録|`update_option(キー,値)`|
|*delete_option*|そのサイト（テーマ）の独自の値を削除|`update_option(キー)`|

## ajax（jQuery）で保存処理

ajax（非同期）で保存するためのコードを書きます。

CRAD処理（データの登録・保存・更新とか削除）でajax（非同期）を使うと、従来のページ遷移する（リクエストを投げる）よりもユーザーが使い心地をライトに感じます。

今回は`my-site-data-1`という名前の値を保存してみましょう。

add_actionのフックはページごとに出し分けができます。

```php
add_action(
	'admin_footer-[ページ名]',
  [関数名]
);

```

今回*add_my_admin_menu*という名前で作ったので[ページ名]のところを変えます。

```php
add_action(
	'admin_footer-toplevel_page_add_my_admin_menulz_count_down_menu_page',
	function() {
		?>
    <script>
    jQuery(document).ready(function($) {
      $('body').on('click','.status .notice-dismiss', function() {
        $('.status div').remove();
        return false;
      })
      $('#saveData').submit(function(event){
        event.preventDefault();
        const fd = new FormData( this );
        fd.append('action'  , 'save_data' );

        $.ajax({
          type: "POST",
          url: "<?php echo admin_url( 'admin-ajax.php' ); ?>",
          dataType: 'json',
          data: fd,
          processData: false,
          contentType: false,
        }).done(function(data, textStatus, jqXHR) {
          $('.status').html('<div class="notice notice-success is-dismissible"><p><strong>設定を保存しました。</strong></p><button type="button" class="notice-dismiss"></button></div>');
        }).fail(function() {
          $('.status').html('<div class="notice notice-error is-dismissible"><p><strong>設定の保存を失敗しました。</strong></p><button type="button" class="notice-dismiss"></button></div>');
        });

      return false;
      })
    });
    </script>
  <?php
	}
);
```
`$('.status').html~`のところは保存した後の保存した後成功したか否かを知らせる処理です。クラスstatusに要素を追加することで知らせます。

<small>※ jQueryが動かない場合はcdnなどから、改めて取ってくる必要があるかもしれません。</small>

## 保存処理をする場所を作る
データを受け取って保存処理をします。

WordPressにはajax用の`wp_ajax_save_data`という便利なフックがあります。

前のコードで`fd.append('action'  , 'save_data' );`を指定したようにaction名は`save_data`で渡されます。

同じ名前で関数を作ります。このままphpcsでコードを書くと構文エラーで真っ赤になると思います。修正するので少し待っててください^^;

`page`と`action`は必ず投げられる値ですが保存する必要ないので除外します。

```php
add_action( 'wp_ajax_save_data', 'save_data' );
function save_data() {
  if ( isset( $_POST['action'] ) && $_POST['action'] === 'save_data' ) {
		foreach ( $_POST as $key => $value ) {
			if ( isset( $_POST[ $key ] ) ) {
				if ( $key !== 'action' || $key !== 'page' ) {
					update_option( esc_html( $key ), esc_html( $value ) );
				}
			} else {
				delete_option( $key );
			}
		}
	}

	echo json_encode( 'Succsess' );
	die();
}
```
<div class="box">
<h4>プログラムがうまくいったかは必ずChrome Dev ToolのNetwokを確認しよう</h4>
保存できたかどうかを確認する前に、ちゃんと思ったデータが送信されているかを確認しましょう。Chromeの開発者ツール（Dev Tool）からNetworkを使えば「post」データとして送信されていることが確認できます。
</div>

## まとめ・非同期処理だとユーサーもハッピー
以上ざっくりですが、駆け足で管理画面のカスタマイズ方法、WordPressのもともとある機能のajax非同期処理でサイト全体をお伝えしました。

書いておかないとすぐ忘れるのを防止する個人的なメモではありますが、皆さんのWoedPressカスタマイズの一助となれば幸いです。

最後までお読みいただきありがとうございました。
