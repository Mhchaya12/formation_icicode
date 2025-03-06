import { useState } from 'react'
import React  from 'react'
import { LoginFormC,LoginFormF } from './loginForm'
function AppState() {
  const [visible, setVisible]= useState(true);
  return (
    <div>
      {
        visible?<>
        <LoginFormC/>
        <LoginFormF/>
        </>:null
      }
      <button onClick={()=> setVisible(!visible)}>Toggle</button>
    </div>

  )
}

export default AppState