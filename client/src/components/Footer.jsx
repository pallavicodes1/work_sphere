import { Box, Container, Grid, Stack, Typography, IconButton, Divider, Link as MLink } from "@mui/material";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

const cols = [
  { title: "Product", links: ["Features", "Pricing", "Integrations", "Changelog", "Roadmap"] },
  { title: "Company", links: ["About", "Blog", "Careers", "Press", "Contact"] },
  { title: "Resources", links: ["Documentation", "Help Center", "API Reference", "Community", "Templates"] },
  { title: "Legal", links: ["Privacy Policy", "Terms of Service", "Cookie Policy", "Security"] },
];

export function Footer() {
  return (
    <Box sx={{ bgcolor: "#0b1220", color: "#94a3b8", pt: { xs: 8, md: 10 }, pb: 4 }}>
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
             
              <Typography sx={{ fontWeight: 700, fontSize: 22, color: "#fff", letterSpacing: "-0.02em" ,    fontFamily: "Inter, system-ui, -apple-system, sans-serif"}}>
                WorkSphere
              </Typography>
            </Stack>
            <Typography sx={{ fontSize: 15, color: "#94a3b8", mb: 3, maxWidth: 300, lineHeight: 1.6 ,    fontFamily: "Inter, system-ui, -apple-system, sans-serif"}}>
              Get Organized, Simplify Your Workflow, And Move Faster As a Team.
            </Typography>
            <Stack direction="row" spacing={1.5}>
              {[TwitterIcon, LinkedInIcon, GitHubIcon].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.06)",
                    color: "#94a3b8",
                    width: 40, height: 40,
                    borderRadius: "10px",
                    "&:hover": { bgcolor: "rgba(255,255,255,0.12)", color: "#fff" },
                  }}
                >
                  <Icon sx={{ fontSize: 18 }} />
                </IconButton>
              ))}
            </Stack>
          </Grid>

          {cols.map((c) => (
            <Grid key={c.title} size={{ xs: 6, md: 2 }}>
              <Typography sx={{ fontWeight: 600, color: "#fff", mb: 2, fontSize: 15, fontFamily: "Inter, system-ui, -apple-system, sans-serif" }}>
                {c.title}
              </Typography>
              <Stack spacing={1.25}>
                {c.links.map((l) => (
                  <MLink
                    key={l}
                    href="#"
                    underline="none"
                    sx={{ color: "#94a3b8", fontSize: 14, "&:hover": { color: "#fff" } }}
                  >
                    {l}
                  </MLink>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
        <Divider sx={{ my: 4, borderColor: "rgba(255,255,255,0.08)" }} />
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ alignItems: { xs: "flex-start", sm: "center" }, justifyContent: "space-between", }}
        >
          <Typography sx={{ fontSize: 13, color: "#64748b" ,     fontFamily: "Inter, system-ui, -apple-system, sans-serif"}}>
            © 2026 Task Manager. All rights reserved.
          </Typography>
          <Stack direction="row" spacing={3}>
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <MLink key={l} href="#" underline="none" sx={{ color: "#64748b", fontSize: 13, "&:hover": { color: "#fff" } }}>
                {l}
              </MLink>
            ))}
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
