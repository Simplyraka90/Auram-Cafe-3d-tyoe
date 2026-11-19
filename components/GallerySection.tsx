
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Images, Sparkles } from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'motion/react';

import { galleryImages, photo } from '@/lib/data';
import SectionHeading from './SectionHeading';

type GallerySectionProps = {
  limit?: number;
};

const ease = [0.22, 1, 0.36, 1] as const;

export default function GallerySection({
  limit,
}: GallerySectionProps) {
  const reduceMotion = useReducedMotion();
  const [activeImage, setActiveImage] = useState<number | null>(null);

  const images =
    typeof limit === 'number'
      ? galleryImages.slice(0, Math.max(0, limit))
      : galleryImages;

  const closeLightbox = () => setActiveImage(null);

  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-[#241410]
        py-16 sm:py-20 lg:py-24 xl:py-28
      "
    >
      {/* SOFT BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 top-20 h-80 w-80
          rounded-full bg-[#d0a454]/6
          blur-[110px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-32 bottom-10 h-96 w-96
          rounded-full bg-[#d0a454]/5
          blur-[120px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 22,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: reduceMotion ? 0 : 0.65,
            ease,
          }}
        >
          <SectionHeading
            eyebrow="Through our lens"
            title="The Aurum Experience"
            description="Step inside our world of warm spaces, thoughtful details and unforgettable flavors."
          />
        </motion.div>

        {/* TOP GALLERY LABEL */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 15,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
          }}
          className="
            mb-6 flex items-center
            justify-between gap-3
            sm:mb-8
          "
        >
          <div className="flex items-center gap-2.5">
            <Sparkles
              size={16}
              className="text-[#d0a454]"
            />

            <span className="text-[10px] font-semibold uppercase tracking-[0.17em] text-[#e1c9ba] sm:text-xs">
              Moments at Aurum
            </span>
          </div>

          <span className="text-[11px] text-[#d0a454] sm:text-xs">
            {String(images.length).padStart(2, '0')} Moments
          </span>
        </motion.div>

        {/* GALLERY GRID */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{
            once: true,
            amount: 0.1,
          }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: reduceMotion ? 0 : 0.09,
              },
            },
          }}
          className="
            grid grid-cols-2
            gap-3 sm:gap-5
            lg:grid-cols-3
          "
        >
          {images.map(([id, alt], index) => {
            const featured = index % 6 === 0;

            return (
              <motion.button
                type="button"
                key={`${id}-${index}`}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: reduceMotion ? 0 : 28,
                    scale: reduceMotion ? 1 : 0.97,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: {
                      duration: reduceMotion ? 0 : 0.65,
                      ease,
                    },
                  },
                }}
                onClick={() => setActiveImage(index)}
                className={`
                  group relative block w-full
                  min-w-0 overflow-hidden
                  rounded-[14px]
                  border border-[#d0a454]/65
                  bg-[#2d1a15]
                  text-left
                  shadow-[0_12px_30px_rgba(0,0,0,0.2)]
                  transition-colors duration-300
                  hover:border-[#d0a454]
                  focus-visible:outline-2
                  focus-visible:outline-offset-4
                  focus-visible:outline-[#d0a454]
                  sm:rounded-[20px]
                  ${
                    featured
                      ? 'lg:col-span-2'
                      : ''
                  }
                `}
              >
                {/* IMAGE */}
                <div
                  className={`
                    relative w-full overflow-hidden
                    ${
                      featured
                        ? 'aspect-4/5 sm:aspect-4/3 lg:aspect-2/1'
                        : 'aspect-4/5 sm:aspect-4/3 lg:aspect-4/3'
                    }
                  `}
                >
                  <motion.img
                    src={photo(id, 1000)}
                    alt={alt}
                    loading="lazy"
                    decoding="async"
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { scale: 1.07 }
                    }
                    transition={{
                      duration: 0.7,
                      ease: 'easeOut',
                    }}
                    className="
                      absolute inset-0
                      h-full w-full object-cover
                    "
                  />

                  {/* CINEMATIC GRADIENT */}
                  <div
                    className="
                      pointer-events-none absolute
                      inset-0 bg-linear-to-t
                      from-[#100807]/80
                      via-[#100807]/10
                      to-transparent
                      opacity-70
                      transition-opacity duration-500
                      group-hover:opacity-100
                    "
                  />

                  {/* IMAGE NUMBER */}
                  <span
                    className="
                      absolute left-3 top-3
                      rounded-full border
                      border-[#d0a454]/50
                      bg-[#241410]/75
                      px-2.5 py-1.5
                      text-[10px] font-semibold
                      text-[#e1c9ba]
                      backdrop-blur-md
                      sm:left-5 sm:top-5
                      sm:px-3 sm:text-xs
                    "
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  {/* EXPLORE ICON */}
                  <div
                    className="
                      absolute right-3 top-3
                      flex h-8 w-8 items-center
                      justify-center rounded-full
                      border border-[#d0a454]/50
                      bg-[#241410]/80
                      text-[#d0a454]
                      backdrop-blur-md
                      transition-all duration-300
                      group-hover:rotate-45
                      group-hover:bg-[#d0a454]
                      group-hover:text-[#241410]
                      sm:right-5 sm:top-5
                      sm:h-10 sm:w-10
                    "
                  >
                    <ArrowUpRight size={17} />
                  </div>

                  {/* IMAGE CAPTION */}
                  <div
                    className="
                      absolute inset-x-0 bottom-0
                      p-3 sm:p-5
                    "
                  >
                    <div className="flex items-end justify-between gap-2">
                      <div className="min-w-0">
                        <p
                          className="
                            mb-1 text-[9px]
                            uppercase tracking-[0.15em]
                            text-[#d0a454]
                            sm:text-[10px]
                          "
                        >
                          Aurum Café
                        </p>

                        <h3
                          className="
                            line-clamp-2
                            font-serif text-[13px]
                            font-medium leading-snug
                            text-white
                            sm:text-lg lg:text-xl
                          "
                        >
                          {alt}
                        </h3>
                      </div>

                      <span
                        className="
                          hidden shrink-0
                          text-[10px] font-medium
                          text-[#e1c9ba]
                          opacity-0
                          transition-opacity duration-300
                          group-hover:opacity-100
                          sm:block
                        "
                      >
                        View photo
                      </span>
                    </div>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* FOOTER */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 18,
          }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease,
          }}
          className="mt-10 flex flex-col items-center gap-5 sm:mt-12"
        >
          <p className="text-center font-serif text-sm italic text-[#e1c9ba] sm:text-base">
            A collection of moments, made memorable.
          </p>

          {typeof limit === 'number' && (
            <Link
              href="/gallery"
              className="
                group inline-flex min-h-12
                items-center justify-center gap-3
                border border-[#d0a454]/60
                bg-[#2d1a15]
                px-6 py-3.5
                text-[13px] font-semibold
                text-[#e1c9ba]
                transition-all duration-300
                hover:-translate-y-0.5
                hover:border-[#d0a454]
                hover:bg-[#39231b]
                sm:px-8 sm:text-sm
              "
            >
              Explore Full Gallery

              <ArrowUpRight
                size={17}
                className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          )}
        </motion.div>
      </div>

      {/* IMAGE LIGHTBOX */}
      <AnimatePresence>
        {activeImage !== null && images[activeImage] && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Gallery image preview"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: reduceMotion ? 0 : 0.2,
            }}
            className="
              fixed inset-0 z-100
              flex items-center justify-center
              bg-[#100807]/95
              p-4 backdrop-blur-lg
              sm:p-8
            "
            onClick={closeLightbox}
          >
            <button
              type="button"
              aria-label="Close image preview"
              onClick={closeLightbox}
              className="
                absolute right-4 top-4 z-20
                flex h-11 w-11 items-center
                justify-center rounded-full
                border border-[#d0a454]/50
                bg-[#241410] text-xl
                text-white
                transition-colors
                hover:bg-[#39231b]
                sm:right-8 sm:top-8
              "
            >
              ×
            </button>

            <motion.div
              initial={{
                opacity: 0,
                scale: reduceMotion ? 1 : 0.94,
              }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{
                opacity: 0,
                scale: reduceMotion ? 1 : 0.96,
              }}
              transition={{
                duration: reduceMotion ? 0 : 0.3,
                ease,
              }}
              onClick={(event) => event.stopPropagation()}
              className="
                flex max-h-[85dvh]
                w-full max-w-5xl
                flex-col items-center
              "
            >
              <img
                src={photo(images[activeImage][0], 1400)}
                alt={images[activeImage][1]}
                className="
                  max-h-[72dvh] w-auto
                  max-w-full rounded-xl
                  border border-[#d0a454]/50
                  object-contain
                  shadow-2xl
                "
              />

              <div className="mt-4 flex items-center gap-3 text-center">
                <Images
                  size={17}
                  className="text-[#d0a454]"
                />

                <p className="font-serif text-sm text-[#e1c9ba] sm:text-lg">
                  {images[activeImage][1]}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
