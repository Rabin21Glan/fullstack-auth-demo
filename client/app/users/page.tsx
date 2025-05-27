"use client";
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import Link from 'next/link';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import { LOGIN_MUTATION } from '@/lib/mutations';
import { useRouter } from 'next/navigation';
import { user } from '@heroui/theme';
import { USERS_QUERY } from '@/lib/queries';

interface User{
  id:string,
    username:string,
    email:string,


}

export default function Users() {
 
  const router = useRouter();
  const {loading,data} = useQuery<User[]>(USERS_QUERY);


 if(loading)
 {
  return <div>Loading...</div>
 }

 else if(data){
  <div>
    {data.map(d=>{
      return <div>{d.email}</div>
    })}
  </div>
 }
 else{
  return <div>Please wait</div>
 }
}