import React from 'react';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { Car } from '../../components/Car';

import {
  Container,
  Header,
  HeaderContent,
  TotalCars
} from './styles';

export function Home() {
  const carDataOne = {
    brand: 'audi',
    name: 'RS 5 Coupé',
    rent: {
      period: 'Ao dia',
      price: 120,
    },
    thumbnail: 'https://freepngimg.com/thumb/audi/35227-5-audi-rs5-red.png'
  };
  const carDataTwo = {
    brand: 'porsche',
    name: 'Panamera S',
    rent: {
      period: 'Ao dia',
      price: 340,
    },
    thumbnail: 'https://freebiescloud.com/wp-content/uploads/2021/02/PORSCHE-PANAMERA-2021-1.png'
  };

  return (
    <Container>
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          <TotalCars>
            Total de 12 carros
          </TotalCars>
        </HeaderContent>
      </Header>

      <Car data={carDataOne} />

      <Car data={carDataTwo} />
    </Container>
  );
}
