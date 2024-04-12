import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { logout, reset } from '../redux/slices/auth';

function Auth() {
const { user, isLoading,message } = useSelector(state => state.auth);
const dispatch = useDispatch();
  useEffect(() => {
    if (user && !user.email) {
      dispatch(logout())     
    }
    if (message) {
      alert(message)
    }
    dispatch(reset())
  }, [user,dispatch,message])
  if (isLoading) {
    return <Loader />
  }
  return ()=>{}
}

export default Auth