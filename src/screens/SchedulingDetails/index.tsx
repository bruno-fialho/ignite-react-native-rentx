import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';

import { Feather } from '@expo/vector-icons';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  Accessories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DataValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from './styles';

import { CarDTO } from '../../dtos/CarDTO';

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

interface Params {
  car: CarDTO;
  dates: string[];
}

export function SchedulingDetails() {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { car, dates } = route.params as Params;

  const rentTotal = Number(dates.length * car.rent.price);

  function handleBack() {
    navigation.goBack();
  }

  async function handleConfirmRental() {
    setLoading(true);
    const response = await api.get(`/schedules_bycars/${car.id}`);

    const unavailableDates = [
      ...response.data.unavailable_dates,
      ...dates,
    ];

    api.post('/schedules_byuser', {
      user_id: 1,
      car,
      startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endDate: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy')
    });

    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id,
      unavailable_dates: unavailableDates,
    })
      .then(() => navigation.navigate('SchedulingComplete'))
      .catch(() => {
        setLoading(false);
        Alert.alert('N??o foi poss??vel confirmar o agendamento.')
      });
  }

  useEffect(() => {
    setRentalPeriod({
      startFormatted: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
      endFormatted: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
    });
  }, [dates]);
  
  return (
    <Container>
      <Header>
        <BackButton onPress={handleBack} />
      </Header>

      <CarImages>
        <ImageSlider 
          imagesUrl={car.photos}
        />
      </CarImages>

      <Content>
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.rent.period}</Period>
            <Price>R$ {car.rent.price}</Price>
          </Rent>
        </Details>

        <Accessories>
          { car.accessories.map(accessory => (
            <Accessory 
              key={accessory.type}
              name={accessory.name}
              icon={getAccessoryIcon(accessory.type)} 
            />
          )) }
        </Accessories>

        <RentalPeriod>
          <CalendarIcon>
            <Feather 
              name="calendar"
              size={RFValue(24)}
              color={theme.colors.shape}
            />
          </CalendarIcon>
          
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DataValue>{rentalPeriod.startFormatted}</DataValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={RFValue(24)}
            color={theme.colors.text}
          />

          <DateInfo>
            <DateTitle>AT??</DateTitle>
            <DataValue>{rentalPeriod.endFormatted}</DataValue>
          </DateInfo>
        </RentalPeriod>
        
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
          <RentalPriceDetails>
            <RentalPriceQuota>
              R$ {car.rent.price} x {dates.length} {dates.length === 1 ? 'di??ria' : 'di??rias'}
            </RentalPriceQuota>
            <RentalPriceTotal>
              R$ {rentTotal}
            </RentalPriceTotal>
          </RentalPriceDetails>
        </RentalPrice>
      </Content>

      <Footer>
        <Button 
          title="Alugar agora"
          color={theme.colors.success}
          onPress={handleConfirmRental}
          enabled={!loading}
          loading={loading}
        />
      </Footer>
    </Container>
  );
}
