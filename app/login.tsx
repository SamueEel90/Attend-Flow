import { router } from 'expo-router'
import React from 'react'

const login = () => {
  return (
    <div>
      <button onClick={() => router.push('./home')}>login</button>
      
    </div>
  )
}

export default login
