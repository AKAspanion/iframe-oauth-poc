"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const issuer = process.env.NEXT_PUBLIC_ISSUER;
  const sdkHost = process.env.NEXT_PUBLIC_SDK_URL;
  const searchParams = useSearchParams();

  const queryCode = searchParams.get("code");

  const [code, setCode] = useState("");
  const handleRedirect = () => {
    window.location.replace(
      `${issuer}/authorize?redirect_uri=${sdkHost}&response_type=code`
    );
  };
  useEffect(() => {
    setCode(queryCode || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
      <Image
        src="/tyfone.png"
        alt="Tyfone logo"
        width={48}
        height={48}
        priority
      />
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">This page is from App SDK</li>
        <li>This demonstrates SSO inside Iframe</li>
      </ol>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a
          className="cursor-pointer rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleRedirect}
        >
          Redirect
        </a>
        {/* <Link
          href={"/card"}
          className="border border-foreground rounded-full p-3 px-6 hover:bg-[#ccc] dark:hover:bg-[#383838]"
        >
          Card
        </Link> */}
        <Link
          href={"/login"}
          className="border border-foreground rounded-full p-3 px-6 hover:bg-[#ccc] dark:hover:bg-[#383838]"
        >
          Signin
        </Link>
      </div>
      {code}
    </main>
  );
}
