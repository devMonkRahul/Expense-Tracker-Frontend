import React, { useEffect } from 'react'
import { Sidebar } from '../components'
import { useDispatch } from 'react-redux'
import { setUserData, login } from '../store/features/authSlice'
import { useGet } from '../hooks/useHttp'
import { useNavigate, Outlet } from 'react-router-dom'

export default function DashBoard() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { getRequest } = useGet();

    const token = sessionStorage.getItem('accessToken');
    
    // useEffect(() => {
    //     if (token) {
    //         const getUserProfile = async () => {
    //             try {
    //                 const response = await getRequest('/api/v1/user/profile', token);
    //                 if (response.success) {
    //                     dispatch(login());
    //                     dispatch(setUserData({
    //                         userData: response.data,
    //                         accessToken: token
    //                     }));
    //                 }
    //             } catch (error) {
    //                 console.error(error);
    //                 navigate('/');
    //             }
    //         }
    //         getUserProfile();
    //     } else {
    //         navigate('/');
    //     }
    // }, []);

    
  return (
    <>
        <div className='flex'>
            <Sidebar />
            <Outlet />
        </div>   
    </>
  )
}
