import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h5"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              About Us
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              We offer you the best online resume builder and free professional
              advice from career experts. We’ll guide you through the entire
              recruitment process all the way to your dream job.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={2}>
          <img
        src="/resources/about-us-750@3x.jpg"
        alt="about_img"
        loading="lazy"
        height="500px"
      />
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Since 2023, Resumate has helped millions of job seekers worldwide find
              employment. With a rapidly growing community of more than 40
              million readers a year, Resumate is arguably the world’s fastest
              growing career advice website. Each day, we help thousands of
              people write resumes and cover letters, and improve their chances
              of landing a job. Resumate is powered by a team of 10 career experts
              featured in Forbes, the Financial Times, CareerBuilder, and
              Glassdoor, among others.
            </Typography>
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: "background.paper", p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
      {/* End footer */}
    </ThemeProvider>
  );
}
