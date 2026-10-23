import React from "react";
import Link, { LinkProps } from "next/link";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SmartLinkProps extends LinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  externalClassName?: string;
}

export function SmartLink({
  href,
  children,
  className,
  externalClassName,
  ...props
}: SmartLinkProps) {
  const isExternal =
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:");

  if (isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "inline-flex items-center justify-center gap-2",
          className,
          externalClassName,
        )}
        {...(props as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
        <ExternalLink
          className="h-4 w-4 shrink-0 opacity-80"
          aria-hidden="true"
        />
        <span className="sr-only"> (membuka tab baru)</span>
      </a>
    );
  }

  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
}
