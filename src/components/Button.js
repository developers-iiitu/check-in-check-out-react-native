import React from 'react'
import { StyleSheet } from 'react-native'
import { Button as PaperButton } from 'react-native-paper'
import { theme } from '../core/theme'
//iiitulogo.gif
export default function Button({ mode, style, ...props }) {
  return (
    <PaperButton
      disabled={props.disabled}
      style={[
        
        styles.button,
        style,
        mode === 'outlined' && { backgroundColor: theme.colors.surface },
    
      ]}
      labelStyle={styles.text}
      mode={mode}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
    paddingVertical: 2,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
})
