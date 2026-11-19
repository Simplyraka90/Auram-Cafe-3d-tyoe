
'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Coffee,
  Sparkles,
  UtensilsCrossed,
  CakeSlice,
  Croissant,
} from 'lucide-react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
} from 'motion/react';

import { menuItems, photo } from '@/lib/data';
import SectionHeading from './SectionHeading';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image_url: string;
};

type MenuSectionProps = {
  limit?: number;
};

const categories = [
  { name: 'All', icon: Sparkles },
  { name: 'Coffee', icon: Coffee },
  { name: 'Bakery', icon: Croissant },
  { name: 'Brunch', icon: UtensilsCrossed },
  { name: 'Desserts', icon: CakeSlice },
];

const fallbackImage = photo(
  'photo-1495474472287-4d71bcdd2085'
);

const ease = [0.22, 1, 0.36, 1] as const;

function normalizeProducts(data: unknown): Product[] {
  // Supports both:
  // [{...}, {...}]
  // { products: [{...}] }

  let rawProducts: unknown[] = [];

  if (Array.isArray(data)) {
    rawProducts = data;
  } else if (
    data !== null &&
    typeof data === 'object' &&
    'products' in data &&
    Array.isArray(data.products)
  ) {
    rawProducts = data.products;
  }

  return rawProducts.flatMap((item) => {
    if (
      item === null ||
      typeof item !== 'object'
    ) {
      return [];
    }

    const record = item as Record<string, unknown>;

    if (
      typeof record.name !== 'string' ||
      !record.name.trim()
    ) {
      return [];
    }

    const price = Number(record.price);

    if (!Number.isFinite(price)) {
      return [];
    }

    return [
      {
        id: String(record.id ?? record.name),
        name: record.name.trim(),
        category:
          typeof record.category === 'string'
            ? record.category.trim()
            : 'Coffee',
        price,
        description:
          typeof record.description === 'string'
            ? record.description
            : '',
        image_url:
          typeof record.image_url === 'string'
            ? record.image_url
            : '',
      },
    ];
  });
}

