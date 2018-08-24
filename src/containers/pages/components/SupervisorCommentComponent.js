import React from 'react';
import PropTypes from 'prop-types';
import './css/SupervisorCommentComponent.css';

class SupervisorCommentComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { supervisorComment: props.supervisorComment };
  }

  componentWillReceiveProps(props) {
    this.setState({ supervisorComment: props.supervisorComment });
  }

  render() {
    return (
      <div className="sup-comment">
        <span className="blue-text">Summary Comments by Supervisors:</span>
        <textarea onChange={event => this.props.onChange(event.target.value)} disabled={this.props.mode !== 'edit'}>{this.state.supervisorComment ? this.state.supervisorComment.trim() : ''}</textarea>
      </div>
    );
  }
}

SupervisorCommentComponent.defaultProps = {
  supervisorComment: null
};

SupervisorCommentComponent.propTypes = {
  supervisorComment: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired

};

export default SupervisorCommentComponent;
