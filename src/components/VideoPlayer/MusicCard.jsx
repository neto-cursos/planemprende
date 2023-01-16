import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography
} from "@mui/material";

import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { styled } from '@mui/material/styles';

const estilos = styled(({theme}) => ({
  card:{display: "flex"},
  details: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    flex: "1 0 auto"
  },
  cover: {
    width: 151
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing.unit,
    paddingBottom: theme.spacing.unit
  },
  playIcon: {
    height: 38,
    width: 38
  }
}));

const MusicCard=({...props})=>{

  return (
    <Card sx={estilos.card}>
      <div className={estilos.details}>
        <CardContent className={estilos.content}>
          <Typography component="h5" variant="h5">
            {props.data.title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {props.data.artist}
          </Typography>
          <iframe
            id="video"
            width={props.playerW}
            height={props.playerH}
            src={"https://www.youtube.com/embed/" + props.data.videoId}
            frameBorder="0"
            allow="accelerometer, autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </CardContent>
        <div className={estilos.controls}>
          <IconButton aria-label="Previous" onClick={() => props.next("prev")}>
            {/* {theme.direction === "rtl" ? (
              <SkipNextIcon />
            ) : ( */}
              <SkipPreviousIcon />
            {/* )} */}
          </IconButton>
          <IconButton aria-label="Play/pause">
            <PlayArrowIcon
              className={estilos.playIcon}
              onClick={() => props.play()}
            />
          </IconButton>
          <IconButton aria-label="Next" onClick={() => props.next("next")}>
            {/* {theme.direction === "rtl" ? ( */}
              {/* <SkipPreviousIcon />
            ) : ( */}
              <SkipNextIcon />
            {/* )} */}
          </IconButton>
        </div>
      </div>
      <CardMedia
        className={estilos.cover}
        image="/static/images/cards/live-from-space.jpg"
        title="Live from space album cover"
      />
    </Card>
  );
}

MusicCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default MusicCard;
