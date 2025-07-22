'use server'
import styles from "../components/TripComponent.module.css"
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { addNewTrip } from './actions'

export default async function TripComponent() {
  const supabase = await createClient()

  async function updateTripList() {
    const { data, error } = await supabase.from('TRIPSCHEMA').select('*')
    if (error) {
      console.log("Error inside of updateTripList(): " + error)
    }
    let sortedData = data.sort(function (a, b) { return a.id - b.id })
    console.log(sortedData)
  }

  async function updateCompletedBox(formData: FormData, id: number) {
    let tripCompleted = formData.get('tripcompletedInput')
    const { error } = await supabase.from('TRIPSCHEMA').upsert([{ id: id, trip_completed: tripCompleted }]).select()
    if (error) {
      console.log("Error inside updateCompletedBox(): " + error)
    }
    updateTripList()
  }

  return (
    <>
      <h1>Travelista - Your Personal Travel Tool</h1>
      <form className={styles.tripForm}>
        <div className={styles.formSection}>
          <label htmlFor='locationName'>Location Name</label>
          <input id="locationInput" type='text' name="locationInput" required />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='tripDate'>Trip Date</label>
          <input id="tripdateInput" type='date' name="tripdateInput" required />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='tripCompleted'>Trip Completed?</label>
          <input id="tripcompletedInput" name="tripcompletedInput" type='checkbox' />
        </div>
        <button formAction={addNewTrip}>Create Trip!</button>
      </form>
      <hr />
      {/* <div> */}
      {/*   {tripList ? ( */}
      {/*     <div className={styles.tripsContainer}> */}
      {/*       <h2>Your Getaways</h2> */}
      {/*       <hr /> */}
      {/*       {tripList.map((trip, id) => ( */}
      {/*         <div className={styles.tripBox} key={id}> */}
      {/*           <p>Trip ID: {trip.id}</p> */}
      {/*           <p>Trip Location: {trip.location_name}</p> */}
      {/*           <div> */}
      {/*             <a onClick={() => updateCompletedBox(!trip.trip_completed, trip.id)}>Trip Completed: {trip.trip_completed == true ? "✓" : "✕"}</a> */}
      {/*           </div> */}
      {/*         </div> */}
      {/*       ))} */}
      {/*     </div> */}
      {/*   ) : ("Loading trips..." */}
      {/*   )} */}
      {/* </div> */}
    </>
  )
}
