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
  font-size: 1.1em;
  color: var(--color-blue);
  text-align: center;
}
.p-section {
  margin-top: 30px;

}
 @media screen and (min-width: 768px){
   width: 200px;

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
    padding: 0 15px;

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
      padding: 15px;
      font-weight: bold;
      letter-spacing: 0.1em;
      font-size: 1.4rem;
    }
  }
  .l-container {
    padding: 0;
  }
`

