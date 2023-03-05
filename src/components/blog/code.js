import React, { useState } from "react"
import Highlight, { Prism } from "prism-react-renderer"
import nightOwl from "prism-react-renderer/themes/nightOwl"
import {
  LinesToHighlight,
  LinesNumberToHighlight,
} from "react-mdx-prism-lighter"

const Code = ({ codeString, language, title, highlight }) => {
  const [open, setAccordion] = useState(false)
  const accordion = () => {
    setAccordion(!open)
  }



  return (
   <Highlight
      theme={nightOwl}
      Prism={Prism}
      code={codeString}
      language={language}
      >
        {({ tokens, getLineProps, getTokenProps }) => {
        const hasButton = tokens.length > 15 ? true : false
        const second = tokens.slice(16)
        const first = tokens.slice(0,15)
        return (
          <div className="code-highlighter">
            {title && (
              <p className="code-highlighter__title">
                {title}
              </p>
            )}
            <div className={`code-highlighter__body`} data-language={language}>
              <pre>
                {first.map((line, index) => {
                  const lineProps = getLineProps({ line, key: index })
                  if (LinesToHighlight(line)) {
                    lineProps.className += 'highlight'
                  }
                  if (LinesNumberToHighlight(highlight, index)) {
                    lineProps.className += 'highlight'
                  }
                  return (
                    <code {...lineProps}>
                      {line.map((token, key) => {
                        const tokenProps = getTokenProps({
                          token,
                          key: key,
                        })
                        return <span {...tokenProps} />
                      })}
                    </code>
                  )
                })}
                {second.length !== 0 && open && (second.map((line, index) => {
                  const lineProps = getLineProps({ line, key: index })
                  if (LinesToHighlight(line)) {
                    lineProps.className += 'highlight'
                  }
                  if (LinesNumberToHighlight(highlight, index)) {
                    lineProps.className += 'highlight'
                  }
                  return (
                    <code {...lineProps}>
                      {line.map((token, key) => {
                        const tokenProps = getTokenProps({
                          token,
                          key: key,
                        })
                        return <span {...tokenProps} />
                      })}
                    </code>
                  )
                }))}
              </pre>
            {hasButton && (<p className={`code-highlighter__btn${open ? ' isOpen' : ''}`}><button onClick={accordion}>{open ? '閉じる':'コードを見る'}</button></p>)}
            </div>
          </div>
        )
      }}
    </Highlight>
  )
}
export default Code
