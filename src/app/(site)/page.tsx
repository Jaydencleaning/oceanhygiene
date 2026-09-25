import type { Metadata } from "next";
import { HomePage } from "@/components/HomePage";
import { pages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pages.home.title },
  description: pages.home.description,
};

export default function Page() {
  return <HomePage />;
}
