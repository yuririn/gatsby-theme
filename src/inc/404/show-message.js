import React, {useEffect, useState } from "react"
import { navigate } from "gatsby"
import TagsList from "../../components/blogs/tag-list"
import GenreList from "./genre-list"
import Search from './search'

const ShowMessage = ({scenario, setScenario, getKyle}) => {
    const [text, setText] = useState('');
    const [cnt, setCnt] = useState(0);
    const [msg, setMsg] = useState('');
    const [clear, setClear] = useState(false);
    const [sceen, setSceen] = useState(scenario);
    const [life, setLife] = useState(3);
    let interval;

    useEffect(() => {
      if(localStorage.getItem('kyle') >= 0) {
        setLife(parseInt(localStorage.getItem('kyle')))
      }
    })

    useEffect(() => {
      if(scenario !== sceen) {
        setText('')
        setMsg('')
        setCnt(0)
        setSceen(scenario)
      }
      if(Dialogue[sceen]) {
        setClear(false)
        interval = setInterval(() => {
            setText(text + msg[text.length])
            if(text.length === msg.length) {
                setCnt(cnt+1)
                setText('')
                setMsg(Dialogue[sceen][cnt])
            }

        }, 50);
        if(cnt === Dialogue[sceen].length && text === msg ) {
            clearInterval(interval);
            setClear(true);
        }
        return () => {
            clearInterval(interval);
        };
      }
    },[text, msg, cnt, scenario, clear, sceen])

    const action = (e) => {
      setText('')
      setMsg('')
      setCnt(0)
      if(e === -1) {
        alert('銀ねこアトリエのとっぷぺ〜じに移動します')
        navigate('/#top')
      } else if(e === -2){
        alert('Google検索に移動するよ。頑張って探してね！')
        navigate('https://www.google.com/')
      }else {
        setSceen(e)
        setScenario(e)
      }
    }

    useEffect(()=> {
        let id
        if(scenario === 7 || sceen === 7) {
            id = setTimeout(() => {
                setCnt(0)
                setText('')
                setMsg('')
                setScenario(8)
                setSceen(8)
            }, 3000)
        }
        return () => {
            clearTimeout(id)
        }
    },[scenario, sceen])

    return (
      <>
        { Dialogue[scenario] && Dialogue[scenario].map((txt,i)=>{
        if(i + 1 === cnt) return false
        if(i < cnt ) return <p key={txt}>{txt}</p>})}
        {text !== '' && <p>{text}</p>}
        {
            clear && <>
            {sceen === 3 && <TagsList></TagsList>}
            {sceen === 4 && <GenreList></GenreList>}
            {sceen === 5 && <Search setSceen={setSceen} setScenario={setScenario} setText={setText} setCnt={setCnt} setMsg={setMsg} setLife={setLife} life={life} getKyle={getKyle}></Search>}
            {Ansers[scenario] &&
            <ul className="menu">
              {Ansers[scenario].map((item,i)=>{
                if((life === 0 && scenario === 8 && i===0) || (life === 0 && scenario === 1 && i===0)) {
                  return <li key={item.text}><button onClick={() => action(9)}>{item.text}</button></li>
                } else {
                  return <li key={item.text}><button onClick={() => action(item.scenario)}>{item.text}</button></li>
                }
              })}
            </ul>}
            </>
        }
      </>
    )
}
export default ShowMessage

const Dialogue = {
  0: [
    'はじめまして、迷子の子羊さん。私は銀ねこアトリエの管理人かみーゆです。',
    'あなたはページを探すうちに、「404ダンジョン」に迷い込んでしまったようです。',
    '一度このダンジョンに迷い込んだら、最後。',
    '見つけたかったページを見つけることはできないでしょう。それでもあなたは旅を続けますか？',
  ],
  1: [
    'そんなあなたの勇気を認めた私から、あなたに旅のヒントを与えましょう。',
  ],
  2: [
    '召喚してくれてありがとう。',
    '僕は見習い魔導師カイルだよ。僕がかみーゆさんを手伝おうとすると、すぐうざがって僕を消してしまうんだ。',
    '何を手伝ってほしい？',
  ],
  3: [
    '銀ねこアトリエでは、記事をタグ付けしてます。興味のあるタグから記事を探すことができるかもしれません。',
  ],
  4: [
    '銀ねこアトリエは、６つのジャンルに分類されて記事が書かれています。','気になるジャンルの記事一覧からお探しの記事が見つかるかもしれません。',
  ],
  5: [
    '銀ねこアトリエでは「サイト内検索」というこのサイト内にある記事だけを探せる機能があるんだ。','この検索窓に探している情報に関するキーワードを入れて探すといいよ。',
  ],
  6: [
    'Webサイト博物館は今では使われていない古代のWeb技術を展示した博物館なんだ。','残念だけど、今は博物館は現在工事中なんだ。','ちなみにこの「工事中」（まだコンツが準備中）という表現も古代の言い回しだよ。','また君がこのダンジョンに運良くたどり着くことがあれば、ぜひ博物館も見て行ってね',
  ],
  7: [
    'あああ、なんてことをするんだ！！',
    'やめてーーーー',
  ],
  8: [
    'あなたは「カイルを消し去る」じゅもんを唱えてしまったようです。',
  ],
  9: [
    'あなたは「カイルを消し去る」呪文を使いすぎましたね。カイルが昔某オフィス系ソフトでアシスタントをしていた頃に何度も唱えられた、とても恐ろしい呪文なのです。異次元に飛ばされ、そうカンタンには蘇りません。',
    '蘇らせたければ、カイルの愛用しているゆかりの「何か」を見つけてきてください。',
    'きっとこの銀ねこアトリエのブログ記事の中のどこかにあると思います。',
  ],
  10: [
    'Webサイト博物館は今では使われていない古代のWeb技術を展示した博物館です。','残念ですが、今は博物館は現在準備中です。',
  ],
}
const Ansers = {
  0: [
    {text: 'はい', scenario: 1},
    {text: 'いいえ', scenario: -1}
  ],
  1: [
    {text: '見習い魔導師を召喚', scenario: 2},
    {text: '記事をググりなおす', scenario: -2},
    {text: 'タグから探す', scenario: 3},
    {text: 'ジャンルから探す', scenario: 4}
  ],
  2: [
    {text: '記事を探すのを手伝ってほしいほしい', scenario: 5},
    {text: 'Web博物館に案内してほしい', scenario: 6},
  ],
  3: [
    {text: '記事を探すヒントに戻る', scenario: 1},
  ],
  4: [
    {text: '記事を探すヒントに戻る', scenario: 1},
  ],
  5: [
    {text: 'カイルに他のことで手伝ってもらう', scenario: 2},
  ],
  6: [
    {text: 'カイルに他のことで手伝ってもらう', scenario: 2},
  ],
  8: [
    {text: 'カイルを復活させたい', scenario: 2},
    {text: 'どうでもいいからはよ記事読ませろ', scenario: -1},
  ],
}

