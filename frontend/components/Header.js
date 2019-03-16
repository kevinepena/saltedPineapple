import Nav from './Nav';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import Cart from './Cart';
import Search from './Search';

Router.onRouteChangeStart = () => {
    NProgress.start();
    // console.log('OnRouterChangeStart')
};

Router.onRouteChangeComplete = () => {
    NProgress.done();
    // console.log('OnRouterChangeComplete')
};

Router.onRouteChangeError = () => {
    NProgress.done();
    // console.log('OnRouterChangeError')
};

const Logo = styled.div`
    /* margin: 0 auto; */
    height: 80px;
    font-family: 'hipster';
    font-size: 4rem;
    margin-left: 2rem;
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    a {
        /* padding: 0.5rem 1rem; */
        /* background: ${props => props.theme.yellow}; */
        color: white;
        text-transform: uppercase;
        text-decoration: none;
        span {
            font-size: 1.3em;
        }
    }
    @media (max-width: 1300px) {
        margin: 0 auto;
        text-align: center;
    }
`

const StyledHeader = styled.header`
    .bar {
        border-bottom: 3px solid ${props => props.theme.grey} ;
        display: grid;
        grid-template-columns: 100px 1fr;
        justify-content:  space-between;
        align-items: stretch;
        .wrapper {
            width: 75px;
            height: 75px;
            margin: 0 auto;
        }
        @media(max-width: 1300px) {
            grid-template-columns: 100px 1fr;
            justify-content: center;
        }
        @media(max-width: 500px) {
            grid-template-columns: 1fr;
            div:nth-of-type(2) {
                /* position: absolute; */
                margin: 0 auto;
                ul {
                    display: grid;
                }
            }
        }
    }
    .sub-bar {
        display: grid;
        grid-template-columns: 1fr auto;
        border-bottom: 1px solid ${props => props.theme.lightgrey}
    }
    .apple {
        width: 70px;
        position: absolute;
        top: 3px;
        left: -20px;
        z-index: -1;
    }
`


class Header extends React.Component {

    state = {
        scroll: false,
        mobile: false,
        open: false
    }

    componentDidMount() {
        window.addEventListener('scroll', this.scroll);
        window.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.scroll);
        window.addEventListener('resize', this.resize);
    }

    resize = (e) => {
        if (e.path[0].screen.availWidth < 700) {
            this.setState({ mobile: true })
        } else {
            this.setState({ mobile: false })
        }
    }

    scroll = (e) => {
        if (e.path[1].scrollY > 75) {
            this.setState({ scroll: true })
        } else {
            this.setState({ scroll: false })
        }
    }

    mobile = (open = false) => {
        this.setState({ open: open });
    }



    render() {
        return (
            <StyledHeader>
                <div className='bar'>
                    <Logo>
                        <Link href="/">
                            <a>
                                {/* <div className="wrapper"> */}
                                <span>
                                    SP
                        </span>
                                <img className="apple" src='../static/pineapple.svg' />
                                {/* </div> */}
                            </a>
                        </Link>
                    </Logo>

                    <Nav />
                </div>
                <div className="sub-bar">
                    <Search />
                </div>
                <div><Cart /></div>
            </StyledHeader>
        )
    }
}

export default Header;