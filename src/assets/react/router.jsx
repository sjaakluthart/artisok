routie({

  '': function() {
    ReactDOM.render(
      <Layout>
        <Home />
      </Layout>,
      document.getElementById('app')
    );
  },

  'products': function() {
    ReactDOM.render(
      <Layout>
        <Products />
      </Layout>,
      document.getElementById('app')
    );
  }

});
