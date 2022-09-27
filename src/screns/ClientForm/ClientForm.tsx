import {useContext, useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Alert,
  ScrollView,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {BackButton} from '../../components/BackButton/BackButton';
import {InputTextForm} from '../../components/InputForm/InputTextForm';
import {AuthContext} from '../../contexts/auth';
import {THEME} from '../../theme/theme';
import {styles} from './styles';
import DatePicker from 'react-native-date-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import DropDownPicker from 'react-native-dropdown-picker';
import {ClientDB, insert, update} from '../../store/sqlite/db';
import {useNavigation} from '@react-navigation/native';

interface ClientForm {
  firstname: string;
  lastname: string;
  phone: string;
  whatsapp: string;
  email: string;
  deliveryStartTime: Date;
  deliveryEndTime: Date;
  businessType: string;
  traceableDelivery: boolean;
  state: string;
}
export function ClientForm() {
  const navigation = useNavigation();
  const {clientSelected, enableClientStack} = useContext(AuthContext);

  const [operationInsert, setOperationInsert] = useState<boolean>(true);
  const [cpPhoneInWhatsapp, setCpPhoneInWhatsapp] = useState<boolean>(false);

  const [weekDaysValue, setweekDaysValue] = useState<string[]>([]);
  const [openWeekDaysList, setOpenWeekDaysList] = useState(false);
  const [weekDaysList, setWeekDaysList] = useState([
    {label: 'Sunday', value: '0'},
    {label: 'Monday', value: '1'},
    {label: 'Tuesday', value: '2'},
    {label: 'Wednesday', value: '3'},
    {label: 'Thursday', value: '4'},
    {label: 'Friday', value: '5'},
    {label: 'Saturday', value: '6'},
  ]);

  const [contactPreferenceValue, setContactPreferenceValue] =
    useState<string>('');
  const [openContactPreferenceList, setOpenContactPreferenceList] =
    useState(false);
  const [contactPreferenceList, setContactPreferenceList] = useState([
    {label: 'E-mail', value: 'E-mail'},
    {label: 'Phone', value: 'Phone'},
  ]);

  const [openDeliveryStartTime, setOpenDeliveryStartTime] = useState(false);
  const [openDeliveryEndTime, setOpenDeliveryEndTime] = useState(false);

  const {
    control,
    handleSubmit,
    // formState: {errors},
    setValue,
    getValues,
  } = useForm({
    defaultValues: {
      firstname: '',
      lastname: '',
      phone: '',
      whatsapp: '',
      email: '',
      deliveryStartTime: new Date(),
      deliveryEndTime: new Date(),
      businessType: '',
      traceableDelivery: false,
      state: 'Active',
    },
  });

  function getClientDetails() {
    if (clientSelected.id.trim().length > 0) {
      setOperationInsert(false);
      setValue('firstname', clientSelected.firstname || '');
      setValue('lastname', clientSelected.lastname || '');
      setValue('phone', clientSelected.phone || '');
      setValue('whatsapp', clientSelected.whatsapp || '');
      setValue('email', clientSelected.email || '');
      setValue(
        'deliveryStartTime',
        new Date(clientSelected.deliveryStartTime || ''),
      );
      setValue(
        'deliveryEndTime',
        new Date(clientSelected.deliveryEndTime || ''),
      );
      setValue('businessType', clientSelected.businessType || '');
      setValue('traceableDelivery', Boolean(clientSelected.traceableDelivery));
      setValue('state', clientSelected.state || '');
      setweekDaysValue(clientSelected.deliveryWeekDays.split(','));
      setContactPreferenceValue(clientSelected.contactPreference);
    }
  }

  function setWhatsapp(valid: boolean = true) {
    if (valid) {
      const cliForm = getValues();
      setValue('whatsapp', cliForm.phone);
      console.log(cliForm);
      setCpPhoneInWhatsapp(valid);
    } else {
      setValue('whatsapp', '');
      setCpPhoneInWhatsapp(false);
    }
  }

  function onSubmit(data: ClientForm) {
    if (
      data.firstname &&
      data.lastname &&
      data.phone &&
      data.whatsapp &&
      data.email &&
      data.deliveryStartTime &&
      data.deliveryEndTime &&
      data.businessType &&
      data.state &&
      contactPreferenceValue &&
      weekDaysValue.length > 0
    ) {
      const clientAux: ClientDB = {
        id: operationInsert ? `${new Date().getTime()}` : clientSelected.id,
        firstname: data.firstname,
        lastname: data.lastname,
        phone: data.phone,
        whatsapp: data.whatsapp,
        email: data.email,
        deliveryStartTime: `${data.deliveryStartTime}`,
        deliveryEndTime: `${data.deliveryEndTime}`,
        businessType: data.businessType,
        traceableDelivery: `${data.traceableDelivery ? 1 : 0}`,
        state: data.state,
        contactPreference: contactPreferenceValue,
        deliveryWeekDays: weekDaysValue.join(),
      };
      const objectArray = Object.entries(clientAux);
      const result = [];
      for (let i = 0; i < objectArray.length; i++) {
        const el = objectArray[i];
        const resp = {column: el[0], value: el[1]};
        result.push(resp);
      }
      if (operationInsert) {
        insert('Clients', result);
      } else {
        update('Clients', result);
      }
      goBack();
    } else {
      showlAlert();
    }
  }

  function goBack() {
    if (operationInsert) {
      enableClientStack(false, '');
    } else {
      navigation.goBack();
    }
  }

  function showlAlert() {
    Alert.alert('Mandatory fields', 'Mandatory fields must be filled !!', [
      {text: 'OK'},
    ]);
  }

  useEffect(() => {
    getClientDetails();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <BackButton onPress={goBack} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}> New Client</Text>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Controller
            control={control}
            rules={{required: false}}
            render={({field: {onChange, onBlur, value}}) => (
              <InputTextForm
                type={THEME.INPUT.TYPE.TEXT}
                label="First Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="firstname"
          />

          <Controller
            control={control}
            rules={{required: false}}
            render={({field: {onChange, onBlur, value}}) => (
              <InputTextForm
                type={THEME.INPUT.TYPE.TEXT}
                label="Last Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="lastname"
          />

          <Controller
            control={control}
            rules={{required: false}}
            render={({field: {onChange, onBlur, value}}) => (
              <InputTextForm
                type={THEME.INPUT.TYPE.PHONE}
                label="Phone"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="phone"
          />
          {operationInsert ? (
            <View style={styles.content}>
              <Text style={styles.text}>is This phone Whatsapp?</Text>

              <View style={styles.row}>
                <TouchableOpacity
                  onPress={() => {
                    setWhatsapp(true);
                  }}>
                  <Text>
                    {cpPhoneInWhatsapp ? (
                      <Fontisto name="radio-btn-active" />
                    ) : (
                      <Fontisto name="radio-btn-passive" />
                    )}
                    {'  Yes'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.radioSecondButton}
                  onPress={() => setWhatsapp(false)}>
                  <Text>
                    {!cpPhoneInWhatsapp ? (
                      <Fontisto name="radio-btn-active" />
                    ) : (
                      <Fontisto name="radio-btn-passive" />
                    )}
                    {'  No'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <></>
          )}

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({field: {onChange, onBlur, value}}) => (
              <InputTextForm
                type={THEME.INPUT.TYPE.PHONE}
                label="Whatsapp"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                editable={!cpPhoneInWhatsapp}
              />
            )}
            name="whatsapp"
          />

          <Controller
            control={control}
            rules={{required: false}}
            render={({field: {onChange, onBlur, value}}) => (
              <InputTextForm
                type={THEME.INPUT.TYPE.EMAIL}
                label="E-mail"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="email"
          />

          <View style={styles.content}>
            <Text style={styles.text}>Delivery WeekDays</Text>

            <DropDownPicker
              searchContainerStyle={{
                borderBottomColor: THEME.COLORS.CAPTION_300,
              }}
              style={{
                borderColor: THEME.COLORS.CAPTION_300,
              }}
              placeholderStyle={{
                color: THEME.COLORS.CAPTION_500,
              }}
              multiple={true}
              min={0}
              max={7}
              open={openWeekDaysList}
              setOpen={setOpenWeekDaysList}
              value={weekDaysValue}
              setValue={setweekDaysValue}
              items={weekDaysList}
              setItems={setWeekDaysList}
              showBadgeDot={false}
              mode="BADGE"
              listMode="MODAL"
              showArrowIcon={true}
            />
          </View>

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({field: {onChange, value}}) => (
              <View style={styles.content}>
                <Text style={styles.text}>Delivery Start Time</Text>

                <TouchableOpacity
                  onPress={() => setOpenDeliveryStartTime(true)}>
                  <Text>
                    {value.toTimeString().substring(0, 5)}{' '}
                    <AntDesign
                      name="clockcircleo"
                      color={THEME.COLORS.CAPTION_500}
                    />
                  </Text>
                </TouchableOpacity>

                <DatePicker
                  modal
                  mode="time"
                  open={openDeliveryStartTime}
                  date={value}
                  timeZoneOffsetInMinutes={-180}
                  onConfirm={date => {
                    setOpenDeliveryStartTime(false);
                    onChange(date);
                  }}
                  onCancel={() => {
                    setOpenDeliveryStartTime(false);
                  }}
                />
              </View>
            )}
            name="deliveryStartTime"
          />

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({field: {onChange, value}}) => (
              <View style={styles.content}>
                <Text style={styles.text}>Delivery Start Time</Text>

                <TouchableOpacity onPress={() => setOpenDeliveryEndTime(true)}>
                  <Text>
                    {value.toTimeString().substring(0, 5)}{' '}
                    <AntDesign
                      name="clockcircleo"
                      color={THEME.COLORS.CAPTION_500}
                    />
                  </Text>
                </TouchableOpacity>

                <DatePicker
                  modal
                  mode="time"
                  open={openDeliveryEndTime}
                  date={value}
                  timeZoneOffsetInMinutes={-180}
                  onConfirm={date => {
                    setOpenDeliveryEndTime(false);
                    onChange(date);
                  }}
                  onCancel={() => {
                    setOpenDeliveryEndTime(false);
                  }}
                />
              </View>
            )}
            name="deliveryEndTime"
          />

          <View style={styles.content}>
            <Text style={styles.text}>Contact Preference</Text>

            <DropDownPicker
              searchContainerStyle={{
                borderBottomColor: THEME.COLORS.CAPTION_300,
              }}
              style={{
                borderColor: THEME.COLORS.CAPTION_300,
              }}
              placeholderStyle={{
                color: THEME.COLORS.CAPTION_500,
              }}
              open={openContactPreferenceList}
              setOpen={setOpenContactPreferenceList}
              value={contactPreferenceValue}
              setValue={setContactPreferenceValue}
              items={contactPreferenceList}
              setItems={setContactPreferenceList}
              showBadgeDot={false}
              mode="BADGE"
              listMode="MODAL"
              showArrowIcon={true}
            />
          </View>

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({field: {onChange, value}}) => (
              <View style={styles.content}>
                <Text style={styles.text}>Business Type</Text>
                <View style={styles.row}>
                  <TouchableOpacity onPress={() => onChange('Comercial')}>
                    <Text>
                      {value === 'Comercial' ? (
                        <Fontisto name="radio-btn-active" />
                      ) : (
                        <Fontisto name="radio-btn-passive" />
                      )}
                      {'  Comercial'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.radioSecondButton}
                    onPress={() => onChange('Residencial')}>
                    <Text>
                      {value === 'Residencial' ? (
                        <Fontisto name="radio-btn-active" />
                      ) : (
                        <Fontisto name="radio-btn-passive" />
                      )}
                      {'  Residencial'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            name="businessType"
          />

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({field: {onChange, value}}) => (
              <View style={styles.content}>
                <Text style={styles.text}>Traceable Delivery</Text>
                <Switch
                  trackColor={{true: THEME.COLORS.PRIMARY}}
                  value={value}
                  onValueChange={onChange}
                />
              </View>
            )}
            name="traceableDelivery"
          />

          <Controller
            control={control}
            rules={{
              required: false,
            }}
            render={({field: {onChange, value}}) => (
              <View style={styles.content}>
                <Text style={styles.text}>State</Text>
                <View style={styles.row}>
                  <TouchableOpacity onPress={() => onChange('Active')}>
                    <Text>
                      {value === 'Active' ? (
                        <Fontisto name="radio-btn-active" />
                      ) : (
                        <Fontisto name="radio-btn-passive" />
                      )}
                      {'  Active'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.radioSecondButton}
                    onPress={() => onChange('Inative')}>
                    <Text>
                      {value === 'Inative' ? (
                        <Fontisto name="radio-btn-active" />
                      ) : (
                        <Fontisto name="radio-btn-passive" />
                      )}
                      {'  Inative'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            name="state"
          />
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            style={[styles.button, styles.buttonSave]}>
            <Text style={[styles.textButton, styles.textButtonSave]}>Save</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={goBack}
            style={[styles.button, styles.buttonCancel]}>
            <Text style={[styles.textButton, styles.textButtonCancel]}>
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
