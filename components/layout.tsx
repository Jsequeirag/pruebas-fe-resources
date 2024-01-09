import Menu from "./menu";
import "../styles/custom.module.css";

import { useRouter } from "next/router";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  return (
    <>
      <div>
        <Menu />
        <div className="content-container">
          <div className="app-content content">{children}</div>
        </div>
      </div>
    </>
  );
}
