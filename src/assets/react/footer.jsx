var Footer = React.createClass({

  render: function() {

    var currentYear = new Date().getFullYear();

    return (
      <footer>
        <p>&copy; {currentYear} Artisoks</p>
      </footer>
    );

  }

});
