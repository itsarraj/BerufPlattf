'use client'
import './globals.css';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { BackButton } from '@/components/ui/BackButton';
import { Input } from '@/components/ui/Input';
import Link from 'next/link';
import { Divider } from '@/components/ui/Divider';
import { Select } from '@/components/ui/Select';
import { Textarea } from '@/components/ui/Textarea';
// import { useRouter } from 'next/navigation';

export default async function Home() {

  // const router = useRouter();
  return (
    <div className="container-padding flex flex-col items-center justify-center gap-12 min-h-screen">
      <div className="flex flex-col items-center gap-8 text-center">
        <h1 className="text-heading-1 ">
          Your search for the next dream job is over 🚀
        </h1>
        <p className="text-body text-light-gray">
          Discover thousands of job opportunities from top companies around the world.
          Tailor your search to find the perfect match for your skills and career goals.
        </p>
        <Link href="/homepage">
          <Button
            variant="primary"
            size="xl"
          >
            Start Searching
          </Button>
        </Link>
        <BackButton href="/back"/>
        <Divider/>
        <Select fullWidth={true}/>
        <Input  fullWidth={true}/>
        <Textarea fullWidth={true}/>
      </div>

      <div className="mt-8">
        {/* <Image
          src="/assets/root-logos.png"
          alt="Featured companies"
          width={800}
          height={300}
          className="max-w-full"
        /> */}
      </div>
    </div>
  );
}