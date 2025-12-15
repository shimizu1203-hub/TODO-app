"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import type { LinkProps } from "next/link";

type Variant = "primary" | "success" | "danger" | "ghost";

type Props = LinkProps & {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

const base =
  "inline-flex items-center rounded px-3 py-1.5 text-sm font-medium transition " +
  "focus:outline-none focus:ring-2 focus:ring-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-400",
  success: "bg-green-600 text-white hover:bg-green-700 focus:ring-green-400",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-400",
  ghost: "bg-transparent hover:bg-gray-100 focus:ring-gray-300",
};

export default function ButtonLink({ variant = "primary", className = "", children, ...props }: Props) {
  return (
    <Link {...props} className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}

