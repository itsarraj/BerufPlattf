'use client';

import { useRouter } from 'next/router';
import style from './welcome.module.scss';
import "@/app/styles/main.scss";

export default function Home() {
  const router = useRouter()
  return (
    <div className="h-[900px] w-80 flex flex-col gap-6 bg-[#1f1f1f] px-6 py-[72px] rounded-3xl">
      <div className="flex flex-col gap-6">
        {/* CTA Section */}
        <div className="flex flex-col items-center gap-6">
          <h2 className="font-bold text-white text-center text-xl">
            Your search for the next dream job is over 🚀
          </h2>
          <button onClick={() => router.push} className="w-40 h-14 bg-[#FCC636] text-[#2B2B2B] font-bold px-4 py-3 rounded-lg">
            Start Searching
          </button>
        </div>
        <img src="./assets/root-logos.png" alt="root logos" />
      </div>
    </div>
  );
}