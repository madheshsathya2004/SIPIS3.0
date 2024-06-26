import React from "react";
import "./About.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons";

function About() {
  return (
    <div>
      <h2>Project Description</h2>
      <br />
      <p>
        Welcome to SIPIS (Spatial Integrated Population Information System), a
        pioneering initiative designed to provide comprehensive insights into
        demographic trends and census data across Tamil Nadu over the years
        1991, 2001, and 2011. SIPIS serves as a powerful tool for researchers,
        policymakers, and the public alike, offering both spatial and
        statistical perspectives on the state's evolving socio-economic
        landscape. At SIPIS, our mission is to democratize access to census data
        through an intuitive web interface. Users can explore detailed
        information at subdistrict, district, and state levels, visualizing data
        through interactive maps and accessing structured datasets via the data
        dashboard. Whether you're interested in population dynamics, literacy
        rates, workforce distribution, or land use patterns, SIPIS provides
        robust tools for analysis and exploration. Key features include the
        ability to download specific datasets for in-depth analysis or
        integration into research projects. Users can also leverage filtering
        and querying functionalities to pinpoint specific data points or trends,
        empowering them to extract actionable insights tailored to their needs.
        Beyond data accessibility, SIPIS enhances understanding by offering
        district-level village maps and subdistrict-level village maps,
        enriching contextual understanding of demographic patterns across Tamil
        Nadu. This multi-dimensional approach not only supports academic
        research but also aids informed decision-making at governmental and
        organizational levels. Join us on this journey of discovery and
        exploration into Tamil Nadu's demographic story. SIPIS stands at the
        intersection of data science, geographic information systems (GIS), and
        public policy, striving to illuminate the past, present, and future of
        our vibrant state through the lens of census data. Explore, analyze, and
        uncover the socio-economic tapestry of Tamil Nadu with SIPIS – where
        data meets insight.
      </p>
      <br />
      <h3>Credits</h3>
      <p>
        <ul>
          <li>
            The SIPIS team in Pondicherry was coordinated by Christophe Z
            Guilmoto (IRD) and Sébastien Oliveau (Université Paris I).
            Sattianarayanin Vingadassamy and R. Amuda from the French Institute
            of Pondicherry prepared the database.
          </li>
          <br />
          <li>This project was funded by the UNFPA, New Delhi.</li>
          <br />
          <li>
            Special thanks to Dr. Michael Vlassoff, Dr. G. Balasubramanian, and
            Dr. Denis Depommier for their support.
          </li>
          <br />
          <li>
            Support from the South India Fertility Project (SIFP), "Welcome
            Trust (London)," and "French Research Institute for Development
            (IRD, Paris)" was crucial.
          </li>
          <br />
          <li>
            Thanks to G. Venkatasubramanian, K. Ramanujan, Tiaré Purushotaman,
            and other colleagues at the French Institute of Pondicherry.
          </li>
          <br />
          <li>
            In Pondicherry and Chennai, gratitude to Prof. Arokianathan
            (Pondicherry University), Sangi Patel, T. Gubendran, A.V. Raman, and
            the Census Department (Chennai). Thanks to GeoSensing (Chennai),
            Alchemy CADD (Pondicherry), and Pentasoft (Chennai), particularly
            Daniel Thadikonda and the GIS team for their software solution.
          </li>
          <br />
          <li>
            Authors' Emails: Christophe Z. Guilmoto: ifpssc@vsnl.com Sébastien
            Oliveau: oliveau@parisgeo.cnrs.fr Institutional Websites: UNFPA:
            unfpa.org.in French Institute of Pondicherry: ifpindia.org South
            India Fertility Project: members.rediff.com/sifp Wellcome Trust:
            wellcome.ac.uk IRD: ird.fr
          </li>
        </ul>
      </p>

      <h3>Guidance</h3>
      <p>
        Dr G. Venkatasubramanian
        <br />
        Srilatha RAMAKRISHNAN
      </p>
      <br />
      <h3>Developers</h3>
      <p>
        <li>
          Durgadevi - B.Tech(Information Technology), Puducherry Technological
          University
          <a
            href="https://www.linkedin.com/in/durgadevi-t-67a800278/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </a>
        </li>
        <li>
          Madhesh - B.Tech(Information Technology), Puducherry Technological
          University{" "}
          <a
            href="https://www.linkedin.com/in/madhesh-s-219aa8278/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </a>
        </li>
        <li>
          Mukunthan - B.Tech(Information Technology), Puducherry Technological
          University{" "}
          <a
            href="https://www.linkedin.com/in/mukunthan-s-2a1681275/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </a>
        </li>
        <li>
          Mohankumar - B.Tech(Information Technology), Puducherry Technological
          University{" "}
          <a
            href="https://www.linkedin.com/in/mohan-kumar-168aa7278/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </a>
        </li>
      </p>
      <br />
      <br />
      
    </div>
  );
}

export default About;
