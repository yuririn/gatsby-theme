import React from "react";
import { marked } from "marked";

const Faq = ({ data }) => {
  // データがない場合は空文字を返す
  if (!data || data.length === 0) return '';

  return (
    <section>
      <h2 className="c-heading--faq">FAQ</h2>

      {data.map((item, index) => {
        const htmlAnswer = marked.parse(item.a || "", { breaks: true });
        return (
          <dl className="c-faq" key={`faq${index}`}>
            <dt>{item.q}</dt>
            {/* aの内容をHTMLとして直接出力 */}
            <dd dangerouslySetInnerHTML={{ __html: htmlAnswer }} />
          </dl>
        );
      })}
    </section>
  );
};

export default Faq;
