import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import Seo from "../components/Seo/Seo"

const aboutMeta = {
    template: 'page',
    title: '【セブ島海外ノマド】フロントエンドエンジニアかみーゆを力一杯紹介します',
    description: `海外ノマドって何？エンジニアってどんな人でもなれるの？プログラマーって子どもいてもバツイチでも30歳過ぎていてもなれるの？生きていれば逆境なんて跳ね除けることはできます。`
}

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title


  return (
    <Layout location={location} title={siteTitle}>
      <h1>404: Not Found</h1>
      <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </Layout>
  )
}

export const Head = ({ location }) => {
    const { title, description } = aboutMeta
    const list = [
        {
            name: '',
            path: '/404/',
            type: `WebPage`
        }
    ]
    return <Seo
        location={location}
        data={{
            template: 'blog',
            title: title,
            description: description,
            list: list
        }}
    />
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
