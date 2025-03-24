"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { events } from "./events";

const PageViewTracker = () => {
  const pathname = usePathname();

  useEffect(() => {
    events.pageView(pathname);
  }, [pathname]);

  return null;
};

export default PageViewTracker;
