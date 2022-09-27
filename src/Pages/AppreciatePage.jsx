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

const StyledCertificate = styled(Paper)(({ theme }) => ({
  boxShadow: "0 0 5px #000",
  borderRadius: "10px",
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

  return (
    <Box>
      <Grid
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
        container
        gap={8}
      >
        <Grid item xs={3}>
          <Paper
            sx={{
              height: "90vh",
            }}
          >
            <Grid container gap={6} sx={{ padding: "1em" }}>
              <Grid item xs={12}>
                <FormControl>
                  <label>Recepient Name: </label>
                  <TextField onChange={(e) => setName(e.target.value)} />
                  <Typography>Font Size</Typography>
                  <Slider
                    key={"font"}
                    value={Number(nameFont)}
                    onChange={(e) => setNameFont(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                  <Typography>Left Position</Typography>
                  <Slider
                    key={"left"}
                    min={0}
                    max={500}
                    value={Number(nameLeftPostion)}
                    onChange={(e) => setNameLeftPostion(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                  <Typography>Top Position</Typography>
                  <Slider
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
                <FormControl>
                  <label>Message: </label>
                  <TextField onChange={(e) => setMessage(e.target.value)} />
                  <Typography>Font Size</Typography>
                  <Slider
                    key={"font"}
                    value={Number(messageFont)}
                    onChange={(e) => setMessageFont(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                  <Typography>Left Position</Typography>
                  <Slider
                    key={"left"}
                    min={0}
                    max={500}
                    value={Number(messageLeftPostion)}
                    onChange={(e) => setMessageLeftPostion(e.target.value)}
                    valueLabelDisplay="auto"
                  />
                  <Typography>Top Position</Typography>
                  <Slider
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
        <Grid item>
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
