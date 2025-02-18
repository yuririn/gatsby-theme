// custom typefaces
// import "typeface-montserrat"
// import "typeface-merriweather"
// normalize CSS across browsers
import "./src/normalize.css"
// custom CSS styles
import "./src/style.css"

// Highlighting for code blocks
import "prismjs/themes/prism.css"

export const onRouteUpdate = ({ location }) => {
    if (location.hash) {
        // 現在のURLにハッシュが含まれている場合はスクロールをやめさせる
        return;
    }
    // ページ遷移後にスクロール位置をトップにリセット
    window.scrollTo(0, 0);
};

// gatsby-browser.js
export const onInitialClientRender = () => {
    const nodeEnv = process.env.NODE_ENV || 'production';
    console.log('Node Environment:', nodeEnv);

    if (nodeEnv !== 'production') {
        if (typeof window !== "undefined") {
            // 認証情報の有効期限を確認する関数
            const checkAuthenticationExpiry = () => {
                const authData = JSON.parse(localStorage.getItem("authenticated"));
                if (authData) {
                    const currentTime = new Date().getTime();
                    const expiryTime = 24 * 60 * 60 * 1000; // 24時間 (ミリ秒)
                    if (currentTime - authData.timestamp > expiryTime) {
                        // 認証情報が期限切れの場合、削除する
                        localStorage.removeItem("authenticated");
                        return false; // 認証情報が期限切れ
                    }
                    return true; // 認証情報が有効
                }
                return false; // 認証情報が存在しない
            };

            const isAuthenticated = checkAuthenticationExpiry();
            const isOnLoginPage = window.location.pathname === "/login/";

            // 認証されていない場合にリダイレクト
            if (!isAuthenticated && !isOnLoginPage) {
                window.location.href = "/login/";
            }

            // 認証されている場合にホームページにリダイレクト
            if (isAuthenticated && isOnLoginPage) {
                window.location.href = "/";
            }
        }
    }
};
