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
