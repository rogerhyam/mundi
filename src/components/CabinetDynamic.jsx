import React from "react";
import CabinetDropTarget from "./CabinetDropTarget";
import DraggableTypes from "./DraggableTypes";

class CabinetDynamic extends CabinetDropTarget {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleDragEnter = e => {
    this.setState({ style: this.styleFocussed });
  };

  handleDragLeave = e => {
    this.setState({ style: this.styleBlurred });
  };

  handleDragOver = e => {
    e.preventDefault();
  };

  handleDrop = e => {
    console.log("dropped on cabinet");
    e.preventDefault(); // no other behaviour
    e.stopPropagation(); // don't get other components to fire

    // we lose focus on the drop no matter what
    this.setState({ style: this.styleBlurred });

    switch (e.dataTransfer.getData("type")) {
      case DraggableTypes.FOLDER:
        console.log("Folder dropped");
        // FIXME - Add specimen to folder!!
        break;
      case DraggableTypes.CABINET:
        console.log("Cabinet dropped");
        // FIXME - Add specimen to folder!!
        break;
      default:
        return false;
    }
  };

  render() {
    return (
      <li
        style={this.state.style}
        draggable={true}
        onDragEnter={e => this.handleDragEnter(e)}
        onDragLeave={e => this.handleDragLeave(e)}
        onDrop={e => this.handleDrop(e)}
        onDragOver={e => this.handleDragOver(e)}
      >
        <span role="img" aria-label="Search">
          🗄️
        </span>
        {this.props.title} {this.getFolderList()}{" "}
      </li>
    );
  }
  getFolderList = () => {
    if (this.props.children.length < 1) return "";
    return <ul style={this.folderListStyle}>{this.props.children}</ul>;
  };
}

export default CabinetDynamic;
