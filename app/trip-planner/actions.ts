'use server'
import { createClient } from '../utils/supabase/server'

const supabase = await createClient()

const { data: { user } } = await supabase.auth.getUser()

export async function addNewTrip(formData: FormData) {
  const { data: { user } } = await supabase.auth.getUser()
  let userID = user.id;
  let locationName = formData.get('locationInput')
  let tripDate = formData.get('tripDate')
  let tripCompleted = formData.get('tripcompletedInput')
  const { error } = await supabase.from('TRIPSCHEMA').insert([{ user_id: userID, location_name: locationName, trip_date: tripDate, trip_completed: tripCompleted }]).select()
  if (error) {
    console.log("Error inside of addNewTrip(): " + error.message)
  }
}

