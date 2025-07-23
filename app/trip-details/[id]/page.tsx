import { createClient } from '../../utils/supabase/client';
import styles from '../../trip-planner/page.module.css'
import { logOut, goHome } from '../../trip-planner/actions';
import { notFound } from 'next/navigation';
import Link from 'next/link';

export default async function TripDetailsPage({ params }: { params: { id: string } }) {
  const supabase = createClient();

  const { data: trip, error } = await supabase
    .from('TRIPSCHEMA')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !trip) {
    notFound(); // Show 404 if trip is not found
  }

  return (
    <>
      <div className={styles.titleBar}>
        <h1 className={styles.title} onClick={goHome}>Travelista | Your Personal Travel Tool</h1>
        <button onClick={logOut}>Log Out</button>
      </div>
      <div>
        <Link href={"/trip-planner"}>Back</Link>
        <h2>{trip.location_name}</h2>
        <p>Date: {trip.trip_date}</p>
        <p>Description: {trip.description}</p>
        {/* Add more trip details as needed */}
      </div>
    </>
  );
}

