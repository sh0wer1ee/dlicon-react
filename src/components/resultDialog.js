import { React, useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import FileDownloadIcon from "@material-ui/icons/FileDownload";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import SelectAllIcon from "@material-ui/icons/SelectAll";
import IconButton from "@material-ui/core/IconButton";
import CopyToClipBoard from "react-copy-to-clipboard";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Tooltip from "@material-ui/core/Tooltip";
import Divider from "@material-ui/core/Divider";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { Grow } from "@material-ui/core";

const textDisplayStyle = {
  fontFamily: ['"Noto Sans SC"', "sans-serif"].join(","),
  fontSize: "1rem",
  fontWeight: 700,
};

const generateFabStyle = {
  position: "fixed",
  bottom: "6rem",
  right: "2rem",
  fontFamily: ['"Noto Sans SC"', "sans-serif"].join(","),
  fontSize: "0.85rem",
  fontWeight: 700,
};

const clearFabStyle = {
  position: "fixed",
  bottom: "2rem",
  right: "2rem",
  fontFamily: ['"Noto Sans SC"', "sans-serif"].join(","),
  fontSize: "0.85rem",
  fontWeight: 700,
};

export default function ResultDialog(props) {
  const [open, setOpen] = useState(false);
  const [openTip, setOpenTip] = useState(false);
  const [ngaChecked, setNgaChecked] = useState(true);
  const [selectOrderChecked, setSelectOrderChecked] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseTip = () => {
    setOpenTip(false);
  };

  const handleClickButton = () => {
    setOpenTip(true);
  };

  const handleNgaSwitchChange = (event) => {
    setNgaChecked(event.target.checked);
  };

  const handleOrderSwitchChange = (event) => {
    setSelectOrderChecked(event.target.checked);
  };

  const returnLinkText = (ngaChecked, selectOrderChecked) => {
    var tmpLinkList = props.linkList.slice();
    if (!selectOrderChecked) {
      tmpLinkList.sort((a, b) => (a.id > b.id ? 1 : -1));
    }
    return tmpLinkList
      .map((link) => {
        if (ngaChecked) {
          return link.ngaLink;
        } else {
          return link.giteeLink;
        }
      })
      .join("");
  };
  return (
    <div>
      <Grow in={props.isQueueNotFull}>
        <Fab
          variant="extended"
          color="primary"
          aria-label="selectall"
          onClick={() => {
            props.selectAll();
          }}
          style={generateFabStyle}
        >
          <SelectAllIcon />
          全选
        </Fab>
      </Grow>
      <Grow in={props.hasValueInQueue}>
        <Fab
          variant="extended"
          color="secondary"
          aria-label="clear"
          onClick={() => {
            props.clearAllSelected();
          }}
          style={generateFabStyle}
        >
          <DeleteForeverIcon />
          清空选择
        </Fab>
      </Grow>
      <Grow in={props.hasValueInQueue}>
        <Fab
          variant="extended"
          color="primary"
          aria-label="generate"
          onClick={() => {
            handleClickOpen();
            props.generateLinksFromList();
          }}
          style={clearFabStyle}
        >
          <FileDownloadIcon />
          生成图片链接
        </Fab>
      </Grow>

      <Dialog
        open={open}
        keepMounted
        onClose={handleClose}
        scroll="paper"
        fullWidth={true}
        maxWidth={"md"}
        aria-labelledby="result-dialog-slide-title"
        aria-describedby="result-dialog-slide-description"
      >
        <DialogTitle id="result-dialog-slide-title" style={textDisplayStyle}>
          {"生成图片链接"}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id="result-dialog-slide-description"
            style={textDisplayStyle}
          >
            {returnLinkText(ngaChecked, selectOrderChecked)}
          </DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={ngaChecked}
                  onChange={handleNgaSwitchChange}
                />
              }
              label="使用NGA图床"
            />
            <FormControlLabel
              control={
                <Switch
                  color="primary"
                  checked={selectOrderChecked}
                  onChange={handleOrderSwitchChange}
                />
              }
              label="按照选择顺序生成"
            />
          </FormGroup>
          <Tooltip
            arrow
            open={openTip}
            onClose={handleCloseTip}
            disableHoverListener
            placement="top"
            title="已复制至剪贴板!"
            style={textDisplayStyle}
          >
            <CopyToClipBoard
              text={returnLinkText(ngaChecked, selectOrderChecked)}
            >
              <IconButton
                disabled={props.linkList === ""}
                onClick={handleClickButton}
              >
                <AssignmentIcon />
              </IconButton>
            </CopyToClipBoard>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </div>
  );
}
