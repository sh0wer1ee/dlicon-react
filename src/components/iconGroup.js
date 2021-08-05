import React, { Component } from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import IconItem from "./iconItem";
import ResultDialog from "./resultDialog";
import ItemFilter from "./itemFilter";
import { filterType, filterParam, idSubTable } from "../data/params";

const theme = createTheme({
  typography: {
    fontFamily: ['"Noto Sans SC"', "sans-serif"].join(","),
  },
});

class IconGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconList: [],
      selectedIconList: [],
      linkList: [],
      filterData: {},
      initialzed: false,
    };
    this.initializeIconList = this.initializeIconList.bind(this);
    this.initilizeFilterData = this.initilizeFilterData.bind(this);
    this.updateIconList = this.updateIconList.bind(this);
    this.checkMatchFilter = this.checkMatchFilter.bind(this);
    this.handleCheckBoxChanged = this.handleCheckBoxChanged.bind(this);
    this.toggleSelectedById = this.toggleSelectedById.bind(this);
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.generateLinksFromList = this.generateLinksFromList.bind(this);
    this.clearAllSelected = this.clearAllSelected.bind(this);
  }

  componentDidMount() {
    this.initializeIconList();
    this.initilizeFilterData();
    this.setState({ initialzed: true });
  }

  initializeIconList() {
    let tmpIconList = [];
    for (var key in this.props.iconJson) {
      let icon = {
        uniqueId: key,
        ...this.props.iconJson[key],
        selected: false,
      };
      tmpIconList.push(icon);
    }
    this.setState({ iconList: tmpIconList });
  }

  initilizeFilterData() {
    let tmpFilterData = {};
    for (var index in filterType[this.props.type]) {
      let element = filterType[this.props.type][index].id;
      tmpFilterData[element] = filterParam[element].map((item) => item.id);
    }
    this.setState({ filterData: tmpFilterData });
  }

  updateIconList() {
    let tmpIconList = [];
    let selected = false;
    for (var key in this.props.iconJson) {
      selected = this.state.selectedIconList.includes(key) ? true : false;
      if (
        selected ||
        this.checkMatchFilter(
          this.props.iconJson[key].id,
          this.state.filterData
        )
      ) {
        let icon = {
          uniqueId: key,
          ...this.props.iconJson[key],
          selected: selected,
        };
        tmpIconList.push(icon);
      }
    }
    this.setState({ iconList: tmpIconList });
  }

  checkMatchFilter(item, filterData) {
    if (item.startsWith("199")) {
      item = idSubTable[item];
    }
    for (var param in filterData) {
      switch (param) {
        case "chara_rarity": //10950402
          if (!filterData[param].includes(parseInt(item[3]))) {
            return false;
          }
          break;
        case "chara_weapon_type":
          if (!filterData[param].includes(parseInt(item[2]))) {
            return false;
          }
          break;
        case "chara_element":
          if (!filterData[param].includes(parseInt(item[5]))) {
            return false;
          }
          break;
        case "dragon_rarity": //20050310
          if (!filterData[param].includes(parseInt(item[3]))) {
            return false;
          }
          break;
        case "dragon_element":
          if (!filterData[param].includes(parseInt(item[5]))) {
            return false;
          }
          break;
        case "weapon_rarity": //30860403
          if (!filterData[param].includes(parseInt(item[3]))) {
            return false;
          }
          break;
        case "weapon_type":
          if (!filterData[param].includes(parseInt(item[2]))) {
            return false;
          }
          break;
        case "weapon_element":
          if (!filterData[param].includes(parseInt(item[5]))) {
            return false;
          }
          break;
        case "amulet_rarity": //40020001
          if (!filterData[param].includes(parseInt(item[3]))) {
            return false;
          }
          break;
        default:
          return false;
      }
    }
    return true;
  }

  handleCheckBoxChanged(type, value) {
    let tmpFilterData = this.state.filterData;
    var index = tmpFilterData[type].indexOf(value);
    if (index !== -1) {
      tmpFilterData[type].splice(index, 1);
    } else {
      tmpFilterData[type].push(value);
    }
    this.setState({ filterData: tmpFilterData });
  }

  toggleSelectedById(uniqueId) {
    let tmpIconList = this.state.iconList;
    let idx = tmpIconList.findIndex((x) => x.uniqueId === uniqueId);
    tmpIconList[idx].selected = !tmpIconList[idx].selected;
    this.setState({ iconList: tmpIconList });
  }

  addToList(id) {
    var newIconList = this.state.selectedIconList;
    newIconList.push(id);
    this.setState({ selectedIconList: newIconList });
    console.log(newIconList);
  }

  removeFromList(id) {
    var newIconList = this.state.selectedIconList;
    var index = newIconList.indexOf(id);
    if (index !== -1) {
      newIconList.splice(index, 1);
    }
    this.setState({ selectedIconList: newIconList });
    console.log(newIconList);
  }

  generateLinksFromList(usingNgaLink, inSelectedOrder) {
    var iconList = this.state.selectedIconList;
    var newLinkList = iconList.map((id) => {
      return {
        id: id,
        giteeLink: `[img]${this.props.iconJson[id].path}[/img]`.replace(
          "./",
          "https://sh0wer1ee.gitee.io/dlicons/"
        ),
        ngaLink: `[img]${this.props.iconJson[id].nga_path}[/img]`,
      };
    });

    this.setState({ linkList: newLinkList });
  }

  clearAllSelected() {
    let tmpIconList = this.state.iconList;
    tmpIconList = tmpIconList.map((item) => {
      return {
        ...item,
        selected: false,
      };
    });
    this.setState({
      iconList: tmpIconList,
      selectedIconList: [],
      linkList: [],
    });
  }

  render() {
    return (
      this.state.initialzed && (
        <ThemeProvider theme={theme}>
          <Grid
            container
            spacing={1}
            alignItems="flex-start"
            justifyContent="center"
          >
            <ItemFilter
              type={this.props.type}
              filterData={this.state.filterData}
              handleCheckBoxChanged={this.handleCheckBoxChanged}
              updateIconList={this.updateIconList}
            ></ItemFilter>
            {this.state.iconList.map((icon) => (
              <IconItem
                icon={icon}
                key={icon.uniqueId}
                uniqueId={icon.uniqueId}
                selected={icon.selected}
                toggleSelectedById={this.toggleSelectedById}
                addToList={this.addToList}
                removeFromList={this.removeFromList}
              />
            ))}
          </Grid>
          <ResultDialog
            generateLinksFromList={this.generateLinksFromList}
            clearAllSelected={this.clearAllSelected}
            linkList={this.state.linkList}
            hasValueInQueue={
              this.state.selectedIconList.length === 0 ? false : true
            }
          ></ResultDialog>
        </ThemeProvider>
      )
    );
  }
}

export default IconGroup;
