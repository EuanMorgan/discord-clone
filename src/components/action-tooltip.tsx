'use client';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export interface ActionTooltipProps {
  label: string;
  children: React.ReactNode;
  side?: 'left' | 'right' | 'top' | 'bottom';
  align?: 'start' | 'center' | 'end';
}

const ActionTooltip = ({
  label,
  children,
  side = 'bottom',
  align = 'center',
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={50}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent side={side} align={align}>
          <p className='font-semibold text-sm capitalize'>
            {label.toLowerCase()}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ActionTooltip;
