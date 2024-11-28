/* eslint-disable react/no-unescaped-entities */
import Head from "next/head";
import NextLink from "next/link";
import { Box, Button, Card, CardContent, Container, Grid, Stack, Typography } from "@mui/material";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Executive MBA | Elrazi Medical University, Kano</title>
      </Head>

      {/* Main Wrapper */}
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
        {/* Hero Section */}
        <Box
          // sx={{
          //   position: "relative",
          //   width: "100%",
          //   height: "90vh",
          //   overflow: "hidden",
          // }}
          sx={{
            position: "relative",
            width: "100%",
            height: "90vh",
            overflow: "hidden",
            backgroundImage: `url('/assets/senai_banner.png')`, // Set image as background
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          {/* <img
            src="/assets/senai_banner.png" // Just provide the path to the image here
            alt="Executive MBA Hero"
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image covers the area, without distortion
              zIndex: -1, // Places the image behind other content
            }}
          /> */}
          <Container
            maxWidth="lg"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              color: "#fff", // You can adjust this if needed
              fontWeight: 900, // Makes the text bold
              textShadow: "0px 4px 6px rgba(0, 0, 0, 0.9)", // Adds more shadow for contrast
              fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4rem" }, // Adjust font size for responsiveness
            }}
          >
            <Typography
              variant="h2"
              fontWeight="bold"
              sx={{
                mb: 2,
                textShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              Transform Your Career in Healthcare Leadership
            </Typography>
            <Typography
              variant="h5"
              sx={{
                mb: 4,
                textShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
              }}
            >
              Join the Executive MBA in Health Management Technology
            </Typography>
            <Button
              component={NextLink}
              href="/register"
              size="large"
              variant="contained"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                px: 5,
                backgroundColor: "#007bff",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            >
              Register Now
            </Button>
          </Container>
        </Box>

        {/* About Section */}
        <Box sx={{ py: 10, textAlign: "center" }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 4 }}>
              Why Choose Our Executive MBA?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 6 }}>
              In partnership with SENAI-CIMATEC, Brazil's leading innovation institute, we offer a
              world-class postgraduate program that blends healthcare, management, and technology
              expertise.
            </Typography>
            <img
              src="/assets/senai1.jpg"
              alt="Program Overview"
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            />
          </Container>
        </Box>

        {/* Program Highlights Section */}
        <Box sx={{ py: 10, backgroundColor: "#f9f9f9" }}>
          <Container maxWidth="lg">
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 6 }}>
              Program Highlights
            </Typography>
            <Grid container spacing={4}>
              {[
                {
                  title: "Global Exposure",
                  description:
                    "Spend 12–14 weeks in Brazil, learning from world-class healthcare systems.",
                  icon: "/images/global-exposure-icon.png",
                },
                {
                  title: "Networking Opportunities",
                  description: "Build connections with international healthcare leaders.",
                  icon: "/images/networking-icon.png",
                },
                {
                  title: "Cutting-Edge Technology",
                  description:
                    "Master the latest advancements in healthcare management and innovation.",
                  icon: "/images/technology-icon.png",
                },
                {
                  title: "Practical Applications",
                  description:
                    "Solve real-world healthcare challenges using theoretical knowledge.",
                  icon: "/images/practical-applications-icon.png",
                },
              ].map((highlight, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <Card
                    sx={{
                      textAlign: "center",
                      py: 4,
                      height: "100%",
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={highlight.icon}
                      alt={highlight.title}
                      style={{
                        height: 60,
                        marginBottom: "16px",
                      }}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight="bold">
                        {highlight.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        {highlight.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>

        {/* Call-to-Action Section */}
        <Box
          sx={{
            py: 10,
            backgroundColor: "#007bff",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight="bold">
              Elevate Your Career with Our Executive MBA
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
              Seats are limited—enroll today!
            </Typography>
            <Button
              component={NextLink}
              href="/register"
              size="large"
              variant="contained"
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "#fff",
                color: "#007bff",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              Start Your Registration
            </Button>
          </Container>
        </Box>
      </Box>
    </>
  );
};

export default LandingPage;
