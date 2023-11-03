import Mortgage from './feature/calculate-mortgage/components/mortgage';

const App = () => {
  return (
    <main>
      <section className="w-full flex flex-col gap-8">
        <h1 className="pt-[120px] px-5 md:px-[55px] text-xl md:text-2xl font-roboto">
          Рассчитайте ипотеку быстро и просто
        </h1>
        <Mortgage />
      </section>
    </main>
  );
};

export default App;
