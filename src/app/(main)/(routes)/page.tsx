import {ThemeToggle} from '@/components/theme-toggle';
import {Button} from '@/components/ui/button';
import {UserButton} from '@clerk/nextjs';
import Image from 'next/image';

export default function Home() {
  return (
    <div>
      <UserButton afterSignOutUrl='/' />
      <ThemeToggle />
    </div>
  );
}
