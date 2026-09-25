import type { ReactNode } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/JsonLd";
import { ValueStrip } from "@/components/ValueStrip";

export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd />
      <Header />
      <ValueStrip />
      <main>{children}</main>
      <Footer />
    </>
  );
}
