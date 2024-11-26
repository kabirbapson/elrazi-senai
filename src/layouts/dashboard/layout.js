/* eslint-disable react/jsx-max-props-per-line */
"use client";
import { useCallback, useContext, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { styled } from "@mui/material/styles";
import { SideNav } from "./side-nav";
import { TopNav } from "./top-nav";

import "react-toastify/dist/ReactToastify.css";
import { AuthContext, AuthProvider } from "src/context";
import { useAuth } from "src/hooks";
import FullScreenLoading from "src/components/loading/FullScreenLoading";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const Layout = (props) => {
  const { children } = props;
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const {
    paymentUpload,
    tuitionFeeUpload,
    accommodationFeeUpload,
    token,
    documentsCompleted,
    isLoading,
    facultyCourses,
    studentCourses,
    user,
    logOutUser,
    admissions,
  } = useAuth();

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      {isLoading ? (
        <FullScreenLoading />
      ) : (
        <AuthContext.Provider
          value={{
            user,
            paymentUpload,
            tuitionFeeUpload,
            accommodationFeeUpload,
            token,
            documentsCompleted,
            facultyCourses,
            studentCourses,
            admissions,
            logOutUser,
          }}
        >
          <TopNav onNavOpen={() => setOpenNav(true)} />
          <SideNav onClose={() => setOpenNav(false)} open={openNav} />
          <LayoutRoot>
            <LayoutContainer>{children}</LayoutContainer>
          </LayoutRoot>
        </AuthContext.Provider>
      )}
    </>
  );
};
