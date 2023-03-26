import React, { useState } from "react"
import styled from "styled-components"

const Kyle = ({item})=> {
  const [text, setText] = useState(false);
  const hadItems = localStorage.getItem('items') ? localStorage.getItem('items').split(",") : []
  if(localStorage.getItem('kyle') == 0 && !hadItems.includes(item)) {
  const items = {
    hat: {
      img: ["/images/kyle-hat.png", 100,50],
      name: '変わった形の帽子',
      message: '見習い魔導師カイルの持ち物だった！',
      life: 3,
    },
    ken: {
      img: ["/images/ken.png", 30,126],
      name: '女性用のソード',
      message: 'かみーゆの持ち物だった！！',
      life: 0,
    },
    takarabako: {
      img: ["/images/takarabako.png", 100, 60],
      name: '重そうな宝箱',
      message: 'エロ本が入っていた！',
      life: 0,
    }
  }
  const setItem = items[item]
  const life = setItem.life + parseInt(localStorage.getItem('kyle'));
  const setMessage = setItem.message + 'カイルのライフが' + life + 'になった。'
  const showMessage = () =>{
    setText(true)
    let id
    id = setTimeout(() => {
      if(!localStorage.getItem('items')) {
        localStorage.setItem('items',item)
      } else {
        localStorage.setItem('items', localStorage.getItem('items')+','+item)
      }
      localStorage.setItem('kyle', life)
    }, 100)
    return ()=> clearTimeout(id)
  }
    return <Box>
      <p>記事の中に「{setItem.name}」が落ちているようだ。<br/>拾いますか？</p>
      <img src={setItem.img[0]} alt={setItem.name} width={setItem.img[1]} height={setItem.img[2]}/><br/>
     {!text &&  <button onClick={showMessage }>{setItem.name}を拾う</button>}
      {text && <p>{setMessage}</p>}
    </Box>

  }

}
export default Kyle

const Box = styled.div`
  border: 6px solid var(--pale-gray);
  margin-bottom: 24px;
  padding: 24px;
  border-radius: 15px;
  text-align:center;
  img {
    margin-bottom: 24px;
  }
`
