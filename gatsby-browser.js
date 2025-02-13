// Highlighting for code blocks
import "prismjs/themes/prism-okaidia.css";

export const onRouteUpdate = ({ location }) => {
    if (location.hash) {
        // 現在のURLにハッシュが含まれている場合はスクロールをやめさせる
        return;
    }
    // ページ遷移後にスクロール位置をトップにリセット
    window.scrollTo(0, 0);
};
