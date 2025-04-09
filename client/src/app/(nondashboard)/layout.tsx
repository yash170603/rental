"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/lib/constants";
import { useGetAuthUserQuery } from "@/state/api";
//import { fetchAuthSession, getCurrentUser } from "aws-amplify/auth";
import { usePathname, useRouter } from "next/navigation";

// this still needs too much to be done, for routing and authentication

const Layout = ({ children }: { children: React.ReactNode }) => {
  //const {data:authUser}= useGetAuthUserQuery();
  // console.log("this is the auth user at layout line 11 non dashboard layout ",authUser );
  //  useEffect(() => {
  //       const initializeAuth = async () => {
  //           try {
  //               // Your AWS Amplify async operations here
  //               const session = await fetchAuthSession();
  //               const user = await getCurrentUser();
  //                console.log("this is the session at layout line 18",session);
  //                 console.log("this is the user at layout line 19",user);
  //           } catch (error) {
  //               console.error('Error initializing auth:', error);
  //           }
  //       };

  //       initializeAuth();
  //  }, []); // Empty dependency array means this runs once on mount
  const { data: authUser, isLoading: authLoading } = useGetAuthUserQuery();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (authUser) {
      const userRole = authUser.userRole?.toLowerCase();
      if (
        (userRole === "manager" && pathname.startsWith("/search")) ||
        (userRole === "manager" && pathname === "/")
      ) {
        router.push("/managers/properties", { scroll: false });
      } else {
        setIsLoading(false);
      }
    }
  }, [authUser, router, pathname]);

  if (authLoading || isLoading) return <>Loading...</>;
  return (
    <div className="  h-full">
      <Navbar />
      <main
        className={`h-full flex w-full flex-col`}
        style={{ paddingTop: `${NAVBAR_HEIGHT}px` }}
      >
        {children}
      </main>{" "}
    </div>
  );
};

export default Layout;
