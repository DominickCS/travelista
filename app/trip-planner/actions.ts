'use server'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

const supabase = await createClient()

const { data: { user } } = await supabase.auth.getUser()
let userID = user.id

export async function addNewTrip(formData: FormData) {
  let locationName = formData.get('locationInput')
  let tripDate = formData.get('tripdateInput')
  let tripCompleted = formData.get('tripcompletedInput')
  const { error } = await supabase.from('TRIPSCHEMA').insert([{ user_id: userID, location_name: locationName, trip_date: tripDate, trip_completed: tripCompleted }]).select()
  if (error) {
    console.log("Error inside of addNewTrip(): " + error.message)
  }
}

export async function getTripData() {
  console.log("Current User Requesting Data: " + userID)
  const { data, error } = await supabase.from('TRIPSCHEMA').select('*').eq("user_id", userID)
  if (error) {
    console.log("Error inside of updateTripList(): " + error)
  }
  return data.sort(function (a, b) { return a.id - b.id })
}

// export async function updateCompletedBox(tripCompleted: boolean, id: number) {
//   tripCompleted = !tripCompleted
//   const { error } = await supabase.from('TRIPSCHEMA').upsert([{ id: id, trip_completed: tripCompleted }]).select()
//   if (error) {
//     console.log("Error inside updateCompletedBox(): " + error)
//   }
// }

export async function logOut() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    console.log("Error indside of logOut(): " + error.message)
  }

  redirect("/login")
}
