import { View, StyleSheet } from "react-native"
import { Button, Text } from "react-native-paper"
import Background from "../components/Background"


export default function StudentHome({navigation}) {
    return (
        <Background >
            <View style={styles.navigationLayout} >
                <Button style={styles.button} icon="qrcode" mode="elevated" onPress={()=>navigation.navigate('StudentQr')}> QrCode</Button>
                <Button style={styles.button} icon="playlist-edit" mode="elevated" onPress={()=>navigation.navigate('Purpose')}>Purpose</Button>
            </View>
            <View style={styles.navigationLayout}>
                <Button style={styles.button} icon="history" mode="elevated">History</Button>
                <Button style={styles.button} icon="account-circle-outline" mode="elevated" onPress={()=>navigation.navigate('ProfileStudent')}>Profile</Button>
            </View>
            <View style={styles.navigationLayout}>
                <Button style={styles.button} icon="cog" mode="elevated"> Settings</Button>

            </View>
        </Background>
    )
}

const styles = StyleSheet.create({
    navigationLayout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: '100%',
    },
    button:{
        width: '40%',
        fontSize: "20px",
        height: 60,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
})