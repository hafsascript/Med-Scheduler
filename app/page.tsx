import PatientForm from "@/components/forms/PatientForm";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px] "></div>
          <Image src='/steth.jpg'
          height={1000}
          width={1000}
          alt='Med Scheduler'
          className="mb-12  h-10 w-fit"/>
          <PatientForm/>
          <div className="text-14-regular mt-14 flex justify-between ">
           <p className="justify-items-end text-dark-600 xl:text-left">© 2024 Med Scheduler</p>
           <Link href='/?admin=true' className="text-green-500 hover:underline">
            Admin
           </Link>
          </div>
          

      </section>
      <Image src='/doctors.jpg'
      height={1000}
      width={1000}
      alt='doctors'
      className="side-img max-w-[50%]"/>
    </div>
  );
}
