import styled from 'styled-components';

const NavStyles = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  flex: 1;
  justify-content: flex-end;
  font-size: 2rem;

  > div {
    display: inline-grid;
  }
  
  a,
  button {
    /* + */
    font-family: 'raleway';
    color: #393939;
    position: relative;
    /* + */
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 1em;
    background: none;
    border: 0;
    cursor: pointer;
    @media (max-width: 700px) {
      font-size: 10px;
      padding: 0 10px;
    }
    &:before {
      /* content: '';
      width: 2px;
      background: ${props => props.theme.white};
      height: 100%;
      left: 0;
      position: absolute;
      transform: skew(-20deg);
      top: 0;
      bottom: 0;
      position: absolute; */
      /* max-width: 0; */
    position: absolute;
    overflow: hidden;
    /* padding: 10px 0; */
    /* border-bottom: 2px solid #fff; */
    color: ${props => props.theme.white};
    content: attr(data-hover);
    -webkit-transition: color 0.2s;
    -moz-transition: color 0.2s;
    transition: color 0.2s;
    }
    &:after {
      /* height: 2px;
      background: ${props => props.theme.blue};
      content: '';
      width: 0;
      position: absolute;
      transform: translateX(-50%);
      transition: width 0.4s;
      transition-timing-function: cubic-bezier(1, -0.65, 0, 2.31);
      left: 50%;
      margin-top: 2rem; */
    }
    &:hover,
    &:focus {
      outline: none;
      &:before {
        max-width: 100%;
        color: ${props => props.theme.blue};
      }
      &:after {
        /* width: calc(100% - 60px); */
      }
    /* @media (max-width: 700px) {
        width: calc(100% - 10px);
    } */
    }
  }
  .dropdown {
    /* visibility: none; */
    opacity: 0;
    position: absolute;
    transform: translateY(30%);
    transition-duration: .2s;
    /* z-index: 1; */
  }

  .searchbar {
    transition: flex 0.7s ease-in-out ;
    /* cubic-bezier(0.61, -0.19, 0.7, -0.11); */
    
    /* transition: all .2s ; */
    /* display: ${props => props.search ? '' : 'none'}; */
    width: ${props => props.search ? '100%' : '0'};
    flex: ${props => props.search ? 6 : 0};
  }
  
  .searchbar:focus-within {
    transition: flex 0.7s ease-in-out ;
    /* cubic-bezier(0.61, -0.19, 0.7, -0.11); */
    
    /* transition: all .2s ; */
    width: 100%;
    flex: 6;
  }

  .me:hover, .me:focus-within {
    .dropdown {
      z-index: 1;
      opacity: 1;
      transition: all .2s;
    transform: translateY(40%);
    background-color: ${props => props.theme.offWhite};
    visibility: visible;
    }
  }
  .shop:hover, .shop:focus-within {
    .dropdown {
      z-index: 500;
      opacity: 1;
      transition: all .2s;
    transform: translateY(55%);
    background-color: ${props => props.theme.offWhite};
    visibility: visible;
    }
  }

  .shop, .sell {
    opacity: ${props => props.search ? 0 : 1};
    /* width: ${props => props.search ? '0px' : ''}; */
    /* position: ${props => props.search ? 'absolute' : ''}; */
    /* display: ${props => props.search ? 'none' : ''}; */
    transform: ${props => props.search ? 'translateX(-10%)' : 'translateX(0%)'} ;
    transition: ${props => props.search ? 'opacity .2s cubic-bezier(0.645, 0.045, 0.355, 1), translate .5s ease' : 'opacity 2.5s cubic-bezier(0.645, 0.045, 0.355, 1), transform 2.3s ease'};
    flex: ${props => props.search ? '0' : ''};
    flex-shrink: ${props => props.search ? '10' : ''};
  }


  @media (max-width: 1300px) {
    /* border-top: 1px solid ${props => props.theme.lightgrey}; */
    /* width: 100%; */
    /* ${props => props.search ? 'justify-self:right;' : ''} */
    font-size: 1.5rem;

  }
`;

export default NavStyles;
