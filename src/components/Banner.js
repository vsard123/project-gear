import React, { useContext } from "react";
import { DataContext } from "../store/GlobalState";
import LevelOne from "./MegaMenu/LevelOne";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

const Banner = () => {
  const { state } = useContext(DataContext);
  const { categories } = state;

  return (
    <section className="section-content py-5">
      <div className="row">
        <aside className="col-lg-3 d-none d-lg-block">
          <nav className="sidebar card box-shadow">
            <LevelOne categories={categories} />
          </nav>
        </aside>
        <main className="col-lg-9">
          <Carousel showStatus={false} showThumbs={false} emulateTouch={true}>
            <div>
              <img src="/images/banner/banner.jpg" alt="banner" />
            </div>
            <div>
              <img src="/images/banner/banner1.png" alt="banner" />
            </div>
            <div>
              <img src="/images/banner/banner2.png" alt="banner" />
            </div>
          </Carousel>
        </main>
      </div>
    </section>
  );
};

export default Banner;
