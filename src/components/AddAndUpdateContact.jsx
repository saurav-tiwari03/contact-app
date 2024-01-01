import React from 'react'
import Modal from './Modal'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { addDoc, collection, doc, updateDoc } from 'firebase/firestore'
import {db} from './../config/firebase'
import { toast } from 'react-toastify'
import * as Yup from 'yup'

const contactValidation = Yup.object().shape({
  name:Yup.string().required("Name is required"),
  number:Yup.number("Invalid Number").required("Number is required"),

})

const AddAndUpdateContact = ({isOpen,onClose,isUpdate,contact}) => {

  const addContact = async (contact ) => {
    try {
      const contactRef = collection(db,"contacts");
      await addDoc(contactRef,contact);
      onClose();
      toast.success("Contact Added successfully")
      } catch (error) {
      console.log(error)
    }
  }

  const updateContact = async(contact,id)  => {
    try {
      const contactRef = doc(db,"contacts",id);
      await updateDoc(contactRef,contact);
      onClose();
      toast.success("Contact Updated successfully")
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <>
    <Modal isOpen={isOpen} onClose={onClose} >
      <Formik 
      validationSchema={contactValidation}
      initialValues={isUpdate ? {
        name:contact.name,
        number:contact.number,
      } :{
        name:"",
        number:"",
      }}      
      onSubmit={(values) => {
        console.log(values);
        isUpdate ? 
        updateContact(values,contact.id) :
        addContact(values)
      }}
      >

        <Form className=' flex flex-col items-center justify-center '>
          <div className='flex flex-col gap-1'>
            <label htmlFor="name">Name</label>
            <Field type="text" name="name" className="border h-10" />
            <div className='text-xs text-red-500'>
              <ErrorMessage name="name" />
            </div>
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="number">Number</label>
            <Field type="text" name="number" className="h-10 border" />
            <div className='text-xs text-red-500'>
              <ErrorMessage name="number"/>
            </div>
          </div>
          <button className='bg-[#776b5d] rounded-md px-2 py-0.5 m-2 '>
            {
              isUpdate ? "Update Contact" : "Add Contact"
            }
          </button>
        </Form>
      </Formik>
    </Modal>
    </>
  )
}

export default AddAndUpdateContact