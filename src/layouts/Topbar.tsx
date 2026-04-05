import { Button, Chip, Stack, Typography } from "@mui/material";
import { FiMenu } from "react-icons/fi";
import GlassCard from "../components/common/GlassCard";

interface TopbarProps {
  onOpenSidebar: () => void;
}

const Topbar = ({ onOpenSidebar }: TopbarProps) => {
  return (
    <GlassCard
      sx={{
        px: { xs: 1.4, md: 2 },
        py: { xs: 1.2, md: 1.5 },
        display: { xs: "flex", md: "none" },
        alignItems: "center",
        justifyContent: "space-between",
        gap: 1.5,
      }}
    >
      <Stack direction="row" alignItems="center" spacing={1.2}>
        <Button
          variant="outlined"
          onClick={onOpenSidebar}
          sx={{ display: { xs: "inline-flex", md: "none" } }}
          startIcon={<FiMenu size={14} />}
        >
          Menu
        </Button>
        <Stack spacing={0.2}>
          <Typography variant="subtitle2">DevCollab</Typography>
        </Stack>
      </Stack>

      <Stack
        direction="row"
        spacing={1}
        useFlexGap
        flexWrap="wrap"
        justifyContent="flex-end"
      >
        {/* <Chip size="small" label="UI Foundation" variant="outlined" /> */}
        <Chip size="small" label="Developer Mode" variant="outlined" />
      </Stack>
    </GlassCard>
  );
};

export default Topbar;
