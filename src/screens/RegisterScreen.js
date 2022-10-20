import React, { useContext, useState } from 'react'
import { View, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { nameValidator } from '../helpers/nameValidator'
import { rollValidator } from '../helpers/rollValidator.js'
import { roomValidator } from '../helpers/roomValidator.js'
import { mobileValidator } from '../helpers/mobileValidator.js'
import GlobalContext from '../context/GlobalContext'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [roll, setRoll] = useState({ value: '', error: '' })
  const [room, setRoom] = useState({ value: '', error: '' })
  const [mobile, setMobile] = useState({ value: '', error: '' })
  const [hostel, setHostel] = useState({ value: '', error: '' })
  const { axiosInstance } = useContext(GlobalContext);
  const onSignUpPressed = async (e) => {

    const nameError = nameValidator(name.value)
    const rollError = rollValidator(roll.value)
    const roomError = roomValidator(room.value)
    const mobileError = mobileValidator(mobile.value)

    if (nameError || rollError || roomError || mobileError) {
      setName({ ...name, error: nameError })
      setRoll({ ...roll, error: rollError })
      setHostel({ ...hostel, error: "" })
      setMobile({ ...mobile, error: mobileError })
      setRoom({ ...room, error: roomError })

      return
    }
    console.log(room);

    try {
      const res = await axiosInstance.post("/api/user/student/create", { roomNumber: room.value, hostelName: hostel.value, phone: mobile.value, rollNo: roll.value, name: name.value });
      console.log(res.data);
      alert(res.data.msg);
    } catch (error) {
      
      if (error.response.status === 400) {
        
        alert(error.response.data.msg);
      }


    }

  }

  return (
    <Background>
      
      <BackButton goBack={navigation.goBack} />
      <Logo />
      
      <Header>Create Account</Header>
      <TextInput
        label="Name"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Roll No."
        returnKeyType="next"
        value={roll.value}
        onChangeText={(text) => setRoll({ value: text, error: '' })}
        error={!!roll.error}
        errorText={roll.error}
      />
      <TextInput
        label="Hostel Name"
        returnKeyType="next"
        value={hostel.value}
        onChangeText={(text) => setHostel({ value: text, error: '' })}
        error={!!hostel.error}
        errorText={hostel.error}
      />
      <TextInput
        label="Room No."
        returnKeyType="next"
        value={room.value}
        onChangeText={(text) => setRoom({ value: text, error: '' })}
        error={!!room.error}
        errorText={room.error}
      />
      <TextInput
        label="Mobile No."
        returnKeyType="next"
        value={mobile.value}
        onChangeText={(text) => setMobile({ value: text, error: '' })}
        error={!!mobile.error}
        errorText={mobile.error}
      />
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Sign Up
      </Button>
      <View style={styles.row}>
        <Text>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Login</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  scrollView: {
    marginHorizontal: 20,
  }
})

