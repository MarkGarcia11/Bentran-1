import * as React from "react";
import Link from "next/link";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-tight transition-all duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-50 select-none",
  {
    variants: {
      variant: {
        primary: "btn-primary btn-sheen font-semibold",
        navy: "bg-navy text-cream hover:bg-ink btn-sheen",
        outline:
          "border border-gold/50 text-navy bg-pearl/60 hover:border-gold hover:bg-pearl hover:shadow-glow",
        ghost: "text-navy hover:bg-navy/5",
        glassLight:
          "glass text-navy hover:border-gold/60 hover:shadow-glow",
        glassDark: "glass-dark text-cream hover:border-gold/60",
        sage: "bg-sage text-pearl hover:brightness-110",
        link: "text-navy link-underline underline-offset-4",
      },
      size: {
        sm: "h-10 px-5 text-[15px]",
        md: "h-12 px-6 text-base",
        lg: "h-14 px-8 text-[17px]",
        xl: "h-16 px-10 text-lg",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export interface ButtonLinkProps
  extends React.ComponentProps<typeof Link>,
    VariantProps<typeof buttonVariants> {}

export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export interface ArrowLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {}

export function AnchorButton({
  className,
  variant,
  size,
  ...props
}: ArrowLinkProps) {
  return (
    <a className={cn(buttonVariants({ variant, size }), className)} {...props} />
  );
}

export { buttonVariants };
