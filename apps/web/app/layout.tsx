import type { Metadata } from "next";
import { Workspace } from "../src/workspace";
import "@morrow/ui/styles.css";
import "../src/app.css";
import "../src/components.css";
export const metadata: Metadata = { title: "Morrow · A little room for good work", description: "A fictional studio workspace." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
 return <html lang="en"><body><Workspace>{children}</Workspace></body></html>;
}
