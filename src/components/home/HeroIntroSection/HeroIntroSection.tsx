import Link from "next/link";
import Image from "next/image";

export const HeroIntroSection = () => {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative w-full overflow-hidden bg-[#F8FAFC] px-4 pb-20 pt-20 sm:px-6 sm:pb-24 sm:pt-28 lg:px-8 lg:pb-32 lg:pt-36"
    >
      {/* Decorative blur — right side */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 hidden h-full w-[640px] flex-col items-start justify-center opacity-20 lg:flex"
        style={{
          boxShadow: "64px 64px 64px",
          filter: "blur(32px)",
        }}
      >
        <div className="flex-1 self-stretch rounded-full bg-[#1A3D7C]" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex w-full max-w-screen-xl flex-col items-center justify-center gap-10 lg:flex-row lg:gap-12">
        {/* Left column — Text */}
        <div className="relative flex w-full flex-1">
          <div className="flex w-full flex-col items-start">
            {/* Pill badge */}
            <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-[rgba(26,61,124,0.10)] px-3 py-1 sm:mb-10 lg:mb-[60px]">
              <div className="h-2 w-2 rounded-full bg-[#1A3D7C]" />
              <span className="text-sm font-bold uppercase leading-5 tracking-[0.35px] text-[#1A3D7C] [font-family:'Plus_Jakarta_Sans',Helvetica]">
                Premium Real Estate &amp; Construction
              </span>
            </div>

            {/* Main heading */}
            <h1
              id="hero-heading"
              className="[font-family:'Plus_Jakarta_Sans',Helvetica] text-5xl font-extrabold leading-tight sm:text-6xl lg:text-[72px] lg:leading-[72px]"
            >
              <span className="text-[#0F172A]">
                Redefining
                <br />
                Construction
                <br />
                through
                <br />
              </span>
              <span className="text-[#1A3D7C]">Sustainable</span>
              <br />
              <span className="text-[#1A3D7C]">Excellence</span>
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-[576px] [font-family:'Plus_Jakarta_Sans',Helvetica] text-lg font-normal leading-8 text-[#475569] sm:text-xl">
              Winbarg Homes Limited combines cutting-edge engineering
              <br />
              with sustainable practices to build high-performance living
              <br />
              spaces and infrastructure.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex w-full flex-col gap-4 sm:flex-row sm:items-start">
              <Link
                href="/properties"
                className="relative inline-flex items-center justify-center rounded-2xl bg-[#1A3D7C] px-8 py-4"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-2xl"
                  style={{
                    boxShadow:
                      "0px 8px 10px -6px rgba(26, 61, 124, 0.30), 0px 20px 25px -5px rgba(26, 61, 124, 0.30)",
                  }}
                />
                <span className="whitespace-nowrap [font-family:'Plus_Jakarta_Sans',Helvetica] text-base font-bold leading-6 text-white">
                  View Our Projects
                </span>
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-2xl border-2 border-[#E2E8F0] px-8 py-4"
              >
                <span className="whitespace-nowrap [font-family:'Plus_Jakarta_Sans',Helvetica] text-base font-bold leading-6 text-[#0F172A]">
                  Our Story
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Right column — Image */}
        <div className="relative flex w-full flex-1 flex-col items-start justify-start">
          <Image
            src="/img/modern-construction-architecture.png"
            alt="Modern construction architecture by Winbarg Homes"
            width={584}
            height={329}
            className="relative w-full self-stretch rounded-3xl object-cover"
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </div>
    </section>
  );
};
