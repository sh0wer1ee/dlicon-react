import { React, Component } from "react";
import PropTypes from "prop-types";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

//import indexJson from "./data/index.json";
import IconGroup from "./components/iconGroup";
import ResultDialog from "./components/resultDialog";

const types = ["chara", "dragon", "weapon", "amulet"];
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
      iconList: [],
      linkList: [],
      type: "chara",
      loaded: false,
    };
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.generateLinksFromList = this.generateLinksFromList.bind(this);
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

  addToList(id) {
    var newIconList = this.state.iconList;
    newIconList.push(id);
    this.setState({ iconList: newIconList });
    console.log(newIconList);
  }

  removeFromList(id) {
    var newIconList = this.state.iconList;
    var index = newIconList.indexOf(id);
    if (index !== -1) {
      newIconList.splice(index, 1);
    }
    this.setState({ iconList: newIconList });
    console.log(newIconList);
  }

  generateLinksFromList(usingNgaLink, inSelectedOrder) {
    var iconList = this.state.iconList;

    var newLinkList = iconList.map((id) => {
      var type = types[parseInt(id[0] - 1)];
      return {
        id: id,
        giteeLink: `[img]${indexJson[type][id].path}[/img]`.replace(
          "./",
          "https://sh0wer1ee.gitee.io/dlicons/"
        ),
        ngaLink: `[img]${indexJson[type][id].nga_path}[/img]`,
      };
    });

    this.setState({ linkList: newLinkList });
  }

  render() {
    const handleChange = (event, newValue) => {
      this.setState({ value: newValue, type: types[newValue], iconList: [] });
    };

    return (
      this.state.loaded && (
        <ThemeProvider theme={theme}>
          <AppBar position="sticky">
            <Tabs
              value={this.state.value}
              onChange={handleChange}
              aria-label="icon tabs"
            >
              <Tab label="角色" style={textDisplayStyle} {...a11yProps(0)} />
              <Tab label="龙" style={textDisplayStyle} {...a11yProps(1)} />
              <Tab label="武器" style={textDisplayStyle} {...a11yProps(2)} />
              <Tab
                label="龙辉护符"
                style={textDisplayStyle}
                {...a11yProps(4)}
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
          <ResultDialog
            generateLinksFromList={this.generateLinksFromList}
            linkList={this.state.linkList}
          ></ResultDialog>
        </ThemeProvider>
      )
    );
  }
}

export default App;
