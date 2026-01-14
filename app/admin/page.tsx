import { getListings } from "@/src/lib/listings";
import { AdminControls } from "@/components/admin-controls";

export default function AdminPage() {
  const listings = getListings();
  return <AdminControls listings={listings} />;
}
