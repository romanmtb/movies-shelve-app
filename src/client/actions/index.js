import * as actionTypes from '../constants';
import * as utilRequest from '../utils';

export const addTodo = payload => dispatch => {
  dispatch({ type: actionTypes.AddTodo, payload });
};

export const init = payload => dispatch => {
  dispatch({ type: actionTypes.APP_INIT, payload });
};
export const movieGetAll = () => dispatch => {
  dispatch({ type: actionTypes.MOVIE_GET_ALL_PENDING });

  utilRequest
    .getAllRequest()
    .then(result => {
      console.log('+++', result.data);
      dispatch({ type: actionTypes.MOVIE_GET_ALL_SUCCESS, movie: result.data });
    })
    .catch(error => {
      console.log('!!!!', error);
      dispatch({ type: actionTypes.MOVIE_GET_ALL_ERROR, error });
    });
};
export const movieGetById = id => dispatch => {
  dispatch({ type: actionTypes.MOVIE_GET_BY_ID_PENDING, id });

  utilRequest
    .getByIdRequest(id)
    .then(result => {
      console.log('GETBY ID ACTION', result.data);
      dispatch({
        type: actionTypes.MOVIE_GET_BY_ID_SUCCESS,
        movie: result.data,
      });
    })
    .catch(error =>
      // dispatch({ type: actionTypes.MOVIE_GET_BY_ID_ERROR, error})
      dispatch({ type: actionTypes.MOVIE_GET_BY_ID_ERROR, movie: {} })
    );
};
export const movieAddNew = body => dispatch => {
  dispatch({ type: actionTypes.MOVIE_ADD_NEW_PENDING, body });
  console.log('movieAddNew ACTION', body);

  utilRequest
    .addNewRequest(body)
    .then(result => {
      console.log(
        'add new fine request:',
        result.data.message,
        ' |status|',
        result.data.status
      );

      dispatch({ type: actionTypes.MOVIE_ADD_NEW_SUCCESS, movie: result.data });
    })
    .catch(error => dispatch({ type: actionTypes.MOVIE_ADD_NEW_ERROR, error }));
};
export const movieDelete = id => dispatch => {
  dispatch({ type: actionTypes.MOVIE_DELETE_PENDING, id });

  utilRequest
    .movieDeleteRequest(id)
    .then(result => {
      console.log('___', result.data);
      dispatch({ type: actionTypes.MOVIE_DELETE_SUCCESS, movie: result.data });
    })
    .catch(error =>
      // dispatch({ type: actionTypes.MOVIE_DELETE_ERROR, error})
      dispatch({ type: actionTypes.MOVIE_DELETE_ERROR, movie: {} })
    );
};

export const movieUpdateExisting = (id, movie) => dispatch => {
  dispatch({ type: actionTypes.MOVIE_UPDATE_EXISTING_PENDING, id, movie });

  utilRequest
    .updateExistingRequest(id, movie)
    .then(result =>
      dispatch({
        type: actionTypes.MOVIE_UPDATE_EXISTING_SUCCESS,
        movie: result,
      })
    )
    .catch(error =>
      dispatch({ type: actionTypes.MOVIE_UPDATE_EXISTING_ERROR, error })
    );
};

//TODO: when API will fine, remove this mock
const mockGetAllRequest = {
  movie: [
    {
      format: 'VHS',
      release: 1974,
      stars: [
        'Mel Brooks',
        'Clevon Little',
        'Harvey Korman',
        'Gene Wilder',
        'Slim Pickens',
        'Madeline Kahn',
      ],
      title: 'Some try',
    },
    {
      format: 'DVD',
      release: 1999,
      stars: [
        'Mel Brooks',
        'Clevon Little',
        'Harvey Korman',
        'Gene Wilder',
        'Slim Pickens',
        'Madeline Kahn',
      ],
      title: 'Nice Effort',
    },
    {
      format: 'CD',
      release: 2027,
      stars: [
        'Mel Brooks',
        'Clevon Little',
        'Harvey Korman',
        'Gene Wilder',
        'Slim Pickens',
        'Madeline Kahn',
      ],
      title: 'Notebook',
    },
  ],
};
