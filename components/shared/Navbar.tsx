import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";
import favicon from "@/public/favicon.png";
export const Navbar = () => {
  return (
    <section className="relative mx-auto">
      <nav className="flex justify-between bg-red-900 text-white ">
        <div className="px-5 xl:px-12 py-6 flex w-full items-center justify-between">
          <Link
            href="/"
            className="lg:text-3xl text-[15px] font-bold font-heading flex items-center justify-center"
          >
            <img
              src={favicon.src}
              alt="logo"
              className="h-9 inline-block mr-3 "
            />
            Has Quiz App
          </Link>

          <div className="flex text-xs lg:text-lg">
            <ul className="flex items-center justify-center px-6 mx-auto font-semibold font-heading lg:space-x-12 space-x-4">
              <li>
                <Link className="hover:text-gray-200" href="/">
                  Home
                </Link>
              </li>
              <li>
                <Link className="hover:text-gray-200" href="/dashboard">
                  Dashboard
                </Link>
              </li>
            </ul>
            <UserButton />
          </div>
        </div>
      </nav>
    </section>
  );
};
