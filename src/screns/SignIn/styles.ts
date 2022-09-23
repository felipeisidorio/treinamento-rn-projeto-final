

import { StyleSheet } from "react-native";
import { THEME } from "../../theme/theme";

export const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: THEME.COLORS.BACKGROUND_WHITE
    },
    container: {
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: THEME.COLORS.BACKGROUND_WHITE
    },
    logo: {
        width: 270,
        height: 90,
        marginBottom: 40,
    },
    submitButton: {
        marginTop: 10,
        backgroundColor: THEME.COLORS.PRIMARY,
        width: '90%',
        height: 40,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    submitButtonText: {
        color: THEME.COLORS.TEXT_WITHE,
        fontSize: THEME.FONT_SIZE.MD
    },
    useFormRedirect: {
        marginTop: 10,
        width: '90%',
        height: 40,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center"
    },
    useFormRedirectText: {
        color: THEME.COLORS.LINK,
        fontSize: THEME.FONT_SIZE.SM
    },
    error: {
        color: THEME.COLORS.ALERT
    },
    rememberCredatials: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    swichSpace: {
        marginLeft: 10
    }
});