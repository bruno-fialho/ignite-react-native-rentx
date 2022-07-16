import React, { useEffect } from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  interpolate,
  Extrapolate,
  runOnJS
} from 'react-native-reanimated';

import {
  Container
} from './styles';
import { useNavigation } from '@react-navigation/native';

export function Splash() {
  const splashAnimation = useSharedValue(0);

  const navigation = useNavigation();

  const brandStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [1, 0, 0]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 25, 50],
            [0 , -100, -100],
            Extrapolate.CLAMP
          )
        }
      ],
    }
  });

  const logoStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(splashAnimation.value, [0, 25, 50], [0 , 0,  1]),
      transform: [
        {
          translateX: interpolate(splashAnimation.value,
            [0, 25, 50],
            [100, 100, 0],
            Extrapolate.CLAMP
          )
        }
      ],
    }
  });

  function startApp() {
    navigation.navigate('Home');
  }
  
  useEffect(() => {
    splashAnimation.value = withTiming(
      50, 
      { duration: 1000 },
      () => {
        'worklet'
        runOnJS(startApp)();
      }
    );
  }, []);


  return (
    <Container>
      <Animated.View style={[brandStyle, { position: 'absolute' }]}>
        <BrandSvg width={92} height={57.5} />
      </Animated.View>

      <Animated.View style={[logoStyle, { position: 'absolute' }]}>
        <LogoSvg width={180} height={20} />
      </Animated.View>
    </Container>
  );
}
