import { StyleSheet } from "react-native";
import { THEME } from "../../theme/theme";

export const styles = StyleSheet.create({
    container: {
        width: '90%',
    },
    text: {
        width: '100%',
        marginTop: 10,
        color: THEME.COLORS.PRIMARY,
        fontSize: THEME.FONT_SIZE.MD,
        paddingBottom: 5
    },
    input: {
        width: '100%',
        height: 40,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: THEME.COLORS.CAPTION_300,
        fontSize: THEME.FONT_SIZE.MD

    },

});