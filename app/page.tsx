'use client';
import Image from 'next/image';
import data from './data/mockData';
import KeenSlider, { KeenSliderInstance } from 'keen-slider';
import 'keen-slider/keen-slider.min.css';
import { useKeenSlider } from 'keen-slider/react';
import { useState } from 'react';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      initial: 0,
      slideChanged(s) {
        setCurrentSlide(s.track.details.rel);
      },
      created() {
        setLoaded(true);
      },
      loop: true,
      breakpoints: {
        '(min-width: 320px)': {
          slides: { perView: 1, spacing: 1 },
        },
        '(min-width: 768px)': {
          slides: { perView: 2, spacing: 1 },
        },
        '(min-width: 1000px)': {
          slides: { perView: 3, spacing: 1 },
        },
      },
    },
    [
      // add plugins here
    ]
  );

  return (
    <main className='h-[100vh]'>
      {/* <Image src='/vercel.svg' alt='Vercel Logo' className='dark:invert' width={100} height={24} priority /> */}

      <section className='flex  flex-col px-3'>
        <h1 className='text-slate-500 text-7xl font-bold'>Полезные материалы</h1>
        <p className='text-slate-800 text-2xl font-normal mb-14'>
          Собрали для вас полезные исследования схемы кормления и другие
          <br />
          материалы, которые пригодятся для лучших результатов на вашем
          <br />
          хозяйстве
        </p>
        <div ref={sliderRef} className='keen-slider'>
          {data.map((item) => {
            return item.title.length < 35 ? (
              <div key={item.id} className='keen-slider__slide flex w-full'>
                <div className='flex flex-col flex-wrap w-full max-w-[344px] h-full min-h-max mx-auto my-auto'>
                  <Image
                    src={item.img}
                    width={344}
                    height={344}
                    alt='img.'
                    className='h-[344px] object-contein mb-8 '
                  />
                  <div className='flex flex-col grow'>
                    <h3 className='text-slate-600 text-[28px] font-semibold hover:text-green-400 w-full mb-auto'>
                      {item.title}
                    </h3>
                    <time className='text-slate-400 text-lg font-medium'>{item.date}</time>
                  </div>
                </div>
              </div>
            ) : (
              <div key={item.id} className='keen-slider__slide w-full'>
                <div className='flex  flex-col flex-wrap w-full max-w-[688px]  h-full  min-h-max  mx-auto my-auto'>
                  <Image src={item.img} width={688} height={344} alt='img.' className='h-[344px] object-contein mb-8' />
                  <div className='flex flex-col grow'>
                    <h3 className='text-slate-600 text-[28px] font-semibold  hover:text-green-400  w-full  mb-auto'>
                      {item.title}
                    </h3>
                    <time className='text-slate-400 text-lg font-medium'>{item.date}</time>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        {loaded && instanceRef.current && (
          <div className='flex justify-between'>
            <Arrow
              left
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
              disabled={currentSlide === 0}
            />

            <Arrow
              onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
              disabled={currentSlide === instanceRef.current.track.details.slides.length - 1}
            />
          </div>
        )}
      </section>
    </main>
  );
}
function Arrow(props: any) {
  const disabled = props.disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={props.onClick}
      className={`arrow ${props.left ? 'arrow--left' : 'arrow--right'} ${disabled} w-7 h-7`}
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
    >
      {props.left && <path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />}
      {!props.left && <path d='M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z' />}
    </svg>
  );
}
