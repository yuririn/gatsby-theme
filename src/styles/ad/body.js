import styled from "styled-components";

export const Body = styled.section`
margin-top: 30px;
background #fff;
border-radius:16px;
padding: 16px;
@media screen and (min-width: 768px) {
         margin-top: 50px;
         border-radius: 24px;
         width: calc(100% - 250px);
         padding: 32px 32px 40px;
     }
     .ads {
      margin-top: 50px;
     }

     @media screen and (min-width: 1020px) {
         width: calc(100% - 300px);
         padding: 32px 52px 40px;
     }
    h2 {
      font-size: 20px;
      text-align: center;
      margin-bottom: 16px;
      @media screen and (min-width: 768px) {
          font-size: 24px;
          margin-bottom: 24px;
      }
    }
    ul {
      flex-wrap: wrap;
      gap: 16px;
      display: flex;
      li {
        width: calc(50% - 8px);
        a {
          display: block;
          color: var(--color);
          text-decoration: none;
          @media screen and (min-width: 768px) {
            &:hover {
                opacity: 0.7;
            }
          }
        }
      }
    }

    @media screen and (min-width: 768px) {

      ul {
          gap: 24px;
          li {
            width: calc(100%);

          }
        }
    }
    @media screen and (min-width: 1020px) {

        ul {
          gap: 32px;
          li {
            width: calc(50% - 16px);

          }
        }
    }
    h3 {
      margin-top: 8px;
      font-size: 16px;
      @media screen and (min-width: 768px) {
        font-size: 20px;
        line-height: 1.4;

      }
    }
`;
