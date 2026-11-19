
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Coffee,
  X,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'motion/react';

const links = [
  { label: 'Home', href: '/', number: '01' },
  { label: 'About', href: '/about', number: '02' },
  { label: 'Menu', href: '/menu', number: '03' },
  { label: 'Gallery', href: '/gallery', number: '04' },
  { label: 'Contact', href: '/contact', number: '05' },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
      }
    };

    window.addEventListener('keydown', handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleEscape);
    };
  }, [open]);

  return (
    <>
      {/* TOP ANNOUNCEMENT */}
      <div className="relative z-[60] overflow-hidden border-b border-[#8c5b3f]/25 bg-[#120907] px-3 py-2 text-center">
        <div className="flex items-center justify-center gap-2">
          <span className="h-1 w-1 shrink-0 rotate-45 bg-[#d6a47c]" />

          <p className="text-[9px] font-medium uppercase tracking-[0.08em] text-[#dfbd9f] sm:text-[10px] sm:tracking-[0.17em]">
            Slow mornings. Rich coffee. Beautiful moments.
          </p>

          <span className="h-1 w-1 shrink-0 rotate-45 bg-[#d6a47c]" />
        </div>
      </div>

      {/* MAIN HEADER */}
      <header
        className={`
          sticky top-0 z-50 w-full border-b
          transition-all duration-300
          ${
            scrolled
              ? 'border-[#a67556]/25 bg-[#190d0a]/95 shadow-[0_12px_40px_rgba(0,0,0,0.3)] backdrop-blur-2xl'
              : 'border-white/10 bg-[#21120e]/95 backdrop-blur-xl'
          }
        `}
      >
        <div
          className="
            relative mx-auto flex h-[64px] w-full max-w-7xl
            items-center justify-between gap-3 px-4
            sm:h-[72px] sm:px-6
            lg:h-[80px] lg:px-8
          "
        >
          {/* LOGO */}
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="group relative z-[70] flex shrink-0 items-center gap-2.5 sm:gap-3"
            aria-label="Aurum Café home"
          >
            <motion.div
              whileHover={
                reduceMotion ? undefined : { rotate: -12 }
              }
              transition={{ type: 'spring', stiffness: 220 }}
              className="
                relative flex h-9 w-9 items-center justify-center
                rounded-[12px] border border-[#a46e4e]
                bg-gradient-to-br from-[#69402c] to-[#2b170f]
                shadow-[0_0_25px_rgba(177,106,66,0.18)]
                sm:h-11 sm:w-11 sm:rounded-[14px]
              "
            >
              <Coffee
                size={19}
                strokeWidth={1.7}
                className="text-[#f0c29d] sm:h-[22px] sm:w-[22px]"
              />

              <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full border-2 border-[#21120e] bg-[#d9a376]" />
            </motion.div>

            <div className="flex flex-col">
              <span className="font-serif text-[20px] font-bold leading-none tracking-[0.06em] text-white sm:text-[24px]">
                AURUM
                <span className="text-[#d69c70]">.</span>
              </span>

              <span className="mt-1 text-[7px] font-semibold uppercase tracking-[0.2em] text-[#d5aa89] sm:text-[8px] sm:tracking-[0.27em]">
                CAFÉ & BISTRO
              </span>
            </div>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-1 lg:flex xl:gap-2"
          >
            {links.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? 'page' : undefined}
                  className={`
                    group relative rounded-full px-3 py-3
                    text-[13px] font-medium transition-colors
                    xl:px-4 xl:text-sm
                    ${
                      active
                        ? 'text-[#f4c4a1]'
                        : 'text-[#e5d4ca] hover:text-white'
                    }
                  `}
                >
                  {item.label}

                  {active && (
                    <motion.span
                      layoutId="aurum-active-nav"
                      className="absolute bottom-1.5 left-3 right-3 h-[2px] rounded-full bg-[#d69c70] xl:left-4 xl:right-4"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}

                  {!active && (
                    <span className="absolute bottom-1.5 left-1/2 h-[2px] w-0 rounded-full bg-[#d69c70] transition-all duration-300 group-hover:left-3 group-hover:w-[calc(100%-24px)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="relative z-[70] flex items-center gap-2 sm:gap-3">
            <Link
              href="/booking"
              onClick={() => setOpen(false)}
              className="
                group hidden min-h-10 items-center justify-center
                gap-2 rounded-full border border-[#a46e4e]
                bg-[#6d3c28] px-4 py-2.5
                text-xs font-semibold text-white
                transition-all duration-300
                hover:border-[#d7a17d] hover:bg-[#875035]
                hover:shadow-[0_0_25px_rgba(176,109,70,0.22)]
                sm:inline-flex xl:px-5
              "
            >
              <CalendarDays size={15} />
              <span>Book a Table</span>
              <ArrowUpRight
                size={14}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            {/* CREATIVE COFFEE BEAN TOGGLE */}
            <button
              type="button"
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? 'Close navigation' : 'Open navigation'}
              aria-expanded={open}
              aria-controls="aurum-mobile-menu"
              className="
                relative flex h-10 w-10 shrink-0
                items-center justify-center overflow-hidden
                rounded-[13px] border border-[#a97555]/65
                bg-gradient-to-br from-[#71432e] to-[#352016]
                text-[#f4d3b7]
                shadow-[0_4px_18px_rgba(0,0,0,0.2)]
                transition-colors hover:border-[#e5b18b]
                focus-visible:outline-2
                focus-visible:outline-offset-2
                focus-visible:outline-[#e5b18b]
                lg:hidden
              "
            >
              <motion.span
                aria-hidden="true"
                animate={{
                  rotate: open ? 180 : 0,
                  scale: open ? 1.05 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 22,
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span
                      key="close"
                      initial={{
                        opacity: 0,
                        scale: 0.5,
                        rotate: -90,
                      }}
                      animate={{
                        opacity: 1,
                        scale: 1,
                        rotate: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.5,
                        rotate: 90,
                      }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.2,
                      }}
                    >
                      <X size={20} strokeWidth={1.8} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="beans"
                      initial={{ opacity: 0, scale: 0.6 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.6 }}
                      transition={{
                        duration: reduceMotion ? 0 : 0.2,
                      }}
                      className="relative flex h-6 w-6 items-center justify-center"
                    >
                      <span className="absolute left-[3px] top-[5px] h-[15px] w-[10px] rotate-[-32deg] rounded-[80%_35%_80%_35%] border border-[#f1c6a6] bg-[#d5a27c]" />

                      <span className="absolute right-[3px] top-[5px] h-[15px] w-[10px] rotate-[32deg] rounded-[35%_80%_35%_80%] border border-[#f1c6a6] bg-[#9b6448]" />

                      <span className="absolute left-1/2 top-[5px] h-[15px] w-px -translate-x-1/2 rotate-[8deg] bg-[#2a150f]" />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.span>
            </button>
          </div>
        </div>

        {/* MOBILE BACKDROP AND MENU */}
        <AnimatePresence>
          {open && (
            <>
              <motion.div
                key="backdrop"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : 0.2,
                }}
                onClick={() => setOpen(false)}
                className="fixed inset-x-0 top-full h-[100dvh] bg-black/65 backdrop-blur-[5px] lg:hidden"
                aria-hidden="true"
              />

              <motion.nav
                key="mobile-menu"
                id="aurum-mobile-menu"
                aria-label="Mobile navigation"
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: -14, scale: 0.98 }
                }
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: -10, scale: 0.98 }
                }
                transition={{
                  duration: reduceMotion ? 0 : 0.28,
                  ease: 'easeOut',
                }}
                className="
                  absolute left-0 right-0 top-full z-[65]
                  max-h-[calc(100dvh-105px)]
                  overflow-y-auto overscroll-contain
                  border-b border-[#9d6546]/40
                  bg-[#1c100c]
                  px-4 pb-5 pt-4
                  shadow-[0_30px_60px_rgba(0,0,0,0.55)]
                  sm:px-8 lg:hidden
                "
              >
                <div className="mx-auto max-w-xl">
                  <div className="mb-3 flex items-center gap-3">
                    <span className="h-px w-6 bg-[#a87555]" />

                    <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#bd9174]">
                      Discover Aurum
                    </span>
                  </div>

                  <div className="flex flex-col">
                    {links.map((item, index) => {
                      const active = pathname === item.href;

                      return (
                        <motion.div
                          key={item.href}
                          initial={
                            reduceMotion
                              ? false
                              : { opacity: 0, x: -12 }
                          }
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            delay: reduceMotion
                              ? 0
                              : index * 0.04,
                            duration: reduceMotion ? 0 : 0.22,
                          }}
                        >
                          <Link
                            href={item.href}
                            onClick={() => setOpen(false)}
                            aria-current={
                              active ? 'page' : undefined
                            }
                            className={`
                              group flex min-h-[52px]
                              items-center justify-between
                              border-b border-white/10
                              py-2 transition-colors
                              ${
                                active
                                  ? 'text-[#eab68f]'
                                  : 'text-[#f4eae4] hover:text-[#eab68f]'
                              }
                            `}
                          >
                            <div className="flex items-center gap-3">
                              <span className="text-[10px] font-medium text-[#a77b61]">
                                {item.number}
                              </span>

                              <span className="text-[15px] font-medium sm:text-base">
                                {item.label}
                              </span>
                            </div>

                            <span
                              className={`
                                flex h-8 w-8 items-center justify-center
                                rounded-full border transition-all duration-300
                                ${
                                  active
                                    ? 'rotate-[-45deg] border-[#b68160] bg-[#71432e]'
                                    : 'border-white/15 group-hover:-rotate-45 group-hover:border-[#b68160]'
                                }
                              `}
                            >
                              <ArrowUpRight size={15} />
                            </span>
                          </Link>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* BOOKING BUTTON */}
                  <Link
                    href="/booking"
                    onClick={() => setOpen(false)}
                    className="
                      mt-5 flex min-h-12 w-full
                      items-center justify-center gap-2
                      rounded-[12px] border border-[#b47c59]
                      bg-gradient-to-r from-[#79452e] to-[#a36946]
                      px-4 py-3 text-[13px] font-semibold text-white
                      shadow-[0_10px_25px_rgba(0,0,0,0.2)]
                      transition-colors
                      hover:from-[#8a5238] hover:to-[#b77852]
                    "
                  >
                    <CalendarDays size={16} />
                    Reserve Your Table
                    <ChevronRight size={15} />
                  </Link>

                  {/* FOOTER DETAIL */}
                  <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                    <span className="text-[9px] uppercase tracking-[0.1em] text-[#a98a77]">
                      Crafted with love & coffee
                    </span>

                    <span className="flex items-center gap-1.5 text-[10px] text-[#d2a384]">
                      <Coffee size={13} />
                      Aurum Café
                    </span>
                  </div>
                </div>
              </motion.nav>
            </>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
