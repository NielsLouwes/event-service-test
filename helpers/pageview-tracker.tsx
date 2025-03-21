"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { dataLayer } from "./datalayer";

const PageViewTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    dataLayer.pageView(pathname);
  }, [pathname]);

  return null;
};

export default PageViewTracker;
