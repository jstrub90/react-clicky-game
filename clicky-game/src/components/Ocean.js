import React, { Component } from 'react';

class Ocean extends Component {
  render() {
    const fish = this.props.fish.map((item) =>
      <img className="thumb img-thumbnail"
        key={item.id}
        data-id={item.id}
        onClick={this.props.handleClick}
        src={item.image}
        alt={item.id}
      />
    );

    return (
      <main className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h1 className="h3 mt-4 mt-md-5 mb-4 mb-md-5 message">{this.props.message}</h1>
          </div>
        </div>
        <div className="row d-flex justify-content-center">
          <div className="image-container col-12 d-flex justify-content-center">
            {fish}
          </div>
        </div>
      </main>
    );
  }
}

export default Ocean;