export default function MenuSection({
  limit,
}: MenuSectionProps) {
  const [filter, setFilter] = useState('All');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const reduceMotion = useReducedMotion();

  // FETCH PRODUCTS SAFELY
  useEffect(() => {
    const controller = new AbortController();

    async function loadProducts() {
      try {
        const response = await fetch('/api/products', {
          method: 'GET',
          cache: 'no-store',
          signal: controller.signal,
          headers: {
            Accept: 'application/json',
          },
        });

        // API unavailable: use sample products
        if (!response.ok) {
          if (!controller.signal.aborted) {
            setProducts([]);
          }
          return;
        }

        const data: unknown = await response.json();

        const validProducts = normalizeProducts(data);

        if (!controller.signal.aborted) {
          setProducts(validProducts);
        }
      } catch {
        // Network error or invalid JSON:
        // fall back to local menu data.
        if (!controller.signal.aborted) {
          setProducts([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      controller.abort();
    };
  }, []);

  // COMBINE ADMIN + SAMPLE PRODUCTS
  const combined = useMemo(() => {
    const productNames = new Set(
      products.map((product) =>
        product.name.trim().toLowerCase()
      )
    );

    const sampleProducts: Product[] = menuItems
      .filter(
        (item) =>
          !productNames.has(
            item.name.trim().toLowerCase()
          )
      )
      .map((item, index) => ({
        id: `sample-${index}`,
        name: item.name,
        category: item.category,
        price: item.price,
        description: item.desc,
        image_url: photo(item.image),
      }));

    return [...products, ...sampleProducts];
  }, [products]);

  // FILTER PRODUCTS
  const filteredItems = useMemo(() => {
    const filtered = combined.filter(
      (item) =>
        filter === 'All' ||
        item.category.trim().toLowerCase() ===
          filter.toLowerCase()
    );

    if (typeof limit === 'number') {
      return filtered.slice(0, Math.max(0, limit));
    }

    return filtered;
  }, [combined, filter, limit]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.07,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: reduceMotion ? 0 : 25,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reduceMotion ? 0 : 0.5,
        ease,
      },
    },
  };

  return (
    <section
      className="
        relative isolate overflow-hidden
        bg-[#1d100e]
        py-16 sm:py-20 lg:py-24
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -left-32 top-20
          h-72 w-72 rounded-full
          bg-[#a46a4b]/10 blur-[100px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none absolute
          -right-32 bottom-10
          h-80 w-80 rounded-full
          bg-[#9c6142]/10 blur-[100px]
        "
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADING */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: reduceMotion ? 0 : 0.6,
            ease,
          }}
        >
          <SectionHeading
            eyebrow="Made to delight"
            title="A Taste of Happiness"
            description="From rich espresso to sweet indulgences — find something to fall in love with."
          />
        </motion.div>

        {/* CATEGORY FILTERS */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 15,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.5,
          }}
          className="
            mb-9 flex flex-wrap
            items-center justify-center
            gap-2 sm:mb-12 sm:gap-3
          "
        >
          {categories.map(({ name, icon: Icon }) => {
            const active = filter === name;

            return (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                aria-pressed={active}
                className={`
                  relative inline-flex min-h-10
                  items-center justify-center
                  gap-2 overflow-hidden
                  rounded-full border
                  px-3.5 py-2.5
                  text-xs font-semibold
                  transition-colors duration-300
                  focus-visible:outline-2
                  focus-visible:outline-offset-2
                  focus-visible:outline-[#e4a87f]
                  sm:min-h-11 sm:px-5 sm:text-sm
                  ${
                    active
                      ? 'border-[#a46a4b] text-white'
                      : 'border-white/20 bg-[#2d1a15] text-white hover:border-[#e4a87f]'
                  }
                `}
              >
                {active && (
                  <motion.span
                    layoutId="aurum-menu-active-filter"
                    className="
                      absolute inset-0
                      rounded-full bg-[#a46a4b]
                    "
                    transition={{
                      type: 'spring',
                      stiffness: 350,
                      damping: 30,
                    }}
                  />
                )}

                <Icon
                  size={15}
                  className="relative z-10 shrink-0"
                />

                <span className="relative z-10">
                  {name}
                </span>
              </button>
            );
          })}
        </motion.div>

        {/* PRODUCT GRID */}
        {loading ? (
          <div
            role="status"
            aria-label="Loading menu"
            className="
              grid grid-cols-1 gap-5
              sm:grid-cols-2 sm:gap-7
              lg:grid-cols-3
            "
          >
            {Array.from({
              length: Math.min(
                Math.max(0, limit ?? 6),
                6
              ),
            }).map((_, index) => (
              <div
                key={index}
                className="
                  overflow-hidden border
                  border-white/15 bg-[#2d1a15]
                "
              >
                <div className="h-52 animate-pulse bg-white/10 sm:h-60" />

                <div className="space-y-4 p-5 sm:p-6">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-full animate-pulse rounded bg-white/10" />
                  <div className="h-3 w-4/5 animate-pulse rounded bg-white/10" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              exit={{
                opacity: 0,
                transition: {
                  duration: reduceMotion ? 0 : 0.15,
                },
              }}
              className="
                grid grid-cols-1 gap-5
                sm:grid-cols-2 sm:gap-7
                lg:grid-cols-3
              "
            >
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <motion.article
                    key={item.id}
                    variants={cardVariants}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : { y: -5 }
                    }
                    className="
                      group flex h-full flex-col
                      overflow-hidden border
                      border-white/15
                      bg-[#2d1a15]
                      transition-colors duration-300
                      hover:border-[#e4a87f]/50
                    "
                  >
                    {/* IMAGE */}
                    <div className="relative overflow-hidden bg-[#39231b]">
                      <motion.img
                        src={
                          item.image_url ||
                          fallbackImage
                        }
                        alt={item.name}
                        loading="lazy"
                        decoding="async"
                        whileHover={
                          reduceMotion
                            ? undefined
                            : { scale: 1.065 }
                        }
                        transition={{
                          duration: 0.65,
                          ease: 'easeOut',
                        }}
                        onError={(event) => {
                          const image =
                            event.currentTarget;

                          if (
                            image.getAttribute('src') !==
                            fallbackImage
                          ) {
                            image.src = fallbackImage;
                          }
                        }}
                        className="
                          block h-52 w-full
                          object-cover sm:h-60
                          lg:h-61.25
                        "
                      />

                      {/* CATEGORY BADGE */}
                      <span
                        className="
                          absolute left-4 top-4
                          border border-white/10
                          bg-[#39231b]
                          px-3 py-1.5
                          text-[11px] font-bold
                          text-[#f2c5a3]
                          shadow-lg sm:text-xs
                        "
                      >
                        {item.category}
                      </span>

                      <div
                        className="
                          pointer-events-none absolute
                          inset-x-0 bottom-0 h-16
                          bg-linear-to-t
                          from-[#1d100e]/35
                          to-transparent
                        "
                      />
                    </div>

                    {/* CONTENT */}
                    <div className="flex flex-1 flex-col p-5 sm:p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3
                          className="
                            serif min-w-0
                            text-xl leading-snug
                            text-white sm:text-2xl
                          "
                        >
                          {item.name}
                        </h3>

                        <strong
                          className="
                            shrink-0 text-sm
                            font-bold text-[#f2c5a3]
                            sm:text-base
                          "
                        >
                          ₹{item.price}
                        </strong>
                      </div>

                      <p
                        className="
                          mt-3 text-[13px]
                          leading-6 text-[#e1c9ba]
                          sm:text-sm
                        "
                      >
                        {item.description}
                      </p>

                      <div className="mt-auto pt-5">
                        <div
                          className="
                            h-px w-full bg-white/10
                            transition-colors duration-300
                            group-hover:bg-[#a46a4b]/50
                          "
                        />
                      </div>
                    </div>
                  </motion.article>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-16 text-center">
                  <Coffee
                    size={36}
                    className="mb-4 text-[#f2c5a3]"
                  />

                  <h3 className="serif text-xl text-white sm:text-2xl">
                    No Items Found
                  </h3>

                  <p className="mt-2 text-sm text-[#e1c9ba]">
                    There are no items in this category yet.
                  </p>

                  <button
                    type="button"
                    onClick={() => setFilter('All')}
                    className="
                      mt-5 text-sm font-semibold
                      text-[#f2c5a3]
                      underline underline-offset-4
                    "
                  >
                    View All Items
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}

        {/* CTA */}
        <motion.div
          initial={{
            opacity: 0,
            y: reduceMotion ? 0 : 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            duration: reduceMotion ? 0 : 0.55,
            ease,
          }}
          className="mt-10 text-center sm:mt-12"
        >
          <Link
            href={
              typeof limit === 'number'
                ? '/menu'
                : '/booking'
            }
            className="
              group inline-flex min-h-12
              items-center justify-center gap-3
              bg-[#9c6142] px-6 py-3.5
              text-[13px] font-semibold
              text-white
              transition-all duration-300
              hover:-translate-y-0.5
              hover:bg-[#b77b57]
              hover:shadow-[0_12px_30px_rgba(156,97,66,0.25)]
              sm:px-8 sm:py-4 sm:text-sm
            "
          >
            {typeof limit === 'number'
              ? 'Explore Full Menu'
              : 'Reserve a Table'}

            <ArrowRight
              size={17}
              className="
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
