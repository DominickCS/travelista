'use client'
import styles from "./TripComponent.module.css"
import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

export default function TripComponent() {
  const [locationName, setLocationName] = useState(null)
  const [tripDate, setTripDate] = useState(null)
  const [tripCompleted, setTripCompleted] = useState(false)
  const [tripList, setTripList] = useState(null)

  useEffect(() => {
    updateTripList()
  }, []);

  async function updateTripList() {
    const { data, error } = await supabase.from('TRIPSCHEMA').select('*')
    if (error) {
      console.log("Error inside of updateTripList(): " + error)
    }
    let sortedData = data.sort(function (a, b) { return a.id - b.id })
    setTripList(sortedData)
  }

  async function addNewTrip(locationName, tripDate, tripCompleted) {
    resetForm()
    const { tripData, error } = await supabase.from('TRIPSCHEMA').insert([{ location_name: locationName, trip_date: tripDate, trip_completed: tripCompleted }]).select()
    if (error) {
      console.log("Error inside of addNewTrip(): " + error)
    }
    updateTripList()
  }

  async function updateCompletedBox(tripCompleted, id) {
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
          <input id="tripcompletedInput" type='checkbox' onChange={() => setTripCompleted(!tripCompleted)} value={tripCompleted} />
        </div>
        <button type='submit' onClick={() => addNewTrip(locationName, tripDate, tripCompleted)}>Create Trip!</button>
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
                <div>
                  <a onClick={() => updateCompletedBox(!trip.trip_completed, trip.id)}>Trip Completed: {trip.trip_completed == true ? "✓" : "✕"}</a>
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
