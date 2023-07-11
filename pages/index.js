import config from "@config/config.json";
import Base from "@layouts/Baseof";
import Cta from "@layouts/components/Cta";
import { markdownify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { getListPage } from "../lib/contentParser";

const Home = ({ frontmatter }) => {
  const { banner, feature, services, workflow, call_to_action } = frontmatter;
  const { title } = config.site;

  return (
    <Base title={title}>
      <section className="section pb-0"></section>
      {/* Banner */}
      <section className="section pt-[50px] pb-[100px] drop-shadow-md" style={{ backgroundImage: `url(${banner.backgroundImage})`, backgroundSize: `cover`, backgroundRepeat: `no-repeat`, backgroundPosition: 'left bottom', position: `relative` }}>
        <div className="mt-[-50px] mb-[-100px]" style={{ position: `absolute`, minWidth: `100%`, height: `100%`, backgroundColor: `#e6e8ea`, opacity: `0.9` }}></div>
        <div className="container relative">
          <div className="row text-center">
            <div className="mx-auto lg:col-10">
              <h2 className="font-primary font-bold">{banner.title}</h2>
              <p className="mt-4">{markdownify(banner.content)}</p>
              {banner.button.enable && (
                <Link
                  className="btn btn-primary mt-4"
                  href={banner.button.link}
                  rel={banner.button.rel}
                >
                  {banner.button.label}
                </Link>
              )}
              <Image
                className="mx-auto mt-14"
                src={banner.image}
                width={780}
                height={390}
                alt="banner image"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section bg-theme-light feature pt-12 pb-20">
        <div className="container" style={{ maxWidth: `1440px` }}>
          <div className="mb-12 text-center">
            <h3>{markdownify(feature.title)}</h3>
            <div className="flex gap-x-16 gap-x-1 sm:grid-cols-1 lg:grid-cols-3 items-center max-w-3xl max-[450px]:max-w-xs m-auto">
              <div className="h-px mt-2 mb-2 bg-gray-400 border-0 w-full lg:w-full max-[450px]:w-20"></div>
              <div className="w-full"><h5 className="h-10 mt-2 font-medium">{markdownify(feature.subtitle)}</h5></div>
              <div className="h-px mt-2 mb-2 bg-gray-400 border-0 w-full lg:w-full max-[450px]:w-20"></div>
            </div>
          </div>
          <div className="mt-8 grid gap-x-16 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {feature.features.map((item, i) => (
              <div
                className="feature-card rounded-xl bg-white pt-8 pb-8 text-center" style={{ position: `relative`, overflow: `hidden` }}
                key={`feature-${i}`}>
                <Image
                  className="feature-image"
                  src={item.image}
                  layout='fill'
                  objectFit='cover'
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt=""
                />
                <div className="rounded-xl" style={{ backgroundColor: `#000000`, position: `absolute`, width: `100%`, height: `100%`, opacity: `0.4`, top: `0` }} ></div>

                {item.icon && (
                  <Image
                    className="mx-auto"
                    src={item.icon}
                    width={30}
                    height={30}
                    alt=""
                  />
                )}
                <div className="m-14">
                  {markdownify(item.name, "h3", "h4 text-white relative")}
                  {/* <p className="mt-5 text-white relative pl-2 pr-2">{item.content}</p> */}
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* services */}
      {services.map((service, index) => {
        const isOdd = index % 2 > 0;
        return (
          <section
            key={`service-${index}`}
            className={`section ${isOdd && "bg-theme-light"}`}
          >
            <div className="container">
              <div className="items-center gap-8 md:grid md:grid-cols-2">
                {/* Carousel */}
                <div className={`service-carousel ${!isOdd && "md:order-2"}`}>
                  <Swiper
                    modules={[Autoplay, Pagination, EffectFade, Navigation]}
                    pagination={
                      service.images.length > 1 ? { clickable: true } : false
                    }
                    effect={'fade'}
                    navigation={true}
                    autoplay={{
                      delay: 5000,
                      disableOnInteraction: false,
                    }}
                  >
                    {/* Slides */}
                    {service?.images.map((slide, index) => (
                      <SwiperSlide key={index}>
                        <Image src={slide} alt="" width={600} height={500} />
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                {/* Content */}
                <div
                  className={`service-content mt-5 md:mt-0 ${!isOdd && "md:order-1"
                    }`}
                >
                  <h2 className="font-bold leading-[40px]">{service?.title}</h2>
                  <p className="mt-4 mb-2">{service?.content}</p>
                  {service.button.enable && (
                    <Link
                      href={service?.button.link}
                      className="cta-link inline-flex items-center text-primary"
                    >
                      {service?.button.label}
                      <Image
                        className="ml-1"
                        src="/images/arrow-right.svg"
                        width={18}
                        height={14}
                        alt="arrow"
                      />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* workflow */}
      <section className="section pb-0">
        <div className="mb-8 text-center">
          {markdownify(
            workflow.title,
            "h2",
            "mx-auto max-w-[400px] font-bold leading-[44px]"
          )}
          {markdownify(workflow.description, "p", "mt-3")}
        </div>
        <Image
          src={workflow.image}
          alt="workflow image"
          width={1920}
          height={296}
        />
      </section>

      {/* Cta */}
      <Cta cta={call_to_action} />
    </Base>
  );
};

export const getStaticProps = async () => {
  const homePage = await getListPage("content/_index.md");
  const { frontmatter } = homePage;
  return {
    props: {
      frontmatter,
    },
  };
};

export default Home;
