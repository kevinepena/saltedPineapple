import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from './Footer';

ReactGA.initialize('UA-137376142-2');
ReactGA.pageview(window.location.pathname + window.location.search);

const theme = {
    red: '#797C80',
    black: '#393939',
    darkGrey: '#3A3A3A',
    grey: '#797C80',
    mummy: '#808F85',
    yellow: '#F5BB00',
    mint: '#BCD8C1',
    green: '#91C499',
    blue: '#7FB7BE',
    skyblue: '#8EDCE6',
    egg: '#F2E9DC',
    lightgrey: '#E1E1E1',
    offWhite: '#EDEDED',
    maxWidth: '1000px',
    bs: '0 12px 24px 0 rgba(0, 0, 0, 0.09)',
    ln1: 'linear-gradient(-15deg,#A4E869 0%,#FBD786 100%)',
    ln2: 'linear-gradient(30deg, #f7797d, #FBD786, #C6FFDD)',
    ln3: 'linear-gradient(331deg, #fdbb2d, #A4E869)',
    ln4: 'linear-gradient(to right, #F2C94C, #F2994A)',
    ln5: 'linear-gradient(-22deg, #D39D38, #ABC8C7)'
};

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;

    .hero {
        font-family: 'ahoy';
        letter-spacing: 1px;
        line-height: initial;
        font-size: 3em;
        @media(min-width: 375px) {
            font-size: 4em;
        }
        @media(min-width: 450px) {
            font-size: 5em;
        }
        @media(min-width: 800px) {
            font-size: 10em;
        }
        .salt {
            z-index: 2;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            background-color: rgba(225,225,225, 0.7);
            p {
                color: ${props => props.theme.grey};
                text-shadow: 1px 1px 3px rgba(0,0,0, 0.5);
                margin: 0 auto;
                padding: 0;
            }
            p:nth-of-type(1) {
                grid-column: 1 / -1;
            }
        }
        .water {
            width: 100%;
            height: 350px;
            object-fit: cover;
        }
        .paral {
                /* position: absolute; */
                padding: 15px;
                width: 100%;
                z-index: 0;
                /* 
                margin-top: 5px;
                position: absolute;
                 */
                background-image: url('https://res.cloudinary.com/kevinpena/image/upload/v1553461303/sickFits/nglrrftuqmbor8j4c4wy.jpg');
                /* height: 350px; */
                background-position: center;
                background-repeat: no-repeat;
                background-size: cover;
                /* font-stretch: ; */
                /* background-attachment: fixed; */
    
                img {
                    width: 100%;
                }
            }
        }

            
            @keyframes heartBeat {
    0% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    
    14% {
        -webkit-transform: scale(1.3);
        transform: scale(1.3);
    }
    
    28% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
    
    42% {
        -webkit-transform: scale(1.3);
        transform: scale(1.3);
    }
    
    70% {
        -webkit-transform: scale(1);
        transform: scale(1);
    }
}

@keyframes fadeIn {
    0% {
        /* transform: translateY(-100%); */
        opacity: 0;
    }
    100% {
        /* transform: translateY(0); */
        opacity: 1;
    }
}

.fadein {
    animation: 1s ease-out 0s 1 fadeIn;
}


`;

injectGlobal`
@font-face {
    font-family: 'radnika_next';
    src: url('/static/radnikanext-medium-webfont.woff2')
    format('woff2');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'ahoy';
        src: url('/static/ahoy.ttf')
        format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'hipster';
        src: url('/static/sweethipster.ttf')
        format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    @font-face {
        font-family: 'raleway';
        src: url('/static/raleway-regular.ttf')
        format('truetype');
        font-weight: normal;
        font-style: normal;
    }
    html {
        box-sizing: border-box;
        font-size: 10px;
    }
    * {
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        :focus {
            outline: none;
        }
    }
    *, *:before, *:after {
            box-sizing: inherit;
    }
    body {
            padding: 0;
            margin: 0;
            font-size: 1.5rem;
            line-height: 2;
            font-family: 'radnika_next'
    }
    a {
        text-decoration: none;
        color: ${theme.black}
    }
    
`

class Page extends Component {

    render() {

        return (
            <ThemeProvider theme={theme}>
                <StyledPage>
                    <Meta />
                    <Header />
                    <Inner>{this.props.children}</Inner>
                    <Footer />
                </StyledPage>
            </ThemeProvider>
        )
    }
}

export default Page;