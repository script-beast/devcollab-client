import { InputAdornment, TextField } from "@mui/material";
import { FiSearch } from "react-icons/fi";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const SearchBar = ({
  value,
  onChange,
  placeholder = "Search by title, label, assignee...",
}: SearchBarProps) => {
  return (
    <TextField
      fullWidth
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <FiSearch size={15} />
            </InputAdornment>
          ),
        },
      }}
      sx={(theme) => ({
        "& .MuiOutlinedInput-root": {
          backgroundColor: theme.palette.glass.background,
          borderRadius: theme.shape.borderRadius,
          backdropFilter: theme.palette.glass.blur,
        },
      })}
    />
  );
};

export default SearchBar;
