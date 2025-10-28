"use client";
import { FC, useEffect, useState } from "react";
import Button from "@/components/Button";
import { motion, useAnimate } from "motion/react";
import React, { MouseEvent } from 'react';


/* eslint-disable-next-line @typescript-eslint/no-unused-vars */
const navItems = [
  {
    label: "About",
    href: "#intro",
  },
  {
    label: "Selected Works",
    href: "#projects",
  },
  {
    label: "Testimonials",
    href: "#testimonials",
  },
  {
    label: "FAQs",
    href: "#faqs",
  },
  {
    label: "Contact",
    href: "#contact",
  },
];

const Header: FC = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [TopLineScope, TopLineAnimate] = useAnimate();
  const [BottomLineScope, BottomLineAnimate] = useAnimate();
  const [NavScope, NavAnimate] = useAnimate();

  useEffect(() => {
    if (IsOpen) {
      TopLineAnimate([
        [
          TopLineScope.current,
          {
            translateY: 4,
          },
        ],
        [
          TopLineScope.current,
          {
            rotate: 45,
          },
        ],
      ]);
      BottomLineAnimate([
        [
          BottomLineScope.current,
          {
            translateY: -4,
          },
        ],
        [
          BottomLineScope.current,
          {
            rotate: -45,
          },
        ],
      ]);
      NavAnimate(
        NavScope.current,
        {
          height: "100%",
        },
        {
          duration: 0.7,
        },
      );
    } else {
      TopLineAnimate([
        [
          TopLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          TopLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);
      BottomLineAnimate([
        [
          BottomLineScope.current,
          {
            rotate: 0,
          },
        ],
        [
          BottomLineScope.current,
          {
            translateY: 0,
          },
        ],
      ]);
      NavAnimate(NavScope.current, { height: 0 }, );
    }
  }, [
    IsOpen,
    TopLineAnimate,
    TopLineScope,
    BottomLineAnimate,
    BottomLineScope,
    NavScope,
    NavAnimate,
  ]);

  const HandleClickMobileNavItem = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsOpen(false);

    const url = new URL(e.currentTarget.href);
    const hash = url.hash;

    const target = document.querySelector(hash);

    if (!target) return;
    target.scrollIntoView({ behavior : 'smooth' });

    console.log(hash);

  }
  return (
    <header>
      <div
        className="fixed top-0 left-0 w-full h-0 overflow-hidden bg-stone-950 z-10"
        ref={NavScope}
      >
        <nav className="mt-20 flex flex-col">
          {navItems.map(({ label, href }) => (
            <a
              href={href}
              key={label}
              className="text-stone-200 border-t border-stone-800 last:border-b py-8
              group/nav-item relative isolate"
              onClick={HandleClickMobileNavItem}
            >
              <div className="container !max-w-full flex items-center justify-between">
                <span className="text-3xl group-hover/nav-item:pl-4 transition-all duration-500">
                  {label}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
              <div className="absolute w-full h-0 bg-stone-800 group-hover/nav-item:h-full transition-all duration-500 bottom-0 -z-10"></div>
            </a>
          ))}
        </nav>
      </div>
      <div className="fixed top-0 left-0 w-full backdrop-blur-md mix-blend-difference z-10">
        <div className="container !max-w-full">
          <div className="flex justify-between items-center h-20">
            <div>
              <a href="/">
                <span className="text-xl font-bold uppercase text-white">
                  Afaq&nbsp; Khan
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 left-0 w-full z-10">
        <div className="container !max-w-full">
          <div className="flex justify-end items-center h-20">
            <div className="flex gap-4 items-center">
              <div
                className="size-11 rounded-full border-stone-400 border inline-flex justify-center items-center bg-stone-200
              "
                onClick={() => setIsOpen(!IsOpen)}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <motion.rect
                    x="3"
                    y="7"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={TopLineScope}
                    style={{
                      transformOrigin: "12px 8px ",
                      // transform : "translateY(4px) rotate(45deg)",
                    }}
                  />
                  <motion.rect
                    x="3"
                    y="15"
                    width="18"
                    height="2"
                    fill="currentColor"
                    ref={BottomLineScope}
                    style={{
                      transformOrigin: "12px 16px ",
                      // transform : "translateY(-4px) rotate(-45deg)",
                    }}
                  />
                </svg>
              </div>
              <Button variant="primary" className="hidden md:inline-flex">
                Contact Me
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
