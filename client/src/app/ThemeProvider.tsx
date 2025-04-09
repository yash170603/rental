'use client'
import { loadTheme } from '@/utils/theme';
import React, { useEffect, useState } from 'react';


const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadTheme();
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or <div className="invisible" /> or loading spinner
  }

  return <>{children}</>;
};

export default ThemeProvider;
