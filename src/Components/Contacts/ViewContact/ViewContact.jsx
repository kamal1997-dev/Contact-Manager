import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
import Spinner from "../../Spinner/Spinner";


const ViewContact=()=>{
    let{contactId}=useParams();
    
    let[state,setState]=useState({loading:false,contact:{},errorMessage:'',group:{}})
    useEffect(async()=>{
        try{
            setState({...state,loading:true})
            let response=await ContactService.getContact(contactId)
            //console.log(response.data)
            let groupResponse= await ContactService.getGroup(response.data)
            setState({...state,loading:false,contact:response.data,group:groupResponse.data})

        }
        catch(error){
            setState({...state,loading:false,errorMessage:error.message})
           
        }

    },[contactId])
    let{loading,contact,message,group}=state;
    console.log(group)
    return(
        <>

       
        <section className="view-contact-intro">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h3 text-primary fw-bold py-2"> View Contact</p>
                    </div>
                </div>
            </div>
        </section>
        {
            loading?<Spinner/>:<React.Fragment>
                {
                    Object.keys(contact).length>0 && Object.keys(group).length>0 &&<section className="view-contact mt-2 ">
                    <div className="container">
                        <div className="row align-items-center">
                           <div className="col-md-4">
                            <img src={contact.photo} className=" contact-img mb-2" alt=''></img>
        
        
                           </div> 
                           <div className="col-md-8">
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
                                                        <li className="list-group-item list-group-item-action">
                                                            Company:<span className="fw-bold">{contact.company}</span>
        
                                                        </li>
                                                        <li className="list-group-item list-group-item-action">
                                                            Title:<span className="fw-bold">{contact.title}</span>
        
                                                        </li>
                                                        <li className="list-group-item list-group-item-action">
                                                            Group:<span className="fw-bold">{group.name}</span>
        
                                                        </li>
                                                    </ul>
        
                           </div>
                        </div>
                        <div className="row">
                           <div className="col">
                           <Link to={'/contacts/list'} className='btn btn-warning mt-4'> Back</Link>
                           </div>
        
                        </div>
                    </div>
                </section>
                }
            </React.Fragment>
        }
        
        </>
    )
}
export default ViewContact;