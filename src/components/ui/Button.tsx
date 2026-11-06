'use client';

import { cn } from '@/lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-120 ease-out focus-ring touch-target-comfortable';
  
  const variants = {
    primary: 'bg-orange-500 text-black hover:bg-orange-400 active:bg-orange-600 shadow-lg shadow-orange-500/30',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30',
    outline: 'bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/5',
    ghost: 'bg-transparent text-white hover:bg-white/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
    xl: 'px-10 py-5 text-xl gap-3',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={disabled || loading}
      aria-busy={loading}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      )}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
    </button>
  );
}

interface LinkButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function LinkButton({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: LinkButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-120 ease-out focus-ring touch-target-comfortable';
  
  const variants = {
    primary: 'bg-orange-500 text-black hover:bg-orange-400 active:bg-orange-600 shadow-lg shadow-orange-500/30',
    secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:border-white/30',
    outline: 'bg-transparent text-white border-2 border-white/30 hover:border-white hover:bg-white/5',
    ghost: 'bg-transparent text-white hover:bg-white/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm gap-1.5',
    md: 'px-6 py-3 text-base gap-2',
    lg: 'px-8 py-4 text-lg gap-2.5',
    xl: 'px-10 py-5 text-xl gap-3',
  };

  return (
    <a
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </a>
  );
}