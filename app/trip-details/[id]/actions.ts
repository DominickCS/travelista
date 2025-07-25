'use server'
import { redirect } from 'next/navigation'
import { createClient } from '../../utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function modifyTripDetails(formData: FormData) {
  const supabase = await createClient()
  let { data: { user } } = await supabase.auth.getUser()
  const { data } = await supabase.from('TRIPSCHEMA').select('id')

  let tripName = formData.get('tripNameInput')
  let tripDate = formData.get('tripdateInput')
  let tripDescription = formData.get('tripDescriptionInput')
  let tripNotes = formData.get('tripNotesInput')
  const { error: tripSchemaError } = await supabase.from('TRIPSCHEMA').upsert([{ id: data[0].id, user_id: user.id, trip_name: tripName, trip_date: tripDate }]).select()
  if (tripSchemaError) {
    console.log("Error inside of modifyTripDetails() via the 'TRIPSCHEMA' DB: " + tripSchemaError.message)
  }

  const { error: tripDetailSchemaError } = await supabase.from("TRIPDETAILSCHEMA").upsert([{ id: data[0].id, user_id: user.id, trip_description: tripDescription, trip_notes: tripNotes }]).select()
  if (tripDetailSchemaError) {
    console.log("Error inside of modifyTripDetails() via the 'TRIPDETAILSCHEMA' DB: " + tripDetailSchemaError.message)
  }

  revalidatePath(`/trip-details/${data[0].id}`)
}

export async function confirmToDoList(taskList) {
  console.log(taskList)
  const supabase = await createClient()
  let { data: { user } } = await supabase.auth.getUser()

  const { data } = await supabase.from('TRIPSCHEMA').select('id')
  const { error: tripDetailSchemaError } = await supabase.from("TRIPDETAILSCHEMA").upsert([{ id: data[0].id, user_id: user.id, trip_to_do: taskList }]).select()
  if (tripDetailSchemaError) {
    console.log("Error inside of modifyTripDetails() via the 'TRIPDETAILSCHEMA' DB: " + tripDetailSchemaError.message)
  }

  revalidatePath(`/trip-details/${data[0].id}`)
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
