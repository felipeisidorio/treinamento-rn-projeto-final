import { StyleSheet } from 'react-native';
import { THEME } from '../../theme/theme';

export const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: THEME.COLORS.BACKGROUND_WHITE,
    },
    container: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLORS.BACKGROUND_WHITE
    },
    logo: {
        width: 270,
        height: 90,
        marginBottom: 40,
    },
    button: {
        marginTop: 10,
        width: '90%',
        height: 40,
        borderRadius: 4,
        alignItems: 'center',
        justifyContent: 'center'
    },
    submitButton: {
        marginTop: 40,
        backgroundColor: THEME.COLORS.PRIMARY
    },
    submitButtonText: {
        color: THEME.COLORS.TEXT_WHITE,
        fontSize: THEME.FONT_SIZE.MD,
        fontWeight: '600'
    },
    cancelButton: {
        backgroundColor: THEME.COLORS.BACKGROUND_WHITE,
        borderWidth: 1,
        borderColor: THEME.COLORS.PRIMARY
    },
    cancelButtonText: {
        color: THEME.COLORS.PRIMARY,
        fontSize: THEME.FONT_SIZE.MD,
        fontWeight: '600'
    },
});