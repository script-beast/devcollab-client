import { Box, Button, Stack, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { FiGithub, FiGlobe, FiLinkedin, FiMail, FiUser } from "react-icons/fi";
import GlassCard from "../common/GlassCard";
import PageHeader from "../common/PageHeader";

const DeveloperSection = () => {
  return (
    <Box component="section" id="developer" sx={{ display: "grid", gap: 1.6 }}>
      <PageHeader
        eyebrow="Meet The Developer"
        title="Built by a full-stack product engineer"
        description="Recruiter-friendly profile block for quick outreach."
      />

      <GlassCard sx={{ p: 1.8 }}>
        <Box
          sx={{
            display: "grid",
            gap: 1.3,
            gridTemplateColumns: {
              xs: "1fr",
              md: "1.1fr 1fr",
            },
            alignItems: "stretch",
          }}
        >
          <Stack spacing={0.85}>
            <Stack direction="row" spacing={0.7} alignItems="center">
              <Box
                sx={(theme) => ({
                  width: 34,
                  height: 34,
                  borderRadius: "50%",
                  display: "grid",
                  placeItems: "center",
                  color: theme.palette.primary.light,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.46)}`,
                  backgroundColor: alpha(theme.palette.primary.main, 0.18),
                })}
              >
                <FiUser size={15} />
              </Box>
              <Typography variant="h3" sx={{ fontSize: "1rem" }}>
                Ankit Prajapati
              </Typography>
            </Stack>

            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Open to full-stack roles focused on React, GraphQL, and
              product-led engineering.
            </Typography>

            {/* <Typography variant="caption" sx={{ color: "text.secondary" }}>
              
            </Typography> */}
          </Stack>

          <Stack spacing={0.75}>
            <Button
              variant="outlined"
              component="a"
              href="https://www.linkedin.com/in/aprajapati028/"
              target="_blank"
              rel="noreferrer"
              startIcon={<FiLinkedin size={14} />}
            >
              LinkedIn (aprajapati028)
            </Button>
            <Button
              variant="outlined"
              component="a"
              href="https://github.com/script-beast"
              target="_blank"
              rel="noreferrer"
              startIcon={<FiGithub size={14} />}
            >
              GitHub (script-beast)
            </Button>
            <Button
              variant="outlined"
              component="a"
              href="mailto:ankitkp028@gmail.com"
              startIcon={<FiMail size={14} />}
            >
              Mail (ankitkp028@gmail.com)
            </Button>
            <Button
              variant="outlined"
              component="a"
              href="https://aprajapati.vercel.app/"
              target="_blank"
              rel="noreferrer"
              startIcon={<FiGlobe size={14} />}
            >
              Portfolio (aprajapati.vercel.app)
            </Button>
          </Stack>
        </Box>
      </GlassCard>
    </Box>
  );
};

export default DeveloperSection;
