'use server'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function modifyTripDetails(formData: FormData) {
  const supabase = await createClient()
  let { data: { user } } = await supabase.auth.getUser()
  let tripName = formData.get('tripNameInput')
  let tripDate = formData.get('tripdateInput')
  let tripCompleted = formData.get('tripcompletedInput')
  const { error } = await supabase.from('TRIPSCHEMA').insert([{ user_id: user.id, trip_name: tripName, trip_date: tripDate, trip_completed: tripCompleted }]).select()
  if (error) {
    console.log("Error inside of addNewTrip(): " + error.message)
  }
  revalidatePath("/trip-planner")
}

export async function getTripData() {
  const supabase = await createClient()
  let { data: { user } } = await supabase.auth.getUser()
  console.log("Current User Requesting Data: " + user.id)
  const { data, error } = await supabase.from('TRIPSCHEMA').select('*').eq("user_id", user.id)
  if (error) {
    console.log("Error inside of updateTripList(): " + error.message)
  }
  return data.sort(function (a, b) { return a.id - b.id })
}

export async function logOut() {
  const supabase = await createClient()
  let { data: { user } } = await supabase.auth.getUser()
  let { error } = await supabase.auth.signOut();
  if (error) {
    console.log("Error indside of logOut(): " + error.message)
  }
  console.log("Logging Out: " + user.id)

  redirect("/login")
}

export async function goHome() {
  redirect("/")
}
