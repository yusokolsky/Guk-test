import React from "react";
import "./Item.scss";
import declOfNum from "./../../util/endingDecloarition";

export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      unit: this.props.item.unit,
      unitAltSelected: false,
      unitFull: this.props.unitFull,
      priceRetail: this.props.item.priceRetailAlt,
      priceGold: this.props.item.priceGoldAlt,
      bonusAmount: Math.floor(
        Math.random() * Math.floor(this.props.item.priceRetailAlt)
      ),
      unitCount: 0,
    };

    this.handleUnitChange = this.handleUnitChange.bind(this);
    this.handleUnitCountRise = this.handleUnitCountRise.bind(this);
    this.handleUnitCountDown = this.handleUnitCountDown.bind(this);
    this.setUnitCount = this.setUnitCount.bind(this);
  }

  handleUnitChange() {
    this.setState({ unitAltSelected: !this.state.unitAltSelected }, () => {
      if (this.state.unitAltSelected) {
        this.setState({
          priceRetail: this.props.item.priceRetail,
          priceGold: this.props.item.priceGold,
        });
      } else {
        this.setState({
          priceRetail: this.props.item.priceRetailAlt,
          priceGold: this.props.item.priceGoldAlt,
        });
      }
    });
  }

  handleUnitCountRise() {
    this.setState({ unitCount: this.state.unitCount + 1 });
  }

  handleUnitCountDown() {
    if (this.state.unitCount !== 0)
      this.setState({ unitCount: this.state.unitCount - 1 });
  }

  setUnitCount(event) {
    if (event.target.value >= 0)
      this.setState({ unitCount: event.target.value });
  }

  render() {
    const {
      productId,
      primaryImageUrl,
      code,
      title,
      assocProducts,
      unitFull,
      unit,
      unitRatio,
      unitRatioAlt,
      unitAlt,
    } = this.props.item;

    return (
      <div className="item">
        <div id="products_section">
          <div className="products_page pg_0">
            <div className="product product_horizontal">
              <span className="product_code">Код: {parseInt(code)}</span>
              <div className="product_status_tooltip_container">
                <span className="product_status">Наличие</span>
              </div>
              <div className="product_photo">
                <a href="#" className="url--link product__link">
                  <img alt={title}
                    src={primaryImageUrl.replace(
                      /(\.[\w\d_-]+)$/i,
                      "_220x220_1$1"
                    )}
                  />
                </a>
              </div>
              <div className="product_description">
                <a href="#" className="product__link">
                  {title}
                </a>
              </div>
              <div className="product_tags hidden-sm">
                <p>Могут понадобиться:</p>
                {assocProducts.split(";").map((assocProduct, index) => (
                  <span key={index}>
                    {assocProduct.length > 1 && (
                      <a href="#" className="url--link" >
                        {assocProducts.split(";").length - 2 !== index
                          ? assocProduct + ","
                          : assocProduct + "."}
                      </a>
                    )}
                  </span>
                ))}
              </div>
              <div className="product_units">
                <div className="unit--wrapper">
                  <div
                    className={`unit--select ${
                      !this.state.unitAltSelected && "unit--active"
                    }`}
                    onClick={
                      this.state.unitAltSelected ? this.handleUnitChange : undefined
                    }
                  >
                    <p className="ng-binding">За {this.props.item.unitAlt}</p>
                  </div>
                  {this.props.item.unitAlt !== this.props.item.unit && (
                    <div
                      className={`unit--select ${
                        this.state.unitAltSelected && "unit--active"
                      }`}
                      onClick={
                        !this.state.unitAltSelected ? this.handleUnitChange : undefined
                      }
                    >
                      <p className="ng-binding">За {this.props.item.unit}</p>
                    </div>
                  )}
                </div>
              </div>
              <p className="product_price_club_card">
                <span className="product_price_club_card_text">
                  По карте
                  <br />
                  клуба
                </span>
                <span className="goldPrice">
                  {this.state.priceGold.toFixed(2).replace(".", ",")} ₽
                </span>
              </p>
              <p className="product_price_default">
                <span className="retailPrice">
                  {this.state.priceRetail.toFixed(2).replace(".", ",")} ₽
                </span>
              </p>
              {this.state.bonusAmount !== 0 && (
                <div className="product_price_points">
                  <p className="ng-binding">
                    Можно купить за {this.state.bonusAmount}{" "}
                    {declOfNum(this.state.bonusAmount, [
                      "балл",
                      "балла",
                      "баллов",
                    ])}
                  </p>
                </div>
              )}
              <div className="list--unit-padd" />
              <div className="list--unit-desc">
                <div className="unit--info">
                  <div className="unit--desc-i" />
                  <div className="unit--desc-t">
                    <p>
                      <span className="ng-binding">Продается {unitFull}:</span>
                      <span className="unit--infoInn">
                        {unitRatio} {unit} = {unitRatioAlt.toFixed(2)} {unitAlt}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="product__wrapper">
                <div className="product_count_wrapper">
                  <div className="stepper">
                    <input
                      className="product__count stepper-input"
                      type="number"
                      min={0}
                      value={this.state.unitCount}
                      onChange={this.setUnitCount}
                    />
                    <span
                      className="stepper-arrow up"
                      onClick={this.handleUnitCountRise}
                    />
                    <span
                      className="stepper-arrow down"
                      onClick={this.handleUnitCountDown}
                    />
                  </div>
                </div>
                <span
                  className="btn btn_cart"
                  data-url="/cart/"
                  data-product-id={productId}
                >
                  <svg
                    className="ic ic_cart"
                    viewBox="0 0 90 90"
                    style={{ width: "68%" }}
                  >
                    <path d="m14.571 16.381c.571 0 .952.381.952.952 0 .571-.381.952-.952.952-.571 0-.952-.381-.952-.952 0-.571.476-.952.952-.952m0-.952c-1.048 0-1.905.857-1.905 1.905 0 1.048.857 1.905 1.905 1.905 1.048 0 1.905-.857 1.905-1.905 0-1.048-.857-1.905-1.905-1.905" />
                    <path d="m7.905 16.381c.571 0 .952.381.952.952 0 .571-.381.952-.952.952-.571 0-.952-.381-.952-.952 0-.571.476-.952.952-.952m0-.952c-1.048 0-1.905.857-1.905 1.905 0 1.048.857 1.905 1.905 1.905 1.048 0 1.905-.857 1.905-1.905 0-1.048-.857-1.905-1.905-1.905" />
                    <path d="m16.476 14.476h-10.857l-.095-.381c0-.095-1.429-9.714-1.905-11.524-.381-1.524-3.333-1.429-3.333-1.429v-.952c.095 0 3.714-.286 4.286 2.19.381 1.714 1.619 9.333 1.81 11.143h10.1v.952" />
                    <path d="m4.095 3.048h15.238v.952h-15.238z" />
                    <path d="m5.05 10.667h12.381v.952h-12.381z" />
                    <path d="m16.476 11.619h.952l1.905-8.571h-.952l-1.905 8.571" />
                  </svg>
                  <span className="ng-binding">В корзину</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
