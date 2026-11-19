
'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import {
  motion,
  useReducedMotion,
  useInView,
} from 'motion/react';
import { useRef } from 'react';
import {
  ArrowUpRight,
  Move3D,
  Sparkles,
  MousePointer2,
  Coffee,
  ArrowRight,
} from 'lucide-react';

const Scene = dynamic(
  () => import('./ThreeDessertScene'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex h-14 w-14 items-center justify-center rounded-full border border-[#966342]/60">
            <div className="h-7 w-7 animate-spin rounded-full border-2 border-[#966342] border-t-[#e5ac82]" />
          </div>

          <span className="text-xs tracking-[0.15em] text-[#ddc4b5]">
            PREPARING YOUR DESSERT
          </span>
        </div>
      </div>
    ),
  }
);

export default function ThreeDessertFeature() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  const reduce = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduce ? 0 : 30,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <section
      ref={sectionRef}
      className="
        relative isolate overflow-hidden
        bg-[#20110e]
        py-14 sm:py-20 lg:py-24
      "
    >
      {/* AMBIENT BACKGROUND */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 top-10 h-80 w-80
          rounded-full bg-[#966342]/10
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-32 bottom-0 h-96 w-96
          rounded-full bg-[#a16b4b]/10
          blur-[120px]
        "
      />

      <div
        className="
          relative z-10 mx-auto grid
          w-full max-w-7xl
          grid-cols-1 items-center
          gap-10 px-4
          sm:gap-14 sm:px-6
          lg:grid-cols-2 lg:gap-16 lg:px-8
          xl:gap-20
        "
      >
        {/* 3D DESSERT DISPLAY */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduce ? 0 : -40,
            scale: reduce ? 1 : 0.96,
          }}
          animate={
            isInView
              ? { opacity: 1, x: 0, scale: 1 }
              : {
                  opacity: 0,
                  x: reduce ? 0 : -40,
                  scale: reduce ? 1 : 0.96,
                }
          }
          transition={{
            duration: reduce ? 0 : 0.8,
            ease,
          }}
          className="relative order-2 min-w-0 lg:order-1"
        >
          {/* DECORATIVE FRAME */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -inset-2 rounded-[30px]
              border border-[#966342]/25
              sm:-inset-3 sm:rounded-[38px]
            "
          />

          {/* MAIN 3D CONTAINER */}
          <div
            className="
              group relative isolate
              h-[300px] w-full
              overflow-hidden rounded-[24px]
              border-2 border-[#966342]
              bg-[radial-gradient(circle_at_center,#4c2b21,#180c0a)]
              shadow-[0_25px_70px_rgba(0,0,0,0.35)]
              min-[380px]:h-[350px]
              sm:h-[440px] sm:rounded-[30px]
              md:h-[500px]
              lg:h-[510px]
              xl:h-[550px]
            "
          >
            {/* TOP SPOTLIGHT */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none absolute
                left-1/2 top-[-25%]
                z-0 h-[65%] w-[80%]
                -translate-x-1/2
                rounded-full bg-[#e5ac82]/10
                blur-[75px]
              "
            />

            {/* 3D SCENE */}
            <div className="absolute inset-0 z-10">
              <Scene />
            </div>

            {/* TOP LABEL */}
            <div
              className="
                pointer-events-none absolute
                left-4 top-4 z-20
                flex items-center gap-2
                rounded-full
                border border-[#966342]/60
                bg-[#281712]/85
                px-3 py-2
                text-[10px] font-semibold
                uppercase tracking-[0.1em]
                text-[#e5ac82]
                backdrop-blur-md
                sm:left-6 sm:top-6
                sm:px-4 sm:text-xs
              "
            >
              <Sparkles size={13} />
              Signature Dessert
            </div>

            {/* RIGHT FLOATING DETAIL */}
            <motion.div
              aria-hidden="true"
              animate={
                reduce
                  ? undefined
                  : {
                      y: [0, -8, 0],
                    }
              }
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                pointer-events-none absolute
                right-4 top-16 z-20
                hidden h-16 w-16
                items-center justify-center
                rounded-full border
                border-[#966342]/70
                bg-[#281712]/75
                text-[#e5ac82]
                backdrop-blur-md
                sm:flex
              "
            >
              <Coffee size={24} strokeWidth={1.5} />
            </motion.div>

            {/* BOTTOM INTERACTION LABEL */}
            <div
              className="
                pointer-events-none absolute
                bottom-4 left-4 right-4 z-20
                flex flex-wrap items-center
                justify-between gap-3
                sm:bottom-6 sm:left-6 sm:right-6
              "
            >
              <div
                className="
                  inline-flex items-center gap-2
                  rounded-full
                  border border-[#966342]
                  bg-[#281712]/90
                  px-3 py-2
                  text-[10px] text-[#ddc4b5]
                  backdrop-blur-md
                  sm:px-4 sm:text-xs
                "
              >
                <Move3D size={15} />
                Interactive 3D Dessert
              </div>

              <div
                className="
                  hidden items-center gap-2
                  rounded-full
                  border border-[#966342]/50
                  bg-[#281712]/85
                  px-3 py-2
                  text-xs text-[#ddc4b5]
                  backdrop-blur-md
                  sm:flex
                "
              >
                <MousePointer2 size={14} />
                Drag to explore
              </div>
            </div>

            {/* CORNER ACCENTS */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 z-20 h-16 w-16 border-b-2 border-l-2 border-[#e5ac82]/35"
            />

            <div
              aria-hidden="true"
              className="pointer-events-none absolute right-0 top-0 z-20 h-16 w-16 border-r-2 border-t-2 border-[#e5ac82]/35"
            />
          </div>

          {/* BOTTOM CAPTION */}
          <div className="mt-5 flex items-center justify-between gap-3 px-1">
            <span className="flex items-center gap-2 text-[10px] uppercase tracking-[0.16em] text-[#ddc4b5]/75 sm:text-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#e5ac82]" />
              Crafted for the senses
            </span>

            <span className="font-serif text-sm italic text-[#e5ac82]">
              Aurum Selection
            </span>
          </div>
        </motion.div>

        {/* CONTENT */}
        <div className="order-1 min-w-0 text-center lg:order-2 lg:text-left">
          {/* EYEBROW */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduce ? 0 : 0.55,
              ease,
            }}
            className="flex items-center justify-center gap-3 lg:justify-start"
          >
            <span className="h-px w-8 bg-[#966342]" />

            <span className="eyebrow">
              More than a café
            </span>

            <span className="h-px w-8 bg-[#966342] lg:hidden" />
          </motion.div>

          {/* HEADING */}
          <motion.h2
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduce ? 0 : 0.65,
              delay: reduce ? 0 : 0.08,
              ease,
            }}
            className="
              serif mt-4
              text-[clamp(2rem,4.5vw,3.75rem)]
              leading-[1.12]
              text-[#ddc4b5]
            "
          >
            A little{' '}
            <span className="italic text-[#e5ac82]">
              indulgence
            </span>{' '}
            in every bite.
          </motion.h2>

          {/* DECORATIVE DIVIDER */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={
              isInView
                ? { scaleX: 1 }
                : { scaleX: 0 }
            }
            transition={{
              duration: reduce ? 0 : 0.7,
              delay: reduce ? 0 : 0.18,
              ease,
            }}
            className="
              mx-auto my-6 h-[2px] w-16
              origin-center bg-[#966342]
              sm:my-8
              lg:mx-0 lg:origin-left
            "
          />

          {/* DESCRIPTION */}
          <motion.p
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduce ? 0 : 0.65,
              delay: reduce ? 0 : 0.18,
              ease,
            }}
            className="
              mx-auto max-w-lg
              text-[14px] leading-7
              text-[#ddc4b5]
              sm:text-[15px] sm:leading-8
              lg:mx-0 xl:text-base
            "
          >
            Explore our interactive chocolate cake,
            then discover the full menu.
          </motion.p>

          {/* FEATURE TAGS */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduce ? 0 : 0.65,
              delay: reduce ? 0 : 0.25,
              ease,
            }}
            className="
              mt-6 flex flex-wrap
              items-center justify-center gap-2
              lg:justify-start
            "
          >
            {[
              'Rich Chocolate',
              'Signature Creation',
              'Made with Love',
            ].map((tag) => (
              <span
                key={tag}
                className="
                  rounded-full border
                  border-[#966342]/55
                  bg-[#281712]/60
                  px-3 py-2
                  text-[11px] font-medium
                  text-[#ddc4b5]
                  sm:text-xs
                "
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduce ? 0 : 0.65,
              delay: reduce ? 0 : 0.32,
              ease,
            }}
            className="mt-8 sm:mt-10"
          >
            <Link
              href="/menu"
              className="
                group inline-flex min-h-12
                items-center justify-center gap-3
                rounded-full
                border border-white/35
                bg-[#a16b4b]
                px-6 py-3.5
                text-[13px] font-semibold
                text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-[#b57b55]
                hover:shadow-[0_12px_30px_rgba(161,107,75,0.25)]
                sm:px-7 sm:py-4 sm:text-sm
              "
            >
              Explore the Menu

              <ArrowUpRight
                size={18}
                className="
                  transition-transform duration-300
                  group-hover:-translate-y-0.5
                  group-hover:translate-x-0.5
                "
              />
            </Link>
          </motion.div>

          {/* SMALL SIGNATURE LINE */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduce ? 0 : 0.6,
              delay: reduce ? 0 : 0.4,
              ease,
            }}
            className="
              mt-7 flex items-center
              justify-center gap-3
              lg:justify-start
            "
          >
            <span className="h-px w-8 bg-[#966342]" />

            <span className="font-serif text-sm italic text-[#e5ac82]">
              Every bite, a little luxury.
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
