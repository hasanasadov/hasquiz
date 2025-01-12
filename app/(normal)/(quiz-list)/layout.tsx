"use client";

import { PropsWithChildren } from "react";

export default function QuizListLayout({ children }: PropsWithChildren) {
  return (
    <div className="">
      <div>
        <main className=" max-w-7xl ">
          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="w-screen flex items-center justify-center">
              {children}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
