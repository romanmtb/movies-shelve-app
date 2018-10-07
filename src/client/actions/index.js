import * as actionTypes from '../constants';
import * as utilRequest from '../utils';

export const init = payload => dispatch => {
  dispatch({ type: actionTypes.APP_INIT, payload });
};

export const searchByName = name => dispatch => {
  dispatch({ type: actionTypes.SEARCH_BY_NAME_PENDING });
  utilRequest
    .searchByName(name)
    .then(result =>
      dispatch({
        type: actionTypes.SEARCH_BY_NAME_SUCCESS,
        payload: result.data,
      })
    )
    .catch(error =>
      dispatch({ type: actionTypes.SEARCH_BY_NAME_ERROR, error })
    );
};

export const searchByActor = actor => dispatch => {
  dispatch({ type: actionTypes.SEARCH_BY_ACTOR_PENDING });
  utilRequest
    .searchByActor(actor)
    .then(result =>
      dispatch({
        type: actionTypes.SEARCH_BY_ACTOR_SUCCESS,
        payload: result.data,
      })
    )
    .catch(error =>
      dispatch({ type: actionTypes.SEARCH_BY_ACTOR_ERROR, error })
    );
};

export const sortDown = () => dispatch =>
  dispatch({ type: actionTypes.SORT_TITLE_DOWN });
export const sortUp = () => dispatch =>
  dispatch({ type: actionTypes.SORT_TITLE_UP });

export const movieGetAll = () => dispatch => {
  dispatch({ type: actionTypes.MOVIE_GET_ALL_PENDING });
  utilRequest
    .getAllRequest()
    .then(result =>
      dispatch({
        type: actionTypes.MOVIE_GET_ALL_SUCCESS,
        movie: result.data,
      })
    )
    .catch(error =>
      dispatch({ type: actionTypes.MOVIE_GET_ALL_ERROR, payload: error })
    );
};

export const movieAddNew = body => dispatch => {
  dispatch({ type: actionTypes.MOVIE_ADD_NEW_PENDING, body });
  utilRequest
    .addNewRequest(body)
    .then(result =>
      dispatch({
        type: actionTypes.MOVIE_ADD_NEW_SUCCESS,
        payload: result.data,
      })
    )
    .catch(error =>
      dispatch({ type: actionTypes.MOVIE_ADD_NEW_ERROR, payload: error })
    );
};

export const movieDelete = id => dispatch => {
  dispatch({ type: actionTypes.MOVIE_DELETE_PENDING, id });
  utilRequest
    .movieDeleteRequest(id)
    .then(
      /*result*/ () =>
        dispatch({
          type: actionTypes.MOVIE_DELETE_SUCCESS,
          payload: id,
        })
    )
    .catch(error =>
      dispatch({ type: actionTypes.MOVIE_DELETE_ERROR, payload: error })
    );
};
