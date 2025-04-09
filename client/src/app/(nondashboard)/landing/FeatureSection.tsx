// "use client";
// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";
// import Link from "next/link";

// const containerVariants = {
//   hidden: { opacity: 0, y: 50 },
//   visible: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.5,
//       staggerChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const FeatureSection = () => {
//   return (
//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true }}
//       variants={containerVariants}
//       className="  py-24 px-6 sm:px-8 lg:px-12 xl:px-16  dark:bg-black dark:text-white "
//     >
//       <div className="max-w-4xl xl:max-w-6xl mx-auto dark:bg-black text-white ">
//         <motion.h2
//           variants={itemVariants}
          
//           className="text-4xl text-black font-bold text-center mb-8 dark:bg-black dark:text-white "
//         >
//           Find your home with our effective search
//         </motion.h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 dark:bg-black dark:text-white">
//           {[0, 1, 2].map((index) => (  // this appraoch might seem cool, but its tough to maintan, tho idk maybe impress interviewr, 
//             <motion.div key={index} variants={itemVariants}>
//               <FeatureCard
//                 imageSrc={`/landing-search${3 - index}.png`}
//                 title={[
//                   "Trustworthy and Verified Listings",
//                   "Browse Rental Listings with Ease",
//                   "Simplify your Rental Search with Advanced Features",
//                 ][index]}
//                 description={[
//                   "Discover the best rental options with user reviews and ratings.",
//                   "Get access to user reviews and ratings.",
//                   "Find trustworthy and verified rental listings to ensure a hassle-free renting experience.",
//                 ][index]}
//                 linkText={["Explore", "Search", "Discover"][index]}
//                 linkHref={["/explore", "/search", "/discover"][index]} // the indexed position element is passed in to the card componennt, as card expexts everything to be a string 
//               />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const FeatureCard = ({
//   imageSrc,
//   title,
//   description,
//   linkText,
//   linkHref,
// }: {
//   imageSrc: string;
//   title: string;
//   description: string;
//   linkText: string;
//   linkHref: string;
// }) => {
//   return (
//     <div className="text-center ">
//       <div className="p-4  text-black rounded-lg mb-4 flex items-center justify-center h-48 dark:bg-black dark:text-white">
//         <Image
//           src={imageSrc}
//           width={400}
//           height={400}
//           className="w-full text-black h-full object-contain dark:bg-black dark:text-white"
//           alt={title}
//         />
//       </div>

//       <h3 className="text-xl text-black  font-semibold mb-2">{title}</h3>
//       <p className="mb-4 text-black">{description}</p>
//       <Link
//         href={linkHref}
//         className="inline-block border text-black border-gray-300 rounded px-4 py-2 hover:bg-gray-100 dark:bg-black dark:text-white "
//         scroll={false}
//       >
//         {linkText}
//       </Link>
//     </div>
//   );
// };

// export default FeatureSection;

"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const FeatureSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
      className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-white text-black dark:bg-black dark:text-white"
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={itemVariants}
          className="text-4xl font-bold text-center mb-12"
        >
          Find your home with our effective search
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[0, 1, 2].map((index) => (
            <motion.div key={index} variants={itemVariants}>
              <FeatureCard
                imageSrc={`/landing-search${3 - index}.png`}
                title={[
                  "Trustworthy and Verified Listings",
                  "Browse Rental Listings with Ease",
                  "Simplify your Rental Search with Advanced Features",
                ][index]}
                description={[
                  "Discover the best rental options with user reviews and ratings.",
                  "Get access to user reviews and ratings.",
                  "Find trustworthy and verified rental listings to ensure a hassle-free renting experience.",
                ][index]}
                linkText={["Explore", "Search", "Discover"][index]}
                linkHref={["/explore", "/search", "/discover"][index]}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const FeatureCard = ({
  imageSrc,
  title,
  description,
  linkText,
  linkHref,
}: {
  imageSrc: string;
  title: string;
  description: string;
  linkText: string;
  linkHref: string;
}) => {
  return (
    <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-zinc-900 shadow-md">
      <div className="mb-4 h-48 flex items-center justify-center">
        <Image
          src={imageSrc}
          width={400}
          height={400}
          className="w-full h-full object-contain"
          alt={title}
        />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="mb-4 text-sm opacity-80">{description}</p>
      <Link
        href={linkHref}
        className="inline-block border border-gray-300 dark:border-zinc-700 px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
        scroll={false}
      >
        {linkText}
      </Link>
    </div>
  );
};

export default FeatureSection;
