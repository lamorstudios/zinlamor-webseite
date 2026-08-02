import { cn } from '@/lib/cn';
import { Reveal } from '@/components/motion/Reveal';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  light?: boolean;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'left',
  light = false,
  as = 'h2',
  className,
}: SectionHeadingProps) {
  const Heading = as;
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      <Heading
        className={cn(
          'text-fluid-2xl font-semibold leading-[1.05] tracking-tight',
          light ? 'text-cream-soft' : 'text-burgundy'
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            'max-w-prose text-fluid-lg leading-relaxed',
            align === 'center' && 'mx-auto',
            light ? 'text-cream/80' : 'text-charcoal/75'
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
