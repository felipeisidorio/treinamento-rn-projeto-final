

import { StyleSheet } from "react-native";
import { THEME } from "../../theme/theme";

export const styles = StyleSheet.create({
    safeArea: {
        backgroundColor: THEME.COLORS.BACKGROUND_WITHE,
        height: '100%'
    },
    container: {
        marginLeft: 20,
        marginBottom: 20
    },
    header: {
        flexDirection: 'row',
        paddingRight: 20,
        width: '100%'
    },
    itemsCenter: {
        marginRight: 'auto',
        marginLeft: 'auto'
    },
    rightSpace: {
        marginRight: 40
    }
});