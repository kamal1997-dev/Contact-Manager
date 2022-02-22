import React, { useEffect, useState } from "react";
import { Link, useParams,navigate, useNavigate } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../Spinner/Spinner";

const Editcontact=()=>{
    const navigate=useNavigate()
    let {contactId}=useParams()
   // console.log(contactId)
    let[state,setState]=useState({
        loading:false,
        contact:{
            name:'',
            photo:'',
            mobile:'',
            email:'',
            company:'',
            title:'',
            groupId:''

        },
        groups:[],
        errorMessage:''

    })
   
    useEffect(async()=>{
        try{
           
            setState({
                ...state,loading:true})
                
            let response=await ContactService.getContact(contactId)
            let groupResponse=await ContactService.getGroups()
           
           setState({
            ...state,
            loading:false,
            contact:response.data,
            groups:groupResponse.data
        })
        

        }
        catch(error){
            setState({
                ...state,
                loading:false,
                errorMessage:error.message
            })

        }


    },[contactId])
    const updateInput=(event)=>{
        setState({
           ...state,
            contact:{
               ...state.contact,
                [event.target.name]:event.target.value
            }

        })

    }
    const updateHandler= async(event)=>{
        event.preventDefault()
        try{
            let response=await ContactService.updateContact(state.contact,contactId)
            if(response){
                navigate('/contacts/list',{replace:true})


            }

        }
        catch(error){
            setState({...state,errorMessage:error.message})
            navigate(`/contacts/edit/${contactId}`,{replace:false})


        }
        


    }
    let{loading,contact,groups,errorMessage}=state;
    return(
        <>
        {
            loading?<Spinner/>:<React.Fragment>
                 <section className="edit-contact">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h4 text-success fw-bold py-2"> Edit Contact</p>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <form onSubmit={updateHandler}>
                            <div className="mb-2">
                                <input  required={true} onChange={updateInput} name="name"value={contact.name} type='text' className="form-control" placeholder="Name"></input>
                            </div>
                            <div className="mb-2">
                                <input   required={true} onChange={updateInput} name="photo"value={contact.photo} type='text' className="form-control" placeholder="Photo Url"></input>
                            </div>
                            <div className="mb-2">
                                <input   required={true} onChange={updateInput} name="mobile"value={contact.mobile} type='number' className="form-control" placeholder="Mobile"></input>
                            </div>
                            <div className="mb-2">
                                <input  required={true} onChange={updateInput} name="email" value={contact.email}type='email' className="form-control" placeholder="Email"></input>
                            </div>
                            <div className="mb-2">
                                <input   required={true} onChange={updateInput} name="company" value={contact.company}type='text' className="form-control" placeholder="Company Name"></input>
                            </div>
                            <div className="mb-2">
                                <input   required={true} onChange={updateInput} name="title" value={contact.title}type='text' className="form-control" placeholder="Title"></input>
                            </div>
                            <div className="mb-2">
                                <select   required={true} onChange={updateInput} name="groupId" value={contact.groupId}className="form-control">
                                    <option value="">Select a Group</option>
                                    {
                                        groups.length>0 && groups.map(group=>{
                                            return(
                                                <option key={group.id}  value={group.id}>{group.name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <div className="mb-2">
                                <input type='submit' className="btn btn-success" value="Update"></input>
                                <Link to={'/contacts/list'} className='btn btn-dark ms-2'> Cancel</Link>
                            </div>
                        </form>

                    </div>
                    <div className="col-md-6 ">
                    <img src={contact.photo} className=" contact-img" alt=''></img>
                    </div>
                </div>
            </div>

        </section>
            </React.Fragment>
        }
     
        </>
    )
}
export default Editcontact;