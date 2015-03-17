var React = require('react'),
    App   = require('./index')
;

var data = JSON.parse(document.getElementById('initial-data').getAttribute('data-json'));
React.render(<App user={data}/>, document.getElementById("app"));