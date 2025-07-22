import styles from "./TripComponent.module.css"
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'

export default async function TripComponent() {

  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  async function updateTripList() {
    const { data, error } = await supabase.from('TRIPSCHEMA').select('*')
    if (error) {
      console.log("Error inside of updateTripList(): " + error)
    }
    let sortedData = data.sort(function (a, b) { return a.id - b.id })
    console.log(sortedData)
  }

  async function addNewTrip(locationName, tripDate, tripCompleted) {
    locationName = formData.get('locationInput')
    tripDate = formData.get('tripDate')
    tripCompleted = formData.get('tripcompletedInput')
    resetForm()
    const { tripData, error } = await supabase.from('TRIPSCHEMA').insert([{ location_name: locationName, trip_date: tripDate, trip_completed: tripCompleted }]).select()
    if (error) {
      console.log("Error inside of addNewTrip(): " + error)
    }
    updateTripList()
  }

  async function updateCompletedBox(tripCompleted, id) {

    tripCompleted = formData.get('tripcompletedInput')
    const { error } = await supabase.from('TRIPSCHEMA').upsert([{ id: id, trip_completed: tripCompleted }]).select()
    if (error) {
      console.log("Error inside updateCompletedBox(): " + error)
    }
    updateTripList()
  }


  function resetForm() {
    document.getElementById('locationInput').value = '';
    document.getElementById('tripdateInput').value = '';
    document.getElementById('tripcompletedInput').value = '';
  }

  return (
    <>
      <h1>Travelista - Your Personal Travel Tool</h1>
      <form className={styles.tripForm}>
        <div className={styles.formSection}>
          <label htmlFor='locationName'>Location Name</label>
          <input id="locationInput" type='text' onChange={(e) => setLocationName(e.target.value)} />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='tripDate'>Trip Date</label>
          <input id="tripdateInput" type='date' onChange={(e) => setTripDate(e.target.valueAsDate)} />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='tripCompleted'>Trip Completed?</label>
          <input id="tripcompletedInput" name="tripcompletedInput" type='checkbox' />
        </div>
        <button type='submit' formAction={() => addNewTrip(locationName, tripDate, tripCompleted)}>Create Trip!</button>
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
