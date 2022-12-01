import React, { useEffect } from "react";
import "./Accueil.style.scss";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import ciscologo from "utils/assets/logo/cisco-logo.svg";
import ebaylogo from "utils/assets/logo/ebay-logo.svg";
import spotifylogo from "utils/assets/logo/spotify-logo.svg";
import squarelogo from "utils/assets/logo/square-logo.svg";

const logos = [ciscologo, ebaylogo, spotifylogo, squarelogo];

const variant = {
  visible: { opacity: 1, scale: 1, x: 0, transition: { duration: 1 } },
  hidden: { opacity: 0, scale: 0, x: 200 },
};
const Header = () => {
  return (
    <div className="accueil-header">
      <div className="detail">
        <h1>
          The #1 Gestionner <br /> tool used by
          <br /> restaurant
        </h1>
        <h2>each product ona free plan:</h2>
        <ul>
          <li>Suport up to 1 Restaurant or cafe</li>
          <li>include 1 gb storage</li>
          <li>offres Community support</li>
          <li>Is always free, no credit card needed</li>
        </ul>
      </div>
      <motion.div
        initial={{ x: "100px", opacity: 0.5, scale: 0.2 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="img"
      ></motion.div>
    </div>
  );
};
const Partenaires = () => {
  const controle = useAnimation();
  const [ref, inView] = useInView();
  useEffect(() => {
    if (inView) {
      controle.start("visible");
    } else {
      controle.start("hidden");
    }
  }, [controle, inView]);
  return (
    <div className="accueil-partenaires">
      <h1>Trusted by over 100,000 customers world-wide</h1>
      <div className="logo">
        {logos.map((logo, index) => (
          <motion.img
            ref={ref}
            variants={variant}
            initial="hidden"
            layout
            animate={controle}
            key={index}
            src={logo}
          />
        ))}
      </div>
    </div>
  );
};
function Accueil() {
  return (
    <div className="accueil">
      <Header />
      <Partenaires />
    </div>
  );
}

export default Accueil;
