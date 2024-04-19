import EmptyState from "../components/EmptyState";
import TripsClient from "./TripsClient";

import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import { Suspense } from "react";
import Loading from "../loading";


const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title="Unauthorized"
        subtitle="Please login"
      />
    )
  }

  const reservations = await getReservations({
    userId: currentUser?.id
  });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="You can create one by making reservations"
      />
    )
  }
  return (
    <Suspense fallback={<Loading/>}>
    <TripsClient
      reservations={reservations}
      currentUser={currentUser}
    />
    </Suspense>
  )

}

export default TripsPage