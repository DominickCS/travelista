import styles from "./page.module.css"
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { addNewTrip, getTripData, logOut } from './actions'
import Link from "next/link"

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
            {tripList.map((trip) => (
              <div className={styles.tripBox} key={trip}>
                <h3>{trip.location_name}</h3>
                <p>{trip.trip_date}</p>
                <div className={styles.tripDetailsContainer}>
                  <Link href={"trip-details"}>Trip Details</Link>
                </div>
              </div>
            ))}
          </div>
        ) : ("Loading trips..."
        )}
      </div>

    </>
  )
}
