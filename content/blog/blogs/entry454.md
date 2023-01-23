---
title: プラグインなしでWordPressのカスタムフィールドを追加&管理画面投稿一覧に出力
date: 2021-04-11
hero: thumbnail/2021/entry454.jpg
pagetype: blog
cateId: 'cms'
tags: ["WordPress"]
description: WordPressでもSEO Packなどを使わずカスタムフィールドの実装だけでタイトルやメタディスクリプションを編集できるようにできます。カスタムフィールドの値が管理画面の各投稿一覧から確認できたら便利と思い実装したのでまとめました！一覧を編集したらカスタムフィールドが消えるバグの対処方法もついでにまとめてます。
---
WordPressでもSEO Packなどを使わずカスタムフィールドの実装だけでタイトルやメタディスクリプションを編集できるようにできます。カスタムフィールドの値が管理画面の各投稿一覧から確認できたら便利と思い実装したのでまとめました！

一覧を編集したらカスタムフィールドが消えるバグの対処方法もついでにまとめてます。

<prof></prof>

<toc id="/blogs/entry454/"></toc>
## この記事を参考にする上での注意点

この記事のコードはWordPressのコーディング規約に沿って書いてあります。

ヨーダ記法など初学者にはなんでこの書き方？ってコードもあるかもなので、以下記事を参考にしてください。

<card id="/blogs/entry452/"></card>

phpcsでWordPressコーディング規約を設定しておくといいです。

## カスタムフィールドからコンパクトにタイトルやメタディスクリプションを編集できるようにする

カスタムフィールドは追加、アップデート、取得、削除用（CRUD）の関数が用意されています。

<small>※ C…Create、R…Read、U…Update、D…Delete</small>

ぶっちゃけ、`add_post_meta`は`update_post_meta`で代用できます。

```php
// 追加
add_post_meta(  ページのID, カスタムフィールド名 );
// 取得
get_post_meta( ページのID, カスタムフィールド名 , true );
// アップデート
update_post_meta( ページのID, カスタムフィールド名 );
// 削除
delete_post_meta( ページのID, カスタムフィールド名 );
```

この関数を使ってカスタムフィールドを編集します。

にタイトルやメタディスクリプションを編集できるようにカスタムフィールドを表示するエリアを追加します。

