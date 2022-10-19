import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'

import axios from 'axios';
// const baseUrl = 'https://reqres.in';
// axios({
//   method: 'get',
//   url: `${baseUrl}/api/users/1`,
// }).then((response) => {
//   console.log(response.data);
// });


// // Invoking get method to perform a GET request
// axios.get(`${baseUrl}/api/users/1`).then((response) => {
//   console.log(response.data);
// });

import { nameValidator } from '../helpers/nameValidator'
import { rollValidator } from '../helpers/rollValidator.js'
import { roomValidator } from '../helpers/roomValidator.js'
import { mobileValidator } from '../helpers/mobileValidator.js'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [roll, setRoll] = useState({ value: '', error: '' })
  const [room, setRoom] = useState({ value: '', error: '' })
  const [mobile, setMobile] = useState({ value: '', error: '' })
  const [hostel, setHostel] = useState({ value: '', error: '' })

  const onSignUpPressed = async(e) => {
    console.log("hello");
    const nameError = nameValidator(name.value)
    const rollError =rollValidator(roll.value)
    const roomError = roomValidator(room.value)
    const mobileError = mobileValidator(mobile.value)
    console.log("hello");
    if ( nameError || rollError || roomError || mobileError ) {
      setName({ ...name, error: nameError })
      setRoll({ ...roll, error: rollError })
      setHostel({ ...hostel, error: "" })
      setMobile({ ...mobile, error: mobileError })
      setRoom({ ...room, error: roomError })

      return
    }
    
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
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
})
