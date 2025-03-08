import React from "react"
import Moon from "../svg/moon"
import Sun from "../svg/sun"

const ToggleThemeButton = ({toggleTheme, theme, location}) => {
  console.log(location.pathname)
  const isBlog = location.pathname.includes('entry') || location.pathname === `/about/` ? true : false;
  // const isBlog = '';
  

  return (<button onClick={toggleTheme} aria-label={theme === 'light' ? 'ライトモード' : 'ダークモード'} className={isBlog ? `c-btn--switch-mode is-blog` : `c-btn--switch-mode`}>
          <Sun></Sun>
          <Moon></Moon>
      </button>
  )
}
export default ToggleThemeButton
