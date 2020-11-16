import React from "react";
import "./ItemList.scss";
import Item from "../Item/Item";

export default class ItemList extends React.Component {
  render() {
    return (
      <div className="item-page">
        {this.props.products.map((item, key) => (
          <Item item={item} key={key} />
        ))}
      </div>
    );
  }
}
