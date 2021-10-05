import React from 'react';
import ReactDOM from 'react-dom';
import ProductIdContext from '../../context.jsx';
import StylePicker from './StylePicker.jsx';
import AddToCart from './AddToCart.jsx';
import $ from 'jquery';
import '../../css/Styles.css';

class Styles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  static contextType = ProductIdContext;

  render() {
    let price;
    if (this.props.styles && this.props.styles[this.props.selectedStyleIndex].sale_price) {
      price = <h3><span style={{color: 'red', paddingRight: '0.5em', fontWeight: 'normal'}}>${Number(this.props.styles[this.props.selectedStyleIndex].sale_price)}</span><span style={{textDecorationLine: "line-through"}}>${Number(this.props.styles[this.props.selectedStyleIndex].original_price)}</span></h3>
    } else if (this.props.styles && !this.props.styles[this.props.selectedStyleIndex].sale_price) {
      price = <h3 style={{fontWeight: 'normal'}}>${Number(this.props.styles[this.props.selectedStyleIndex].original_price)}</h3>
    }

    if (!this.props.styles) {
      return null;
    } else {
      return (
        <div id={'styles-container'} data-testid={'styles-container'}>
          {price}
          <h3 className='style-title'>Style ></h3>
          <h3 className='style-title' style={{fontWeight: 'normal'}}>{this.props.styles[this.props.selectedStyleIndex].name}</h3>
          <StylePicker styles={this.props.styles} selectedStyleIndex={this.props.selectedStyleIndex} styleSelector={this.props.styleSelector} />
          <AddToCart styles={this.props.styles} selectedStyleIndex={this.props.selectedStyleIndex} skus={this.props.styles[this.props.selectedStyleIndex].skus} />
        </div>
      )
    }

  }
}

export default Styles;