import DisplayData from "../components/DisplayData";
import Header from "../components/Header";
import Map from "../components/Map";

export default function Home() {
  return (
    <div className=' bg-[#081217] h-screen'>
      <Header />
      <main className="flex">
        <section className='hidden'>
          <DisplayData />
        </section>

        <section className="p-5 w-[400px] h-[650px] md:w-[900px] md:h-[800px] lg:w-[1200px] lg:h-[800px] xl:w-[2200px] xl:h-[800px] col-span-2">
          <Map />
        </section>
      </main>
    </div>
  );
}
