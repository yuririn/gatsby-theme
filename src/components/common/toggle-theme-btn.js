import React from "react"
import Moon from "../svg/moon"
import Sun from "../svg/sun"

const ToggleThemeButton = ({toggleTheme, theme}) => (
    <button onClick={toggleTheme} className='c-btn--switch-mode' aria-label={theme === 'light' ? 'ライトモード' : 'ダークモード'}>
        <Sun></Sun>
        <Moon></Moon>
    </button>
)
export default ToggleThemeButton
