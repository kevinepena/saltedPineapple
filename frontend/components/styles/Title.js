import styled from 'styled-components';

const Title = styled.h3`
  margin: 0 1rem;
  text-align: center;
  transform: skew(-15deg) rotate(0deg);
  margin-top: -1rem;
  text-shadow: 2px 2px 0 rgba(220, 220, 220, 1);
  a {
    /* background: ${props => props.theme.red}; */
    display: inline;
    line-height: 1.3;
    font-size: 2rem;
    text-align: center;
    color: ${props => props.theme.grey};
    color: #808F85;
    padding: 0 1rem;
  }
`;

export default Title;
