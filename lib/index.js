const React = require('react');
const ReactDOM = require('react-dom');
const store = require('./data-store');

require('./reset.css');
require('./grudges.css');

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
        <SearchGrudge />
        <CreateGrudge />
        <GrudgesListStats grudges={this.state.grudges}/>
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

const GrudgesListItem = (grudge) => {
  const updateGrudgeStatus = (e) => {
    let updatedStatus = "forgiven";
    if (grudge.status !== "not forgiven") {
      updatedStatus = "not forgiven";
    }
    store.update(grudge.id, {status: updatedStatus});
  }

  return (
    <div className={grudge.status === "not forgiven" ? 'IdeasListItem not-forgiven' : 'IdeasListItem forgiven'}>
      <h3 className="GrudgesListItem-name">{grudge.name}</h3>
      <div className="GrudgesListItem-offense">{grudge.offense}</div>
      <br/>
      <div>Status: {grudge.status}</div>
      <button className={grudge.status === "not forgiven" ? 'btn not-forgiven-btn' : 'btn forgiven-btn'} onClick={updateGrudgeStatus}>{grudge.status === "not forgiven" ? 'Forgive '+grudge.name+'?' : 'Put '+ grudge.name+' back on the Grudge list.'}</button>
    </div>
  );
};

const GrudgesListStats = ({ grudges }) => {
  const total = grudges.length;
  const unforgiven = grudges.filter(function(grudge) {return grudge.status === 'not forgiven'}).length;
  const forgiven = grudges.filter(function(grudge) {return grudge.status !== 'not forgiven'}).length;
  return (
    <div className="GrudgesListStats">
      <div>Total Grudges: {total}</div>
      <div>Unforgiven: {unforgiven}</div>
      <div>Back in your graces: {forgiven}</div>
    </div>
  );
};

class SearchGrudge extends React.Component {
  constructor () {
    super();
    this.state = {
      field: '',
    };
  }

  updateSearch(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
    store.filterGrudges(value);
  }

  render () {
    return (
      <div className ="SearchGrudges">
        <input className="SearchGrudge-field"
               name="field"
               placeholder="Search Grudges"
               value={this.state.field}
               onChange={(e) => this.updateSearch(e)}
        />
      </div>
    );
  };
}

ReactDOM.render(<GrudgeBox/>, document.querySelector('.application'));
