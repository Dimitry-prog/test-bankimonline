import InputClassic from './shared/ui/inputs/input-classic';
import Button from './shared/ui/button';
import InputRange from './shared/ui/inputs/input-range';
import Dropdown from './shared/ui/dropdown';

const App = () => {
  return (
    <main className="">
      <section className="w-full flex flex-col gap-8">
        <div className="max-w-[1130px] w-full mx-auto pt-[120px] px-5 md:px-[55px] flex flex-col gap-8">
          <h1 className="text-xl md:text-2xl font-roboto">Рассчитайте ипотеку быстро и просто</h1>
          <div className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
            <InputClassic label="Стоимость недвижимости" />
            <Dropdown
              label="Город покупки недвижимости"
              placeholder="Выберите город"
              options={[
                'test3',
                'tset2',
                'test4',
                't8set2',
                't8e8st',
                'tset12',
                'test547',
                'ts897et2',
              ]}
            />
            <Dropdown
              label="Когда вы планируете оформить ипотеку?"
              placeholder="Выберите период"
              options={[
                'test3',
                'tset2',
                'test4',
                't8set2',
                't8e8st',
                'tset12',
                'test547',
                'ts897et2',
              ]}
            />
          </div>
          <div className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6">
            <InputRange min="0" max="30" step="1" label="Первоначальный взнос" />
            <Dropdown
              label="Тип недвижимости"
              placeholder="Выберите тип недвижимости"
              options={[
                'test3',
                'tset2',
                'test4',
                't8set2',
                't8e8st',
                'tset12',
                'test547',
                'ts897et2',
              ]}
            />
            <Dropdown
              label="Вы уже владеете недвижимостью?"
              placeholder="Выберите ответ"
              options={[
                'test3',
                'tset2',
                'test4',
                't8set2',
                't8e8st',
                'tset12',
                'test547',
                'ts897et2',
              ]}
            />
          </div>
          <div
            className="flex flex-col md:flex-row gap-8 md:gap-y-6 md:gap-x-16 md:grid md:grid-cols-2 xl:grid-cols-3 xl:gap-x-6 pt-6
            gap-8 border-t border-base-stroke"
          >
            <InputRange min="0" max="30" step="1" label="Срок" />
            <InputClassic label="Ежемесячный платеж" />
          </div>
        </div>

        <div className="py-6 border-t border-base-stroke bg-base-secondary md:bg-base-primary">
          <div className="max-w-[1130px] mx-auto px-5 md:px-[55px] flex justify-end">
            <Button type="button">Продолжить</Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default App;
