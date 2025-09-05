import React, { useEffect, useState } from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaWhatsapp, FaGlobe, FaPhone } from 'react-icons/fa';
import { motion } from 'framer-motion';

// Developer data remains the same
const developerInfo = [
  {
    id: 1,
    name: "Debashis Paul",
    role: "Full Stack Developer",
    bio: "Dedicated to crafting intuitive and visually engaging user interfaces and specializing in scalable backend systems with Node.js and dynamic frontend experiences with React. Always keen on exploring new technologies and contributing to impactful projects. My focus is on creating seamless and efficient digital products.",
    image: "/IMG/p112.jpeg",
    skills: ["React", "Node.js", "Express", "MongoDB", "JavaScript", "REST APIs", "AWS Basics", "Responsive Design", "Animation"],
    contact: {
      email: "adebashispaul@gmail.com",
      whatsapp: "919932445077",
      github: "https://github.com/Debashis-11101-srijib",
      linkedin: "https://www.linkedin.com/in/debashis-paul-a12795231/",
      website: "https://debashis-11101-srijib.github.io/my-portfolio/",
      phoneNumber: "+919932445077",
    },
    portfolio: [{
      title: "My Portfolio",
      description: "Showcasing a collection of my projects.",
      link: "https://debashis-11101-srijib.github.io/my-portfolio/",
    }],
  },
  {
    id: 2,
    name: "Soumen Singh",
    role: "Full Stack Developer",
    bio: "A passionate and versatile Full Stack Developer with expertise in building robust and scalable web applications. Proficient in the MERN stack (MongoDB, Express, React, Node.js), Soumen leverages JavaScript to create seamless user experiences and powerful backend solutions.",
    image: "/IMG/p113.jpg",
    skills: ["React", "Node.js", "Express", "MongoDB", "PostgreSQL", "JavaScript", "REST APIs", "AWS Basics"],
    contact: {
      email: "soumen.email@example.com",
      whatsapp: "919339268656",
      github: "https://github.com/friend-github",
      linkedin: "https://www.linkedin.com/in/friend-linkedin",
      website: "https://friendportfolio.com",
      phoneNumber: "+919339268656",
    },
    portfolio: [{
      title: "My Portfolio",
      description: "Showcasing a collection of my projects.",
      link: "https://friendportfolio.com",
    }],
  },
];

