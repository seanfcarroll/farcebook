import { RECEIVE_USERS, RECEIVE_USER } from '../actions/user_actions';
import { REMOVE_REQUEST } from '../actions/friends_actions'
import { RECEIVE_POST } from '../actions/posts_actions'
import _ from 'lodash';

const customizer = (objValue, srcValue) => {
  if (_.isArray(objValue)) {
    return srcValue;
  }
}

const UsersReducer = (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_USERS: {
      return _.merge({}, state, action.users)
    }
    case RECEIVE_USER: {
      return _.merge({}, state, { [action.user.id]: action.user} )
    }
    case REMOVE_REQUEST: {
      const newUsers = { [action.requester.id]: action.requester,
                          [action.receiver.id]: action.receiver}
      return _.mergeWith({}, state , newUsers, customizer);
    }
    case RECEIVE_POST: {
      let author = state[action.post.author_id]
      author.postIds.unshift(action.post.id)
      return _.merge({}, state, { [author.id]: author})
    }
    default:
      return state;
  }
}

export default UsersReducer;
