var Layout = React.createClass({

  render: function() {

    return (
      <main>
        <Header />
        {this.props.children}
        <Footer />
      </main>
    );

  }

});