const DevelopersPage = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    // Check for theme on initial load.
    const theme = document.documentElement.getAttribute('data-theme');
    setIsDarkTheme(theme === 'dark');
    window.scrollTo(0, 0);
  }, []);

  // Framer Motion variants for smooth animations
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const cardVariants = {
    offscreen: { y: 100, opacity: 0 },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 1.2
      }
    }
  };

  const imageVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.05, rotate: 3, transition: { duration: 0.3 } }
  };

  const iconVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.2, color: "var(--color-primary)", transition: { duration: 0.2 } }
  };

  const skillTagVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 10 } }
  };

  const portfolioSectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.2,
        duration: 0.6
      }
    }
  };

  const portfolioItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div
      className="p-4 sm:p-8 md:p-12 min-h-screen flex flex-col items-center bg-page-bg text-text-color transition-colors duration-500 ease-in-out dark:bg-dark-page-bg dark:text-dark-text-color"
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.h1
        className="text-2xl  sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 text-center tracking-tight"
        
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        Meet the Innovators Behind the Project
      </motion.h1>
      <motion.p
        className="text-lg sm:text-xl md:text-2xl text-center mb-8 md:mb-12 max-w-4xl leading-relaxed text-secondary-text-color"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        We're passionate about crafting exceptional digital experiences.
      </motion.p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-12 w-full max-w-7xl">
        {developerInfo.map((dev) => (
          <motion.div
            key={dev.id}
            className="bg-card-bg dark:bg-dark-card-bg border border-border-color dark:border-dark-border-color rounded-3xl shadow-lg hover:shadow-xl p-6 sm:p-8 text-center w-full sm:w-80 md:w-96 flex flex-col items-center transition-all duration-300 ease-in-out hover:scale-105"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div
              className="w-40 h-40 sm:w-48 sm:h-48 rounded-full overflow-hidden border-4 border-primary-light-bg mb-6 relative hover:scale-105 transition-transform duration-300 ease-in-out"
              variants={imageVariants}
              whileHover="hover"
            >
              <img
                src={dev.image}
                alt={dev.name}
                className="w-full h-full object-cover block"
              />
            </motion.div>
            <h2 className="text-3xl sm:text-4xl font-semibold text-heading-color dark:text-dark-heading-color mb-2">
              {dev.name}
            </h2>
            <p className="text-lg sm:text-xl font-medium mb-6 text-transparent bg-clip-text bg-gradient-to-r from-color-primary to-color-secondary">
              {dev.role}
            </p>
            <p className="text-base sm:text-lg text-text-color dark:text-dark-text-color leading-relaxed mb-8 flex-grow text-left">
              {dev.bio}
            </p>

            {/* Skills Section */}
            <div className="w-full text-left mb-8">
              <h3 className="text-lg font-semibold text-heading-color dark:text-dark-heading-color mb-4 pb-2 border-b border-dashed border-border-color dark:border-dark-border-color">
                Skills
              </h3>
              <div className="flex flex-wrap gap-2 justify-start sm:justify-center">
                {dev.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    className="bg-primary-light-bg text-primary-dark-text py-1 px-3 rounded-full font-medium text-sm transition-all duration-200 ease-in-out hover:scale-110 hover:bg-color-primary hover:text-white dark:bg-dark-skill-bg dark:text-dark-skill-text dark:border dark:border-dark-skill-border"
                    variants={skillTagVariants}
                    initial="initial"
                    animate="animate"
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="w-full text-left mt-auto">
              <h3 className="text-lg font-semibold text-heading-color dark:text-dark-heading-color mb-4 pb-2 border-b border-dashed border-border-color dark:border-dark-border-color">
                Connect With Me
              </h3>
              <div className="flex justify-center gap-5">
                {dev.contact.email && (
                  <motion.a href={`mailto:${dev.contact.email}`} target="_blank" rel="noopener noreferrer" aria-label={`Email ${dev.name}`} className="text-2xl sm:text-3xl transition-all duration-300 ease-in-out hover:scale-125 text-contact-icon-color hover:text-contact-icon-hover-color" variants={iconVariants} whileHover="hover"><FaEnvelope /></motion.a>
                )}
                {dev.contact.whatsapp && (
                  <motion.a href={`https://wa.me/${dev.contact.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label={`WhatsApp ${dev.name}`} className="text-2xl sm:text-3xl text-whatsapp-icon-color hover:text-whatsapp-icon-hover-color transition-all duration-300 ease-in-out hover:scale-125" variants={iconVariants} whileHover="hover"><FaWhatsapp /></motion.a>
                )}
                {dev.contact.github && (
                  <motion.a href={dev.contact.github} target="_blank" rel="noopener noreferrer" aria-label={`GitHub ${dev.name}`} className="text-2xl sm:text-3xl text-github-icon-color hover:text-github-icon-hover-color transition-all duration-300 ease-in-out hover:scale-125" variants={iconVariants} whileHover="hover"><FaGithub /></motion.a>
                )}
                {dev.contact.linkedin && (
                  <motion.a href={dev.contact.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`LinkedIn ${dev.name}`} className="text-2xl sm:text-3xl text-linkedin-icon-color hover:text-linkedin-icon-hover-color transition-all duration-300 ease-in-out hover:scale-125" variants={iconVariants} whileHover="hover"><FaLinkedin /></motion.a>
                )}
                {dev.contact.website && (
                  <motion.a href={dev.contact.website} target="_blank" rel="noopener noreferrer" aria-label={`Website ${dev.name}`} className="text-2xl sm:text-3xl text-contact-icon-color hover:text-contact-icon-hover-color transition-all duration-300 ease-in-out hover:scale-125" variants={iconVariants} whileHover="hover"><FaGlobe /></motion.a>
                )}
                {dev.contact.phoneNumber && (
                  <motion.a href={`tel:${dev.contact.phoneNumber}`} aria-label={`Call ${dev.contact.name}`} className="text-2xl sm:text-3xl text-contact-icon-color hover:text-contact-icon-hover-color transition-all duration-300 ease-in-out hover:scale-125" variants={iconVariants} whileHover="hover"><FaPhone /></motion.a>
                )}
              </div>
            </div>

            {/* Portfolio Section */}
            {dev.portfolio && dev.portfolio.length > 0 && (
              <motion.div
                className="w-full text-left mt-8 pt-8 border-t border-border-color dark:border-dark-border-color"
                variants={portfolioSectionVariants}
                initial="hidden"
                animate="visible"
              >
                <h3 className="text-lg font-semibold text-heading-color dark:text-dark-heading-color mb-4 pb-2 border-b border-dashed border-border-color dark:border-dark-border-color">
                  My Projects
                </h3>
                <div className="flex flex-col gap-4">
                  {dev.portfolio.map((project, i) => (
                    <motion.a
                      key={i}
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block p-4 rounded-xl text-text-color dark:text-dark-text-color bg-portfolio-bg border border-portfolio-border transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg dark:hover:bg-dark-portfolio-hover-bg"
                      variants={portfolioItemVariants}
                      whileHover={{ scale: 1.05 }}
                    >
                      <div className="portfolio-content">
                        <h4 className="text-lg font-semibold mb-1 text-heading-color dark:text-dark-heading-color">
                          {project.title}
                        </h4>
                        <p className="text-sm leading-snug text-secondary-text-color dark:text-dark-secondary-text-color">
                          {project.description}
                        </p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

     
    </motion.div>
  );
};

export default DevelopersPage;