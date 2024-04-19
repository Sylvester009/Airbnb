import getCurrentUser from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import ListingClient from "./ListingClient";
import ClientOnly from "@/app/components/ClientOnly";
import getReservations from "@/app/actions/getReservations";
import Loading from "@/app/loading";
import { Suspense } from "react";

interface IParams {
  listingId?: string;
}

const ListingPage = async ({params} : {params: IParams}) => {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <EmptyState/>
    )
  }
  return (
    <Suspense fallback={<Loading/>}>
    <ListingClient
      listing={listing}
      reservations={reservations}
      currentUser={currentUser}
    />
    </Suspense>
   );
}
 
export default ListingPage;