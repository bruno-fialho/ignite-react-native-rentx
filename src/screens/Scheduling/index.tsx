import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  DateInfo,
  DateTitle,
  DateValue,
  DateValueBox,
  Content,
  Footer
} from './styles';

export function Scheduling() {
  const navigation = useNavigation();

  const theme = useTheme();

  function handleSchedulingDetails() {
    navigation.navigate('SchedulingDetails');
  }

  return (
    <Container>
      <Header>
        <BackButton 
          color={theme.colors.shape}
          onPress={() => {}} 
        />

        <Title>
          Escolha uma{'\n'}
          data de início e{'\n'}
          fim do aluguel
        </Title>

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValueBox selected={false}>
              <DateValue>18/03/2022</DateValue>
            </DateValueBox>
          </DateInfo>
          
          <ArrowSvg />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValueBox selected={false}>
              <DateValue></DateValue>
            </DateValueBox>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar />
      </Content>

      <Footer>
        <Button 
          title="Confirmar" 
          onPress={handleSchedulingDetails}
        />
      </Footer>


    </Container>
  );
}
