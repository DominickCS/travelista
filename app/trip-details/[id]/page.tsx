import { createClient } from '../../utils/supabase/server';
import styles from './page.module.css'
import { modifyTripDetails, logOut, goHome } from './actions';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import TripToDo from '../components/tripToDo';

export default async function TripDetailsPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const supabase = await createClient();

  // let { data: { user } } = await supabase.auth.getUser()

  const { data: trip, error: tripSchemaError } = await supabase
    .from('TRIPSCHEMA')
    .select('*')
    .eq('id', { id }.id)
    .single();

  if (tripSchemaError) {
    console.log("Error in DB Query: TABLE 'TRIPSCHEMA'" + tripSchemaError.message)
    return notFound()
  }

  const { data: tripDetails, error: tripDetailsError } = await supabase
    .from('TRIPDETAILSCHEMA')
    .select('*')
    .eq('id', { id }.id)
    .single();

  if (tripDetailsError) {
    console.log("Error in DB Query: TABLE 'TRIPDETAILSCHEMA'" + tripDetailsError.message)
    return notFound()
  }

  return (
    <>
      <div className={styles.titleBar}>
        <h1 className={styles.title} onClick={goHome}>Travelista | Your Personal Travel Tool</h1>
        <button onClick={logOut}>Log Out</button>
      </div>
      <div>
        <Link href={"/trip-planner"}>Back to Trips</Link>
        <h2>{trip.trip_name}</h2>
        <p>Date: {trip.trip_date}</p>
        <p>Description: {tripDetails.trip_description}</p>
        <p>Trip Notes: {tripDetails.trip_notes}</p>
        <ul>
          <h3>TO-DO</h3>
          {tripDetails.trip_to_do.map((task) => (
            <li key={task.id}>{task.task}</li>
          ))}
        </ul>
        <TripToDo />
        <p>Trip Itinerary: {tripDetails.trip_itinerary}</p>
        <div>
          <form id='tripDetailForm' className={styles.tripDetailInput}>
            <label htmlFor='tripNameInput'>Modify Trip Name:</label>
            <input type='text' name='tripNameInput' />
            <label htmlFor='tripdateInput'>Modify Trip Date:</label>
            <input type='date' name='tripdateInput' />
            <label htmlFor='tripDescriptionInput'>Modify Trip Description:</label>
            <input type='text' name='tripDescriptionInput' />
            <label htmlFor='tripNotesInput'>Modify Trip Notes:</label>
            <input type='text' name='tripNotesInput' />
            <button formAction={modifyTripDetails}>Submit changes</button>
          </form>
        </div>
      </div>
    </>
  );
}

