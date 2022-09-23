

import { StyleSheet } from "react-native";
import { THEME } from "../../theme/theme";

export const styles = StyleSheet.create({
    safeArea:{
        backgroundColor: THEME.COLORS.BACKGROUND_WHITE,
        height: '100%',
    },
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    logo: {
        width: 270,
        height: 90,
        marginBottom: 40,
        marginTop: 60,
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
});