var Products = React.createClass({

  getInitialState: function() {
    return {
      setOne: false,
      setTwo: false,
      setThree: false,
      setFour: false
    }
  },

  showSet: function(set) {
    this.setState(set);
  },

  render: function() {

    return (
      <section className="products">
        <section>
          <p>Banaan</p>
          <img onClick={this.showSet.bind(this, {setOne: !this.state.setOne})} src="assets/img/banana1.jpg" />
          {this.state.setOne
            ? <div onClick={this.showSet.bind(this, {setOne: !this.state.setOne})}>
                <img src="assets/img/banana2.jpg" />
                <img src="assets/img/banana3.jpg" />
              </div>
            : null
          }
        </section>
        <section>
          <p>Berg</p>
          <img onClick={this.showSet.bind(this, {setTwo: !this.state.setTwo})} src="assets/img/berg1.jpg" />
          {this.state.setTwo
            ? <div onClick={this.showSet.bind(this, {setTwo: !this.state.setTwo})}>
                <img src="assets/img/berg2.jpg" />
                <img src="assets/img/berg3.jpg" />
              </div>
            : null
          }
        </section>
        <section>
          <p>Panter</p>
          <img onClick={this.showSet.bind(this, {setThree: !this.state.setThree})} src="assets/img/panter1.jpg" />
          {this.state.setThree
            ? <div onClick={this.showSet.bind(this, {setThree: !this.state.setThree})}>
                <img src="assets/img/panter2.jpg" />
                <img src="assets/img/panter3.jpg" />
              </div>
            : null
          }
        </section>
        <section>
          <p>Veer</p>
          <img onClick={this.showSet.bind(this, {setFour: !this.state.setFour})} src="assets/img/veer1.jpg" />
          {this.state.setFour
            ? <div onClick={this.showSet.bind(this, {setFour: !this.state.setFour})}>
                <img src="assets/img/veer2.jpg" />
                <img src="assets/img/veer3.jpg" />
              </div>
            : null
          }
        </section>
      </section>
    );

  }

});
