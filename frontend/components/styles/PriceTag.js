import styled from 'styled-components';

const PriceTag = styled.span`
  background: ${props => props.theme.grey};
  transform: rotate(3deg);
  /* color: ${props => props.theme.offWhite}; */
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0,0,0, 0.5);
  font-weight: 600;
  padding: 5px;
  line-height: 1;
  font-size: 3rem;
  display: inline-block;
  position: absolute;
  top: -3px;
  right: -3px;
`;

export default PriceTag;
