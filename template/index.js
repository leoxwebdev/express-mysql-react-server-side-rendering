var React = require('react');
var Bootstrap = require('react-bootstrap');

var BootInput = React.createClass({
  getInitialState: function() {
    return {
      value: this.props.value
    };
  },
  validationState: function() {
    var length = this.state.value.length;
    if (length > 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  },
  handleChange: function() {
    this.setState({
      value: this.refs.input.getValue()
    });
  },

  render: function() {
    return (
        <Bootstrap.Input
          type="text"
          value={this.state.value}
          placeholder="Enter Your Mail Address"
          label="メールアドレス"
          help="need more than 10bite."
          bsStyle={this.validationState()}
          hasFeedback
          ref="input"
          groupClassName="group-class"
          wrapperClassName="wrapper-class"
          labelClassName="label-class"
          onChange={this.handleChange}/>
    );
  }
});

var App = React.createClass({
	getInitialState(){
		return {
			//デフォルト
			user:this.props.user
		};
	},
	componentDidMount(){
		this.setState({
			//初期読込
		})
	},
	render(){
		return (
      <div className="col-sm-3">
			 <BootInput value={this.state.user.email}/>
      </div>
		);
	}
});

module.exports = App;