import { Link } from "react-router-dom";
import React,{useEffect, useState} from "react";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../Spinner/Spinner";
const ContactList = () => {
    let[query,setQuery]=useState({text:''})
     const[state ,setState]=useState( {
         loading:false,
         contacts:[],
         filteredContacts:[],//to maintain contacts after filtering in search
         errorMessage:' '
     });
     useEffect( async()=>{
         try{
             setState({...state,loading:true})
             let response=await ContactService.getAllContacts()
             //console.log(response.data)
             setState({
                 ...state,
                 loading:false,
                 contacts:response.data,
                 filteredContacts:response.data})

         }
         catch(error){
             setState({...state,loading:false,errorMessage:error.meessage})

         }

     },[])
     const clickDelete= async(contactId)=>{
         try{
             let response=await ContactService.deleteContact(contactId)
             if(response){
                setState({...state,loading:true})
                let response=await ContactService.getAllContacts()
               // console.log(response.data)
                setState({...state,loading:false,contacts:response.data,filteredContacts:response.data})
   

             }

         }
         catch(error){
            setState({...state,loading:false,errorMessage:error.meessage})

         }

     }
     const searchContacts=(event)=>{
         setQuery({...query,text:event.target.value})
         let thecontacts=state.contacts.filter(contact=>{
             return contact.name.toLowerCase().includes(event.target.value.toLowerCase())

         })
         setState({
             ...state,
             filteredContacts:thecontacts
         })

     }

     let{loading,contacts, filteredContacts,errorMessage}=state;

    return (
        <>
        
            <section className="contact-search p-3">
                <div className="container">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <p className="h3"> Manage Your Contacts
                                    <Link to={'/contacts/add'} className='btn btn-primary ms-2'>
                                        <i className="fa fa-plus-circle me-2"></i>New </Link>
                                </p>
                            </div>

                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <form className="row">
                                    <div className="col">
                                        <div className="mb-2">
                                            <input  name='text' value={query.text}  onChange={searchContacts}type="text" className="form-control" placeholder="Search contact"></input>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className="mb-2">
                                            <input type='submit' placeholder="Search" className="btn btn-outline-dark"></input>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>



                    </div>
                </div>
            </section>



            {
                loading?<Spinner/>:<React.Fragment>
                    <section className="contact-list">
                <div className="container">
                    <div className="row">
                        {
                            filteredContacts.length>0 && filteredContacts.map(contact=>{
                                return(
                                    <div className="col-md-6" key={contact.id}>
                            <div className="card my-2">
                                <div className="card-body">
                                     <div className="row align-items-center d-flex justify-content-between ">
                                        <div className="col-md-4  ">
                                            <img src={contact.photo} className=" contact-img" alt=''></img>
                                        </div>
                                        <div className="col-md-7  ">
                                            <ul className="list-group">
                                                <li className="list-group-item list-group-item-action">
                                                    Name:<span className="fw-bold">{contact.name}</span>

                                                </li>
                                                <li className="list-group-item list-group-item-action">
                                                    Mobile:<span className="fw-bold">{contact.mobile}</span>

                                                </li>
                                                <li className="list-group-item list-group-item-action">
                                                    Email:<span className="fw-bold">{contact.email}</span>

                                                </li>
                                            </ul>


                                        </div>
                                        <div className="col-md-1 d-flex flex-column align-items-center   ">
                                            <Link to={`/contacts/view/${contact.id}`} className='btn btn-warning my-1'>
                                                <i className="fa fa-eye"></i>
                                            </Link>
                                            <Link to={`/contacts/edit/${contact.id}`} className='btn btn-primary my-1'>
                                                <i className="fa fa-pen"></i>
                                            </Link>
                                            <button className="btn btn-danger my-1" onClick={()=>clickDelete(contact.id)}>
                                                <i className="fa fa-trash"></i>

                                            </button>


                                        </div>
                                        
                                     </div>


                                </div>

                            </div>
                        </div>

                                )
                            })

                        }
                        
                    </div>
                </div>

            </section>

                </React.Fragment>
            }
            
        </>
    )
}
export default ContactList;