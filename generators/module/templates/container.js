import { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as selectors from './selectors';
import * as actions from './actions';
import { createStructuredSelector } from 'reselect';
import { <%= name %> } from './components';

<%= name %>.propTypes = {
  actions: PropTypes.object.isRequired
};

function mapDispatchToProps(dispatch) {
  const actionMap = { actions: bindActionCreators(actions, dispatch) };
  return actionMap;
}

export default connect(  createStructuredSelector(selectors), mapDispatchToProps)(<%= name %>);