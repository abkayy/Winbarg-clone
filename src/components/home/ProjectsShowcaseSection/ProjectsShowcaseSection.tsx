const projects = [
  {
    category: "RESIDENTIAL",
    title: "Centrum - Kaura",
    description: (
      <>
        Premium 5-Bedroom Smart Home with
        <br />
        sustainable energy systems.
      </>
    ),
    image:
      "https://res.cloudinary.com/dwy8mwkmm/image/upload/v1780892738/cIMG_0531_lt6ymp.png",
  },
  {
    category: "RESIDENTIAL",
    title: "Luxera court - Gaduwa",
    description: (
      <>
        Contemporary residential complex with LEED
        <br />
        certification.
      </>
    ),
    image:
      "https://res.cloudinary.com/dwy8mwkmm/image/upload/v1780910506/dIMG_1715_sywzq2.png",
  },
  {
    category: "ONGOING DEVELOPMENT",
    title: "Amanee hills - Guzape",
    description: (
      <>
        Large scale residential community project phase
        <br />
        1.
      </>
    ),
    image:
      "https://res.cloudinary.com/dwy8mwkmm/image/upload/v1780923828/IMG_1171.JPG_unhdhp.jpg",
  },
];

export const ProjectsShowcaseSection = () => {
  return (
    <section
      className="relative flex w-full flex-col items-center overflow-hidden bg-slate-900 px-0 py-16 sm:py-20 lg:py-24"
      aria-labelledby="projects-showcase-heading"
    >
      <div
        className="absolute top-0 left-0 hidden h-[888px] w-[1280px] bg-[url(/img/vector.svg)] bg-[100%_100%] lg:block"
        aria-hidden="true"
      />
      <div className="relative flex w-full max-w-screen-xl flex-col items-start gap-10 px-4 py-0 sm:px-6 lg:gap-16 lg:px-8">
        <div className="relative flex w-full flex-col items-start gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="inline-flex max-w-2xl flex-col items-start gap-3">
            <div className="flex w-full flex-col items-start">
              <p className="relative mt-[-1.00px] flex h-5 items-center [font-family:'Plus_Jakarta_Sans',Helvetica] text-sm font-bold leading-5 tracking-[1.40px] text-blue-500">
                PORTFOLIO
              </p>
            </div>
            <div className="flex w-full flex-col items-start">
              <h2
                id="projects-showcase-heading"
                className="relative mt-[-1.00px] flex items-center [font-family:'Plus_Jakarta_Sans',Helvetica] text-3xl font-extrabold leading-tight tracking-[0] text-white sm:text-4xl lg:text-4xl lg:leading-10"
              >
                Building Excellence in Every Landmark
              </h2>
            </div>
            <div className="relative flex w-full flex-col items-start px-0 pb-0 pt-3">
              <p className="relative mt-[-1.00px] max-w-2xl [font-family:'Plus_Jakarta_Sans',Helvetica] text-base font-normal leading-7 tracking-[0] text-slate-400 sm:text-lg">
                Explore our recent developments and ongoing projects that are
                shaping the city&#39;s skyline.
              </p>
            </div>
          </div>
          <button
            type="button"
            className="inline-flex flex-[0_0_auto] flex-col items-center justify-center rounded-lg bg-white px-8 py-3"
            aria-label="Explore gallery"
          >
            <span className="relative mt-[-1.00px] flex h-6 items-center justify-center [font-family:'Plus_Jakarta_Sans',Helvetica] text-center text-base font-bold leading-6 tracking-[0] text-slate-900">
              Explore Gallery
            </span>
          </button>
        </div>
        <div className="relative grid w-full grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 xl:gap-8">
          {projects.map((project) => (
            <article
              key={project.title}
              className="relative flex flex-col items-start self-stretch"
            >
              <div className="relative flex aspect-[0.85] w-full flex-col items-start justify-center self-stretch overflow-hidden rounded-3xl">
                <div
                  className="relative h-full min-h-[360px] w-full self-stretch bg-cover bg-[50%_50%]"
                  style={{ backgroundImage: `url(${project.image})` }}
                  role="img"
                  aria-label={project.title}
                />
                <div className="absolute top-0 left-0 flex h-full w-full flex-col items-start justify-end bg-[linear-gradient(0deg,rgba(0,0,0,0.8)_0%,rgba(0,0,0,0)_50%,rgba(0,0,0,0)_100%)] p-6 sm:p-8">
                  <div className="relative flex w-full flex-col items-start px-0 pb-2 pt-0">
                    <div className="flex w-full flex-col items-start">
                      <p className="relative mt-[-1.00px] flex self-stretch [font-family:'Plus_Jakarta_Sans',Helvetica] text-xs font-bold leading-4 tracking-[0] text-blue-500">
                        {project.category}
                      </p>
                    </div>
                  </div>
                  <div className="flex w-full flex-col items-start">
                    <h3 className="relative mt-[-1.00px] flex self-stretch [font-family:'Plus_Jakarta_Sans',Helvetica] text-2xl font-bold leading-8 tracking-[0] text-white">
                      {project.title}
                    </h3>
                  </div>
                  <div className="relative flex w-full flex-col items-start px-0 pb-0 pt-2">
                    <div className="flex w-full flex-col items-start opacity-0">
                      <p className="relative mt-[-1.00px] self-stretch [font-family:'Plus_Jakarta_Sans',Helvetica] text-sm font-normal leading-5 tracking-[0] text-slate-300">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
