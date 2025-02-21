// custom-rules/ignore-specific-patterns.js
module.exports = function (context) {
  const { Syntax, RuleError, report, getSource } = context;
  return {
    [Syntax.Str](node) {
      const text = getSource(node);
      const regex = /[？！]{2,}/g;
      let match;
      while ((match = regex.exec(text)) !== null) {
        // このパターンを無視するために何もしない
        console.log("Ignoring match:", match[0]);  // 確認用ログ
      }
    }
  };
};