```php
/**
 * Show custom field
 */
function seo_fields() {
	global $post;
	$metatitle   = get_post_meta( $post->ID, 'metatitle', true );
	$description = get_post_meta( $post->ID, 'description', true );
	?>

	<div id="resiter"  class="resister">
		<h2>タイトル</h2>
		<p><input name="metatitle" value="<?php echo attr_html( $metatitle ); ?>"  class="large-text code" placeholder="タイトル" id="metatitle"></p>
		<p><span id="titleNum"></span>文字</p>
		<p>検索された時に表示されるタイトルです。35文字から41文字以内に収めるのが理想です。</p>
		<h2>説明文</h2>
		<p><textarea name="description" class="large-text code" rows="3" placeholder="このページの説明文" id="metadescription"><?php echo attr_html( $description ); ?></textarea></p>
		<p><span id="descriptionNum"></span>文字</p>
		<p>検索された時に表示されるタイトルです。130文字以内に収めるのが理想です。</p>
	</div>
	<?php
	wp_nonce_field( 'seo', 'seo_field' );
}
```
`wp_nonce_field`を追記しました。
* [Using Nonces](https://developer.wordpress.org/themes/theme-security/using-nonces/)
* [wp verify nonce](https://wpdocs.osdn.jp/%E9%96%A2%E6%95%B0%E3%83%AA%E3%83%95%E3%82%A1%E3%83%AC%E3%83%B3%E3%82%B9/wp_verify_nonce)

表示するためには`admin_menu`を`add_action`にフックさせます。

これでpost（投稿）とpage（固定）にカスタムフィールドを追加できます。

```php
/**
 * Add custom field
 */
function add_seo_fields() {
	add_meta_box( 'seo_sectionid', 'SE0情報の登録', 'seo_fields', 'post' );
	add_meta_box( 'seo_sectionid', 'SE0情報の登録', 'seo_fields', 'page' );
}
add_action( 'admin_menu', 'add_seo_fields' );
```

## カスタムフィールドのデータを保存する

このままだと管理画面の一覧の方でタイトルなど編集したらデータが消えます。

一覧だろうが、詳細だろうが保存の際に同じように処理されるけど、一覧では保存する値が存在しないので削除処理されてしまいます。

~~ちょっと力技ですが、管理画面が一覧か、詳細なのかを判断するのに`action`パラメーターがあるかで削除処理するかの処理を入れました。~~

<br>上記、global変数`$pagenow`を追加し、ページテンプレート名を取得する方法に切り替えました。

先ほどの`wp_verify_field`で生成したnonceを`wp_verify_nonce`で確認します。nonceが無効ならfalseを返します。これでエラーは発生しなくなるはずです。

```php
/**
 * Save data
 *
 * @param string $post_id is id.
 */
function save_seo_fields( $post_id ) {
	global $pagenow;
	if ( ! isset( $_POST['seo_field'] ) || ! wp_verify_nonce( sanitize_text_field( wp_unslash( $_POST['seo_field'] ) ), 'seo' ) ) {
		return false;
	}

	if ( ! empty( $_POST['metatitle'] ) ) {
		$metatitle = sanitize_text_field( wp_unslash( $_POST['metatitle'] ) );
		update_post_meta( $post_id, 'metatitle', $metatitle );
	} else {
		if ( is_admin() || ( 'post.php' === $pagenow ) ) {
			delete_post_meta( $post_id, 'metatitle' );
		}
	}
	if ( ! empty( $_POST['description'] ) ) {
		$description = sanitize_text_field( wp_unslash( $_POST['description'] ) );
		update_post_meta( $post_id, 'description', $description );
	} else {
		if ( is_admin() || ( 'post.php' === $pagenow ) ) {
			delete_post_meta( $post_id, 'description' );
		}
	}
}
add_action( 'save_post', 'save_seo_fields' );
```
## 管理画面の投稿一覧に表示する

カラムを追加します。コメントのカラムはいらないので`unset()`で削除します。

```php
/**
 * Add column for voice list admin page
 *
 * @param string $columns is voice.
 */
function add_seo_posts_columns( $columns ) {
	if ( 'post' === get_post_type() || 'page' === get_post_type() ) {
		$columns['metatitle']   = 'メタタイトル';
		$columns['description'] = 'ページの説明';

		unset( $columns['comments'] );
	}
	return $columns;
}
```

各カラムにどんな出力をするかコードを書きます。

```php
/**
 * Add column for Post, Page list admin page
 *
 * @param string $column_name is posts.
 * @param string $post_id is id.
 */
function seo_posts_custom_column( $column_name, $post_id ) {
	if ( 'post' === get_post_type() || 'page' === get_post_type() ) {
		if ( 'metatitle' === $column_name ) {
			$title_data = get_post_meta( $post_id, 'metatitle', true );
			if ( $title_data ) {
				echo esc_html( $title_data );
			} else {
				echo  'None';
			}
		}

		if ( 'description' === $column_name ) {
			if ( '' !== get_post_meta( $post_id, 'description', true ) ) {
				$description = get_post_meta( $post_id, 'description', true );
			} else {
				echo  'None';
			}

			echo esc_html( $description );
		}
	}
}
add_filter( 'manage_posts_columns', 'add_seo_posts_columns' );
add_action( 'manage_posts_custom_column', 'seo_posts_custom_column', 10, 2 );
```

これで管理画面の各投稿一覧にも表示されるように、どの投稿にタイトルタグやディスクリプションが設定されていないか一目瞭然です。

## おまけ・JSで文字のカウント機能をつける
もっとSEOを充実させるために[カスタムフィールドからコンパクトにタイトルやメタディスクリプションを編集できるようにする](#カスタムフィールドからコンパクトにタイトルやメタディスクリプションを編集できるようにする)の`seo_fields()`に、カウント機能を追加します。

ちなみに以下コードはバニラJSです。面倒だった。。。

```php
/**
 * Show custom field
 */
function seo_fields() {
//省略
?>
 <!-- 省略 -->
	<script>
    const titleNum = document.getElementById('titleNum');
    const metatitle = document.getElementById('metatitle');
    const metadescription = document.getElementById('metadescription');
    const descriptionNum = document.getElementById('descriptionNum');

		titleNum.textContent = metatitle.value.length;
		if(metatitle.value.length > 41){
			titleNum.style.color = "red";
		} else {
			titleNum.style.color = "";
		}

		metatitle.addEventListener("keyup", event => {
			titleNum.textContent = metatitle.value.length;
			if(metatitle.value.length > 41){
				titleNum.style.color = "red";
			} else {
				titleNum.style.color = "";
			}
			return;
		});

		descriptionNum.textContent = metadescription.value.length;
    if(metadescription.value.length > 130){
			descriptionNum.style.color = "red";
		} else {
			descriptionNum.style.color = "";
		}

		metadescription.addEventListener("keyup", event => {
			descriptionNum.textContent = metadescription.value.length;
			if(metadescription.value.length > 130){
				descriptionNum.style.color = "red";
			} else {
				descriptionNum.style.color = "";
			}
			return;
		});
	</script>
	<?php
	//省略
}
```
## まとめ・カスタマイズするならコンパクトだけどユーザーファースト
色々応用できるので、よかったら参考にしてください。

この記事がWordPressカスタマイズライフの一助となりますように。

最後までお読みいただきありがとうございました。
