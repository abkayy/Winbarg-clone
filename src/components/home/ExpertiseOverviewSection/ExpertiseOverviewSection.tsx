const expertiseItems = [
  {
    title: "Property Development",
    description: (
      <>
        We create value-driven residential
        <br />
        properties designed for the
        <br />
        modern lifestyle.
      </>
    ),
    icon: (
      <img
        className="relative w-[22.5px] h-[22.5px]"
        alt=""
        aria-hidden="true"
        src="/img/icon-1.svg"
      />
    ),
    titleWidth: "w-[267.66px]",
    descriptionWidth: "w-[301.19px]",
  },
  {
    title: "Civil Works",
    description: (
      <>
        Expert engineering services for
        <br />
        infrastructure, site preparation, and
        <br />
        structural integrity.
      </>
    ),
    icon: (
      <img
        className="relative w-[27.42px] h-[22.5px]"
        alt=""
        aria-hidden="true"
        src="/img/icon-3.svg"
      />
    ),
    titleWidth: "w-[129.09px]",
    descriptionWidth: "w-[265.67px]",
  },
  {
    title: "Renovation",
    description: (
      <>
        Transforming existing spaces with
        <br />
        contemporary aesthetics and modern
        <br />
        structural upgrades.
      </>
    ),
    icon: (
      <svg
        className="relative w-[22.5px] h-[22.5px]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        style={{ color: "#1a3d7c" }}
      >
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
      </svg>
    ),
    titleWidth: "w-[132.11px]",
    descriptionWidth: "w-[286.42px]",
  },
];

export const ExpertiseOverviewSection = () => {
  return (
    <section
      className="flex flex-col w-full items-center px-0 py-16 relative bg-slate-50 sm:py-20 lg:py-24"
      aria-labelledby="expertise-overview-heading"
    >
      <div className="flex w-full flex-col max-w-screen-xl items-center gap-12 px-4 py-0 relative flex-[0_0_auto] sm:px-6 lg:gap-16 lg:px-8">
        <div className="flex w-full max-w-screen-md flex-col items-start gap-3 relative flex-[0_0_auto]">
          <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative flex items-center justify-center h-5 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#1a3d7c] text-sm text-center tracking-[1.40px] leading-5">
              OUR EXPERTISE
            </p>
          </div>
          <div className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
            <h2
              id="expertise-overview-heading"
              className="relative flex items-center justify-center h-10 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-slate-900 text-3xl text-center tracking-[0] leading-tight sm:text-4xl"
            >
              Comprehensive Real Estate Solutions
            </h2>
          </div>
          <div className="flex flex-col items-center pt-3 pb-0 px-0 relative self-stretch w-full flex-[0_0_auto]">
            <p className="relative max-w-3xl mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-slate-600 text-lg text-center tracking-[0] leading-7">
              From conceptual design to final handover, we manage every detail
              of the construction
              <br />
              lifecycle with precision and care.
            </p>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-6 relative self-stretch flex-[0_0_auto] md:grid-cols-3 md:gap-8">
          {expertiseItems.map((item) => (
            <article
              key={item.title}
              className="relative flex-1 self-stretch grow min-h-[328px] bg-white rounded-3xl border border-solid border-slate-100 shadow-[0px_1px_2px_#0000000d]"
            >
              <div className="flex w-16 h-16 items-center justify-center absolute top-8 left-8 bg-[#1a3d7c1a] rounded-3xl sm:top-[41px] sm:left-[41px]">
                <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  {item.icon}
                </div>
              </div>
              <div className="absolute left-8 right-8 top-[137px] flex flex-col items-start sm:left-[41px] sm:right-[41px]">
                <h3 className="relative flex items-center h-8 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-slate-900 text-2xl tracking-[0] leading-8">
                  {item.title}
                </h3>
              </div>
              <div className="absolute left-8 right-8 top-[185px] flex flex-col items-start sm:left-[41px] sm:right-[41px]">
                <p className="relative mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-slate-600 text-base tracking-[0] leading-[26px]">
                  {item.description}
                </p>
              </div>
              <div className="flex w-[calc(100%_-_64px)] items-center gap-2 absolute bottom-8 left-8 sm:w-[calc(100%_-_82px)] sm:top-[286px] sm:bottom-auto sm:left-[41px]">
                <a
                  href="#"
                  className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1a3d7c] focus-visible:ring-offset-2 rounded-sm"
                  aria-label={`Learn more about ${item.title}`}
                >
                  <span className="relative flex items-center h-6 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#1a3d7c] text-base tracking-[0] leading-6">
                    Learn More
                  </span>
                  <span className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                    <img
                      className="relative w-[9.35px] h-[9.35px]"
                      alt=""
                      aria-hidden="true"
                      src="/img/icon-5.svg"
                    />
                  </span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
