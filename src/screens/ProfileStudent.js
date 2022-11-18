import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Background from '../components/Background';
import BackButton from '../components/BackButton';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useContext, useEffect, useState } from 'react';
import GlobalContext from '../context/GlobalContext';
function ProfileStudent({ navigation }) {
    const {axiosInstance,accessToken,refreshToken,machineId} = useContext(GlobalContext)
    const [user,setUser] = useState(null);
    useEffect(()=>{
        getProfile();
    },[])
    const getProfile = async ()=>{
        try {
            const res = await axiosInstance.get("/api/user/profile",{
                headers: {
                    "x-access-token": accessToken,
                    "x-refresh-token": refreshToken,
                    "machine-id": machineId,
                }
            })
            console.log(res.data);
            setUser(()=>res.data.userData);

        } catch (error) {
            console.log(error.response.data.msg);
        }
    }
    return (


        <Background style={{
            position: 'relative',
        }}>
            <BackButton goBack={navigation.goBack} />
            {
                user===null?
                <ActivityIndicator size={200} animating={true} color={MD2Colors.red800} />:
                <View>
            <Text style={{ color: "black", fontSize: 32, marginBottom: 12 }}>Your Profile </Text>
            <View style={styles.text}>
                <Text style={styles.text_heading}>Name</Text>
                <View style={styles.text_status}>
                    <Text>{user.name}</Text>
                </View>
            </View>
            <View style={styles.text}>
                <Text style={styles.text_heading}>Email</Text>
                <View style={styles.text_status}>
                    <Text>{user.email}</Text>
                </View>
            </View>
            <View style={styles.text}>
                <Text style={styles.text_heading}>Phone No.</Text>
                <View style={styles.text_status}>
                    <Text>{user.phone}</Text>
                </View>
            </View>
            <View style={styles.text}>
                <Text style={styles.text_heading}>Hostel Name</Text>
                <View style={styles.text_status}>
                    <Text>{user.hostelName}</Text>
                </View>
            </View>
            <View style={styles.text}>
                <Text style={styles.text_heading}>Room No</Text>
                <View style={styles.text_status}>
                    <Text>{user.roomNumber}</Text>
                </View>
            </View>
            </View>
            }
            
        </Background>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        width: '100%',
        maxWidth: 340,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        height: 'auto',
        width: Dimensions.get('window').width - 50,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 12.5,
        marginBottom: 12.5,
    },
    text_heading: {
        width: '45%',
        fontSize: 22.5,
        fontWeight: '700',
        color: 'black',
    },
    text_sub_heading: {
        width: '60%',
        fontSize: 20,
        fontWeight: '600',
        color: 'black',
    },
    text_status: {
        width: '40%',
        fontSize: 20,
        fontWeight: 'bold',
        color: 'green',
    },
})

export default ProfileStudent