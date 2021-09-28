import React from 'react';

class GalleryThumbnail extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let url = this.props.thumbnailURL;
    console.dir(url);
    return (
      <div className={'gallery-thumbnail-container'} style={{backgroundImage: `url(${url}`}}></div>
    )
  }
}

export default GalleryThumbnail;