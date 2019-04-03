import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import CarouselItem from 'react-bootstrap/CarouselItem';
import styled from 'styled-components';

function randomNumber() {
  return Math.floor(Math.random() * (7 - 5 + 1)) + 5;
}

const Styled = styled.div`

.hide {
  ol {
    display: none;
  }
}

.carousel {
  position: relative;
}

.carousel-indicators {
    position: absolute;
    right: 0;
    bottom: 10px;
    left: 0;
    z-index: 2;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-pack: center;
    justify-content: center;
    padding-left: 0;
    margin-right: 15%;
    margin-left: 15%;
    list-style: none;

    li {
        position: relative;
    -ms-flex: 0 1 auto;
    flex: 0 1 auto;
    width: 30px;
    height: 3px;
    margin-right: 3px;
    margin-left: 3px;
    text-indent: -999px;
    cursor: pointer;
    background-color: rgba(255,255,255,.5);
    }

        .active {
    background-color: #fff;
    }


}

.carousel-inner {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.carousel-item {
  position: relative;
  display: none;
  align-items: center;
  width: 100%;
  backface-visibility: hidden;
  perspective: 1000px;
}

.carousel-item.active,
.carousel-item-next,
.carousel-item-prev {
  display: block;
}

.carousel-item-next,
.carousel-item-prev {
  position: absolute;
  top: 0;
}

.carousel-item-next.carousel-item-left,
.carousel-item-prev.carousel-item-right {
  transform: translateX(0);

  @supports (transform-style: preserve-3d) {
    transform: translate3d(0, 0, 0);
  }
}

.carousel-item-next,
.active.carousel-item-right {
  transform: translateX(100%);

  @supports (transform-style: preserve-3d) {
    transform: translate3d(100%, 0, 0);
  }
}

.carousel-item-prev,
.active.carousel-item-left {
  transform: translateX(-100%);

  @supports (transform-style: preserve-3d) {
    transform: translate3d(-100%, 0, 0);
  }
}

.carousel-control-prev {
    left: 0;
}
.carousel-control-next, .carousel-control-prev {
    position: absolute;
    top: 0;
    bottom: 0;
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    -ms-flex-pack: center;
    justify-content: center;
    width: 15%;
    color: #fff;
    text-align: center;
    opacity: .5;
}

.carousel-control-next {
    right: 0;
}


.carousel-control-prev-icon {
    background-image: url('../static/left.svg') !important;
    transform: scale(2);
}
.carousel-control-next-icon {
    background-image: url('../static/right.svg') !important;
    transform: scale(2);
}

.sr-only {
    border: 0;
    clip: rect(0,0,0,0);
    height: 1px;
    margin: -1px;
    overflow: hidden;
    padding: 0;
    position: absolute;
    width: 1px;
}

.carousel-control-next-icon, .carousel-control-prev-icon {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: transparent no-repeat center center;
    background-size: 100% 100%;
}

.carousel-fade {
  .carousel-item {
    opacity: 0;
    transition-duration: .6s;
    transition-property: opacity;
  }

  .carousel-item.active,
  .carousel-item-next.carousel-item-left,
  .carousel-item-prev.carousel-item-right {
    opacity: 1;
  }

  .active.carousel-item-left,
  .active.carousel-item-right {
    opacity: 0;
  }

  .carousel-item-next,
  .carousel-item-prev,
  .carousel-item.active,
  .active.carousel-item-left,
  .active.carousel-item-prev {
    transform: translateX(0);

    @supports (transform-style: preserve-3d) {
      transform: translate3d(0, 0, 0);
    }
  }
}

`;

class CarouselComp extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSelect = this.handleSelect.bind(this);
  }

  state = {
    index: 0,
    direction: null,
    images: []
  }

  handleSelect(selectedIndex, e) {
    this.setState({
      index: selectedIndex,
      direction: e.direction
    })
  }

  render() {

    const { index, direction } = this.state;
    const { images } = this.props;

    let empty = [];

    if (images.length > 1) {
      for (let i = 0; i < images.length; i++) {
        empty.push(
            <img key={i}
              className="d-block w-100"
              src={images[i]}
            />
        )
      }
    } 

    return (
      <Styled>
        <Carousel
          activeIndex={index}
          direction={direction}
          onSelect={this.handleSelect}
          pauseOnHover={true}
          fade={true}
          wrap={true}
          interval={50000}

        >

          {empty[0] && empty}
        </Carousel>
      </Styled>
    )
  }
}
export default CarouselComp;