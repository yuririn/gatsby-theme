import styled from 'styled-components';

export const Sidebar = styled.div`
& > div:first-child{
  margin-bottom: 20px;

  padding-left: 15px;
  padding-right: 15px;
   @media screen and (min-width: 768px){
     padding-left: 0;
     padding-right: 0;
   }
  div{
    margin-bottom: 0;
  }
}
h2 {
  margin-bottom: 20px;
  font-size: 1.3em;
  color: var(--color-blue);
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  line-height: 1.4;
  letter-spacing: .1em;

  &::after{
    content: "";
    display: block;
    width: 4px;
    box-shadow: 10px 0 0  #ccc,-10px 0 0  #ccc;
    height: 4px;
    border-radius: 50%;
    background: #ccc;
    margin: 10px auto 0;
    }
  }
.p-section {
  margin-top: 60px;
  @media screen and (min-width: 768px){
     margin-bottom: 20px;
   }

}
 @media screen and (min-width: 768px){
   div.result-inner {
     margin-bottom: -30px!important;
   }
   width: 250px;
   padding-right: 30px;

  .inner {
    position: sticky;
    top: 0;
    padding-top: 65px;
    padding-right: 30px;
  }
  }
  @media screen and (min-width: 1020px){
	  width: 300px;

  }

  .sideCateList {

    @media screen and (min-width: 768px){
      padding: 0;
    }

    li {
      text-align: center;
      border-bottom: 1px solid #e9e9e9;
    }

    a {
      display: block;
      text-decoration: none;
      color: var(--color-link);
      padding: 20px 15px;
      font-weight: bold;
      letter-spacing: 0.1em;
      font-size: 1.6rem;
      @media screen and (min-width: 768px){
        padding: 15px;
         font-size: 1.4rem;
       }
    }
  }
  .l-container {
    padding: 0;
  }
`

