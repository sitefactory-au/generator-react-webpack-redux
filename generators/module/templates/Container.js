import React, {
  Component,
  PropTypes
} from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import HelloWorld from '../<%= prefix %>components/HelloWorld';

class <%= name %> extends Component {
  render() {
    const {actions} = this.props;
    return <HelloWorld actions={actions}/>;
  }
}

<%= name %>.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const props = {};
  return props;
}

function mapDispatchToProps(dispatch) {
  const actions = {};
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(mapStateToProps, mapDispatchToProps)(<%= name %>);
