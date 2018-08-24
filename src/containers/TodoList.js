import { connect } from 'react-redux';
import Todo from '../components/Todo';

const mapStateToProps = state => ({
  todos: state.todo
});

export default connect(mapStateToProps)(Todo);
