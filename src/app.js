import './scss/style.scss';
import React from 'react';
import ReactDOM from 'react-dom';

import CarouselComponent from './components/Carousel';

const renderApplication = () => {
  ReactDOM.render(
    <CarouselComponent /> ,
    document.querySelector('#root')
  );
}

renderApplication(CarouselComponent);

if (module.hot) {
  module.hot.accept("./components/Carousel", () => {
    renderApplication();
  });
}
