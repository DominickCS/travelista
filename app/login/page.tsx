'use client'
import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { permanentRedirect } from 'next/navigation'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function page() {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);

  async function tryLogin() {
    let { data, error } = await supabase.auth.signInWithPassword({
      email: username,
      password: password
    })
    if (data) {
      console.log(data)
      if (data.user != null) {
        const { data: { user } } = await supabase.auth.getUser()
        permanentRedirect(`/trip-planner`)
        // console.log("User " + data.user.id + " currently logged in")
      }
      else {
        console.log("Failed to login")
      }
    }
    else if (error) {
      console.log("Error in tryLogin(): " + error)
    }
  }

  return (
    <>
      <h1>Travelista - Your Personal Travel Tool</h1>
      <div className='loginForm'>
        <label htmlFor="emailField">Email</label>
        <input required onChange={(e) => setUsername(e.target.value)} name="emailField" type="email" />

        <label htmlFor="passwordField">Password</label>
        <input required onChange={(e) => setPassword(e.target.value)} name="passwordField" type="password" />

        <button onClick={() => tryLogin()} type="submit">Log In</button>
      </div>
    </>
  )
}
