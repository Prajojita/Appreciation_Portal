import {
  Box,
  Button,
  FormControl,
  Grid,
  Paper,
  Slider,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import React, { createRef, useCallback, useState } from "react";
import "./AppreciatePage.css";
import data from "../certificateData";
import { toPng } from "html-to-image";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

const StyledCertificate = styled(Paper)(({ theme }) => ({
  boxShadow: "0 0 5px #000",
  borderRadius: "0px",
  overflow: "hidden",
  position: "relative",
}));

const PositionedName = styled(Typography)(({ theme }) => ({
  fontFamily: "Staatliches",
  margin: "0",
  position: "absolute",
}));

const AppreciatePage = () => {
  const ref = createRef();

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    if (name === "" || message === "") {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "certificate.png";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log(err);
      });
  }, [ref]);

  const [certificateData, setCertificateData] = useState(data[0]);

  //Name field states
  const [name, setName] = useState("");
  const [nameLeftPostion, setNameLeftPostion] = useState(
    data[0].nameLeftPostion
  );
  const [nameTopPostion, setNameTopPostion] = useState(data[0].nameTopPostion);
  const [nameFont, setNameFont] = useState(data[0].nameFontSize);

  //Message field states
  const [message, setMessage] = useState("");
  const [messageLeftPostion, setMessageLeftPostion] = useState(
    data[0].messageLeftPostion
  );
  const [messageTopPostion, setMessageTopPostion] = useState(
    data[0].messageTopPostion
  );
  const [messageFont, setMessageFont] = useState(data[0].messageFontSize);

  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Box sx={{ height: "calc(100vh - 52px)" }}>
      <Grid
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
        container
        gap={8}
      >
        <Grid
          item
          xs={3}
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "center",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            className="wbScroll"
            elevation={6}
            sx={{
              height: "95%",
              overflow: "auto",
            }}
          >
            <Grid container gap={3} sx={{ padding: "2em 2em" }}>
              <Grid item xs={12}>
                <Typography sx={{ fontSize: "1rem", fontWeight: "500" }}>
                  Value Card Category
                </Typography>
                <FormControl sx={{ width: "100%" }} size="small">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={age}
                    onChange={handleChange}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Customer Centricity</MenuItem>
                    <MenuItem value={20}>Excellence</MenuItem>
                    <MenuItem value={30}>Integrity</MenuItem>
                    <MenuItem value={40}>Joy</MenuItem>
                    <MenuItem value={50}>Ownership</MenuItem>
                    <MenuItem value={60}>Partnership</MenuItem>
                    <MenuItem value={70}>People First</MenuItem>
                  </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <Typography sx={{ fontSize: "1rem", fontWeight: "500" }}>
                  Add Details
                </Typography>
                <FormControl sx={{ width: "100%" }}>
                  <Typography style={{ fontSize: "18px" }}>Name</Typography>
                  <TextField
                    variant="outlined"
                    sx={{ marginBottom: "0.4em" }}
                    InputProps={{ style: { height: "40px" } }}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Typography sx={{ fontSize: "11px" }}>Font Size</Typography>
                  <Slider
                    size="small"
                    key={"font"}
                    value={Number(nameFont)}
                    onChange={(e) => setNameFont(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                  <Typography sx={{ fontSize: "11px" }}>
                    Left Position
                  </Typography>
                  <Slider
                    size="small"
                    key={"left"}
                    min={0}
                    max={500}
                    value={Number(nameLeftPostion)}
                    onChange={(e) => setNameLeftPostion(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                  <Typography sx={{ fontSize: "11px" }}>
                    Top Position
                  </Typography>
                  <Slider
                    size="small"
                    key={"top"}
                    min={0}
                    max={500}
                    value={Number(nameTopPostion)}
                    onChange={(e) => setNameTopPostion(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl sx={{ width: "100%" }}>
                  <Typography style={{ fontSize: "18px" }}>Message</Typography>
                  <TextField
                    multiline
                    rows={3}
                    type={"text"}
                    sx={{ marginBottom: "0.4em" }}
                    variant="outlined"
                    InputProps={{ style: { height: "12vh" } }}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                  <Typography sx={{ fontSize: "11px" }}>Font Size</Typography>
                  <Slider
                    size="small"
                    key={"font"}
                    value={Number(messageFont)}
                    onChange={(e) => setMessageFont(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                  <Typography sx={{ fontSize: "11px" }}>
                    Left Position
                  </Typography>
                  <Slider
                    size="small"
                    key={"left"}
                    min={0}
                    max={500}
                    value={Number(messageLeftPostion)}
                    onChange={(e) => setMessageLeftPostion(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                  <Typography sx={{ fontSize: "11px" }}>
                    Top Position
                  </Typography>
                  <Slider
                    size="small"
                    key={"top"}
                    min={0}
                    max={500}
                    value={Number(messageTopPostion)}
                    onChange={(e) => setMessageTopPostion(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  disabled={name === "" || message === ""}
                  onClick={() => onButtonClick()}
                >
                  Download
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          sx={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledCertificate ref={ref}>
            <PositionedName
              style={{
                fontSize: `${nameFont}px`,
                left: `${nameLeftPostion}px`,
                top: `${nameTopPostion}px`,
              }}
            >
              {name}
            </PositionedName>
            <PositionedName
              style={{
                fontSize: `${messageFont}px`,
                left: `${messageLeftPostion}px`,
                top: `${messageTopPostion}px`,
              }}
            >
              {message}
            </PositionedName>
            <img
              height={"500px"}
              src={certificateData?.image}
              alt="Certificate"
            />
          </StyledCertificate>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppreciatePage;
