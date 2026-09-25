import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function base(props: IconProps) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    ...props,
  };
}

export function IconMenu(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

export function IconClose(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconDispenser(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="8" y="3" width="8" height="5" rx="1.2" />
      <path d="M10 8v2.5H8.5A1.5 1.5 0 0 0 7 12v7a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-7a1.5 1.5 0 0 0-1.5-1.5H14V8" />
      <path d="M12 13.5v3" />
    </svg>
  );
}

export function IconPrice(props: IconProps) {
  return (
    <svg {...base(props)}>
      <circle cx="12" cy="12" r="8.2" />
      <path d="M12 8v8M9.6 10.2c.5-.9 1.4-1.4 2.5-1.4 1.6 0 2.5.8 2.5 1.9 0 2.5-5 1.6-5 4.1 0 1.1.9 2 2.6 2 1.2 0 2.1-.5 2.6-1.4" />
    </svg>
  );
}

export function IconClipboard(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="6" y="5" width="12" height="15" rx="2" />
      <path d="M9 5.2V4.2A1.2 1.2 0 0 1 10.2 3h3.6A1.2 1.2 0 0 1 15 4.2v1" />
      <path d="M9 11h6M9 14.5h4" />
    </svg>
  );
}

export function IconSparkle(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 3.5l1.1 4.3L17 9l-3.9 1.3L12 14.5l-1.1-4.2L7 9l3.9-1.2L12 3.5z" />
      <path d="M18.5 14.5l.6 2.1 2.1.6-2.1.6-.6 2.1-.6-2.1-2.1-.6 2.1-.6.6-2.1z" />
      <path d="M5.5 14l.5 1.6 1.6.5-1.6.5-.5 1.6-.5-1.6-1.6-.5 1.6-.5.5-1.6z" />
    </svg>
  );
}

export function IconSoap(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 10h8a2 2 0 0 1 2 2v6.5A2.5 2.5 0 0 1 15.5 21h-7A2.5 2.5 0 0 1 6 18.5V12a2 2 0 0 1 2-2z" />
      <path d="M10 10V7.5A2 2 0 0 1 12 5.5h0A2 2 0 0 1 14 7.5V10" />
      <path d="M16.8 5.2c.8-.2 1.7.4 1.7 1.3 0 1.3-1.8 1.5-1.8 2.6" />
    </svg>
  );
}

export function IconAir(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M4 9.5h9.5a2.5 2.5 0 1 0 0-5H16" />
      <path d="M4 14h12.2A2.8 2.8 0 1 1 16 19.5H9" />
      <path d="M4 18.5h3" />
    </svg>
  );
}

export function IconMat(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="7" width="17" height="10" rx="2" />
      <path d="M7 7v10M11 7v10M15 7v10" />
    </svg>
  );
}

export function IconTruck(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M3.5 16V8.5A1.5 1.5 0 0 1 5 7h8.5v9" />
      <path d="M13.5 10.5H18l2.5 3.4V16h-7" />
      <circle cx="7.2" cy="16.5" r="1.7" />
      <circle cx="17.2" cy="16.5" r="1.7" />
    </svg>
  );
}

export function IconMail(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="3.5" y="6" width="17" height="12" rx="2" />
      <path d="M4 8l8 6 8-6" />
    </svg>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M8 3.8h2.6l1.2 3-1.8 1.1a11 11 0 0 0 5.1 5.1l1.1-1.8 3 1.2v2.6c0 .9-.7 1.7-1.6 1.8-7.4.7-13.6-5.5-12.9-12.9.1-.9.9-1.6 1.8-1.6z" />
    </svg>
  );
}

export function IconPin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M12 21s6.5-5.1 6.5-10.2A6.5 6.5 0 0 0 5.5 10.8C5.5 15.9 12 21 12 21z" />
      <circle cx="12" cy="10.5" r="2.1" />
    </svg>
  );
}

export function IconArrow(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

export function IconBin(props: IconProps) {
  return (
    <svg {...base(props)}>
      <path d="M7 8h10l-.8 11.2A2 2 0 0 1 14.2 21H9.8a2 2 0 0 1-2-1.8L7 8z" />
      <path d="M5.5 8h13M10 8V5.8A1.8 1.8 0 0 1 11.8 4h.4A1.8 1.8 0 0 1 14 5.8V8" />
    </svg>
  );
}

export function IconPaper(props: IconProps) {
  return (
    <svg {...base(props)}>
      <rect x="7" y="3.5" width="10" height="17" rx="2" />
      <path d="M10 8h4M10 12h4M10 16h2.5" />
    </svg>
  );
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19" fill="#0c5278" />
      <path
        d="M8 23c3.2-2.4 5.6-2.4 8.8 0s5.6 2.4 8.8 0 5.6-2.4 6.4-2.2"
        fill="none"
        stroke="#5eead4"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M8 17.5c3.2-2.4 5.6-2.4 8.8 0s5.6 2.4 8.8 0 5.6-2.4 6.4-2.2"
        fill="none"
        stroke="#e8f6fb"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
