# 銀ねこアトリエ
当ブログは Gatsby JS(SSG)制です

## 運用方法
git でのルール

* 機能開発: issue(追加したい機能ごと) ごとにローカルでブランチを切り、develop に marge し、ステージング環境で確認。問題なければ pull request を作成し、master に merge。
* 記事更新: posting-articles で作成し、リモートの master に pull request でマージ。deploy preview が走るので、止める（記事投稿のみ master で行ってもいいかもしれない。今後運用方法は要検討。）。
