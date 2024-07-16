'use client';
import React, { useEffect, useState } from 'react'
import UserContext from './userContext'
import { getCurrentUSer } from '@/services/taskService';

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let result = await getCurrentUSer()
        setUser(result);
      } catch (error) {
        toast.error(error?.response?.data?.message ? error?.response?.data?.message : `Error in Login`, {
          position: 'top-center'
        })
        setUser(undefined);
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }} >
      {children}
    </UserContext.Provider>
  )
}
export default UserProvider;
