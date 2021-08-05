import { React, Component } from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconGroup from "./components/iconGroup";
import { types } from "./data/params";

var indexJson = {};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const theme = createTheme({
  tab: {
    fontFamily: ['"Noto Sans SC"', "sans-serif"].join(","),
    fontSize: "0.85rem",
    fontWeight: 700,
  },
  typography: {
    fontFamily: ['"Noto Sans SC"', "sans-serif"].join(","),
  },
});

const textDisplayStyle = {
  fontFamily: ['"Noto Sans SC"', "sans-serif"].join(","),
  fontSize: "1rem",
  fontWeight: 700,
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: 0,

      type: "chara",
      loaded: false,
    };
  }

  componentDidMount() {
    fetch("./index.json")
      .then((res) => res.json())
      .then(
        (result) => {
          indexJson = result;
          this.setState({ loaded: true });
        },
        (error) => {
          console.log(error);
        }
      );
  }

  render() {
    const handleChange = (event, newValue) => {
      this.setState({
        value: newValue,
        type: types[newValue].id,
      });
    };

    return (
      this.state.loaded && (
        <ThemeProvider theme={theme}>
          <AppBar position="sticky" color="default">
            <Tabs
              value={this.state.value}
              onChange={handleChange}
              aria-label="icon tabs"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab
                label={types[0].name}
                style={textDisplayStyle}
                {...a11yProps(0)}
              />
              <Tab
                label={types[1].name}
                style={textDisplayStyle}
                {...a11yProps(1)}
              />
              <Tab
                label={types[2].name}
                style={textDisplayStyle}
                {...a11yProps(2)}
              />
              <Tab
                label={types[3].name}
                style={textDisplayStyle}
                {...a11yProps(3)}
              />
            </Tabs>
          </AppBar>
          <TabPanel value={this.state.value} index={0}>
            <IconGroup
              iconJson={indexJson["chara"]}
              type={this.state.type}
              addToList={this.addToList}
              removeFromList={this.removeFromList}
            />
          </TabPanel>
          <TabPanel value={this.state.value} index={1}>
            <IconGroup
              iconJson={indexJson["dragon"]}
              type={this.state.type}
              addToList={this.addToList}
              removeFromList={this.removeFromList}
            />
          </TabPanel>
          <TabPanel value={this.state.value} index={2}>
            <IconGroup
              iconJson={indexJson["weapon"]}
              type={this.state.type}
              addToList={this.addToList}
              removeFromList={this.removeFromList}
            />
          </TabPanel>
          <TabPanel value={this.state.value} index={3}>
            <IconGroup
              iconJson={indexJson["amulet"]}
              type={this.state.type}
              addToList={this.addToList}
              removeFromList={this.removeFromList}
            />
          </TabPanel>
        </ThemeProvider>
      )
    );
  }
}

export default App;
