import { CheckCircle2 } from 'lucide-react';

interface ToastProps {
  message: string | null;
}

export function Toast({ message }: ToastProps) {
  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-6 bottom-6 z-50 flex items-center gap-2.5 rounded-xl border-[1.5px] border-[#141413] bg-[#141413] px-4 py-3 text-sm font-bold text-[#BEF264] shadow-[4px_4px_0px_#2563EB]"
    >
      <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>{message}</span>
    </div>
  );
}
