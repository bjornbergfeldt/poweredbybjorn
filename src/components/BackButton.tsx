import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

type Props = {
  to?: string;
  label?: string;
  className?: string;
  iconOnly?: boolean;
};

export function BackButton({ to = '/', label = 'Back', className = '', iconOnly = false }: Props) {
  return (
    <Link
      to={to}
      className={
        `inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-150 no-underline ` +
        `bg-transparent text-neutral-700 border border-neutral-200 shadow-sm hover:bg-neutral-200 ` +
        `dark:bg-transparent dark:text-neutral-200 dark:border-neutral-700 dark:hover:bg-neutral-700 ` +
        `${className}`
      }
      aria-label={label}
    >
      <BsArrowLeft className="w-4 h-4" />
      {!iconOnly && <span>{label}</span>}
    </Link>
  );
}

export default BackButton;
