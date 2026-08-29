import Image from "next/image";

export function LogoLoader({ className }: { className?: string }) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-8 space-y-4 ${className || ""}`}
    >
      <div className="relative w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
        {/* Outer pulsing ring */}
        <div className="absolute inset-0 rounded-full border-4 border-brand-primary/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]" />

        {/* Inner spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-t-brand-primary border-r-transparent border-b-transparent border-l-transparent animate-spin" />

        {/* Logo in the center */}
        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center animate-pulse">
          <Image
            src="/img/1.png"
            alt="Loading..."
            fill
            className="object-contain drop-shadow-md"
            priority
          />
        </div>
      </div>
      <p className="text-sm font-semibold text-brand-primary animate-pulse tracking-widest uppercase mt-4">
        Loading
      </p>
    </div>
  );
}
