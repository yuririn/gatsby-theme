import React from "react";
import { Link } from "gatsby"
const Thanks = () => (
    <div>
        <h2>お問い合わせフォームが送信されました</h2>
        <p>
            お問い合わせフォームを送信いたしました。内容を拝見し、返信させていただきます。
        </p>
        <p>
            明らかなセールスや、スパムと判断した場合は返信しませんのでご了承ください。
        </p>
        <p>5日経っても返信がない場合はお手数ですが、再度ご連絡をお願いします。</p>
        <p><Link to="https://x.com/LirioY"> Xアカウント</Link>にDMをお願いします。</p>
    </div>
);

export default Thanks;
