import styled from 'styled-components';
import react, { Component } from 'react';

const Foot = styled.footer`
    background-color: ${props => props.theme.black};
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    color: ${props => props.theme.lightgrey};
    font-size: 10px;
    .waterpine {
        .img {
            width: 100%;
            background-image: url('https://res.cloudinary.com/kevinpena/image/upload/v1553461305/sickFits/puz9vlvdy5sezyngbyvu.jpg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        }
        .opaque {
            background-color: rgba(57,57,57, 0.9);
            transition: background-color 0.1s;
            width: 100%;
            height: 100%;
            display: grid;
            padding: 15px;
            grid-template-columns: repeat(3, 1fr);
            @media(max-width: 500px) {
                display: flex;
                flex-direction: column-reverse;
                align-items: center;
                text-align: center;
            }
        }
        .img:hover {
            .opaque {
            background-color: rgba(57,57,57, 0.7);                
            }
        }
        grid-column: 1/ -1;
    

    a {
    color: ${props => props.theme.lightgrey};
    text-decoration: underline;
    }

    div p, div p a {
        vertical-align: middle;
        font-size: 10px;
    }

    div:nth-of-type(1) > p {
        margin-left: 15px;
    }
    div:nth-of-type(2) {
        text-align: center;
        display: flex;
        flex-direction: row;
        justify-self: center;
        vertical-align: middle;
    }
    div:nth-of-type(3) {
        text-align: right;
        display: flex;
        flex-direction: row;
        justify-self: right;
        vertical-align: middle;
        margin-right: 15px;
        @media(max-width: 500px) {
                    justify-self: center;
            }
    }

    div:nth-of-type(2) > p:nth-of-type(2) {
        text-align: center;
        margin: 5px 10px 0px 10px;
    }

}

.heartbeat {
    -webkit-animation-name: heartBeat;
        animation-name: heartBeat;
        -webkit-animation-duration: 1.3s;
        animation-duration: 1.3s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        animation-iteration-count: 2;
}

    .heart:hover {
        -webkit-animation-name: heartBeat;
        animation-name: heartBeat;
        -webkit-animation-duration: 1.3s;
        animation-duration: 1.3s;
        -webkit-animation-timing-function: ease-in-out;
        animation-timing-function: ease-in-out;
        animation-iteration-count: infinite;
    }
    
    .instagram {
        margin-left: 15px;
        background: radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%), radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%), radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%), radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent), linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%);
        border-radius: .2em;
        font-size: 4em;
        height: 1em;
        position: relative;
        width: 1em;
    }

    
    .instagram:before, .instagram:after {
        color: #fff;
        content: '';
        display: block;
        position: absolute;
        border: .075em solid;
    }
    .instagram:before {
        border-radius: inherit;
        height: .75em;
        -webkit-transform: translate(0.125em, 0.125em);
        transform: translate(0.125em, 0.125em);
        width: .75em;
    }
    .instagram:after {
        border-radius: 1em;
        box-shadow: .2em -.2em 0 -.16em;
        height: .4em;
        -webkit-transform: translate(0.3em, 0.3em);
        transform: translate(0.3em, 0.3em);
        width: .4em;
    }

`;

class Footer extends Component {

    state = {
        scroll: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll)
    }

    scroll = (e) => {
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
            this.setState({ scroll: true })
        }
    }
    render() {
    return(
    <Foot>
        <div className="waterpine">
            <div className="img">
                <div className="opaque">
                    <div>
                        <p>© 2019 Salted Pineapple. All rights reserved.</p>
                    </div>
                    <div>
                        <p>Made with</p>
                        <p>
                        <svg className={this.state.scroll ? 'heartbeat heart' : 'heart'} version="1.1" width="25px" height="25px" viewBox="0 0 90 60">
                            <path fill="none" stroke="#ff6961" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="10" d="
                            M45.137,23.041c4.912-24.596,40.457-27.775,42.128-0.435c1.398,22.88-21.333,40.717-42.128,50.522 M45.137,23.041
                            C40.225-1.555,5.057-4.734,3.387,22.606c-1.398,22.88,20.955,40.717,41.75,50.522"/> 
                        </svg>
                        </p>
                        <p>in Rincón, PR</p>
                    </div>
                    <div>
                        <p>Follow us on</p>
                        <a href="https://www.instagram.com/saltedpineapple/">
                            <div className="instagram">
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </Foot>
)}
    }

export default Footer;