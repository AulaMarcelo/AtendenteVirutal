import Header from "@/components/hader";
import PlaceOrders from "@/components/placeordes";
import Image from "next/image";

export default function Home() {
  return (
   <>
   <Header />
   <div className="p-12">
      <PlaceOrders />
   </div>
   </>
  );
}
