---
title: Contact Form 7 で必須項目のエラーメッセージをカスタム
date: 2019-08-02
hero: thumbnail/2015/entry235.png
pageType: blog
cateId: 'cms'
tags: ["WordPress"]
description: WordPressサイトだけでも月1くらいのペースで制作しています。よく、フォーム系のプラグインのお世話になります。中でもContact Form 7はお気に入りでめっちゃ奥が深いですね！カスタマイズする時こころおどります！今回は発想の転換で必須項目のエラーメッセージを変えたのでそのやり方をメモしておきます。
---
WordPressサイトだけでも月1くらいのペースで制作しています。

よく、フォーム系のプラグインのお世話になります。中でもContact Form 7はお気に入りでめっちゃ奥が深いですね！

カスタマイズする時こころおどります！今回は発想の転換で必須項目のエラーメッセージを変えたのでそのやり方をメモしておきます。

<prof></prof>

## そもそも、管理画面側で入力項目を必須にする必要はない
ウェブ制作でプライバシーポリシーが重要な昨今、プライバシーポリシーへの同意ってめちゃ大事です。
単純にプライバシーポリシーに同意するという項目にチェックを入れてなかった場合に、送信できないようにしたかったのですが contact form 7 では必須項目でのエラーメッセージは全て一緒です。

ちょっとユーザーに対して優しくないのでチェックがない場合エラーメッセージを変更しようと考えました。

ズバリ、最初から管理画面で**必須にせず、エラーメッセージをコントロール**するだけ。

fuctions.php に add_filter で wpcf7_validate にフックするコードを書けば OK。

以下のコードの例は、checkboxです。
```php
// contact form 7 バリデーション追加
function wpcf7_validate_customize($result, $tags)
{
    foreach ($tags as $tag) {
        //タグの種類 input・textareaなど
        $type = $tag['type'];
        // name属性
        $name = $tag['name'];
        $post = trim(strtr((string) $_POST[$name], "\n", ''));
        if($type === 'checkbox'){
            if ($name == 'agreement' && !isset($_POST[$name])) {
                // 指定のname属性のバリデーションに任意のメッセージを追加
                $result->invalidate($name, 'プライバシーポリシーに同意してください。');
            }
        }
    }    return $result;
}
add_filter('wpcf7_validate', 'wpcf7_validate_customize', 11, 2);
```
以上です。
