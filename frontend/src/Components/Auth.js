import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Loader from './Loader';
import { logout, reset } from '../redux/slices/auth';

function Auth() {
const { user, isLoading } = useSelector(state => state.auth);
const dispatch = useDispatch();
  useEffect(() => {
    if (!user.email) {
      dispatch(logout())     
    }
    dispatch(reset())
  }, [user])
  if (isLoading) {
    return <Loader />
  }
  return ()=>{}
}

export default Auth