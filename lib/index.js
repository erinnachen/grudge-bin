const React = require('react');
const ReactDOM = require('react-dom');

class GrudgeList extends React.Component {
  render () {
    return (
      <div className="GrudgeList">
        <h1>I Keep Grudges.</h1>
      </div>
    )
  }
}

ReactDOM.render(<GrudgeList/>, document.querySelector('.application'));
