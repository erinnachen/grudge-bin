const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store')

class GrudgeBox extends React.Component {
  constructor() {
    super();
    this.state = {
      grudges: store.all()
    };
  }

  componentDidMount() {
    store.on('change', grudges => {
      this.setState({ grudges });
    });
  }

  render () {
    return (
      <div className="GrudgeBox">
        <h1>I Keep Grudges.</h1>
        <CreateGrudge />
        <GrudgesList grudges={this.state.grudges}/>
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

  createGrudge(e) {
    e.preventDefault();
    store.create(this.state);
    this.setState( {name: '', offense: ''});
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
               onClick={(e) => this.createGrudge(e)}
        />
      </div>
    )
  }
}

const GrudgesList = ({ grudges }) => {
  return (
    <div className="GrudgesList">
      {grudges.map(grudge => <GrudgesListItem {...grudge} key={grudge.id}/>)}
    </div>
  );
};

const GrudgesListItem = ({id, name, offense, status}) => {
  return (
    <div className="GrudgesListItem">
      <h3 className="GrudgesListItem-name">{name}</h3>
      <div className="GrudgesListItem-offense">{offense}</div>
    </div>
  );
};


ReactDOM.render(<GrudgeBox/>, document.querySelector('.application'));
