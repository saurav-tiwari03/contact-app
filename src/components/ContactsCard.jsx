import React, {  } from 'react'
import {IoMdTrash} from "react-icons/io"
import {RiEditCircleLine} from "react-icons/ri"
import { HiOutlineUserCircle } from "react-icons/hi";
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase';
import AddAndUpdateContact from './AddAndUpdateContact';
import useDisclouse from '../hooks/useDisclouse';
import { toast } from 'react-toastify';

const ContactsCard = ({contact}) => {
  const {isOpen,onClose,onOpen} = useDisclouse();
  const deletContact = async (id) => {
    try {
      await deleteDoc(doc(db,"contacts",id))
      toast.success("Contact deleted successfully")
    } catch (error) {
      console.error(error)
    }
  }

  return (
  <>
    <div className=''>
      <div key={contact.id} className='bg-[#776B5D] flex justify-between 
              items-center rounded-lg'>
              <div className='flex gap-2'>
                <HiOutlineUserCircle className='text-4xl text-[#B0A695]'/>
                <div className='text-white '>
                  <h2 className='font-medium'>{contact.name}</h2>
                  <p className='text-sm font-medium'>{contact.number}</p>
                </div>
              </div>
              <div className='flex text-3xl'>
                <RiEditCircleLine onClick={onOpen} 
                className='cursor-pointer'/>
                <IoMdTrash onClick={() => deletContact(contact.id)} 
                className='text-orange cursor-pointer'/>
              </div>
            </div>
    </div>
    <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onClose={onClose}/>
  </>
  )
}

export default ContactsCard