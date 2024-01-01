import React, { useEffect, useState } from 'react' 
import Navbar from './components/Navbar'
import { FiSearch } from "react-icons/fi";
import {AiFillPlusCircle} from "react-icons/ai"
import { collection, onSnapshot } from 'firebase/firestore';
import {db} from "./config/firebase"
import ContactsCard from './components/ContactsCard';
import AddAndUpdateContact from './components/AddAndUpdateContact';
import useDisclouse from './hooks/useDisclouse';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NoContact from './components/NoContact';


const App = () => {

  const [contacts,setContacts] = useState([]);
  const {isOpen,onClose,onOpen} = useDisclouse();


  useEffect(() => {
    const getContacts = async () => {
      try {
        const contactRef = collection(db,"contacts")
        onSnapshot(contactRef,(snapshot) => {
          const contactList = snapshot.docs.map((doc) => {
            return {
              id:doc.id,
              ...doc.data(),
            }
          });
          console.log(contactList);
        setContacts(contactList)
        return contactList
        })

      } catch (error) {
        console.log(error)

      }
    }
    getContacts();
  },[]);

  const filterContacts = (e) => {
    const value = e.target.value;
    const contactRef = collection(db,"contacts");
    onSnapshot(contactRef,(snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id:doc.id,
          ...doc.data(),
        }
      });
    
    const filteredContacts = contactList.filter(contact => 
      contact.name.toLowerCase().includes(value.toLowerCase() ) 
    )
    setContacts(filteredContacts)
    return filteredContacts;
    });
    

  }


  return (
  <>
    <div className='max-w-[370px] mx-auto text-center px-4 '>
      <Navbar/>
      <div className='flex mb-2'>
        <div className='flex flex-grow relative items-center '>
          <FiSearch className='ml-1 text-3xl text-white absolute'/>
          <input 
          onChange={filterContacts}
          className='h-10 flex-grow rounded-md border border-white 
          bg-transparent text-white pl-9'
          />
        </div>
        <div className=''>
          <AiFillPlusCircle onClick={onOpen} className='text-5xl text-white 
          cursor-pointer'/>
        </div>
      </div>
      <div className='mt-2 flex flex-col gap-2'>
        {
        contacts.length <= 0 ? <NoContact/> : contacts.map((contact) => {
            return (
              <ContactsCard key={contact.id} contact={contact} />
            )
          })
        }
      </div>
    </div>
    <AddAndUpdateContact 
    onClose={onClose}
    isOpen={isOpen}
    className=""/>
    <ToastContainer 
    position="bottom-center"
    autoClose={5000}
    hideProgressBar
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="light"/>
  </>
  )
}

export default App