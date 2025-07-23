import styles from "./page.module.css"
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { addNewTrip, getTripData, logOut } from './actions'

export default async function TripComponent() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  let tripList = await getTripData()

  return (
    <>
      <div>
        <h1>Travelista - Your Personal Travel Tool</h1>
        <button onClick={logOut}>Log Out</button>
      </div>
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
      <div>
        {tripList ? (
          <div className={styles.tripsContainer}>
            <h2>Your Getaways</h2>
            <hr />
            {tripList.map((trip, id) => (
              <div className={styles.tripBox} key={id}>
                <p>Trip ID: {trip.id}</p>
                <p>Trip Location: {trip.location_name}</p>
                <p>Trip Completed: {trip.trip_completed == true ? "✓" : "✕"}</p>
                {/* <div> */}
                {/*   <a onClick={() => updateCompletedBox(trip.trip_completed, trip.id)}>Trip Completed: {trip.trip_completed == true ? "✓" : "✕"}</a> */}
                {/* </div> */}
              </div>
            ))}
          </div>
        ) : ("Loading trips..."
        )}
      </div>

    </>
  )
}
