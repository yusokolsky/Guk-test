import React from "react";
import "./App.scss";
import ItemList from "./components/ItemList/ItemList";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
    };
    this.componentDidMount = this.componentDidMount.bind(this);
  }
  componentDidMount() {
    this.setState({
      products: require("./products.json"),
    });
  }

  render() {
    return <ItemList products={this.state.products} />;
  }
}
