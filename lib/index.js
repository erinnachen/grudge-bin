const React = require('react');
const ReactDOM = require('react-dom');

class GrudgeList extends React.Component {
  render () {
    return (
      <div className="GrudgeList">
        <h1>I Keep Grudges.</h1>
        <CreateGrudge />
      </div>
    )
  }
}

class CreateGrudge extends React.Component {
  constructor () {
    super();
    this.state = {
      name: '',
      offense: '',
    };
  }

  updateProperties(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value })
  }

  render () {
    return (
      <div className="CreateGrudge">
        <input className="CreateGrudge-name"
               name="name"
               placeholder="Name"
               value={this.state.name}
               onChange={(e) => this.updateProperties(e)}
        />
        <textarea className="CreateGrudge-offense"
                  name="offense"
                  placeholder="He ate the last Oreo."
                  value={this.state.offense}
                  onChange={(e) => this.updateProperties(e)}
        />
        <input className="CreateGrudge-submit"
                  type="submit"
        />
      </div>
    )
  }
}


ReactDOM.render(<GrudgeList/>, document.querySelector('.application'));
