import {StyleSheet} from 'react-native';
import {THEME} from '../../theme/theme';

export const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: THEME.COLORS.BACKGROUND_WHITE,
  },
  container: {
    alignItems: 'center',
    backgroundColor: THEME.COLORS.BACKGROUND_WHITE,
    height: '100%',
    paddingBottom: 50,
  },
  content: {width: '90%'},
  titleContainer: {
    alignItems: 'center',
    width: '100%',
  },
  title: {
    color: THEME.COLORS.PRIMARY,
    fontSize: THEME.FONT_SIZE.MD,
    fontWeight: 'bold',
  },
  text: {
    width: '100%',
    marginTop: 10,
    color: THEME.COLORS.PRIMARY,
    fontSize: THEME.FONT_SIZE.MD,
    paddingBottom: 5,
  },
  textError: {
    color: THEME.COLORS.ALERT,
  },
  button: {
    width: '90%',
    height: 40,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
  buttonSave: {
    backgroundColor: THEME.COLORS.PRIMARY,
  },
  buttonCancel: {
    backgroundColor: THEME.COLORS.BACKGROUND_WHITE,
    borderWidth: 1,
    borderColor: THEME.COLORS.PRIMARY,
  },
  textButton: {
    fontSize: THEME.FONT_SIZE.MD,
    fontWeight: '600',
  },
  textButtonCancel: {
    color: THEME.COLORS.PRIMARY,
  },
  textButtonSave: {
    color: THEME.COLORS.TEXT_WHITE,
  },
  row: {
    flexDirection: 'row',
  },
  radioSecondButton: {
    marginLeft: 30,
  },
});
