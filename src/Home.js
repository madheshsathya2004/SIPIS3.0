// Home.js
import React from "react";
import CarouselComponent from "./CarouselComponent";
import "./Home.css";

function Home() {
  return (
    <div className="home">
      <CarouselComponent />
      <div className="content container mt-5">
        <p className="p-content">
          Welcome to SIPIS: Unveiling Tamil Nadu's Demographic Tapestry Explore
          the rich diversity and evolving socio-economic landscape of Tamil Nadu
          through SIPIS (Spatial Integrated Population Information System).
          <br /><br />
          SIPIS is your gateway to in-depth insights into census data spanning
          three pivotal years: 1991, 2001, and 2011. Whether you're a
          researcher, policymaker, or simply curious about demographic trends,
          SIPIS offers powerful tools to delve into the heart of Tamil Nadu's
          population dynamics.
          <br /><br />
          What SIPIS Offers: Interactive Maps: Visualize
          data at various levels – from subdistricts to districts and the entire
          state – through dynamic maps that bring statistics to life.
          <br /><br />
          Data Dashboard: Dive into detailed datasets covering aspects such as
          population distribution, literacy rates, workforce demographics, and
          more. Customize your analysis with filters and queries tailored to
          your research needs.
          <br /><br />
          Downloadable Data: Access specific datasets for
          academic research, policymaking, or integration into projects,
          empowering informed decision-making. District-Level Village Maps:
          Explore intricate village-level maps to understand local variations
          and demographic patterns across districts.
          <br /><br />
          Subdistrict-Level Insights:
          Delve deeper with subdistrict-level maps that provide nuanced
          perspectives on community dynamics and development.
          <br /><br />
          User-Friendly Interface: Navigate seamlessly through SIPIS' intuitive interface
          designed for both casual users and researchers alike. Empowering Data
          Exploration: SIPIS bridges the gap between data science and public
          access, promoting transparency and understanding through comprehensive
          census data analysis.
          <br /><br />
          Join Us on the Journey: Discover Tamil Nadu’s
          story through the lens of census data – from historical trends to
          future projections. SIPIS is committed to fostering a deeper
          understanding of our state's vibrant communities and their
          socio-economic evolution.
          <br /><br />
          Start Exploring: Begin your journey with
          SIPIS today. Uncover the narratives hidden within Tamil Nadu’s
          demographic data, and gain insights that shape the future.
        </p>
      </div>
    </div>
  );
}

export default Home;
