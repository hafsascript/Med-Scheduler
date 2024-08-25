"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"


import {Form, FormControl} from "@/components/ui/form"
import CustomFormField from "../CustomFormField"
import SubmitButton from "../SubmitButton"
import { useState } from "react"
import { PatientFormValidation,  } from "@/lib/validation"
import { useRouter } from "next/navigation"
import {  registerPatient } from "@/lib/actions/patient.actions"
import { FormFieldType } from "./PatientForm"
import { RadioGroup, RadioGroupItem } from "../ui/radio-group"
import { Doctors, GenderOptions, IdentificationTypes,PatientFormDefaultValues } from "@/constants"
import { Label } from "../ui/label"
import { SelectItem } from "../ui/select"
import Image from "next/image"
import FileUploader from "../FileUploader"



const RegisterForm=({user}: {user:User})=> {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof PatientFormValidation>>({
    resolver: zodResolver(PatientFormValidation),
    defaultValues: {
      ...PatientFormDefaultValues,
      name: "",
      email:"",
      phone:"",
    },
  })
 

  async function onSubmit(values: z.infer<typeof PatientFormValidation>) {
    setIsLoading(true);

    let formData;

    if (values.identificationDocument && values.identificationDocument.length>0){

      const blobFile = new Blob([values.identificationDocument[0]],{
        type: values.identificationDocument[0].type,
      })
      formData = new FormData();
      formData.append('blobFile', blobFile);
      formData.append('fileName', values.identificationDocument[0].name)
      }

    try{
      const patientData ={
        ...values,
        userId: user.$id,
        birthDate : new Date(values.birthDate),
        identificationDocument: formData,
      }

      // @ts-ignore
      const patient = await registerPatient(patientData);

      if (patient) router.push(`/patients/${user.$id}/new-appointment`)
    
    }catch(error){
      console.log(error)
      setIsLoading(false)
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-12 flex flex-col flex-1">
        <section className="space-y-4">
          <h1 className="header">Welcome 👋</h1>
          <p className="text-dark-700">Share More About You</p>
        </section>
        <section className="space-y-4">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Personal Information</h2>
            </div> 
        </section>
        <CustomFormField control={form.control}
        fieldType={FormFieldType.INPUT}
        name="name"
        label="Full Name"
        placeholder="John Doe"
        iconSrc="/user.webp"
        iconAlt="user"/>
        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control}
          fieldType={FormFieldType.INPUT}
          name="email"
          label="Email"
          placeholder="johndoe@provider.com"
          iconSrc="/email.webp"
          iconAlt="email"/>

          <CustomFormField control={form.control}
          fieldType={FormFieldType.PHONE_INPUT}
          name="phone"
          label="Phone Number"
          placeholder="111 111 111"
          iconSrc="/phone.png"
          iconAlt="phone"/>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control}
            fieldType={FormFieldType.DATE_PICKER}
            name="birthDate"
            label="Birthday"
            />

            <CustomFormField control={form.control}
            fieldType={FormFieldType.SKELETON}
            name="gender"
            label="Gender"
            renderSkeleton={(field)=>(
              <FormControl>
                <RadioGroup className="flex h-11
                gap-6 xl:justify-between"
                onValueChange={field.onChange}
                defaultValue={field.value}>
                  {GenderOptions.map((option)=>(
                    <div className="radio-group"
                    key={option}>
                      <RadioGroupItem
                      value={option}
                      id={option}/>
                      <Label htmlFor={option}
                      className="cursor-pointer">
                        {option}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}/>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control}
            fieldType={FormFieldType.INPUT}
            name="address"
            label="Address"
            placeholder="27th Street, Amsterdam"
            />

          <CustomFormField control={form.control} 
            fieldType={FormFieldType.INPUT}
            name="occupation"
            label="Occupation"
            placeholder="Web Developer"/>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control}
            fieldType={FormFieldType.INPUT}
            name="emergencyContactName"
            label="Emergency Contact Name"
            placeholder="Jane Doe"
            />

          <CustomFormField control={form.control}
            fieldType={FormFieldType.PHONE_INPUT}
            name="emergencyContactNumber"
            label="Emergency Contact Number"
            placeholder="222 111 111"
            />
        </div>
        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Medical Information</h2>
          </div> 
        </section>

        <CustomFormField control={form.control}
          fieldType={FormFieldType.SELECT}
          name="primaryPhysician"
          label="Primary Physician"
          placeholder="Select A Physician">
            {Doctors.map((doctor)=>(
              <SelectItem key={doctor.name}
              value={doctor.name}>
                <div className="flex cursor-pointer
                items-center gap-2">
                  <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={32}
                  height={32}
                  className="rounded-full
                  border border-dark-500"/>
                  <p>{doctor.name}</p>
                </div>
              </SelectItem>
            ))}
        </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control}
            fieldType={FormFieldType.INPUT}
            name="insuranceProvider"
            label="Insurance Provider"
            placeholder="Berkshire Hathaway"
            />

          <CustomFormField control={form.control} 
            fieldType={FormFieldType.INPUT}
            name="insurancePolicyNumber"
            label="Insurance Policy Number"
            placeholder="123HZ774"/>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="allergies"
            label="Allergies(if any)"
            placeholder="Peanuts, Tree Nuts, ....."
            />

          <CustomFormField control={form.control} 
            fieldType={FormFieldType.TEXTAREA}
            name="currentMedication"
            label="Current Medication"
            placeholder="Lisinopril (100mg)"/>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
          <CustomFormField control={form.control}
            fieldType={FormFieldType.TEXTAREA}
            name="familyMedicalHistory"
            label="Family Medical History"
            placeholder="High blood pressure runs in the family"
            />

          <CustomFormField control={form.control} 
            fieldType={FormFieldType.TEXTAREA}
            name="pastMedicalHistory"
            label="Past Medical History"
            placeholder="Tonsillectomy"/>
        </div>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Identification and Verification</h2>
          </div> 
        </section>

        <CustomFormField control={form.control}
          fieldType={FormFieldType.SELECT}
          name="identificationType"
          label="Identification Type"
          placeholder="Select An Identification Type">
            {IdentificationTypes.map((type)=>(
              <SelectItem key={type}
              value={type}>
                {type}
              </SelectItem>
            ))}
        </CustomFormField>

        <CustomFormField control={form.control}
          fieldType={FormFieldType.INPUT}
          name="identificationNumber"
          label="Identification Number"
          placeholder="50244792"
        />
        <CustomFormField control={form.control}
          fieldType={FormFieldType.SKELETON}
          name="identificationDocument"
          label="Scanned Copy Of Identification Document"
          renderSkeleton={(field)=>(
            <FormControl>
              <FileUploader
              files={field.value}
              onChange={field.onChange}/>
            </FormControl>
            )}/>

        <section className="space-y-4">
          <div className="mb-9 space-y-1">
            <h2 className="sub-header">Consent and Privacy</h2>
          </div> 
        </section>

        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name='treatmentConsent'
        label="I consent to treatment"/>

        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name='disclosureConsent'
        label='I consent to disclosure of information'/>
      
        <CustomFormField
        fieldType={FormFieldType.CHECKBOX}
        control={form.control}
        name='privacyConsent'
        label='I consent to privacy policy'/>
        
        <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
      </form>
    </Form>
  )
}

export default RegisterForm