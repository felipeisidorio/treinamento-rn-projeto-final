import {StyleSheet} from 'react-native';
import {THEME} from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.BACKGROUND_WHITE,
    alignItems: 'center',
    height: '100%',
  },
  content: {
    alignItems: 'center',
  },
  dolarContainer: {
    width: 150,
    height: 150,
    marginTop: 50,
  },
  arrowContainer: {
    width: 30,
    height: 30,
    marginLeft: 10,
    marginRight: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  label: {
    fontSize: THEME.FONT_SIZE.MD,
    fontWeight: 'bold',
  },
  alertColor: {
    color: THEME.COLORS.ALERT,
  },
  sucessColor: {
    color: THEME.COLORS.SUCCESS,
  },
  primaryColor: {
    color: THEME.COLORS.PRIMARY,
  },
  marginTop: {
    marginTop: 10,
  },
});
