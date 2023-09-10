import {Button} from '@/components/ui/button';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex flex-col items-start'>
      <p className='text-3xl text-indigo-500 font-bold'>Hello there</p>
      <Button>Sup bruh</Button>
    </main>
  );
}
