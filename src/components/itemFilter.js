import { Component } from "react";
import {
  Grid,
  FormControl,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
} from "@material-ui/core";
import { filterType, filterParam } from "../data/params";

const textDisplayStyle = {
  fontFamily: ['"Noto Sans SC"', "sans-serif"].join(","),
  fontWeight: 700,
  fontSize: "0.85em",
};

class ItemFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Grid
          container
          spacing={1}
          alignItems="center"
          justify="center"
          wrap="wrap"
        >
          {filterType[this.props.type].map((filter) => {
            return (
              <Grid item key={filter.id}>
                <Paper
                  style={{
                    padding: 8,
                  }}
                >
                  <FormControl component="fieldset">
                    <FormLabel component="legend" style={textDisplayStyle}>
                      {filter.name}
                    </FormLabel>
                    <FormGroup aria-label="position" row>
                      {filterParam[filter.id].map((item) => {
                        return (
                          <FormControlLabel
                            key={item.id}
                            control={
                              <Checkbox
                                checked={this.props.filterData[
                                  filter.id
                                ].includes(item.id)}
                                onChange={() => {
                                  this.props.handleCheckBoxChanged(
                                    filter.id,
                                    item.id
                                  );
                                  this.props.updateIconList();
                                }}
                                name={item.name}
                                style={{
                                  ...textDisplayStyle,
                                  color: item.color,
                                }}
                                size="small"
                              />
                            }
                            label={
                              <Typography style={textDisplayStyle}>
                                {item.name}
                              </Typography>
                            }
                          />
                        );
                      })}
                    </FormGroup>
                  </FormControl>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </>
    );
  }
}

export default ItemFilter;
