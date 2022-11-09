import { Text, View,Image } from "react-native";
import QRCode from 'qrcode'
import Button from "../components/Button";
import { useState,useContext } from "react";
import GlobalContext from "../context/GlobalContext";



export default function Student() {
    let [value, setValue] = useState(null);
    const {accessToken,refreshToken,machineId,axiosInstance} = useContext(GlobalContext);
    const genrateQr = async () => {
        alert(accessToken);
        try {
            const res = await axiosInstance.post("/api/qr/student/genrate",{purpose:"Una",type:0},{
                headers:{
                    "x-access-token":accessToken,
                    "x-refresh-token":refreshToken,
                    "machine-id":machineId
                }
            })
            alert(res.data.msg);
            setValue(()=> generateQR(res.data.qrCode));

        } catch (error) {
            console.log(error);
            alert(error.response.data.msg);
        }
            
        
    }
    const generateQR = async text => {
        try {
          let url = await QRCode.toDataURL(text);
          return url;
        } catch (err) {
          console.error(err)
          return null;
        }
      }
    return (
        <View>
            <Text >
                Student
            </Text>
            <View>
                <Button mode="contained" onPress={genrateQr}>
                    Genrate Qr Code
                </Button>
            </View>
            <View>
               {value &&
               <Image
                source={value}
                />
               }

            </View>
        </View>
    )
}