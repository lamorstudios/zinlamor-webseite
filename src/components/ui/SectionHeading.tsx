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
        'flex flex-col',
        align === 'center' && 'items-center text-center',
        className
      )}
    >
      {eyebrow && (
        <span className={cn('eyebrow mb-5', light && 'text-muted-light')}>{eyebrow}</span>
      )}
      <Heading
        className={cn(
          'text-fluid-2xl font-semibold leading-[1.0] tracking-tightest',
          light ? 'text-paper-light' : 'text-ink'
        )}
      >
        {title}
      </Heading>
      {subtitle && (
        <p
          className={cn(
            'mt-5 max-w-prose text-fluid-lg leading-relaxed',
            align === 'center' && 'mx-auto',
            light ? 'text-paper/70' : 'text-muted'
          )}
        >
          {subtitle}
        </p>
      )}
    </Reveal>
  );
}
