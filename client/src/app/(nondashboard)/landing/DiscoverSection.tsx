// "use client";

// import React from "react";
// import { motion } from "framer-motion";
// import Image from "next/image";

// const containerVariants = {
//   hidden: { opacity: 0 },
//   visible: {
//     opacity: 1,
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const DiscoverSection = () => {
//   return (
//     <motion.div
//       initial="hidden"
//       whileInView="visible"
//       viewport={{ once: true, amount: 0.8 }}
//       variants={containerVariants}
//       className="pt-12 p-1  dark:bg-black" //mb-16
//     >
//       <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 ">
//         <motion.div variants={itemVariants} className="my-12 text-center">
//           <h2 className="text-3xl font-semibold leading-tight text-gray-800">
//             Discover
//           </h2>
//           <p className="mt-4 text-lg text-gray-600">
//             Find your Dream Rental Property Today!
//           </p>
//           <p className="mt-2 text-gray-500 max-w-3xl mx-auto">
//             Searching for your dream rental property has never been easier. With
//             our user-friendly search feature, you can quickly find the perfect
//             home that meets all your needs. Start your search today and discover
//             your dream rental property!
//           </p>
//         </motion.div>
//         {/* <motion.div variants={itemVariants} className="my-12 text-center">
//           <h2 className="text-3xl font-semibold leading-tight text-gray-800 dark:text-white">
//             Discover
//           </h2>
//           <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
//             Find your Dream Rental Property Today!
//           </p>
//           <p className="mt-2 text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
//             Searching for your dream rental property has never been easier...
//           </p>
//         </motion.div> */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center">
//           {[
//             // m better appraoch than the previos feature section, this is an array of card componenets. passed directly , jus tremember to destructure before passing it down
//             {
//               imageSrc: "/landing-icon-wand.png",
//               title: "Search for Properties",
//               description:
//                 "Browse through our extensive collection of rental properties in your desired location.",
//             },
//             {
//               imageSrc: "/landing-icon-calendar.png",
//               title: "Book Your Rental",
//               description:
//                 "Once you've found the perfect rental property, easily book it online with just a few clicks.",
//             },
//             {
//               imageSrc: "/landing-icon-heart.png",
//               title: "Enjoy your New Home",
//               description:
//                 "Move into your new rental property and start enjoying your dream home.",
//             },
//           ].map((card, index) => (
//             <motion.div key={index} variants={itemVariants}>
//               <DiscoverCard {...card} />
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// const DiscoverCard = ({
//   imageSrc,
//   title,
//   description,
// }: {
//   imageSrc: string;
//   title: string;
//   description: string;
// }) => (
//   // <div className="px-4 py-12 shadow-lg rounded-lg bg-primary-50 md:h-72">
//   //   <div className="bg-primary-700 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto">
//   //     <Image
//   //       src={imageSrc}
//   //       width={30}
//   //       height={30}
//   //       className="w-full h-full"
//   //       alt={title}
//   //     />
//   //   </div>
//   //   <h3 className="mt-4 text-xl font-medium text-gray-800">{title}</h3>
//   //   <p className="mt-2 text-base text-gray-500">{description}</p>
//   // </div>
//   <div className="px-4 py-12 shadow-lg rounded-lg bg-primary-50 dark:bg-neutral-800 md:h-72">
//     <div className="bg-primary-700 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto">
//       <Image
//         src={imageSrc}
//         width={30}
//         height={30}
//         className="w-full h-full"
//         alt={title}
//       />
//     </div>
//     <h3 className="mt-4 text-xl font-medium text-gray-800 dark:text-white">
//       {title}
//     </h3>
//     <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
//       {description}
//     </p>
//   </div>
// );

// export default DiscoverSection;


"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const DiscoverSection = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      variants={containerVariants}
      className="pt-16 pb-24 px-4 sm:px-8 lg:px-12 xl:px-20 dark:bg-black bg-white"
    >
      <div className="max-w-6xl xl:max-w-7xl mx-auto">
        <motion.div variants={itemVariants} className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Discover
          </h2>
          <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
            Find your Dream Rental Property Today!
          </p>
          <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Searching for your dream rental property has never been easier. With
            our user-friendly search feature, you can quickly find the perfect
            home that meets all your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center">
          {[
            {
              imageSrc: "/landing-icon-wand.png",
              title: "Search for Properties",
              description:
                "Browse through our extensive collection of rental properties in your desired location.",
            },
            {
              imageSrc: "/landing-icon-calendar.png",
              title: "Book Your Rental",
              description:
                "Once you've found the perfect rental property, easily book it online with just a few clicks.",
            },
            {
              imageSrc: "/landing-icon-heart.png",
              title: "Enjoy your New Home",
              description:
                "Move into your new rental property and start enjoying your dream home.",
            },
          ].map((card, index) => (
            <motion.div key={index} variants={itemVariants}>
              <DiscoverCard {...card} />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const DiscoverCard = ({
  imageSrc,
  title,
  description,
}: {
  imageSrc: string;
  title: string;
  description: string;
}) => (
  <div className="px-6 py-10 shadow-lg rounded-2xl bg-gray-50 dark:bg-neutral-900 transition-colors duration-300 hover:shadow-xl md:h-72">
    <div className="bg-primary-700 p-3 rounded-full mb-6 h-12 w-12 mx-auto flex items-center justify-center">
      <Image
        src={imageSrc}
        width={30}
        height={30}
        className="w-full h-full object-contain"
        alt={title}
      />
    </div>
    <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
      {title}
    </h3>
    <p className="mt-2 text-base text-gray-600 dark:text-gray-400">
      {description}
    </p>
  </div>
);

export default DiscoverSection;
