"use client"
import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Landing from './(nondashboard)/landing/page'
import { loadTheme } from '../utils/theme';
export default function Home()  {
  useEffect(() => {
    loadTheme();
  }, []);
  
  return (
   
    <div className='h-full w-full'>
          <Navbar />
           <main className={`h-full flex w-full flex-col`}>
            <Landing />
           </main>
    </div>
  )
}