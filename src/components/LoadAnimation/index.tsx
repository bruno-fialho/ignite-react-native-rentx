import React, { useEffect, useRef } from 'react';
import LottieView from 'lottie-react-native';

import CarsAnimation from '../../assets/cars_animation.json';

import {
  Container
} from './styles';

export function LoadAnimation() {
  const lottieRef = useRef<LottieView|null>(null);

  useEffect(() => {
    if (lottieRef.current) {
      setTimeout(() => {
        lottieRef.current?.reset();
        lottieRef.current?.play();
      }, 100);
    }
  }, [lottieRef.current]);
  
  return (
    <Container>
      <LottieView
        ref={lottieRef}
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
