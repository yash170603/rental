import {setTheme} from '../utils/theme';
import { SunMoon } from 'lucide-react';
function ThemeToggle() {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    setTheme(currentTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button onClick={toggleTheme} className="p-1">
      <SunMoon className="w-5 h-5" />
    </button>
  );
}

export default ThemeToggle;
