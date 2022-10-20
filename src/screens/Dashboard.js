import React, { useContext } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import GlobalContext from '../context/GlobalContext'
import Student from './Student'
import GateGuard from './GateGuard'
import Admin from './Admin'

export default function Dashboard({ navigation }) {
  const { auth, user } = useContext(GlobalContext);

  return (
    <Background>
      {
        user.role === 2 && <Student />
      }
      {
        user.role === 1 && <GateGuard />
      }
      {
        user.role === 0 && <Admin />
      } 
    </Background>
  )
}



