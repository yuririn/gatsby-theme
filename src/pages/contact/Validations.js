// Validations.js

export const validateName = (name) => {
    if (name === "") {
        return "お名前を入力してください";
    }
    if (name.length > 50) {
        return "お名前は50文字以内で入力してください";
    }
    return "";
};

export const validateEmail = (email) => {
    if (email === "") {
        return "メールアドレスを入力してください";
    }
    const regexp = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!regexp.test(email)) {
        return "メールアドレスの形式が正しくありません";
    }
    return "";
};

export const validateMessage = (message) => {
    if (message === "") {
        return "メッセージを入力してください";
    }
    const hasJapanese = /[一-龥ぁ-ゔァ-ヴー々〆〤]/.test(message);
    const hasArabic = /[\u0600-\u06FF]/.test(message);
    const hasChinese = /[\u4E00-\u9FFF]/.test(message);
    if (!hasJapanese || hasArabic || hasChinese) {
        return "メッセージは日本語でのみ受け付けています";
    }
    return "";
};

export const validateAgreement = (agreement) => {
    if (!agreement) {
        return "プライバシーポリシーに同意してください";
    }
    return "";
};
