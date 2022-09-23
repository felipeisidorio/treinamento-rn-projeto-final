import {StyleSheet} from 'react-native';
import {THEME} from '../../theme/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: THEME.COLORS.BACKGROUND_WHITE,
    height: '100%',
    paddingBottom: 10,
  },
  search: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
  },
  newClientButton: {
    marginLeft: 10,
    justifyContent: 'center',
  },
  list: {
    marginTop: 10,
  },
  listItem: {
    padding: 10,
  },
  input: {
    width: '85%',
    height: 40,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: THEME.COLORS.CAPTION_300,
    fontSize: THEME.FONT_SIZE.MD,
  },
});
