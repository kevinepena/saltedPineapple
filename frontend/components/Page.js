import styled, { ThemeProvider, injectGlobal } from 'styled-components';
import React, { Component } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';

const theme = {
    red: '#DAD7CD',
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
};

const StyledPage = styled.div`
    background: white;
    color: ${props => props.theme.black};
`;

const Inner = styled.div`
    max-width: ${props => props.theme.maxWidth};
    margin: 0 auto;
    padding: 2rem;
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

    state = {
        scroll: false,
        mobile: true,
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scroll);
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll);
        window.removeEventListener('resize', this.resize);
    }

    resize = (e) => {
        if (e.path[0].screen.availWidth < 800) {
            this.setState({ mobile: true })
        } else {
            this.setState({ mobile: false })
        }
    }

    mobile = (open = false) => {
        this.setState({ open: open });
    }

    render() {
        
        return (
            <ThemeProvider mobile={this.state.mobile} theme={theme}>
                <StyledPage>
                    <Meta />
                    <Header />
                    <Inner>{this.props.children}</Inner>
                </StyledPage>
            </ThemeProvider>
        )
    }
}

export default Page;