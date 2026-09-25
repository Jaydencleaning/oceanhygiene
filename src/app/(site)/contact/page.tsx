import type { Metadata } from "next";
import { ContactPage } from "./ContactPage";
import { pages } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: pages.contact.title },
  description: pages.contact.description,
};

export default function Page() {
  return <ContactPage />;
}
