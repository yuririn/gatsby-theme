import styled from 'styled-components';

export const Edit = styled.div`
line-height: 2;
p {
    margin-bottom: 10px;
}
.p-btn--detail {
  text-decoration: none;
}
h2 {
    padding-top: 50px;
    margin-top: -40px;
    color: var(--color-d-blue);
    font-size: 2.08rem;
    font-weight: 700;
    margin-bottom: 20px;

    &:after {
      margin-top: 5px;
      content: "";
      display: block;
      background: #c03363;
      width: 30px;
      height: 2px;
  }
}

h3 {
   color: var(--color-d-blue);
   margin-bottom: 15px;
   font-size: 2rem;
   font-weight: 700;
  }
  h4 {
    color: var(--color-blue);
    font-weight: 700;
    margin-bottom: 10px;
    font-size: 1.7rem;
}
h2~h2, h2~h3, h2~h4, h3~h2, h3~h3, h3~h4, h4~h2, h4~h3, h4~h4 {
    padding-top: 70px;
    margin-top: -40px;
}
a {
  color: var(--color-link);
  &:hover {
    text-decoration: none;
  }
}
ul,ol {
  list-style:none;
}
ul > li {
    padding-left: 1.5em;
    position: relative;
    margin-bottom: .5em;

    &::before {
    left: 8px;
    top: 6px;
    display: block;
    color: #001d7c;
    content: "";
    width: .3em;
    height: .6em;
    background: none;
    position: absolute;
    transform: rotate(
    45deg
    );
        border: 4px solid var(--color-accent);
        border-width: 0 3px 3px 0;
    }
  }
  ol {
    counter-reset: num;
    ol ol {
      display: none;
    }

    li:first-child {
      margin-top: .5em;
    }
    li {
      padding-left: 2.3em;
      position: relative;
      margin-bottom: .5em;
    }
    li:before {
        counter-increment: num;
        content: counters(num,".") ". ";
        position: absolute;
        left: 0;
        text-align: right;
        width: 2em;
        display: inline-block;
        font-weight: 700;
        color: var(--color-blue);
    }
  }
  *:not(pre) > code[class*="language-"] {
    box-shadow: none;
    border: none;
    background: var(--color-d-blue);
    padding: 3px 5px;
  }
  pre[class*="language-"] {
    border-radius: .5em;
    border: none;
    background: #131a37;
    box-shadow: none;
    margin: 0 0 30px;
    overflow: auto;
    padding: 1em;
  }
  strong {
    font-weight: 700;
    background: linear-gradient(transparent 60%,#edef5c 0);
    font-weight: bolder;
  }
  em {
    color: var(--color-accent);
    font-style: normal;
    font-weight: bolder;
  }
  table {
    td,th {
      border: 1px solid #bbb;
      padding: .4em .7em;
    }
    th {
      font-size: 0.9em;
      background: #eee;
    }
    margin-bottom: 30px;
  }
  code[class*="language-"], pre[class*="language-"] {
    font-family: monospace;
    text-shadow: none;
  }
  blockquote {
    background: #eee;
    padding: 20px 40px 20px 40px;
    margin-bottom: 30px;
    position: relative;
    margin-top: 40px;
    border-radius: 15px;

    &::before {
      left: 10px;
      top: -8px;
      height: 50px;
      width: 8px;
      display: block;
      content: '';
      transform: skewX(-35deg);
      position: absolute;
      border-left: 8px double #ccc;
    }
    &::after {
      right: 0px;
      bottom: -8px;
      height: 50px;
      width: 8px;
      display: block;
      content: '';
      transform: skewX(-35deg);
      position: absolute;
      border-left: 8px double #ccc;
    }
  }
  a.article-link {
    text-decoration: none;
    margin-bottom: 15px;
    display: block;

    .article-link__img {
      width: 120px;
      border-radius: 10px;
      overflow: hidden;
      display: block;
        @media screen and (min-width: 768px){
          width: 150px;
        }
    }

    time {
      font-weight: 700;
      color:  var(--color-blue);
    }

    .article-link__main {
      padding-left: 15px;
      @media screen and (min-width: 768px){
          width: calc(100% - 150px);
        }

      .description {
        display: none;
        @media screen and (min-width: 768px){
          display: block;
          font-size: 1.2rem;
          color: var(--font-color);
        }
      }
    }
    section {
      border-radius: 10px;
      display: flex;
      align-items: flex-start;
      padding: 15px;
      background: #f7f7f7;
      overflow: hidden;
      border: 1px solid var(--color-blue);
      position: relative;
      z-index: 1;
      transition: .3s;
      &:hover{
        @media screen and (min-width: 768px){
            &::before {
            left: 0;
            top: 0;
          }
          &::after {
            right: 6px;
          }
        }
      }

      &::before {
        z-index: -1;
        position: absolute;
        left: -20px;
        top: -20px;
        content: "";
        display: block;
        border-left: 50px solid transparent;
        border-top: 50px solid transparent;
        border-color: var(--color-blue) transparent transparent  var(--color-blue);
        border-style: solid;
        border-width: 50px;
        transition: .3s;
    }

    &::after {
      bottom: 10px;
      right: 10px;
      position: absolute;
      font-size: 1.4rem;
      letter-spacing: .2em;
      transition: .3s;
      color: var(--color-link);
      content: "Read More>";
      }
    }
  }
`
