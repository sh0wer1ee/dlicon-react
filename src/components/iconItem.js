import { React } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: 120,
  },
  iconAdded: {
    backgroundColor: "#006699",
  },
  Icon: {
    margin: "auto",
    height: 120,
    width: 120,
  },
  iconNameArea: {
    padding: 0,
    height: "3em",
  },
  iconName: {
    width: "100%",
    height: "100%",
    margin: "auto",
    textAlign: "center",
    fontSize: "0.85rem",
    padding: 0,
    fontWeight: 700,
    lineHeight: 1.2,
  },
});

function IconItem(props) {
  const {
    icon,
    uniqueId,
    addToList,
    removeFromList,
    selected,
    toggleSelectedById,
  } = props;
  const classes = useStyles();
  return (
    <Grid item>
      <Card className={clsx(classes.root, selected && classes.iconAdded)}>
        <CardActionArea
          onClick={() => {
            if (!selected) {
              //console.log(added, "added.");
              toggleSelectedById(uniqueId);
              addToList(uniqueId);
            } else {
              //console.log(added, "removed.");
              toggleSelectedById(uniqueId);
              removeFromList(uniqueId);
            }
          }}
        >
          <CardMedia
            className={classes.Icon}
            component="img"
            image={icon.path.replace("/s/", "/l/")}
            title={icon.name}
          />
          <CardContent className={classes.iconNameArea}>
            <Typography
              className={classes.iconName}
              style={{ whiteSpace: "pre-line" }}
            >
              {icon.name.replace("（", "\n（")}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export default IconItem;
