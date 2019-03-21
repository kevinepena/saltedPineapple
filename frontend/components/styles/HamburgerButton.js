import styled from 'styled-components';
import React, { Component } from 'react';

const BetterButton = styled.div`
.menu {
  height: 70px;
  width: 50px;
  position: relative;
  margin: auto;
  padding-top: 15px;
  -moz-transition: 0.3s;
  -o-transition: 0.3s;
  -webkit-transition: 0.3s;
  transition: 0.3s;
  cursor: pointer;
}
    .bar {
  height: 2px;
  width: 35px;
  display: block;
  margin: 10px auto;
  position: relative;
  border: 1px solid ${props => props.theme.grey};
  /* background-color: rgba(235, 235, 235, 0.9); */
  background-color: ${props => props.theme.lightGrey};
  -moz-border-radius: 10px;
  -webkit-border-radius: 10px;
  border-radius: 10px;
  -moz-transition: 0.4s;
  -o-transition: 0.4s;
  -webkit-transition: 0.4s;
  transition: 0.4s;
  /* border-bottom: 2px solid #494e52; */
}

 .bar {
  position: absolute;
}
 .bar:nth-of-type(1) {
  top: 20px;
  -moz-transition: top 0.3s ease 0.3s, -moz-transform 0.3s ease-out 0.1s;
  -o-transition: top 0.3s ease 0.3s, -o-transform 0.3s ease-out 0.1s;
  -webkit-transition: top 0.3s ease, -webkit-transform 0.3s ease-out;
  -webkit-transition-delay: 0.3s, 0.1s;
  transition-delay: 0.3s, 0.1s;
  transition: top 0.3s ease 0.3s, transform 0.3s ease-out 0.1s;
  -moz-animation: mrotr 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
  -webkit-animation: mrotr 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
  animation: mrotr 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
}
 .bar:nth-of-type(2) {
  top: 30px;
  -moz-transition: ease 0.3s 0.3s;
  -o-transition: ease 0.3s 0.3s;
  -webkit-transition: ease 0.3s;
  transition-delay: 0.3s;
  transition: ease 0.3s 0.3s;
  -moz-animation: fade 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
  -webkit-animation: fade 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
  animation: fade 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
}
.bar:nth-of-type(3) {
  top: 40px;
  -moz-transition: top 0.3s ease 0.3s, -moz-transform 0.3s ease-out 0.1s;
  -o-transition: top 0.3s ease 0.3s, -o-transform 0.3s ease-out 0.1s;
  -webkit-transition: top 0.3s ease, -webkit-transform 0.3s ease-out;
  -webkit-transition-delay: 0.3s, 0.1s;
  transition-delay: 0.3s, 0.1s;
  transition: top 0.3s ease 0.3s, transform 0.3s ease-out 0.1s;
  -moz-animation: mrotl 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
  -webkit-animation: mrotl 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
  animation: mrotl 2s cubic-bezier(0.5, 0.2, 0.2, 1.01);
}

${props => props.pushed ? `
.bar{
  border: none;
  background-color: rgba(235, 235, 235, 0.9);
}
 .bar:nth-of-type(1) {
  top: 30px;
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  -moz-transition: top 0.3s ease 0.1s, -moz-transform 0.3s ease-out 0.5s;
  -o-transition: top 0.3s ease 0.1s, -o-transform 0.3s ease-out 0.5s;
  -webkit-transition: top 0.3s ease, -webkit-transform 0.3s ease-out;
  -webkit-transition-delay: 0.1s, 0.5s;
  transition: top 0.3s ease 0.1s, transform 0.3s ease-out 0.5s;
}
 .bar:nth-of-type(2) {
  opacity: 0;
}
  .bar:nth-of-type(3) {
  top: 30px;
  -moz-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  -moz-transition: top 0.3s ease 0.1s, -moz-transform 0.3s ease-out 0.5s;
  -o-transition: top 0.3s ease 0.1s, -o-transform 0.3s ease-out 0.5s;
  -webkit-transition: top 0.3s ease, -webkit-transform 0.3s ease-out;
  -webkit-transition-delay: 0.1s, 0.5s;
  transition: top 0.3s ease 0.1s, transform 0.3s ease-out 0.5s;
}
` : ``}

`;

class Button extends Component {

    render() {
        return (
            <BetterButton pushed={this.props.open}>
                <div className="menu">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"> </div>
                </div>
            </BetterButton>
        )
    }
}

export default Button;