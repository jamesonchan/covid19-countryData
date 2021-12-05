import DisplayData from "../components/DisplayData";
import Header from "../components/Header";
import Map from "../components/Map";

export default function Home() {
  return (
    <div>
      <Header />
      <main className="md:grid md:grid-cols-3 max-w-6xl mx-auto mt-5">
        <section className='bg-red-300 col-span-1 '>
          <DisplayData />
        </section>

        <section className="p-5 w-[700px] h-[700px] col-span-2 bg-green-300">
          <Map />
        </section>
      </main>
    </div>
  );
}
