import * as React from "react"
import { siteMetadata } from "../../../gatsby-config"
import { marked } from "marked";

// 日付フォーマットを ISO 8601 (秒数とタイムゾーン付) に変換する補助関数
const formatISO8601 = (dateStr) => {
  if (!dateStr) return null;
  // すでに YYYY-MM-DD 形式であることを想定し、日本時間 (T09:00:00+09:00) を付与
  // 秒数 (:00) がないとバリデーションエラーになる場合があるため追加
  return `${dateStr.replace(/\//g, "-")}T09:00:00+09:00`;
};

const JsonLD = ({ data, location, isRoot }) => {
  const domain = siteMetadata.siteUrl
  const type = isRoot ? 'WebSite' : 'WebPage';
  const list = data.list

  // 1. まず基本データを配列に入れる
  const allData = [pageData(type, domain), Nav(domain)]

  // 2. 各 push の結果が null にならないよう条件付きで追加
  if (!isRoot) allData.push(breadcrumbListData(domain, list, location))
  if (location.includes('entry')) allData.push(BlogPosting(data, domain, location))
  if (data.faq) {
    const faqData = FaqPage(data, location);
    if (faqData) allData.push(faqData); // null でない場合のみ push
  }

  // 3. 重要：最後に .filter(Boolean) をかけて null や undefined を完全に除去する
  const cleanData = allData.filter(Boolean);

  return <script type="application/ld+json">{JSON.stringify(cleanData)}</script>
}
export default JsonLD

// サイトナビゲーション
const Nav = (domain) => {
  const { category, blogName } = siteMetadata;
  const cate = category.filter(cate => cate.slug !== 'cms' && cate.slug !== 'seo' && cate.slug !== 'ginneko-tsuredure');

  let siteNavigation = [
    {
      "@type": "WebPage",
      name: "ホーム",
      url: domain
    },
    {
      "@type": "CollectionPage",
      name: blogName,
      url: `${domain}/blogs/`
    }
  ]
  cate.map(item => {
    const cateItem = {
      "@type": "CollectionPage",
      name: item.name,
      url: `${domain}/blogs${item.slug}/`
    }
    siteNavigation.push(cateItem)
  })
  siteNavigation.push({
    "@type": "AboutPage",
    name: "海外ノマドエンジニアかみーゆってどんな人？",
    url: `${domain}/about/`
  })
  siteNavigation.push({
    "@type": "ContactPage",
    name: "お問い合わせ",
    url: `${domain}/contact/`
  })
  siteNavigation = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    hasPart: siteNavigation
  }
  return siteNavigation
}

// ページの基本データ
const pageData = (type, domain) => {
  const { title, description } = siteMetadata;
  return {
    "@context": "http://schema.org",
    "@type": type,
    inLanguage: "ja",
    url: domain,
    name: title,
    author: author(domain),
    publisher: publisher(domain),
    image: `${domain}/images/ogp.png`,
    description: description
  }
}

// author
const author = (domain) => {
  const { author, shortName } = siteMetadata
  return [
    {
      "@type": "Person",
      name: author.name,
      description: author.summary,
      jobTitle: [author.jobTitle],
      affiliation: [
        {
          "@type": "Organization",
          name: author.company.name,
          url: author.company.url,
        },
        {
          "@type": "Organization",
          name: shortName,
          url: domain,
        }
      ],
      url: domain + '/about/',
      sameAs: [],
      award: [
        '2011年スマートフォンアプリ選手権アプリがいっぱい賞チームで優勝',
      ]
    },
  ]
}

const publisher = (domain) => {
  return {
    "@type": "Organization",
    name: siteMetadata.title,
    description: siteMetadata.description,
    logo: {
      "@type": "ImageObject",
      url: `${domain}/images/icon.png`,
      width: 72,
      height: 72,
    },
  }
}

const breadcrumbListData = (domain, list) => {
  const breadcrumb = [{
    "@type": "ListItem",
    "position": 1,
    item: {
      "@type": "WebSite",
      "@id": domain,
      name: "ホーム"
    }
  }]

  list && list.map((item, i) => {
    const listItem = {
      "@type": "ListItem",
      position: i + 2,
      item: {
        "@type": item.type,
        "@id": `${domain}${item.path}`,
        name: item.name
      }
    }
    breadcrumb.push(listItem)
  })

  return {
    "@context": "http://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb
  }
}

const BlogPosting = (data, domain, location) => {
  const { title, description, ogp, date, modifiedDate } = data

  // 画像URLの絶対URL化
  const imageUrl = ogp.startsWith('http') ? ogp : `${domain}${ogp.startsWith('/') ? '' : '/'}${ogp}`;

  const blogPosting = {
    "@context": "http://schema.org",
    "@type": "BlogPosting",
    "name": title,
    "headline": title.slice(0, 110),
    "image": {
      "@type": "ImageObject",
      "url": imageUrl
    },
    "description": description,
    "datePublished": formatISO8601(date),
    "dateModified": formatISO8601(modifiedDate || date),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${domain}${location}`
    },
    "author": author(domain),
    "publisher": publisher(domain),
  }

  return blogPosting
}

const FaqPage = (data, location) => {
  if (!data.faq) return null;
  const faq = data.faq;
  if (!faq || !Array.isArray(faq) || faq.length === 0) {
    return null;
  }
  const faqList = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": []
  }
  faq.forEach((item) => {
    const question = item.q;
    const answer = item.a;
    if (!question || !answer) return;
    const basePageUrl = `${siteMetadata.siteUrl}${location}`;

    const htmlContent = marked.parse(answer);
    const plainAnswer = htmlContent
      .replace(/<p>/gi, '')
      .replace(/<\/p>\s*$/gi, '')
      .replace(/<\/p>/gi, '')
      .replace(/href="#([^"]*)"/gi, `href="${basePageUrl}?data_structure=faq#$1"`)
      .replace(/<(?!a|b|i|strong|em|br|\/a|\/b|\/i|\/strong|\/em|\/br)[^>]*>/gi, '')
      .trim();

    const entry = {
      "@type": "Question",
      "name": question.replace(/<[^>]*>?/gm, '').trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": plainAnswer
      }
    };
    faqList['mainEntity'].push(entry);
  })

  return faqList.mainEntity.length > 0 ? faqList : null;
}
