/* @flow */

import { normalize, schema } from 'normalizr';
import { arrayOfComment } from '../schemas';
import Resources from '../constants/Resources';
import { setEntities, removeEntities } from './entity';
import { setPages, prependEntitiesIntoPage } from './page';
import commentAPI from '../api/comment';
import { pushErrors } from './error';

import type { Dispatch, GetState, ThunkAction, ReduxState } from '../types';

import {
  FETCH_COMMENTS_FAILURE,
  FETCH_COMMENTS_REQUESTING,
  FETCH_COMMENTS_SUCCESS
} from "../reducers/comments";


// Export this for unit testing more easily
/* istanbul ignore next */

export const setCommentList = res => dispatch => {
  console.log(res.comments);
  const normalized = normalize(res.comments, arrayOfComment);

  dispatch(setEntities(normalized));
  dispatch(setPages(Resources.COMMENT, res.page, normalized.result));
};

const shouldFetchComments = (state: ReduxState): boolean => {
  // On development, we will allow action dispatching
  // or your reducer hot reloading won't updated on the view
  if (__DEV__) return true;

  // Fetching data once on commention
  return state.comments.readyStatus !== FETCH_COMMENTS_SUCCESS;
};

export const likeComment = commentId => async (
  dispatch: Dispatch,
  getState: GetState,
  apiEngine
) => {
  dispatch({ type: FETCH_COMMENTS_REQUESTING });
  let json;
  try {
    const json = await commentAPI(apiEngine).addLikes(commentId);
    /* istanbul ignore next */
    console.log(json);

    // dispatch(setCommentList(json.data));
    console.log(getState());
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: FETCH_COMMENTS_FAILURE, err: err.message });
    console.log(`omg ${err.stack}`);
  }
};



export const fetchComments = storyId => async (
  dispatch: Dispatch,
  getState: GetState,
  apiEngine
) => {
  console.log(`hi ${storyId}`);
  dispatch({ type: FETCH_COMMENTS_REQUESTING });
  let json;
  try {

    const json = await commentAPI(apiEngine).list(storyId);
    /* istanbul ignore next */
    console.log(json);
    dispatch({ type: FETCH_COMMENTS_SUCCESS, data: json.data.comments });

    // dispatch(setCommentList(json.data));
    console.log(getState());
  } catch (err) {
    /* istanbul ignore next */
    dispatch({ type: FETCH_COMMENTS_FAILURE, err: err.message });
    console.log(`omg ${err.stack}`);
  }
};



/* istanbul ignore next */
export const fetchCommentsIfNeeded = (page): ThunkAction => (
  dispatch: Dispatch,
  getState: GetState
) => {
  /* istanbul ignore next */
  console.log('hi fuck');
  if (shouldFetchComments(getState())) {
    /* istanbul ignore next */
    return dispatch(fetchComments(page));
  }
  /* istanbul ignore next */
  return null;
};

export const appendCommentIntoList = comment => dispatch => {
  const normalized = normalize([comment], arrayOfComment);
  dispatch(prependEntitiesIntoPage(Resources.COMMENT, normalized, 1));
};

export const addComment = (storyId, text) =>
  async (dispatch, getState, apiEngine) => {
  let json;
  console.log(storyId);
  console.log(text);
  const { content } = text;
  console.log(content);
  try {
    json = await commentAPI(apiEngine).create(storyId, content);
    return json;
  } catch (err) {
    dispatch(pushErrors(err));
  }
};

export const updateComment = (id, newText) => async (
  dispatch,
  getState,
  apiEngine
) => {
  try {
    await commentAPI(apiEngine).update(id, { text: newText });
    await dispatch(fetchComments());
  } catch (err) {
    dispatch(pushErrors(err));
  }
};

export const removeCommentFromList = id =>
  removeEntities(Resources.COMMENT, [id]);

export const removeComment = () => (
  commentId: number
): ThunkAction => async (dispatch, apiEngine) => {
  try {
    await commentAPI(apiEngine).remove(commentId);
    dispatch(removeCommentFromList(commentId));
  } catch (err) {
    dispatch(pushErrors(err));
  }
};
