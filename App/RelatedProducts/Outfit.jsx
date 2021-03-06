import React from 'react';
import OutfitProduct from './OutfitProduct.jsx';
import ProductIdContext from '../context.jsx';
import {BiChevronLeftSquare, BiChevronRightSquare, BiLeftArrow, BiRightArrow} from 'react-icons/bi';import {FaPlus} from 'react-icons/fa';

class Outfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      outfit: [],
      carouselStart: 0
    };
    this.getOutfit = this.getOutfit.bind(this);
    this.loadOutfit = this.loadOutfit.bind(this);
    this.addToOutfit = this.addToOutfit.bind(this);
    this.removeFromOutfit = this.removeFromOutfit.bind(this);
    this.createOutfitStorage = this.createOutfitStorage.bind(this);
    this.moveLeft = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
    this.renderLeftButton = this.renderLeftButton.bind(this);
    this.renderRightButton = this.renderRightButton.bind(this);
  }

  static contextType = ProductIdContext;

  componentDidMount() {
    this.createOutfitStorage();
    this.getOutfit();
  }

  //Creates localStorage arr for outfit if none currently exists
  createOutfitStorage() {
    if(!localStorage.outfit) {
      localStorage.outfit = JSON.stringify([]);
    }
    return;
  }

  //Retrieves outfit from localStorage
  getOutfit() {
    let storedOutfit = JSON.parse(localStorage.outfit);
    this.setState({
      outfit: storedOutfit
    });
  }

  //Appends new productID from context to outfit. Calls getoutfit to update state and rerender.
  addToOutfit() {
    let currentOutfit = this.state.outfit;
    let newProduct = JSON.parse(this.context());

    if (!currentOutfit.includes(newProduct)){
      currentOutfit.push(newProduct);
      localStorage.outfit = JSON.stringify(currentOutfit);
      this.getOutfit();
    }
  }


  //Removes productID from outfit
  removeFromOutfit(target) {
    let currentOutfit = this.state.outfit;
    // let targetProduct = JSON.parse(this.context);

    if (currentOutfit.includes(target)){
      //remove target product from outfit list
      currentOutfit = currentOutfit.filter((item) => {
        return item !== target;
      })
      localStorage.outfit = JSON.stringify(currentOutfit);
      this.getOutfit();
    }
  }

  loadOutfit() {
    if (this.state.outfit.length > 0) {
      let start = this.state.carouselStart;
      let end = start + 3;
      return (
        this.state.outfit.slice(start, end).map(item => {
          return <OutfitProduct id={item} key={item} remove={this.removeFromOutfit}/>;
        })
      );
    }
  }

  moveLeft() {
    var currentStart = this.state.carouselStart;
    if (currentStart > 0) {
      currentStart = currentStart - 1;
      this.setState({
        carouselStart: currentStart
      })
    }
  }

  moveRight() {
    var currentStart = this.state.carouselStart;
    if (currentStart < this.state.outfit.length - 3) {
      currentStart = currentStart + 1;
      this.setState({
        carouselStart: currentStart
      })
    }
  }

  renderLeftButton() {
    if(this.state.carouselStart > 0) {
      return (
        <div>
          <BiLeftArrow className="trackable-relatedProducts" id="scroll-icon-left-outfit" onClick={this.moveLeft} size={40}/>
        </div>
      )
    }
}

renderRightButton() {
    if(this.state.carouselStart < this.state.outfit.length - 3) {
      return (
        <div>
          <BiRightArrow className="trackable-relatedProducts" id="scroll-icon-right" onClick={this.moveRight} size={40}/>
        </div>
      )
    }
}

  render() {
    return (
      <div className="related-products">
        {this.renderRightButton()}
        {this.renderLeftButton()}
        <h1 className="related-title" data-testid={'outfit-window'}>Your Outfit</h1>
        <div id="outfit-window">
          <div id="add-outfit-card">
            <p>Add To Your Outfit</p><br/>
            <p id="add-outfit-icon" onClick={this.addToOutfit} className='trackable-Outfit'><FaPlus size={50}/></p>
          </div>
          {this.loadOutfit()}
        </div>

      </div>
    );
  }
}

export default Outfit;