import Nav from './Nav';
import Link from 'next/link';
import styled from 'styled-components';
import Router from 'next/router';
import NProgress from 'nprogress';
import Cart from './Cart';
import HamburgerButton from './styles/HamburgerButton';
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
    position: relative;
    z-index: 2;
    transform: skew(-7deg);
    a {
        /* padding: 0.5rem 1rem; */
        /* background: ${props => props.theme.yellow}; */
        color: white;
        text-transform: uppercase;
        text-decoration: none;
        :hover {
        .inside {
            animation: swing .5s;
        }
        }
        .saltedpineapple span {
            font-size: 1.3em;

        }

        > div {
            /* margin-top: 10px; */
            font-size: 1.1em;
        }
    }
    @media (max-width: 1300px) {
        /* margin: 0 auto; */
        text-align: center;
    }
    @media(min-width: 801px) {
        margin-left: 3rem;
    }
    @media(max-width: 800px) {
        grid-column: 2;
    }
`

const StyledHeader = styled.header`
        margin-bottom: 82px;

        /* top: 0; */
        /* position: absolute; */
            .bar {
                /* position: ${props => props.peek ? '' : 'fixed'}; */
                position: fixed;
                /* transform: translateY(0%); */
                opacity: 1;
                top: 0;
                transition: top 0.2s ease-in-out;
                /* top: ${props => props.peek ? '0' : '-81px'}; */
                background-color: ${props => props.theme.offWhite};
                width: 100%;
                z-index: 500;
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
                    grid-template-columns: 300px 1fr;
                    justify-content: center;
                }
                @media(min-width: 801px) {
                    .searchcomp {
            
                    }
                    .ham, .searchcomp, > .searchbar {
                        display: none;
                    }
                }
                @media(max-width: 800px) {
                    
                    grid-template-columns: 50px 1fr 50px;
                    /* position: absolute; */
                    /* margin: 0 auto; */
                    .searchcomp {
                        display: flex;
                        > div {
                            align-self: center;
                            margin-top: 10px;
                        }
                    }
                    > .searchbar {
                        z-index: -1;
                        transition: all 0.2s ease-in-out;
                        position: absolute;
                        opacity: 0;
                        top: 40px;
                        width: 100%;
                    }
                    .searchbar-open {
                        z-index: 0;
                        top: 82px;
                        opacity: 1;
                        transition: all 0.2s ease-in-out;

                    }
                    
                    ul {
                        justify-content: center;
                        background-color: ${props => props.theme.offWhite};
                        position: absolute;
                        display: grid;
                        z-index: 20;
                        /* opacity: 0; */
                        transform: translateX(-100%);
                        height: 100vh;
                        width: 100%;
                        transition: transform .4s, opacity .2s;

                        .me {
                            > a {
                                display: none;
                            }
                        }
                        
                        .me .dropdown {
                            /* transform: translateY(100%); */
                        }
                        .shop .dropdown {
                            transform: translateY(185%);
                        }
                        .me .dropdown, .shop .dropdown {
                            opacity: 1;
                        }

                        button {
                            display: inline-flex;
                        }
                    }

                    .navopen {
                            /* background-color: ${props => props.theme.offWhite}; */
                            /* position: absolute; */
                            /* display: grid; */
                            /* z-index: 2; */
                            transition: transform .4s, opacity 0.2;
                            transform: translateX(-0%);
                            /* opacity: 1; */
                            /* height: 100vh; */
                        }
                    }
                }
                
            .bar-up-up { 
                top: -83px;
                /* transform: translateY(-110%); */
                position: fixed;
            } 
            .bar-up { 
                /* position: absolute; */
                top: -83px;
                /* opacity: 0; */
                /* position: fixed; */
                /* position: ${props => props.abs ? 'absolute' : ''}; */
                /* transform: translateY(-110%); */
            } 
            .bar-down-down {
                /* position: absolute; */
                /* transition: translate 0.2s ease-in-out, opacity 0.2s ease-in-out; */
                opacity: 1;
                /* transform: translateY(0%); */
                top: 0;
            }
            .bar-down {
                position: absolute;
                /* transform: translateY(0%); */
                top: 0;
            }
            .abs {
                position: absolute;
            }
            
            .fix {
                position: fixed;
            }
            .sub-bar {
                display: grid;
                grid-template-columns: 1fr auto;
                border-bottom: 1px solid ${props => props.theme.lightgrey}
            }
            .apple {
                width: 60px;
                position: absolute;
                top: 3px;
                left: -18px;
                z-index: -1;
            }
            
            .sht {
                transform: translateY(-105%);
            }
            
            .sp {
                /* visibility: hidden; */
                &:before {
                    content: '';
                    top: 0;
                    /* font-family: 'radnika_next'; */
                    font-size: 15px;
                    position: absolute;
                    overflow: hidden;
                    /* padding: 10px 0; */
                    /* max-width: 0; */
                    /* border-bottom: 2px solid #fff; */
                    color: ${props => props.theme.grey};
                    -webkit-transition: max-width 0.5s;
                    -moz-transition: max-width 0.5s;
                    transition: max-width 0.5s, color 0.2s;
                }
                &:after {
                    content: '';
                    top: 15px;
                    /* font-family: 'raleway'; */
                    font-size: 15px;
                    position: absolute;
                    overflow: hidden;
                    /* padding: 10px 0; */
                    /* max-width: 0; */
                    /* border-bottom: 2px solid #fff; */
                    color: ${props => props.theme.grey};
                    -webkit-transition: max-width 0.5s;
                    -moz-transition: max-width 0.5s;
                    transition: max-width 0.5s, color 0.2s;
                }
            }
            
            .saltedpineapple {
                font-family: 'raleway';
                font-size: 20px;
                position: absolute;
                @media(min-width: 801px) {
                    left: 0;
                    top: 15px;
                }
                @media(max-width: 800px) {
                    
                    position: absolute;
                    top: 50%; 
                    right: 50%;
                    left: none;
                    transform: translate(50%,-50%);
                }
                
                span:nth-of-type(1) {
                    color: #BEDDA5;
                    color: ${props => props.theme.blue};
                }
                
                span:nth-of-type(2) {
                    color: #D6A550;
                    color: ${props => props.theme.black};
                }
            }
            
            
            .inside {
                position: absolute;
                width: 40px;
                z-index: -1;
            }
            
            @keyframes swing {
                20% {
                    -webkit-transform: rotate3d(0, 0, 1, 15deg);
                    transform: rotate3d(0, 0, 1, 15deg);
                }
                
                40% {
                    -webkit-transform: rotate3d(0, 0, 1, -10deg);
                    transform: rotate3d(0, 0, 1, -10deg);
                }
                
                60% {
                    -webkit-transform: rotate3d(0, 0, 1, 5deg);
                    transform: rotate3d(0, 0, 1, 5deg);
                }
                
                80% {
                    -webkit-transform: rotate3d(0, 0, 1, -5deg);
                    transform: rotate3d(0, 0, 1, -5deg);
                }
                
                to {
                    -webkit-transform: rotate3d(0, 0, 1, 0deg);
                    transform: rotate3d(0, 0, 1, 0deg);
                }
            }
            `;

class Header extends React.Component {

    state = {
        search: false,
        position: true,
        scroll: false,
        fixed: false,
        mobile: false,
        open: false,
        peek: true,
        top: true,
        scroll: 0
    }

    componentDidMount() {
        document.addEventListener('scroll', this.scroll);
        document.addEventListener('resize', this.resize);
    }

    componentWillUnmount() {
        document.removeEventListener('scroll', this.scroll);
        document.addEventListener('resize', this.resize);
    }

    resize = (e) => {
        if (window.outerWidth < 700) {
            this.setState({ mobile: true })
        } else {
            this.setState({ mobile: false })
        }
    }

    scroll = (e) => {
        if (window.pageYOffset < 82) {
            if(window.pageYOffset === 0) {
                this.setState({ peek: false, scroll: window.pageYOffset, position: true });
            } else {
            this.setState({ peek: false, scroll: window.pageYOffset });
            }
            // return
        } else {
            // this.setState({ peek: false, scroll: e.target.body.scrollTop })
            if (window.pageYOffset < this.state.scroll) {
                this.setState({ peek: false, scroll: window.pageYOffset, position: false })
            } else if (window.pageYOffset > this.state.scroll) {
                this.setState({ peek: true, scroll: window.pageYOffset, position: false })
            }
        }
    }


    mobileToggle = () => {
        this.setState({ open: !this.state.open });
    }
    
    closeNav = () => {
        this.setState({ open: false });
    }

    searchButt = () => {
        this.setState({search: !this.state.search});
    }

    render() {

        return (
            <StyledHeader peek={this.state.peek} top={this.state.scroll} >
                <div className={`${this.state.peek ? ' bar-up bar ' : ' bar '}${this.state.scroll < 82 ? ' bar-down-down ' : ''}`}
                // ${this.state.position ? 'bar-down' : ''}
                // style={{
                //     top: this.state.scroll < 82 ? this.state.scroll : '0'
                // }}
                >
                                <div className="searchcomp" onClick={this.searchButt}>
                                    <div>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="35" height="35" viewBox="0 0 24 24" fill="none" stroke="#3a3a3a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>

                                        {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#7FB7BE" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg> */}
                                    </div>
                                </div>
                                    <Search className={this.state.search ? 'searchbar searchbar-open' : 'searchbar'} />
                    <Logo>
                        <Link href="/">
                            <a>
                                {/* <div className="wrapper"> */}
                                <div className="sht">
                                    <span className="sp">
                                        SP
                                </span>
                                </div>
                                <img className="sht apple" src='../static/pineapple.svg' />
                                <span className="saltedpineapple">
                                    <span>Salted</span>
                                    <img className="inside" src='../static/pineapple.svg' />
                                    <span>Pineapple</span>
                                </span>
                                {/* </div> */}
                            </a>
                        </Link>
                    </Logo>

                    <div className="ham" onClick={this.mobileToggle} >
                    <HamburgerButton open={this.state.open} />
                    </div>
                    <Nav closeNav={this.closeNav} open={this.state.open} />
                </div>
                <div className="cartcomp"><Cart /></div>
            </StyledHeader>
        )
    }
}

export default Header;