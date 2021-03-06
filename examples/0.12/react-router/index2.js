var StyleSheet = require('react-style');
var React = require('react');
var Router = require('react-router');
var { Route, DefaultRoute, RouteHandler, Link } = Router;

var App = React.createClass({
  getInitialState: function () {
    return { states: findStates() };
  },
  render: function () {
    var links = this.state.states.map(function (state) {
      return (
        <li key={state.abbr}>
          <Link
            to="state"
            params={{ abbr: state.abbr }}
          >{state.name}</Link>
        </li>
      );
    });
    return (
      <div styles={AppStyles.appStyle__DIFFERENT}>
        <ul styles={AppStyles.masterStyle}>
          {links}
        </ul>
        <div styles={AppStyles.detailStyle}>
          <RouteHandler/>
        </div>
      </div>
    );
  }
});

var AppStyles = StyleSheet.create({

  appStyleDIFFERENT: {
    position: 'absolute',
    top: 10,
    left: 0,
    right: 0,
    bottom: 0,
    width: 1000,
    height: 800
  },

  masterStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 200,
    overflow: 'auto',
    padding: '10px 40px'
  },

  detailStyle: {
    position: 'absolute',
    left: 300,
    top: 0,
    bottom: 0,
    right: 0,
    borderLeft: '1px solid #ccc',
    overflow: 'auto',
    padding: 40
  }
});

var Index = React.createClass({
  render: function () {
    return <p>Select a state from the left</p>;
  }
});

var State = React.createClass({
  mixins: [ Router.State ],

  imageUrl: function (name) {
    return "http://www.50states.com/maps/" + underscore(name) + ".gif";
  },

  render: function () {
    var unitedState = findState(this.getParams().abbr);
    return (
      <div className="State">
        <h1>{unitedState.name}</h1>
        <img src={this.imageUrl(unitedState.name)}/>
      </div>
    );
  }
});

var routes = (
  <Route handler={App}>
    <DefaultRoute handler={Index}/>
    <Route name="state" path="state/:abbr" handler={State}/>
  </Route>
);

Router.run(routes, function (Handler) {
  if (typeof window !== 'undefined') {
    React.render(<Handler/>, document.getElementById('example'));
  }
});

/*****************************************************************************/
// data stuff

function findState(abbr) {
  var states = findStates();
  for (var i = 0, l = states.length; i < l; i ++) {
    if (states[i].abbr === abbr) {
      return states[i];
    }
  }
}

function findStates() {
  return [
    { abbr: "AL", name: "Alabama"},
    { abbr: "AK", name: "Alaska"},
    { abbr: "AZ", name: "Arizona"},
    { abbr: "AR", name: "Arkansas"},
    { abbr: "CA", name: "California"},
    { abbr: "CO", name: "Colorado"},
    { abbr: "CT", name: "Connecticut"},
    { abbr: "DE", name: "Delaware"},
    { abbr: "FL", name: "Florida"},
    { abbr: "GA", name: "Georgia"},
    { abbr: "HI", name: "Hawaii"},
    { abbr: "ID", name: "Idaho"},
    { abbr: "IL", name: "Illinois"},
    { abbr: "IN", name: "Indiana"},
    { abbr: "IA", name: "Iowa"},
    { abbr: "KS", name: "Kansas"},
    { abbr: "KY", name: "Kentucky"},
    { abbr: "LA", name: "Louisiana"},
    { abbr: "ME", name: "Maine"},
    { abbr: "MD", name: "Maryland"},
    { abbr: "MA", name: "Massachusetts"},
    { abbr: "MI", name: "Michigan"},
    { abbr: "MN", name: "Minnesota"},
    { abbr: "MS", name: "Mississippi"},
    { abbr: "MO", name: "Missouri"},
    { abbr: "MT", name: "Montana"},
    { abbr: "NE", name: "Nebraska"},
    { abbr: "NV", name: "Nevada"},
    { abbr: "NH", name: "New Hampshire"},
    { abbr: "NJ", name: "New Jersey"},
    { abbr: "NM", name: "New Mexico"},
    { abbr: "NY", name: "New York"},
    { abbr: "NC", name: "North Carolina"},
    { abbr: "ND", name: "North Dakota"},
    { abbr: "OH", name: "Ohio"},
    { abbr: "OK", name: "Oklahoma"},
    { abbr: "OR", name: "Oregon"},
    { abbr: "PA", name: "Pennsylvania"},
    { abbr: "RI", name: "Rhode Island"},
    { abbr: "SC", name: "South Carolina"},
    { abbr: "SD", name: "South Dakota"},
    { abbr: "TN", name: "Tennessee"},
    { abbr: "TX", name: "Texas"},
    { abbr: "UT", name: "Utah"},
    { abbr: "VT", name: "Vermont"},
    { abbr: "VA", name: "Virginia"},
    { abbr: "WA", name: "Washington"},
    { abbr: "WV", name: "West Virginia"},
    { abbr: "WI", name: "Wisconsin"},
    { abbr: "WY", name: "Wyoming"}
  ];
}

function underscore(str) {
  return str.toLowerCase().replace(/ /, '_');
}