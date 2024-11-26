import Head from "next/head";
import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Container, Card, Typography, Stack } from "@mui/material";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import { AuthContext } from "src/context";
import { TuitionFeesPaymentDetails } from "src/components/form/TuitionFeesPaymentDetails";
import {
  AdmissionApplicationPending,
  AdmissionApplicationRejected,
  ApplicationFeeConfirmed,
  ApplicationFeePaymentProcess,
} from "src/components";
import { AccommodationFeesPaymentDetails } from "src/components/form/AccommodationFeesPaymentDetails";
import { CoursesList } from "src/components/form/CoursesList";
import { StudentResult } from "src/components/form/StudentResult";

const Results = () => {
  const [pending, setPending] = useState(false);
  const [approved, setApproved] = useState(false); // New state for approved
  const [rejected, setRejected] = useState(false); // New state for rejected
  const [loading, setLoading] = useState(true);
  const [mBBS, setMBBS] = useState(false);

  const { user, token, admissions, documentsCompleted, studentCourses } = useContext(AuthContext);

  const admissionCheck = useCallback(() => {
    if (!admissions || admissions.length < 1) {
      setLoading(false);
      return;
    }

    // Find an admission where the course name is "Medicine and Surgery MBBS"
    const appliedForMedicineAndSurgery = admissions.find(
      (admission) => admission.course.name === "Medicine and Surgery (MBBS)"
    );

    if (appliedForMedicineAndSurgery) {
      setMBBS(true);
    } else {
      setMBBS(false);
    }

    const admissionStatus = admissions?.find((admission) => admission.status);

    switch (admissionStatus?.status) {
      case "PENDING":
        setPending(true);
        break;
      case "APPROVED":
        setApproved(true);
        break;
      case "REJECTED":
        setRejected(true);
        break;
      default:
        break;
    }

    setLoading(false);
  }, [admissions]);

  useEffect(() => {
    admissionCheck();
  }, [admissionCheck]);

  return (
    <>
      <Head>
        <title>My Results | Elrazi Medical University</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Card sx={{ padding: { xs: "20px", sm: "40px" }, mb: "20px" }}>
            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <Stack spacing={2}>
                {!documentsCompleted ? (
                  <>
                    {user?.has_paid ? (
                      <ApplicationFeeConfirmed name={user?.first_name} />
                    ) : (
                      <ApplicationFeePaymentProcess name={user?.first_name} />
                    )}
                  </>
                ) : (
                  <>
                    {pending && <AdmissionApplicationPending name={user?.first_name} />}
                    {approved && user && (
                      <StudentResult name={user?.first_name} coursesList={studentCourses} />
                    )}
                    {rejected && <AdmissionApplicationRejected name={user?.first_name} />}
                  </>
                )}
              </Stack>
            )}
          </Card>
        </Container>
      </Box>
    </>
  );
};

Results.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Results;
