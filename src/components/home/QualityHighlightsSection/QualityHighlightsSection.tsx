const highlights = [
  {
    title: "Sustainable Practices",
    description: (
      <>
        Environmentally conscious building methods that reduce carbon
        <br />
        footprint and energy costs.
      </>
    ),
    iconSrc: "/img/icon-6.svg",
    iconAlt: "",
    iconClassName: "w-[16.01px] h-[16.03px]",
    titleWidthClassName: "w-[209.86px]",
    descriptionWidthClassName: "w-[484.94px]",
  },
  {
    title: "Superior Craftsmanship",
    description: (
      <>
        Meticulous attention to detail and high-quality materials in every
        <br />
        project we undertake.
      </>
    ),
    iconSrc: "/img/icon-7.svg",
    iconAlt: "",
    iconClassName: "w-[19.97px] h-[18px]",
    titleWidthClassName: "w-[231.22px]",
    descriptionWidthClassName: "w-[478.48px]",
  },
  {
    title: "Customer-Centered",
    description: (
      <>
        Your vision is our blueprint. We maintain transparency and
        <br />
        collaboration throughout the process.
      </>
    ),
    iconSrc: "/img/icon-8.svg",
    iconAlt: "",
    iconClassName: "w-6 h-3",
    titleWidthClassName: "w-[201.97px]",
    descriptionWidthClassName: "w-[427.47px]",
  },
];

export const QualityHighlightsSection = () => {
  return (
    <section
      aria-labelledby="quality-highlights-heading"
      className="w-full max-w-screen-xl mx-auto flex flex-col items-center justify-center gap-12 px-4 py-16 sm:px-6 lg:flex-row lg:gap-16 lg:px-8 lg:py-24"
    >
      <div className="relative flex w-full flex-1 flex-col items-start">
        <div
          aria-hidden="true"
          className="relative aspect-square w-full max-w-xl rounded-3xl bg-[url(/img/construction-work.png)] bg-cover bg-[50%_50%]"
        />
        <div className="mt-4 hidden w-full max-w-[220px] flex-col items-start rounded-3xl bg-[#1a3d7c] p-6 shadow-[0px_25px_50px_-12px_#00000040] lg:absolute lg:-right-10 lg:-bottom-10 lg:mt-0 lg:flex lg:w-auto lg:max-w-none lg:p-8">
          <div className="w-full h-full bg-[#ffffff01] rounded-3xl shadow-[0px_25px_50px_-12px_#00000040] absolute top-0 left-0" />
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex items-center h-10 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-white text-4xl tracking-[0] leading-10">
              10+
            </div>
          </div>
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <div className="relative flex items-center h-6 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-medium text-blue-100 text-base tracking-[0] leading-6">
              Years Experience
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10 relative flex-1 grow px-2 sm:px-3 lg:px-0">
        <header className="flex flex-col items-start gap-3 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative self-stretch w-full flex-[0_0_auto] flex flex-col items-start">
            <p className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-[#1a3d7c] text-sm tracking-[1.40px] leading-5">
              WHY CHOOSE US
            </p>
          </div>
          <div className="relative self-stretch w-full flex-[0_0_auto] flex flex-col items-start">
            <h2
              id="quality-highlights-heading"
              className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-extrabold text-slate-900 text-3xl tracking-[0] leading-tight sm:text-4xl"
            >
              Crafting the Future of Living
            </h2>
          </div>
        </header>
        <ul className="flex flex-col items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
          {highlights.map((highlight) => (
            <li
              key={highlight.title}
              className="flex items-start gap-4 relative self-stretch w-full flex-[0_0_auto] list-none sm:gap-6"
            >
              <div
                aria-hidden="true"
                className="flex w-12 h-12 items-center justify-center relative bg-blue-50 rounded-full"
              >
                <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
                  <img
                    className={`relative ${highlight.iconClassName}`}
                    alt={highlight.iconAlt}
                    src={highlight.iconSrc}
                  />
                </div>
              </div>
              <div className="min-w-0 inline-flex flex-col items-start gap-2 relative self-stretch flex-[0_0_auto]">
                <div className="relative self-stretch flex-[0_0_auto] flex flex-col items-start w-full">
                  <h3 className="relative flex items-center h-7 mt-[-1.00px] [font-family:'Plus_Jakarta_Sans',Helvetica] font-bold text-slate-900 text-xl tracking-[0] leading-7 break-words">
                    {highlight.title}
                  </h3>
                </div>
                <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                  <p className="relative mt-[-1.00px] max-w-2xl [font-family:'Plus_Jakarta_Sans',Helvetica] font-normal text-slate-600 text-base tracking-[0] leading-6 break-words">
                    {highlight.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
