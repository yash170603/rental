"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <div className="relative h-screen  ">
      <Image
        src="/landing-splash.jpg"
        alt="Rentiful Rental Platform Hero Section"
        fill
        className="object-cover object-center"
        priority
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 flex items-center justify-center text-center"
      >
        <div className="max-w-4xl mx-auto px-16 sm:px-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Start your journey to finding the perfect place to call home
          </h1>
          <p className="text-xl text-white mb-8">
            Explore our wide range of rental propertes tailored to your needs.
          </p>
          <div className="flex justify-center ">
            <Input
              type="text"
              placeholder="Search for your next home"
              value="Search for your next home"
              onChange={() => {}}
              className="w-full max-w-lg text-black rounded-none rounded-l-xl border-none bg-white h-12 "
            />

            <Button
              className="h-12 rounded-none rounded-r-xl bg-secondary-500 text-white hover:bg-secondary-600  "
              onClick={() => {}}
            >
              Search
            </Button>
          </div>
          <div></div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroSection;
