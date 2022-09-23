import {useNavigation} from '@react-navigation/native';
import {useContext, useEffect, useState} from 'react';
import {ScrollView, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButton} from '../../components/BackButton/BackButton';
import {DeleteButton} from '../../components/DeleteButton/DeleteButton';
import {EditButton} from '../../components/EditButton/EditButton';
import {LabelAndValue} from '../../components/LabelAndValue/LabelAndValue';
import {AuthContext} from '../../contexts/auth';
import {ClientDB, deleteLocal} from '../../store/sqlite/db';
import {styles} from './styles';

export function ClientDetails() {
  const navigation = useNavigation();
  const [client, setClient] = useState<ClientDB>();
  const {clientSelected, enableClientStack} = useContext(AuthContext);

  function getClientDetails() {
    setClient(clientSelected);
  }

  function goBackStack() {
    enableClientStack(false, '');
  }

  function weekDaysLabels() {
    let result = '';
    const weekDaysList = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    clientSelected.deliveryWeekDays.split(',').forEach(el => {
      result += `${weekDaysList[Number(el)]}  `;
    });

    return result;
  }

  function tracebleDelivery() {
    return clientSelected.traceableDelivery ? 'Yes' : 'No';
  }

  useEffect(() => {
    getClientDetails();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <BackButton onPress={goBackStack} />
          <Text style={styles.itemsCenter}>
            {client?.lastname}, {client?.firstname}
          </Text>
        </View>
        <View style={styles.header}>
          <View style={styles.itemsCenter} />
          <DeleteButton
            style={styles.rightSpace}
            onPress={() => {
              deleteLocal('Clients', clientSelected.id);
              goBackStack();
            }}
          />
          <EditButton onPress={() => navigation.navigate('clientForm')} />
        </View>
        <ScrollView>
          <LabelAndValue label="Id" value={client?.id} />
          <LabelAndValue label="First Name" value={client?.firstname} />
          <LabelAndValue label="Last Name" value={client?.lastname} />
          <LabelAndValue label="State" value={client?.state} />
          <LabelAndValue label="Phone" value={client?.phone} />
          <LabelAndValue label="Whatsaap" value={client?.whatsapp} />
          <LabelAndValue label="E-mail" value={client?.email} />
          <LabelAndValue
            label="Contact Preference"
            value={client?.contactPreference}
          />
          <LabelAndValue label="Delivery WeekDays" value={weekDaysLabels()} />
          <LabelAndValue
            label="Delivery Start Time"
            value={client?.deliveryStartTime}
          />
          <LabelAndValue
            label="Delivery End Time"
            value={client?.deliveryEndTime}
          />
          <LabelAndValue label="Business Type" value={client?.businessType} />
          <LabelAndValue
            label="Traceable Delivery"
            value={tracebleDelivery()}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
