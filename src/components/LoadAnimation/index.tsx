import React from 'react';
import LottieView from 'lottie-react-native';

import CarsAnimation from '../../assets/cars_animation.json';

import {
  Container
} from './styles';

export function LoadAnimation() {
  return (
    <Container>
      <LottieView 
        autoPlay
        loop
        source={CarsAnimation}
        resizeMode="contain"
        style={{
          height: 200
        }}
      />
    </Container>
  );
}
