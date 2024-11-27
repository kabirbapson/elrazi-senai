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
      full_name: "",
      email: "",
      phone_number: "",
      address: "",
      country_of_residence: "",
      passportOrNIN: null,
      qualifications: "",
      input_name_of_degree: "",
      undergraduateDocs: null, // Optional file field
      postgraduateDocs: null, // Optional file field
    },
    validationSchema: Yup.object({
      full_name: Yup.string().required("Full name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone_number: Yup.string().required("Phone number is required"),
      address: Yup.string().required("Address is required"),
      country_of_residence: Yup.string().required("Country is required"),
      passportOrNIN: Yup.mixed()
        .required("International Passport/NIN is required")
        .test("fileSize", "File size is too large", (value) => {
          return value && value.size <= 5 * 1024 * 1024; // 5MB max file size
        })
        .test("fileType", "Unsupported file format", (value) => {
          return value && ["image/jpeg", "image/png", "application/pdf"].includes(value.type);
        }),
      qualifications: Yup.string().required("Qualifications are required"),
      input_name_of_degree: Yup.string().required("Degree name is required"),
      undergraduateDocs: Yup.mixed().nullable(),
      postgraduateDocs: Yup.mixed().nullable(),
    }),
      onSubmit: async (values) => {
        // console.log(values);  
        //   return;
      setLoading(true); // Show loading state
      try {
        const formData = new FormData();
        formData.append("full_name", values.full_name);
        formData.append("email", values.email);
        formData.append("phone_number", values.phone_number);
        formData.append("address", values.address);
        formData.append("country_of_residence", values.country_of_residence);
        formData.append("international_passport_nin", values.passportOrNIN);
        formData.append("qualifications", values.qualifications);
        formData.append("input_name_of_degree", values.input_name_of_degree);

        
        // Conditionally append files if present
        if (values.undergraduateDocs) {
          formData.append("undergraduate_documents", values.undergraduateDocs);
        }
        if (values.postgraduateDocs) {
          formData.append("postgraduate_documents", values.postgraduateDocs);
        }

        const response = await axiosInstance.post("/senai-cimatec-forms/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        if (response.status === 201) {
          setSuccessMessage(true); // Show success message
          console.log({ response });
        } else {
          alert("Registration failed. Please try again.");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("An error occurred during registration. " + error.response.data.detail);
        } else {
          alert("An error occurred during registration. Please try again later.");
        }
        console.error("Error during registration:", error.response?.data || error.message);
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
                      name="full_name"
                      value={formik.values.full_name}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.full_name && Boolean(formik.errors.full_name)}
                      helperText={formik.touched.full_name && formik.errors.full_name}
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
                      name="phone_number"
                      value={formik.values.phone_number}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.phone_number && Boolean(formik.errors.phone_number)}
                      helperText={formik.touched.phone_number && formik.errors.phone_number}
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
                      name="country_of_residence"
                      value={formik.values.country_of_residence}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.country_of_residence &&
                        Boolean(formik.errors.country_of_residence)
                      }
                      helperText={
                        formik.touched.country_of_residence && formik.errors.country_of_residence
                      }
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
                          accept="image/*,application/pdf"
                          onChange={(event) => {
                            const file = event.currentTarget.files[0];
                            console.log("Selected file:", file); // Debug log
                            formik.setFieldValue("passportOrNIN", file);
                          }}
                        />
                      </Button>
                      {formik.errors.passportOrNIN && (
                        <Typography variant="body2" color="error">
                          {formik.errors.passportOrNIN}
                        </Typography>
                      )}
                    </Stack>
                  </Grid>

                  {/* Qualifications */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Qualifications"
                      name="qualifications"
                      value={formik.values.qualifications}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched.qualifications && Boolean(formik.errors.qualifications)}
                      helperText={formik.touched.qualifications && formik.errors.qualifications}
                    />
                  </Grid>

                  {/* Degree Name */}
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Degree Name"
                      name="input_name_of_degree"
                      value={formik.values.input_name_of_degree}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.input_name_of_degree &&
                        Boolean(formik.errors.input_name_of_degree)
                      }
                      helperText={
                        formik.touched.input_name_of_degree && formik.errors.input_name_of_degree
                      }
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
