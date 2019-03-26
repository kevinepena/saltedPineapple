import styled from 'styled-components';

const Item = styled.div`
  background: white;
  border: 1px solid ${props => props.theme.offWhite};
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  transition: all 1s;
  img {
    /* flex-basis: 33%; */
    width: 100%;
    overflow: scroll;
    object-fit: fill;
    max-height: 100%;
  }
  p {
    font-size: 12px;
    line-height: 2;
    font-weight: 300;
    flex-grow: 1;
    padding: 0 3rem;
    font-size: 1.5rem;
    color: ${props => props.theme.grey};
  }
  .tags {
    display: none;
    a {
      padding: 5px;
    }
  }
  .buttonList {
    display: grid;
    width: 100%;
    /* grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); */
    grid-template-columns: repeat(3, 1fr);
    grid-template-columns: 1fr;
    grid-gap: 1px;
    /* background: ${props => props.theme.lightgrey}; */
    & > * {
      transition: all 0.2s;
      /* border: 2px solid ${props => props.theme.grey}; */
      background-color: #fff;
      margin: 5px 15px;
      cursor: pointer;
      border-radius: 5px;
      font-family: 'ahoy';
      line-height: 1rem;
      font-size: 5rem;
      padding: 2rem;
      box-shadow: ${props => props.theme.bs};
      border-image: -webkit-linear-gradient(to left, #D39D38, #ABC8C7);
      border-image: linear-gradient(to left, #D39D38, #ABC8C7);
      border-width: 2px;
      border-image-slice: 1;
    }
    .addcart {
      color: ${props => props.theme.mummy};
      /* background-image: linear-gradient(-22deg, #D39D38, #ABC8C7);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; */
    }
    .addlocalcart {
      color: ${props => props.theme.mummy};
      grid-column: 1/-1;
      /* background-image: linear-gradient(-22deg, #D39D38, #ABC8C7);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent; */
    }
    
    .delete {
      background: #cb2d3e; 
      background: -webkit-linear-gradient(to right, #ef473a, #cb2d3e); 
      background: linear-gradient(to right, #ef473a, #cb2d3e); 
      background-clip: text;
      -webkit-background-clip: text;
      border-image: -webkit-linear-gradient(to right, #ef473a, #cb2d3e);
      border-image: linear-gradient(to right, #ef473a, #cb2d3e);
      border-width: 2px;
      border-image-slice: 1;
    }
  }
`;

export default Item;
