import Mortgage from './feature/calculate-mortgage/components/mortgage';

const App = () => {
  return (
    <main>
      <section className="w-full flex flex-col gap-8">
        <h1 className=" max-w-[1130px] w-full mx-auto px-5 md:px-[55px] pt-[120px] text-xl md:text-2xl font-roboto">
          Рассчитайте ипотеку быстро и просто
        </h1>
        <Mortgage />
      </section>
    </main>
  );
};

export default App;
