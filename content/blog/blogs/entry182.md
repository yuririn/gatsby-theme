---
title: たった8行！簡単PopUpWindow
date: 2014-08-09
category: ['Front End']
cateId: ['front-end-program']
tags: ["JavaScript"]
description: 手間がかからずたった8行で簡単にJQueryで実装できるのでメモしてます。そのかわり、素っ気ないしまったくオシャレじゃないです。ご了承ください。
lead: ["現役フロントエンドエンジニアのかみーゆです。","手間がかからずたった8行で簡単にJQueryで実装できるのでメモしてます。そのかわり、素っ気ないしまったくオシャレじゃないです。ご了承ください。"]
---
## とにかく簡単にガスっと実装したいときにどうぞ

JSのwindow.open()を使って別Windowでリンクを開きます。
いたってシンプルです。

jQueryだとこんな感じのコードでOK。

ポップアップを設定したいリンクの任意のクラスの名前を付けるだけ。

```
//jQuery
<script>
    $(function() {
        $("クラス名").click(function(){
            window.open(this.href, "WindowName", "width=〇〇, height=〇〇,resizable=yes,scrollbars=yes");
            return false;
        });
    });
</script>

//HTML
<a href="開きたいファイルのリンク">PopUpWindowOpen</a>
```

## まとめ
ちょっとしたこと、些細なことの方がいざとなったら忘れてしまうんですよね。
解説や肉付けが必要なら、後日追記でもいいので忘れないうちにメモっておくことは大切だなーって思います。

日々Tipsをストックしておくと後日、すごく助けられますからね！！
