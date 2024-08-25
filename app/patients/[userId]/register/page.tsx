import RegisterForm from '@/components/forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Register = async({params : {userId}} : SearchParamProps) => {

    const user = await getUser(userId)
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container  ">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
          <Image src='/steth.jpg'
          height={1000}
          width={1000}
          alt='Med Scheduler'
          className="mb-12 h-10 w-fit"/>
          <RegisterForm user={user}/>
          
          <p className="copyright py-12">© 2024 Med Scheduler</p>
           
        </div>
          

      </section>
      <Image src='/register.jpg'
      height={1000}
      width={1000}
      alt='doctors'
      className="side-img max-w-[47%]"/>
    </div>
  )
}

export default Register