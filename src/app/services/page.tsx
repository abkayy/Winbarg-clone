import Link from "next/link";
import Image from "next/image";

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full bg-slate-50 relative overflow-hidden">
      {/* Hero Section */}
      <header className="relative flex flex-col w-full items-center py-20 sm:py-24 lg:py-32 bg-transparent overflow-hidden">
        <div className="absolute -top-48 -right-24 w-96 h-96 bg-[#1d40890d] rounded-full blur-[32px]" />
        <div className="absolute -left-24 -bottom-48 w-96 h-96 bg-[#1d40891a] rounded-full blur-[32px]" />
        <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
          <div className="flex flex-col max-w-screen-md items-center gap-6 w-full">
            <div className="inline-flex items-start justify-center px-4 py-1.5 relative flex-[0_0_auto] bg-[#1d40891a] rounded-full">
              <div className="relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#1d4089] text-sm text-center tracking-[0.70px] leading-5">
                OUR EXPERTISE
              </div>
            </div>
            <div className="items-center relative self-stretch w-full flex-[0_0_auto] flex flex-col">
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-transparent text-4xl sm:text-5xl md:text-6xl text-center leading-tight md:leading-[60px]">
                <span className="text-slate-900 tracking-[-0.90px]">
                  Comprehensive Real Estate
                </span>
                <br />
                <span className="text-[#1d4089] tracking-[0]">
                  &amp; Construction Solutions
                </span>
              </p>
            </div>
            <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-lg text-center tracking-[0] leading-[29.2px] max-w-3xl">
                From architectural design to full-scale civil engineering,
                Winbarg Homes Limited delivers
                <br className="hidden md:block" />
                precision-engineered spaces that redefine modern living and
                residential and commercial excellence.
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Services Grid */}
      <div className="relative w-full max-w-screen-xl mx-auto px-8 py-16 flex flex-col items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Card 1: Building Projects */}
          <div className="flex flex-col bg-white rounded-3xl border border-solid border-slate-100 shadow-[0px_1px_2px_#0000000d] p-8 min-h-[600px] relative">
            <div className="flex w-14 h-14 relative items-center justify-center bg-[#1d40891a] rounded-2xl mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 21h18V9H3v12zm8-10h2v8h-2v-8zm4 0h2v8h-2v-8zM9 3h6v2H9V3zm11 4h-1V5h-2v2H7V5H5v2H4v2h16V7z"
                  fill="#1d4089"
                />
              </svg>
            </div>
            <div className="flex-1 w-full items-start flex flex-col">
              <div className="relative flex items-center h-8 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8 whitespace-nowrap mb-4">
                Building Projects
              </div>
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-base tracking-[0] leading-[26px] mb-6">
                We specialize in end-to-end residential and luxury building
                construction. Our approach integrates cutting-edge technology
                with traditional craftsmanship to ensure structural integrity
                and aesthetic brilliance.
              </p>
              <div className="flex flex-col items-start gap-3 w-full mb-8">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Custom Residential Villas
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Multi-Family Residential Complexes
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Structural Engineering &amp; Planning
                  </div>
                </div>
              </div>
              <div className="w-full flex-1 min-h-[192px] mt-auto rounded-2xl bg-slate-100 overflow-hidden relative">
                <Image
                  src="/img/3.png"
                  alt="Building Projects"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Renovation & Remodeling */}
          <div className="flex flex-col bg-white rounded-3xl border border-solid border-slate-100 shadow-[0px_1px_2px_#0000000d] p-8 min-h-[600px] relative">
            <div className="flex w-14 h-14 relative items-center justify-center bg-[#1d40891a] rounded-2xl mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25z"
                  fill="#1d4089"
                />
                <path
                  d="M20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                  fill="#1d4089"
                />
              </svg>
            </div>
            <div className="flex-1 w-full items-start flex flex-col">
              <div className="relative flex items-center h-8 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8 whitespace-nowrap mb-4">
                Renovation &amp; Remodeling
              </div>
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-base tracking-[0] leading-[26px] mb-6">
                Transforming existing spaces into modern masterpieces. We
                breathe new life into aged structures through meticulous
                interior redesign, structural upgrades, and luxury finishes.
              </p>
              <div className="flex flex-col items-start gap-3 w-full mb-8">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Luxury Interior Retrofitting
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Structural Modernization
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Adaptive Reuse Projects
                  </div>
                </div>
              </div>
              <div className="w-full flex-1 min-h-[192px] mt-auto rounded-2xl bg-slate-100 overflow-hidden relative">
                <Image
                  src="/img/4.png"
                  alt="Renovation & Remodeling"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          {/* Card 3: Civil Works */}
          {/* <div className="flex flex-col bg-white rounded-3xl border border-solid border-slate-100 shadow-[0px_1px_2px_#0000000d] p-8 min-h-[600px] relative">
            <div className="flex w-14 h-14 relative items-center justify-center bg-[#1d40891a] rounded-2xl mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9 3v2H5v2h2v6H3v2h4v4h2v-4h6v4h2v-4h4v-2h-2V7h2V5h-4V3H9zm2 4v6h6V7h-6z"
                  fill="#1d4089"
                />
              </svg>
            </div>
            <div className="flex-1 w-full items-start flex flex-col">
              <div className="relative flex items-center h-8 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8 whitespace-nowrap mb-4">
                Civil Works
              </div>
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-base tracking-[0] leading-[26px] mb-6">
                Infrastructure that powers growth. From road construction to
                large-scale drainage systems, we provide the backbone for
                community development with technical precision.
              </p>
              <div className="flex flex-col items-start gap-3 w-full mb-8">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Road &amp; Pavement Construction
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Drainage &amp; Water Systems
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Site Preparation &amp; Excavation
                  </div>
                </div>
              </div>
              <div className="w-full flex-1 min-h-[192px] mt-auto rounded-2xl bg-slate-100 overflow-hidden relative">
                <Image
                  src="/img/5.png"
                  alt="Civil Works"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div> */}

          {
            /* Card 4: Property Development */
            <div className="flex flex-col bg-white rounded-3xl border border-solid border-slate-100 shadow-[0px_1px_2px_#0000000d] p-8 min-h-[600px] relative">
              <div className="flex w-14 h-14 relative items-center justify-center bg-[#1d40891a] rounded-2xl mb-6">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="#1d4089"
                  />
                </svg>
              </div>
              <div className="flex-1 w-full items-start flex flex-col">
                <div className="relative flex items-center h-8 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8 whitespace-nowrap mb-4">
                  Property Development
                </div>
                <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-base tracking-[0] leading-[26px] mb-6">
                  Strategically identifying and developing high-value real
                  estate. We manage the entire lifecycle from land acquisition
                  and feasibility to marketing and sales.
                </p>
                <div className="flex flex-col items-start gap-3 w-full mb-8">
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                    <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                      Real Estate Investment Strategy
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                    <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                      Estate Management Services
                    </div>
                  </div>
                  <div className="flex items-center gap-3 w-full">
                    <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                    <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                      Joint Venture Partnerships
                    </div>
                  </div>
                </div>
                <div className="w-full flex-1 min-h-[192px] mt-auto rounded-2xl bg-slate-100 overflow-hidden relative">
                  <Image
                    src="/img/6.png"
                    alt="Property Development"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          }
          {/* Card 5: Commercial Property Development */}
          <div className="flex flex-col bg-white rounded-3xl border border-solid border-slate-100 shadow-[0px_1px_2px_#0000000d] p-8 min-h-[600px] relative">
            <div className="flex w-14 h-14 relative items-center justify-center bg-[#1d40891a] rounded-2xl mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"
                  fill="#1d4089"
                />
              </svg>
            </div>
            <div className="flex-1 w-full items-start flex flex-col">
              <div className="relative flex items-center h-8 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8 whitespace-nowrap mb-4">
                Commercial Property Development
              </div>
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-base tracking-[0] leading-[26px] mb-6">
                Expertly delivering state-of-the-art office buildings, retail
                centers, and industrial facilities designed for modern business
                operations.
              </p>
              <div className="flex flex-col items-start gap-3 w-full mb-8">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Corporate Office Complexes
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Retail & Shopping Plazas
                  </div>
                </div>
                <div className="flex items-center gap-3 w-full">
                  <div className="w-3 h-3 bg-[#1d4089] rounded-full" />
                  <div className="relative flex items-center h-5 [font-family:'Plus_Jakarta_Sans-Medium',Helvetica] font-medium text-slate-900 text-sm tracking-[0] leading-5">
                    Industrial Warehouses
                  </div>
                </div>
              </div>
              <div className="w-full flex-1 min-h-[192px] mt-auto rounded-2xl bg-slate-100 overflow-hidden relative">
                <Image
                  src="/img/3.png"
                  alt="Commercial Property Development"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sustainable Building Practices */}
      <div className="relative w-full px-8 py-24 bg-[#1d4089] flex flex-col items-center">
        <div className="flex flex-col lg:flex-row items-center gap-12 relative w-full max-w-screen-xl">
          <div className="flex flex-col w-full lg:w-1/2 items-start gap-6 relative">
            <div className="inline-flex items-start px-4 py-1 relative flex-[0_0_auto] rounded-full border border-solid border-[#ffffff33]">
              <div className="relative flex items-center h-4 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-[#ffffffcc] text-xs tracking-[1.20px] leading-4 whitespace-nowrap">
                GREEN FUTURE
              </div>
            </div>
            <div className="items-start flex flex-col relative self-stretch w-full">
              <div className="relative self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-white text-4xl md:text-5xl tracking-[0] leading-tight md:leading-[48px]">
                Sustainable Building
                <br />
                Practices
              </div>
            </div>
            <div className="flex flex-col items-start pt-2 pb-0 px-0 relative self-stretch w-full">
              <p className="relative self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#ffffffcc] text-lg tracking-[0] leading-[29.2px]">
                At Winbarg Homes, we are committed to reducing the environmental
                footprint of our developments. We integrate &#34;Green
                Building&#34; methodologies that prioritize energy efficiency,
                waste reduction, and sustainable sourcing.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 w-full mt-6">
              <div className="flex items-start gap-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 mt-1"
                >
                  <path
                    d="M17.92 7.02C17.45 4.18 14.97 2 12 2 9.82 2 7.83 3.18 6.78 5.02 4.84 5.15 3.3 6.82 3.3 8.87 3.3 11.25 5.25 13.2 7.64 13.2h10.36c2.39 0 4.34-1.95 4.34-4.34C22 8.55 20.4 6.96 18.41 6.96z"
                    fill="white"
                  />
                </svg>
                <div className="flex flex-col items-start">
                  <div className="relative flex items-center h-6 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-base tracking-[0] leading-6">
                    Eco-Sourcing
                  </div>
                  <p className="relative mt-1 [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#ffffff99] text-sm tracking-[0] leading-5">
                    Sustainably harvested materials and low-carbon concrete.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 mt-1"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-14c-3.32 0-6 2.68-6 6s2.68 6 6 6 6-2.68 6-6-2.68-6-6-6z"
                    fill="white"
                  />
                  <path d="M10 11h2v2h-2v-2z" fill="white" />
                  <path d="M12 6v3h-1V7h1V6z" fill="white" />
                </svg>
                <div className="flex flex-col items-start">
                  <div className="relative flex items-center h-6 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-base tracking-[0] leading-6">
                    Energy Efficient
                  </div>
                  <p className="relative mt-1 [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#ffffff99] text-sm tracking-[0] leading-5">
                    Solar integration and smart HVAC optimization.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 mt-1"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"
                    fill="white"
                  />
                </svg>
                <div className="flex flex-col items-start">
                  <div className="relative flex items-center h-6 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-base tracking-[0] leading-6">
                    Water Conservation
                  </div>
                  <p className="relative mt-1 [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#ffffff99] text-sm tracking-[0] leading-5">
                    Advanced greywater recycling systems.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  className="shrink-0 mt-1"
                >
                  <path
                    d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"
                    fill="white"
                  />
                </svg>
                <div className="flex flex-col items-start">
                  <div className="relative flex items-center h-6 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-base tracking-[0] leading-6">
                    Certifications
                  </div>
                  <p className="relative mt-1 [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-[#ffffff99] text-sm tracking-[0] leading-5">
                    EDGE and LEED-standard construction protocols.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col w-full lg:w-1/2 items-center lg:items-end relative mt-12 lg:mt-0">
            <div className="relative w-full max-w-[576px] aspect-[1] rounded-[32px] bg-[url(/img/Eco.png)] bg-cover bg-[50%_50%]" />
          </div>
        </div>
      </div>

      {/* Our Technical Process */}
      <div className="relative w-full max-w-screen-xl mx-auto px-8 py-24 flex flex-col items-center">
        <div className="flex flex-col items-center gap-4 relative self-stretch w-full mb-16">
          <div className="relative flex items-center justify-center h-9 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-3xl md:text-4xl text-center tracking-[0] leading-9 whitespace-nowrap">
            Our Technical Process
          </div>
          <p className="relative flex items-center justify-center h-6 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-600 text-base text-center tracking-[0] leading-6">
            A rigorous, data-driven methodology for every project
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative w-full">
          {/* Process 1 */}
          <div className="relative flex flex-col items-center text-center">
            <div className="flex w-12 h-12 items-center justify-center bg-[#1d4089] rounded-full mb-6 z-10">
              <div className="relative flex items-center justify-center h-7 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-7">
                1
              </div>
            </div>
            <div className="relative flex items-center justify-center h-6 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-base text-center tracking-[0] leading-6 mb-2">
              Feasibility Study
            </div>
            <p className="relative [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-500 text-sm text-center tracking-[0] leading-5">
              Comprehensive site analysis and environmental impact assessment.
            </p>
          </div>
          {/* Process 2 */}
          <div className="relative flex flex-col items-center text-center">
            <div className="flex w-12 h-12 items-center justify-center bg-[#1d4089] rounded-full mb-6 z-10">
              <div className="relative flex items-center justify-center h-7 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-7">
                2
              </div>
            </div>
            <div className="relative flex items-center justify-center h-6 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-base text-center tracking-[0] leading-6 mb-2">
              Architectural Design
            </div>
            <p className="relative [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-500 text-sm text-center tracking-[0] leading-5">
              3D modeling and structural engineering blueprints with precision.
            </p>
          </div>
          {/* Process 3 */}
          <div className="relative flex flex-col items-center text-center">
            <div className="flex w-12 h-12 items-center justify-center bg-[#1d4089] rounded-full mb-6 z-10">
              <div className="relative flex items-center justify-center h-7 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-7">
                3
              </div>
            </div>
            <div className="relative flex items-center justify-center h-6 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-base text-center tracking-[0] leading-6 mb-2">
              Execution Phase
            </div>
            <p className="relative [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-500 text-sm text-center tracking-[0] leading-5">
              Project management with strict adherence to safety and quality.
            </p>
          </div>
          {/* Process 4 */}
          <div className="relative flex flex-col items-center text-center">
            <div className="flex w-12 h-12 items-center justify-center bg-[#1d4089] rounded-full mb-6 z-10">
              <div className="relative flex items-center justify-center h-7 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-xl text-center tracking-[0] leading-7">
                4
              </div>
            </div>
            <div className="relative flex items-center justify-center h-6 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-slate-900 text-base text-center tracking-[0] leading-6 mb-2">
              Quality Audit
            </div>
            <p className="relative [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-500 text-sm text-center tracking-[0] leading-5">
              Final inspection and structural verification before handover.
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative w-full max-w-screen-xl mx-auto px-8 my-24 flex flex-col items-center">
        <div className="w-full p-12 bg-slate-900 rounded-[48px] overflow-hidden flex flex-col items-center relative">
          <div className="absolute -top-32 -left-32 w-64 h-64 bg-[#1d408933] rounded-full blur-[32px]" />
          <div className="flex flex-col items-center gap-6 relative z-10 w-full">
            <p className="relative flex items-center justify-center mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-ExtraBold',Helvetica] font-extrabold text-white text-4xl md:text-5xl text-center tracking-[0] leading-tight md:leading-[48px]">
              Ready to start your next project?
            </p>
            <div className="flex flex-col max-w-2xl w-full items-center relative">
              <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans-Regular',Helvetica] font-normal text-slate-400 text-lg text-center tracking-[0] leading-7">
                Consult with our technical experts today and let’s build
                something extraordinary together.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 relative w-full">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-10 py-4 bg-[#1d4089] rounded-full hover:bg-blue-800 transition-colors"
              >
                <div className="relative flex items-center justify-center h-7 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-lg text-center tracking-[0] leading-7 whitespace-nowrap">
                  Book a Consultation
                </div>
              </Link>
              <Link
                href="/properties"
                className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-solid border-[#ffffff33] hover:bg-white/10 transition-colors"
              >
                <div className="relative flex items-center justify-center h-7 [font-family:'Plus_Jakarta_Sans-Bold',Helvetica] font-bold text-white text-lg text-center tracking-[0] leading-7 whitespace-nowrap">
                  View Portolio
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
