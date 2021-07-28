import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import IconItem from "./iconItem";
import ResultDialog from "./resultDialog";

class IconGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconList: [],
      selectedIconList: [],
      linkList: [],
    };
    this.updateIconList = this.updateIconList.bind(this);
    this.toggleSelectedById = this.toggleSelectedById.bind(this);
    this.addToList = this.addToList.bind(this);
    this.removeFromList = this.removeFromList.bind(this);
    this.generateLinksFromList = this.generateLinksFromList.bind(this);
    this.clearAllSelected = this.clearAllSelected.bind(this);
  }

  componentDidMount() {
    this.updateIconList(this.props.iconJson);
  }

  updateIconList(iconJson) {
    let tmpIconList = [];
    for (var key in iconJson) {
      let icon = {
        uniqueId: key,
        ...iconJson[key],
        selected: false,
      };
      tmpIconList.push(icon);
    }
    this.setState({ iconList: tmpIconList });
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
    this.updateIconList(this.props.iconJson);
    this.setState({ selectedIconList: [], linkList: [] });
  }

  render() {
    return (
      <>
        <Grid
          container
          spacing={1}
          alignItems="flex-start"
          justifyContent="center"
        >
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
      </>
    );
  }
}

export default IconGroup;
