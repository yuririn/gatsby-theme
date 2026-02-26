# 銀ねこアトリエ
当ブログは Gatsby JS(SSG)製です。

## 運用方法
git でのルール。

### 機能開発
issue(追加したい機能ごと) ごとにローカルでブランチを切り、ローカルの develop に marge し、ステージング環境で確認。問題なければ pull request を作成し、master に merge。
ブランチの命名ルール
dev/issue-#(issue番号)-概要
ex.) dev/issue-7-fixed-image-component

各ラベル。
* Bug ソフトウェアのバグや不具合
* Feature Request 新しい機能のリクエスト
* Documentation ドキュメントの追加や修正
* Enhancement 既存の機能の改善
* Question 質問や疑問点
  
### 記事更新
ブランチ posting-articles で作成し、リモートの master に pull request でマージ。deploy preview が走るので、止める（記事投稿のみ master で行ってもいい。今後運用方法は要検討）。

### よく使うGit Command
```bash
source ~/.bashrc
```
```bash
git.sh log
```
```bash
git.sh show
```

