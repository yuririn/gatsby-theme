---
title: concrete5でページリストブロックの絞り込みをカスタマイズしてみた
date: 2018-08-11
hero: 2014/entry175.jpg
pagetype: blog
category: CMS
cateId: cms
tags: ["concrete5"]
description: concrete5 でページリストブロックの検索結果をカスタマイズしなくてないけなくなったのでそのやり方をメモします。
lead: ["concrete5 でページリストブロックの検索結果をカスタマイズしなくてないけなくなったのでそのやり方をメモします。"]
---
## デフォルトでも十分優秀なページリストブロック
ページリストブロックはデフォルトでもとても優秀なブロックで、記事の一覧を出力するのによく重宝します。

多少、コードは書かないといけませんが、その学習コストを入れても十分使えます。

### デフォルトのテンプレートで主にできること

* 親ページで絞り込み
* ページタイプで絞り込み
* タグで絞り込み
* トピックスで絞り込み
* 並び替え
* 日付で表示・非表示ページをコントロール
* ページネーション

任意の属性で絞り込みをする
ページリストブロックには変数`$list`の中に管理画面で設定した絞り込みの値が入ったものが渡ってます。

$list->getResults(); で結果を配列で出力でき`$pages`に格納されています。

なので一旦、 `filterByAttribute();` で属性での絞り込みを追加して、再度`$list->getResults();` で絞り込み結果を再度 $pages（同じ変数名がやな人は変えてね）に代入すれば最小限の労力でカスタマイズできます。

```
$list->filterByAttribute(【属性名】, 【値】, "=");
```

ナビを出力したら以下のコードで絞り込みを追加します。
```
if (isset($_GET['value']) {
    //属性ハンドル取得
    $attrSet = h($_GET['attr']);

	foreach ($optionList as $key ) {

        if($key->value == h($_GET['value'])){
            // ジャンル名が同じものを出力
            $list->filterByAttribute($choumeiSet, $key->value, "=");
            break;
        }
    }

    $pages = $list->getResults();
}
```
あとは通常通り、 `$pages` を `foreach` で回せば絞り込みは完成です。ページネーションも変更する必要はありません。
## おまけ
オプションリストで出力するともっと簡単
ちなみにオプションリスト(`<select>`とか`<option>`)で出力する場合は、以下のコードでもいけます。

勝手に出力してくれるのでめちゃめちゃ便利です。
ただしどんなコードがあらかじめ出力されるか把握した上で、コーディングしないと泣く羽目に遭いますよ。

```
$ak = CollectionAttributeKey::getByHandle('genre');
$ak->render('search');
```

### 複数の属性をまとめて扱いたいならセットに登録しよう
ページ属性はまとめてセットに登録することが可能です。
登録したデータをまとめて foreach で回せるので便利です。

```
$choumei_set = AttributeSet::getByHandle('[セット名]')->getAttributeKeys();
```
## まとめ
実際に私が実装したのは複数の属性を作って絞り込んだのでもっと複雑でしたが、このくらいミニマムなものを改造してチャレンジすると敷居が低くて良いと思います。
もちろん、いろんな種類の属性でできます！
以下公式サイトのURLを見ながら、ぜひやってみるといいと思います。
### 参考サイト
[PageList オブジェクトで検索・ソートを行う](https://concrete5-japan.org/help/5-7/developer/working-with-pages/searching-and-sorting-with-the-pagelist-object/)
