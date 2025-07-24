import styles from "./page.module.css"
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import { addNewTrip, getTripData, goHome, logOut } from './actions'
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
      <div className={styles.titleBar}>
        <h1 className={styles.title} onClick={goHome}>Travelista | Your Personal Travel Tool</h1>
        <button onClick={logOut}>Log Out</button>
      </div>
      <form className={styles.tripForm}>
        <div className={styles.formSection}>
          <label htmlFor='tripNameInput'>Trip Name</label>
          <input id="tripNameInput" type='text' name="tripNameInput" required />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='tripdateInput'>Trip Date</label>
          <input id="tripdateInput" type='date' name="tripdateInput" required />
        </div>
        <div className={styles.formSection}>
          <label htmlFor='tripcompletedInput'>Trip Completed?</label>
          {/* <input onChange={(e) => { e.target.value = "completed" }} id="tripcompletedInput" name="tripcompletedInput" type='checkbox' defaultValue={"not completed"} /> */}
        </div>
        <button formAction={addNewTrip}>Create Trip!</button>
      </form>
      <hr />
      <div>
        {tripList ? (
          <div className={styles.tripsContainer}>
            <h2>Your Travel List</h2>
            {tripList.map((trip) => (
              <div className={styles.tripBox} key={trip.id}>
                <h3>{trip.trip_name}</h3>
                <hr />
                <h4>Trip Date</h4>
                <p>{trip.trip_date}</p>
                <p>{trip.trip_completed == "completed" ? "Trip Completed" : "Trip Planned"}</p>
                <div className={styles.tripDetailsContainer}>
                  <Link href={`/trip-details/${trip.id}`}>Trip Details</Link>
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
