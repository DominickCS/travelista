import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
import styles from '../components/TripComponent.module.css'

export default async function PrivatePage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }
  return (
    <>
      <h1>Travelista - Your Personal Travel Tool</h1>
      <form className={styles.tripForm}>
        <div className={styles.formSection}>
          <label htmlFor='locationName'>Location Name</label>
          {/* <input id="locationInput" type='text' onChange={(e) => setLocationName(e.target.value)} /> */}
        </div>
        <div className={styles.formSection}>
          <label htmlFor='tripDate'>Trip Date</label>
          {/* <input id="tripdateInput" type='date' onChange={(e) => setTripDate(e.target.valueAsDate)} /> */}
        </div>
        <div className={styles.formSection}>
          <label htmlFor='tripCompleted'>Trip Completed?</label>
          {/* <input id="tripcompletedInput" type='checkbox' onChange={() => setTripCompleted(!tripCompleted)} value={tripCompleted} /> */}
        </div>
        {/* <button type='submit' onClick={() => addNewTrip(locationName, tripDate, tripCompleted)}>Create Trip!</button> */}
      </form>
      <hr />
    </>
  )
}

