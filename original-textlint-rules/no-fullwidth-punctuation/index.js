module.exports = function (context) {
    const { Syntax, RuleError, report, getSource } = context;
    return {
        [Syntax.Str](node) {
            const text = getSource(node);
            const pattern = /(？{2,}|！{2,})/g;
            let match;
            while ((match = pattern.exec(text)) !== null) {
                report(node, new RuleError(`Disallow to use consecutive '${match[0]}'`, {
                    index: match.index
                }));
            }
        }
    };
};
