import { React, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModeIcon from "@mui/icons-material/Mode";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const Theme = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
  },
});

export default function MapBar(props) {
  const [draw, setDraw] = useState(false);

  const editDraw = (val) => {
    setDraw(val);
    return props.setDrawing(val);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <ThemeProvider theme={Theme}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <h1 className="headtitle4" style={{ padding: "0.5em 0 0 0" }}>
              Evaluation Map
            </h1>
            <Typography sx={{ flexGrow: 1 }}></Typography>
            <Button
              onClick={() => editDraw(!draw)}
              color="inherit"
              sx={{ backgroundColor: "#A5BF45", color: "black" }}
            >
              {draw ? "Cancel" : "Draw"}
              <ModeIcon sx={{ margin: "0 5px", fontSize: "20px" }} />
            </Button>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
    </Box>
  );
}
