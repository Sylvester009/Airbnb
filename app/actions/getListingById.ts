import prisma from '@/app/libs/prismadb';
import { isDynamicServerError } from "next/dist/client/components/hooks-server-context";

interface IParams {
  listingId?: string;
}

export default async function getListingById(
  params: IParams
) {
  try {
    const {listingId} = params;

    const listing = await prisma.listing.findUnique({
      where:{
        id: listingId
      },
      include: {
        user: true
      }    
    });

    if(!listing) {
      return null;
    }

    return {
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: 
          listing.user.emailVerified?.toISOString() || null
      }
    };
  }catch (error: any) {
    if(isDynamicServerError(error)){
      throw error;
    }
  {
    throw new Error(error);
  }
  }
}