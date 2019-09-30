import { normalize, arrayOf } from 'normalizr';
import { push } from 'connected-react-router'
import { userSchema } from '../schemas';
import Resources from '../constants/Resources';
import { setCookies, removeCookie } from './cookie';
import { setEntities } from './entity';
import { setPages } from './page';
import userAPI from '../api/user';


export const loginUser = ({ token, info }, res = null) => dispatch => {
  console.log('again again ');
  console.log(token);
  console.log(info);
  dispatch(
    setCookies(
      {
        token,
        info
      },
      res
    )
  );
};

export const emailRegister = values =>
  async (dispatch, getState, apiEngine) => {
    try{
      const json = await userAPI(apiEngine).emailRegister(values);
      return json;
    } catch (err) {
      throw err;
    }
    };

export const emailLogin = values =>
  async (dispatch, getState, apiEngine) => {
    try{
      const json = await userAPI(apiEngine).emailLogin(values);
      return json
    } catch (err){
      throw err;
    }
  };





export const logoutUser = () =>
  async (dispatch, getState, apiEngine) => {
    console.log(apiEngine);
    try {
      console.log('logoutUser action');
      await userAPI(apiEngine).logout();
      console.log('server loguted');
      /* istanbul ignore next */
      Promise.all([
        dispatch(removeCookie('token')),
        dispatch(removeCookie('info'))
      ]).then(()=> {
          console.log('redirect now!');

          dispatch(push('/'))
        }
      );
    } catch (err) {
      /* istanbul ignore next */
      alert('Logout user fail');
      throw err;
    }
  };

export const setUsers = res => dispatch => {
  const normalized = normalize(res.users, arrayOf(userSchema));

  dispatch(setEntities(normalized));
  dispatch(setPages(Resources.USER, res.page, normalized.result));
};

export const verifyEmail = token =>
  async (dispatch, getState, apiEngine) => {
  console.log('nana bibibo');
  console.log(getState());
  try {
    const json = await userAPI(apiEngine).verifyEmail({token});
    return json;
  }catch (err){
    console.log(err)
    throw err;
  }

};
