import axios from 'axios';
import {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import dollar from './../../assets/44076-dollar.json';
import arrow from './../../assets/arrow-primary.json';
import LottieView from 'lottie-react-native';
import {styles} from './styles';

interface Price {
  id: string;
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
}

export function Conversion() {
  const [priceList, setPriceList] = useState<Price[]>([]);

  async function getCotacao() {
    axios
      .get('https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL')
      .then(res => {
        const dl: Price = {id: 'USDBRL', ...res.data.USDBRL};
        const eu: Price = {id: 'EURBRL', ...res.data.EURBRL};
        setPriceList([dl, eu]);
      });
  }
  useEffect(() => {
    getCotacao();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.dolarContainer}>
        <LottieView source={dollar} resizeMode="cover" autoPlay loop />
      </View>
      <FlatList
        data={priceList}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.content}>
            <View style={styles.titleContainer}>
              <Text style={[styles.label, styles.primaryColor]}>
                {item?.code === 'USD' ? 'Dollar (USD)' : 'Euro (EUR)'}
              </Text>

              <View style={styles.arrowContainer}>
                <LottieView source={arrow} resizeMode="cover" autoPlay loop />
              </View>
              <Text style={[styles.label, styles.primaryColor]}>
                Real (BRL)
              </Text>
            </View>
            <Text>{item?.code === 'USD' ? 'U$' : '€'} 1</Text>
            <Text style={[styles.label, styles.alertColor, styles.marginTop]}>
              Valor mais alto
            </Text>
            <Text>R$ {item.high}</Text>
            <Text style={[styles.label, styles.sucessColor, styles.marginTop]}>
              Valor mais baixo
            </Text>
            <Text>R$ {item.low}</Text>
            <Text style={[styles.label, styles.primaryColor, styles.marginTop]}>
              Valor médio
            </Text>
            <Text>R$ {item.bid}</Text>
          </View>
        )}
      />
    </View>
  );
}
