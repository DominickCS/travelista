import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { login, signup } from './actions'

export default async function page() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (data?.user) {
    redirect('/trip-planner')
  }


  return (
    <>
      <h1>Travelista - Your Personal Travel Tool</h1>
      <div className='loginForm'>
        <form>
          <label htmlFor="email">Email:</label>
          <input id="email" name="email" type="email" required />
          <label htmlFor="password">Password:</label>
          <input id="password" name="password" type="password" required />
          <button formAction={login}>Log in</button>
          <button formAction={signup}>Sign up</button>
        </form>
      </div>
    </>
  )
}
