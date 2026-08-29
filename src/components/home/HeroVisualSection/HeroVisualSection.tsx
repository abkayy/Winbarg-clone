"use client";

import { motion } from "framer-motion";

const trustedBrands = ["ISO CERTIFIED", "GREEN BUILD"];

export const HeroVisualSection = () => {
  return (
    <section
      aria-label="Company credibility and trust indicators"
      className="relative flex w-full flex-col items-center border-t border-b border-slate-100 bg-white py-10 overflow-hidden"
    >
      <div className="relative flex w-full max-w-screen-xl overflow-hidden">
        <motion.div
          className="flex whitespace-nowrap"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 20,
          }}
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-10 md:gap-20 px-5 md:px-10">
              <div
                aria-label="Company incorporation details"
                className="inline-flex flex-[0_0_auto] items-center gap-4 bg-white bg-blend-saturation opacity-60"
              >
                <div className="inline-flex flex-[0_0_auto] flex-col items-start">
                  <img
                    className="relative h-[31.5px] w-[33.05px]"
                    alt="Incorporation icon"
                    src="/img/icon.svg"
                  />
                </div>
                <div className="inline-flex flex-[0_0_auto] flex-col items-start">
                  <div className="relative flex w-[149.23px] items-center whitespace-nowrap [font-family:'Plus_Jakarta_Sans',Helvetica] text-xs font-bold leading-4 tracking-[1.20px] text-slate-900 h-4 mt-[-1.00px]">
                    INCORPORATED 2022
                  </div>
                  <p className="relative flex w-[190.39px] items-center whitespace-nowrap [font-family:'Plus_Jakarta_Sans',Helvetica] text-sm font-normal leading-5 tracking-[0] text-slate-500 h-5 mt-[-1.00px]">
                    By CAC Nigeria (RC 1940265)
                  </p>
                </div>
              </div>
              <div aria-hidden="true" className="relative h-10 w-px bg-slate-200 hidden md:block" />
              <div
                aria-label="Trusted by industry leaders"
                className="inline-flex flex-[0_0_auto] flex-col items-start gap-1"
              >
                <div className="relative flex h-5 w-[178.31px] items-center whitespace-nowrap [font-family:'Plus_Jakarta_Sans',Helvetica] text-sm font-medium leading-5 tracking-[0] text-slate-500 mt-[-1.00px]">
                  Trusted by industry leaders
                </div>
                <div className="relative flex flex-[0_0_auto] items-center gap-8 self-stretch">
                  {trustedBrands.map((brand) => (
                    <div
                      key={brand}
                      className="inline-flex flex-[0_0_auto] flex-col items-start"
                    >
                      <div className="relative mt-[-1.00px] flex h-8 items-center whitespace-nowrap [font-family:'Plus_Jakarta_Sans',Helvetica] text-2xl font-extrabold leading-8 tracking-[0] text-slate-300">
                        {brand}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
