import { createClient } from '../../utils/supabase/client';
import styles from './page.module.css'
import { logOut, goHome } from '../../trip-planner/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function TripDetailsPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: trip, error: tripSchemaError } = await supabase
    .from('TRIPSCHEMA')
    .select('*')
    .eq('id', params.id)
    .single();

  if (tripSchemaError) {
    console.log("Error in DB Query: TABLE 'TRIPSCHEMA'" + tripSchemaError.message)
  }

  const { data: tripDetails, error: tripDetailsError } = await supabase
    .from('TRIPDETAILSCHEMA')
    .select('*')
    .eq('id', params.id)
    .single();

  if (tripDetailsError) {
    console.log("Error in DB Query: TABLE 'TRIPSCHEMA'" + tripDetailsError.message)
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
        <p>Description: {trip.description}</p>
        <div>
          <input type='text' className={styles.tripDetailInput} name='tripDescription' />
        </div>
      </div>
    </>
  );
}

