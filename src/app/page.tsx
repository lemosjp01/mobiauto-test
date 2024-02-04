import { EVehicleType } from "@/@types/global";
import ContainerComponent from "@/components/Container/ContainerComponent";

async function getBrands() {
  try {
    const brands = await fetch(`${process.env.API_HOST}/fipe/api/v2/${EVehicleType.CARS}/brands`, {
      method: 'GET'
    });

    return brands.json();
  } catch (error) {
    console.error("ERROR: ", error);
  }
}

export default async function Home() {
  const brandsData = await getBrands();
  return (
    <main>
      <ContainerComponent brands={brandsData} />
    </main>
  )
}
