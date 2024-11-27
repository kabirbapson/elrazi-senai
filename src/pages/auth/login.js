import Head from "next/head";
import NextLink from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";

const LandingPage = () => {
  return (
    <>
      <Head>
        <title>Executive MBA | Elrazi Medical University, Kano</title>
      </Head>
      <Box sx={{ backgroundColor: "background.default", minHeight: "100vh" }}>
        {/* Header Section */}
        <Box
          sx={{
            backgroundImage: 'url("/images/healthcare-global.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            color: "#fff",
            py: 10,
            textAlign: "center",
          }}
        >
          <Container maxWidth="lg">
            <Typography variant="h3" fontWeight="bold">
              A Global Partnership for Healthcare Leadership
            </Typography>
            <Typography variant="h5" sx={{ mt: 2 }}>
              Transform your career with our Executive MBA in Health Management Technology
            </Typography>
            <Button
              component={NextLink}
              href="#register"
              size="large"
              variant="contained"
              sx={{
                mt: 4,
                fontWeight: "bold",
                textTransform: "none",
                backgroundColor: "#007bff",
                "&:hover": { backgroundColor: "#0056b3" },
              }}
            >
              Register Now
            </Button>
          </Container>
        </Box>

        {/* About the Program Section */}
        <Box sx={{ py: 8 }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 4 }}>
              Why Choose Our Executive MBA in Health Management Technology?
            </Typography>
            <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
              Elrazi Medical University, in collaboration with SENAI-CIMATEC, Brazil's leading
              innovation institute, offers a groundbreaking postgraduate program. Designed for
              healthcare professionals, this Executive MBA equips you with advanced management
              skills, cutting-edge technology expertise, and invaluable global exposure.
            </Typography>
            <img
              src="/images/program-collaboration.jpg"
              alt="Program Collaboration"
              style={{
                width: "100%",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
              }}
            />
          </Container>
        </Box>

        {/* Program Highlights Section */}
        <Box sx={{ py: 8, backgroundColor: "background.paper" }}>
          <Container maxWidth="lg">
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 4 }}>
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
                      boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={highlight.icon}
                      alt={highlight.title}
                      style={{ height: 50, marginBottom: "16px" }}
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

        {/* Who Should Apply Section */}
        <Box sx={{ py: 8 }}>
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight="bold" textAlign="center" sx={{ mb: 4 }}>
              Is This Program for You?
            </Typography>
            <Stack spacing={2}>
              <Typography variant="body1" color="text.secondary">
                • Healthcare professionals aiming to advance their careers.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                • Recent graduates in health sciences.
              </Typography>
              <Typography variant="body1" color="text.secondary">
                • Employers (hospitals, NGOs, MDAs, NMA) seeking workforce development.
              </Typography>
            </Stack>
          </Container>
        </Box>

        {/* Call-to-Action Section */}
        <Box
          sx={{
            py: 8,
            backgroundColor: "#007bff",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <Container maxWidth="md">
            <Typography variant="h4" fontWeight="bold">
              Elevate Your Career and Shape the Future of Healthcare
            </Typography>
            <Typography variant="h6" sx={{ mt: 2, mb: 4 }}>
              Seats are limited, so don’t miss this opportunity!
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
