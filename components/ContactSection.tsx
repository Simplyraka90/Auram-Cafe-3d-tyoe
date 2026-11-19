
'use client';

import Link from 'next/link';
import { useRef } from 'react';
import {
  MapPin,
  Clock3,
  Phone,
  ArrowUpRight,
  Sparkles,
  Coffee,
} from 'lucide-react';
import {
  motion,
  useInView,
  useReducedMotion,
} from 'motion/react';
import { photo } from '@/lib/data';

const contactDetails = [
  {
    icon: MapPin,
    title: 'Address',
    body: 'Add your café address before launch',
  },
  {
    icon: Clock3,
    title: 'Opening Hours (sample)',
    body: 'Daily · 9:00 AM – 10:00 PM',
  },
  {
    icon: Phone,
    title: 'Contact',
    body: 'Add your café phone number',
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();

  const isInView = useInView(sectionRef, {
    once: true,
    amount: 0.15,
  });

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 25,
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
        py-16 sm:py-20 lg:py-24 xl:py-28
      "
    >
      {/* BACKGROUND DECORATION */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-28 top-16 h-72 w-72
          rounded-full bg-[#a47c38]/10
          blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-28 bottom-0 h-80 w-80
          rounded-full bg-[#e5ae83]/5
          blur-[110px]
        "
      />

      <div
        className="
          relative z-10 mx-auto grid
          w-full max-w-7xl grid-cols-1
          items-center gap-12 px-4
          sm:gap-14 sm:px-6
          lg:grid-cols-2 lg:gap-16 lg:px-8
          xl:gap-20
        "
      >
        {/* LEFT CONTENT */}
        <div className="order-1 min-w-0">
          {/* EYEBROW */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease,
            }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#e5ae83]" />

            <p className="eyebrow">
              Visit us
            </p>
          </motion.div>

          {/* HEADING */}
          <motion.h2
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.08,
              ease,
            }}
            className="
              serif mt-4
              text-[clamp(2.5rem,5vw,3.75rem)]
              leading-[1.12]
              text-white
              sm:mt-5
            "
          >
            Come On{' '}
            <span className="italic text-gold">
              In.
            </span>
          </motion.h2>

          {/* GOLD DIVIDER */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={
              isInView
                ? { scaleX: 1 }
                : { scaleX: 0 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.15,
              ease,
            }}
            className="
              my-6 h-[2px] w-16 origin-left
              bg-[#e5ae83]
              sm:my-8
            "
          />

          {/* DESCRIPTION */}
          <motion.p
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.15,
              ease,
            }}
            className="
              max-w-lg text-[14px]
              leading-7 text-[#dfc9bd]
              sm:text-[15px] sm:leading-8
              xl:text-base
            "
          >
            There’s always room for one more at our table.
            Find us, get in touch, or reserve your favorite
            corner.
          </motion.p>

          {/* CONTACT INFORMATION */}
          <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
            {contactDetails.map(
              ({ icon: Icon, title, body }, index) => (
                <motion.div
                  key={title}
                  initial={{
                    opacity: 0,
                    x: reduceMotion ? 0 : -20,
                  }}
                  animate={
                    isInView
                      ? { opacity: 1, x: 0 }
                      : {
                          opacity: 0,
                          x: reduceMotion ? 0 : -20,
                        }
                  }
                  transition={{
                    duration: reduceMotion ? 0 : 0.55,
                    delay: reduceMotion
                      ? 0
                      : 0.2 + index * 0.1,
                    ease,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { x: 4 }
                  }
                  className="
                    group flex items-start gap-4
                    rounded-xl border
                    border-[#e5ae83]/15
                    bg-white/[0.025]
                    p-4
                    transition-colors duration-300
                    hover:border-[#e5ae83]/40
                    hover:bg-white/[0.045]
                    sm:gap-5 sm:p-5
                  "
                >
                  {/* ICON */}
                  <div
                    className="
                      flex h-11 w-11 shrink-0
                      items-center justify-center
                      rounded-full
                      border border-[#e5ae83]/30
                      bg-[#100807]/70
                      text-[#e5ae83]
                      transition-all duration-300
                      group-hover:border-[#e5ae83]/60
                      sm:h-12 sm:w-12
                    "
                  >
                    <Icon
                      size={19}
                      strokeWidth={1.7}
                    />
                  </div>

                  {/* TEXT */}
                  <div className="min-w-0 pt-0.5">
                    <h3
                      className="
                        text-[14px] font-bold
                        text-white
                        sm:text-[15px]
                      "
                    >
                      {title}
                    </h3>

                    <p
                      className="
                        mt-1 text-[12px]
                        leading-6 text-[#827666]
                        sm:text-[13px]
                      "
                    >
                      {body}
                    </p>
                  </div>
                </motion.div>
              )
            )}
          </div>

          {/* BOOKING BUTTON */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.5,
              ease,
            }}
            className="mt-8 sm:mt-10"
          >
            <Link
              href="/booking"
              className="
                group inline-flex min-h-12
                items-center justify-center
                gap-3 rounded-full
                bg-[#100807]
                px-6 py-3.5
                text-[13px] font-semibold
                text-white
                transition-all duration-300
                hover:-translate-y-0.5
                hover:bg-[#a47c38]
                hover:shadow-[0_12px_30px_rgba(164,124,56,0.2)]
                sm:px-8 sm:py-4 sm:text-sm
              "
            >
              Reserve Your Table

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

          {/* SMALL SIGNATURE */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.6,
              delay: reduceMotion ? 0 : 0.55,
              ease,
            }}
            className="mt-6 flex items-center gap-3"
          >
            <Coffee
              size={15}
              className="text-[#e5ae83]"
            />

            <span className="serif text-sm italic text-[#dfc9bd]">
              Your favorite corner awaits.
            </span>
          </motion.div>
        </div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : 35,
            scale: reduceMotion ? 1 : 0.96,
          }}
          animate={
            isInView
              ? { opacity: 1, x: 0, scale: 1 }
              : {
                  opacity: 0,
                  x: reduceMotion ? 0 : 35,
                  scale: reduceMotion ? 1 : 0.96,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.8,
            delay: reduceMotion ? 0 : 0.12,
            ease,
          }}
          className="
            relative order-2 mx-auto
            w-full max-w-[550px]
            lg:mx-0
          "
        >
          {/* OUTER GOLD FRAME */}
          <div
            aria-hidden="true"
            className="
              pointer-events-none absolute
              -inset-2
              rounded-t-[160px]
              border border-[#e5ae83]/30
              sm:-inset-3
              sm:rounded-t-[220px]
            "
          />

          {/* MAIN IMAGE */}
          <div
            className="
              group relative overflow-hidden
              rounded-t-[160px]
              rounded-b-[10px]
              border border-[#e5ae83]/35
              shadow-[0_25px_70px_rgba(0,0,0,0.25)]
              sm:rounded-t-[220px]
            "
          >
            <motion.img
              src={photo(
                'photo-1517248135467-4c7edcad34c4'
              )}
              alt="Beautiful café dining interior"
              loading="lazy"
              decoding="async"
              whileHover={
                reduceMotion
                  ? undefined
                  : { scale: 1.055 }
              }
              transition={{
                duration: 0.7,
                ease: 'easeOut',
              }}
              className="
                block h-[320px] w-full
                object-cover
                min-[375px]:h-[370px]
                sm:h-[470px]
                md:h-[520px]
                lg:h-[500px]
                xl:h-[550px]
              "
            />

            {/* IMAGE GRADIENT */}
            <div
              className="
                pointer-events-none absolute
                inset-0
                bg-gradient-to-t
                from-[#100807]/70
                via-transparent
                to-transparent
              "
            />

            {/* IMAGE BADGE */}
            <div
              className="
                pointer-events-none absolute
                left-4 top-6
                flex items-center gap-2
                rounded-full
                border border-[#e5ae83]/40
                bg-[#100807]/80
                px-3 py-2
                text-[10px] font-semibold
                uppercase tracking-[0.1em]
                text-[#e5ae83]
                backdrop-blur-md
                sm:left-6 sm:top-8
                sm:px-4 sm:text-xs
              "
            >
              <Sparkles size={14} />
              Welcome to Aurum
            </div>

            {/* IMAGE BOTTOM TEXT */}
            <div
              className="
                absolute inset-x-0 bottom-0
                p-5 sm:p-8
              "
            >
              <p className="serif text-xl italic text-white sm:text-2xl">
                Good coffee. Great company.
              </p>

              <div className="mt-3 h-px w-14 bg-[#e5ae83]" />
            </div>
          </div>

          {/* FLOATING CIRCLE */}
          <motion.div
            animate={
              reduceMotion
                ? undefined
                : { y: [0, -8, 0] }
            }
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              absolute -bottom-5 right-3
              flex h-20 w-20
              items-center justify-center
              rounded-full
              border border-[#e5ae83]/60
              bg-[#100807]
              text-center
              shadow-xl
              sm:-bottom-6 sm:right-5
              sm:h-24 sm:w-24
            "
          >
            <span className="serif text-[12px] italic leading-tight text-[#e5ae83] sm:text-sm">
              Stay
              <br />
              Awhile ✦
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
    