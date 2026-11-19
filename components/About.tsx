
'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { photo } from '@/lib/data';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();

  const imageVisible = useInView(imageRef, {
    once: true,
    amount: 0.15,
  });

  const contentVisible = useInView(contentRef, {
    once: true,
    amount: 0.15,
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [12, -12]
  );

  const badgeY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [-8, 10]
  );

  const reveal = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 24,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const smoothEase = [0.22, 1, 0.36, 1] as const;

  return (
    <section
      ref={sectionRef}
      className="
        grain relative overflow-hidden
        py-16 sm:py-20 lg:py-24 xl:py-28
      "
    >
      <div
        className="
          mx-auto grid w-full max-w-7xl
          grid-cols-1 items-center
          gap-12 px-4
          sm:gap-14 sm:px-6
          lg:grid-cols-2 lg:gap-16 lg:px-8
          xl:gap-20
        "
      >
        {/* IMAGE COMPOSITION */}
        <motion.div
          ref={imageRef}
          initial={{
            opacity: 0,
            x: reduceMotion ? 0 : -30,
          }}
          animate={
            imageVisible
              ? { opacity: 1, x: 0 }
              : {
                  opacity: 0,
                  x: reduceMotion ? 0 : -30,
                }
          }
          transition={{
            duration: reduceMotion ? 0 : 0.75,
            ease: smoothEase,
          }}
          className="
            relative mx-auto w-full
            max-w-[550px] pb-10
            lg:mx-0
          "
        >
          {/* MAIN IMAGE */}
          <motion.div
            style={{ y: imageY }}
            className="
              w-[82%] overflow-hidden
              rounded-t-[150px]
              border-[3px] border-[#d0a454]
              soft-shadow
              sm:rounded-t-[190px]
            "
          >
            <motion.img
              src={photo('photo-1554118811-1e0d58224f24')}
              alt="Warm golden café interior"
              loading="lazy"
              decoding="async"
              whileHover={
                reduceMotion ? undefined : { scale: 1.055 }
              }
              transition={{
                duration: 0.65,
                ease: 'easeOut',
              }}
              className="
                block h-[300px] w-full object-cover
                min-[375px]:h-[350px]
                sm:h-[470px]
                md:h-[520px]
                lg:h-[440px]
                xl:h-[520px]
              "
            />
          </motion.div>

          {/* SECOND IMAGE */}
          <motion.div
            initial={{
              opacity: 0,
              y: reduceMotion ? 0 : 25,
              scale: reduceMotion ? 1 : 0.95,
            }}
            animate={
              imageVisible
                ? { opacity: 1, y: 0, scale: 1 }
                : {
                    opacity: 0,
                    y: reduceMotion ? 0 : 25,
                    scale: reduceMotion ? 1 : 0.95,
                  }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.7,
              delay: reduceMotion ? 0 : 0.15,
              ease: smoothEase,
            }}
            className="
              tilt soft-shadow absolute bottom-0 right-0
              w-[49%] overflow-hidden
              rounded-t-[100px]
              border-[5px] border-[#281711]
              sm:rounded-t-[120px] sm:border-[8px]
            "
          >
            <motion.img
              src={photo('photo-1509042239860-f550ce710b93', 650)}
              alt="Freshly brewed artisan coffee"
              loading="lazy"
              decoding="async"
              whileHover={
                reduceMotion ? undefined : { scale: 1.08 }
              }
              transition={{
                duration: 0.65,
                ease: 'easeOut',
              }}
              className="
                block h-[155px] w-full object-cover
                min-[375px]:h-[190px]
                sm:h-[250px]
                md:h-[280px]
                lg:h-[230px]
                xl:h-[280px]
              "
            />
          </motion.div>

          {/* COFFEE & SOUL BADGE */}
          <motion.div
            style={{ y: badgeY }}
            className="
              serif absolute right-2 top-5
              flex h-[72px] w-[72px]
              rotate-12 items-center justify-center
              rounded-full bg-[#100807]
              text-center text-[12px] italic
              leading-tight text-[#e7ca83]
              shadow-lg
              sm:top-8 sm:h-24 sm:w-24
              sm:text-base
            "
          >
            <span>
              Coffee
              <br />
              & Soul ✦
            </span>
          </motion.div>
        </motion.div>

        {/* TEXT CONTENT */}
        <div ref={contentRef} className="w-full min-w-0">
          {/* EYEBROW */}
          <motion.p
            variants={reveal}
            initial="hidden"
            animate={contentVisible ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.55,
              ease: smoothEase,
            }}
            className="eyebrow"
          >
            Our story
          </motion.p>

          {/* HEADING */}
          <motion.h2
            variants={reveal}
            initial="hidden"
            animate={contentVisible ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.08,
              ease: smoothEase,
            }}
            className="
              serif mt-4
              text-[clamp(2rem,4.7vw,3.75rem)]
              leading-[1.12]
              sm:mt-5
            "
          >
            More Than Coffee.
            <br />
            <span className="italic text-gold">
              A Feeling.
            </span>
          </motion.h2>

          {/* GOLD DIVIDER */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={
              contentVisible
                ? { scaleX: 1 }
                : { scaleX: 0 }
            }
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.16,
              ease: smoothEase,
            }}
            className="
              my-6 h-1 w-16 origin-left
              bg-[#c9a258]
              sm:my-8
            "
          />

          {/* PARAGRAPH 1 */}
          <motion.p
            variants={reveal}
            initial="hidden"
            animate={contentVisible ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.18,
              ease: smoothEase,
            }}
            className="
              text-[14px] leading-7 text-[#70675b]
              sm:text-[15px] sm:leading-8
              xl:text-base
            "
          >
            At Aurum Café, we believe the best moments
            begin around a table. From the first morning
            espresso to late-afternoon conversations,
            every detail is designed to make you feel
            at home.
          </motion.p>

          {/* PARAGRAPH 2 */}
          <motion.p
            variants={reveal}
            initial="hidden"
            animate={contentVisible ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.25,
              ease: smoothEase,
            }}
            className="
              mt-4 text-[14px] leading-7 text-[#70675b]
              sm:mt-5 sm:text-[15px] sm:leading-8
              xl:text-base
            "
          >
            Thoughtful brewing, beautiful food, timeless
            design — and just the right touch of gold.
          </motion.p>

          {/* DISCOVER LINK */}
          <motion.div
            variants={reveal}
            initial="hidden"
            animate={contentVisible ? 'visible' : 'hidden'}
            transition={{
              duration: reduceMotion ? 0 : 0.65,
              delay: reduceMotion ? 0 : 0.32,
              ease: smoothEase,
            }}
            className="mt-7 sm:mt-9"
          >
            <Link
              href="/about"
              className="
                group inline-flex min-h-11
                items-center gap-3
                border-b border-[#c9a258]
                pb-2 text-[13px] font-bold
                transition-all duration-300
                hover:gap-4
                sm:text-sm
              "
            >
              Discover Our Story

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
        </div>
      </div>
    </section>
  );
}
