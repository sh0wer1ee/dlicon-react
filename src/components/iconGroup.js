import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import IconItem from "./iconItem";

class IconGroup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconList: [],
    };
    this.updateIconList = this.updateIconList.bind(this);
    this.toggleSelectedById = this.toggleSelectedById.bind(this);
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

  render() {
    const { addToList, removeFromList } = this.props;

    return (
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
            addToList={addToList}
            removeFromList={removeFromList}
          />
        ))}
      </Grid>
    );
  }
}

export default IconGroup;
