import { TextField, styled } from "@mui/material";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";
import { inputLabelClasses } from "@mui/material/InputLabel";

const CustomTextField = styled(TextField)({
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "var(--color-tertiary)",
  },
  [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
    borderColor: "var(--color-tertiary)",
  },
  [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "var(--color-secondary)",
    },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]:
    {
      borderColor: "var(--color-accent)",
    },
  [`& .${outlinedInputClasses.input}`]: {
    color: "var(--color-tertiary)",
  },
  [`&:hover .${outlinedInputClasses.input}`]: {
    color: "var(--color-tertiary)",
  },
  [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]:
    {
      color: "var(--color-accent)",
    },
  [`& .${inputLabelClasses.outlined}`]: {
    color: "var(--color-tertiary)",
  },
  [`&:hover .${inputLabelClasses.outlined}`]: {
    color: "var(--color-secondary)",
  },
  [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
    color: "var(--color-accent)",
  },
});

export default CustomTextField;
