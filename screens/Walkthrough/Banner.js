import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { COLORS, SIZES } from '../../constants';

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        backgroundColor: COLORS.bgMain,
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    appName: {
        color: COLORS.txtMain,
        fontSize: 64,
        marginTop: 130,
        fontFamily: 'HeirofLightOTFRegular'
    },
    subTxt: {
        marginTop: 20,
        fontSize: SIZES.h3,
        color: COLORS.txtGrey,
        fontFamily: 'HeirofLightOTFRegular'
    },
    nonMembers: {
        color: COLORS.txtGrey,
        textDecorationLine: 'underline',
        fontFamily: 'HeirofLightOTFRegular',
        backgroundColor: null
    },
    loginBtn: {
        height: 50,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.bgMain
    },
    socialLoginBtn: {
        width: 300, height: 80,
        marginBottom: 30
    }
});

const Banner = () => {

    
    return (
        <View
            style={styles.bg}
        >
            {/* Logo & Title */}
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text style={styles.appName}>
                    Ex.Pose
                </Text>
                <Text style={styles.subTxt}>
                    새로운 내 모습을 담다
                </Text>
            </View>
        </View>
    )
}

export default Banner;