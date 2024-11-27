import Head from "next/head";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
  Snackbar,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axiosInstance from "src/api/config";
import { useState } from "react";

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false); // State for success message

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      country: "",
      passportOrNIN: null,
      degreeName: "",
      undergraduateDocs: null, // Optional file field
      postgraduateDocs: null, // Optional file field
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      country: Yup.string().required("Country is required"),
      passportOrNIN: Yup.mixed().required("International Passport or NIN is required"),
      degreeName: Yup.string().required("Degree name is required"),
      undergraduateDocs: Yup.mixed().nullable(),
      postgraduateDocs: Yup.mixed().nullable(),
    }),
    onSubmit: async (values) => {
      setLoading(true); // Show loading state
      try {
        const formData = new FormData();
        formData.append("fullName", values.fullName);
        formData.append("email", values.email);
        formData.append("phone", values.phone);
        formData.append("address", values.address);
        formData.append("country", values.country);
        formData.append("passportOrNIN", values.passportOrNIN);
        formData.append("degreeName", values.degreeName);

        // Conditionally append files if present
        if (values.undergraduateDocs) {
          formData.append("undergraduateDocs", values.undergraduateDocs);
        }

        if (values.postgraduateDocs) {
          formData.append("postgraduateDocs", values.postgraduateDocs);
        }

        const response = await axiosInstance.post("/senai-cimatec-forms/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log({ response });
        if (response.status === 201) {
          // Display success message
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        setSuccessMessage(true);
        console.error("Error during registration:", error);
        alert("An error occurred during registration. Please try again later.");
      } finally {
        setLoading(false); // Hide loading state
      }
    },
  });

  const handleCloseSuccessMessage = () => {
    setSuccessMessage(false); // Close success message
  };

  return (
    <>
      <Head>
        <title>Register | Executive MBA Program</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          minHeight: "100vh",
          py: 6,
        }}
      >
        <Container maxWidth="md">
          {!successMessage ? (
            <>
              <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 4 }}>
                Executive MBA Registration
              </Typography>
              <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mb: 6 }}>
                Fill in the form below to register for the Executive MBA in Health Management
                Technology. Ensure all fields are completed.
              </Typography>
              <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
                <Grid container spacing={4}>
                  {/* Full Name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Full Name"
                      name="fullName"
                      value={formik.values.fullName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                      helperText={formik.touched.fullName && formik.errors.fullName}
                    />
                  </Grid>

                  {/* Email */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.email && Boolean(formik.errors.email)}
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>

                  {/* Phone Number */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone && Boolean(formik.errors.phone)}
                      helperText={formik.touched.phone && formik.errors.phone}
                    />
                  </Grid>

                  {/* Address */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Address"
                      name="address"
                      value={formik.values.address}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.address && Boolean(formik.errors.address)}
                      helperText={formik.touched.address && formik.errors.address}
                    />
                  </Grid>

                  {/* Country */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Country of Residence"
                      name="country"
                      value={formik.values.country}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.country && Boolean(formik.errors.country)}
                      helperText={formik.touched.country && formik.errors.country}
                    />
                  </Grid>

                  {/* Passport/NIN */}
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Upload International Passport/NIN</Typography>
                      <Button variant="contained" component="label">
                        Upload File
                        <input
                          type="file"
                          hidden
                          onChange={(event) =>
                            formik.setFieldValue("passportOrNIN", event.currentTarget.files[0])
                          }
                        />
                      </Button>
                      {formik.errors.passportOrNIN && (
                        <Typography variant="body2" color="error">
                          {formik.errors.passportOrNIN}
                        </Typography>
                      )}
                    </Stack>
                  </Grid>

                  {/* Degree Name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Degree Name"
                      name="degreeName"
                      value={formik.values.degreeName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.degreeName && Boolean(formik.errors.degreeName)}
                      helperText={formik.touched.degreeName && formik.errors.degreeName}
                    />
                  </Grid>

                  {/* Undergraduate Documents */}
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Upload Undergraduate Documents</Typography>
                      <Button variant="contained" component="label">
                        Upload Files
                        <input
                          type="file"
                          hidden
                          onChange={(event) =>
                            formik.setFieldValue("undergraduateDocs", event.currentTarget.files[0])
                          }
                        />
                      </Button>
                      {formik.errors.undergraduateDocs && (
                        <Typography variant="body2" color="error">
                          {formik.errors.undergraduateDocs}
                        </Typography>
                      )}
                    </Stack>
                  </Grid>

                  {/* Postgraduate Documents */}
                  <Grid item xs={12}>
                    <Stack spacing={1}>
                      <Typography variant="subtitle1">Upload Postgraduate Documents</Typography>
                      <Button variant="contained" component="label">
                        Upload Files
                        <input
                          type="file"
                          hidden
                          onChange={(event) =>
                            formik.setFieldValue("postgraduateDocs", event.currentTarget.files[0])
                          }
                        />
                      </Button>
                      {formik.errors.postgraduateDocs && (
                        <Typography variant="body2" color="error">
                          {formik.errors.postgraduateDocs}
                        </Typography>
                      )}
                    </Stack>
                  </Grid>
                </Grid>

                {/* Submit Button */}
                <Stack direction="row" justifyContent="center" sx={{ mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    sx={{
                      backgroundColor: "#007bff",
                      "&:hover": { backgroundColor: "#0056b3" },
                    }}
                    disabled={loading}
                  >
                    {loading ? (
                      <CircularProgress size={24} color="inherit" />
                    ) : (
                      <Typography>Submit Registration</Typography>
                    )}
                  </Button>
                </Stack>
              </form>
            </>
          ) : (
            <Box sx={{ textAlign: "center" }}>
              <Typography variant="h5" color="success.main" sx={{ mb: 2 }}>
                Registration Successful!
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Thank you for registering. Someone will contact you shortly.
              </Typography>
            </Box>
          )}

          {/* Success Snackbar */}
          <Snackbar
            open={successMessage}
            autoHideDuration={16000}
            onClose={handleCloseSuccessMessage}
            message="Registration successful. Someone will contact you shortly."
          />
        </Container>
      </Box>
    </>
  );
};

export default RegisterPage;
