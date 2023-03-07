import styled from "styled-components"

export const Favorite = styled.div`
  ol {
    counter-reset: num;
  }
  @media screen and (min-width: 768px) {
    .add-numbering {
      justify-content: center;
    }
  }
  li {
    counter-increment: num;
    position: relative;
    &:before {
      color: #fff;
      position: absolute;
      z-index: 1;
      content: counter(num);
      width: 35px;
      height: 35px;
      font-size: 2.2rem;
      top: -8px;
      left: -8px;
      line-height: 1.2;
      text-indent: 6px;
      background: #001d7c;
      border-radius: 50%;
      font-weight: 700;
      border: 3px double #fff;
      box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
      text-shadow: 0 0 5px rgba(0, 0, 0, 0.4);
    }
    &::after {
      color: #fff;
      position: absolute;
      z-index: 1;
      content: "位";
      font-size: 1.2rem;
      top: 5px;
      left: 15px;
      font-weight: 700;
      }
      &:first-child::before {
        background: #9a8904;
        transform: scale(1.3);
      }
      &:nth-child(2)::before {
        background: #656565;
        transform: scale(1.1);
      }
      &:nth-child(3)::before {
        background: #674822;
        transform: scale(1.1);
      }
    }
  }
`
