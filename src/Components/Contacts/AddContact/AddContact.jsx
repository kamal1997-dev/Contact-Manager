import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { ContactService } from "../../../Services/ContactService";
const AddContact=()=>{
    let navigate=useNavigate()
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
    const updateInput=(event)=>{
        setState({
            ...state,
            contact:{
                ...state.contact,
                [event.target.name]:event.target.value
            }
        })
    }
    useEffect(async()=>{
        try{
            setState({...state,loading:true})
            let response= await ContactService.getGroups()
           // console.log(response.data)
           setState({...state,loading:false,groups:response.data})

        }
        catch(error){

        }
    },[])
    const onSubmitHandler=async(event)=>{
        event.preventDefault();
        try{
            let response=await ContactService.createContact(state.contact)
            if(response){
                navigate('/contacts/list',{replace:true})


            }

        }
        catch(error){
            setState({...state,errorMessage:error.message})
            navigate('/contacts/add',{replace:false})


        }
    }

let{loading,contact,groups,errorMessage}=state;

    return(
        <>
        
        <section className="add-contact">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="h4 text-success fw-bold py-2"> Create Contact</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <form  onSubmit={onSubmitHandler}>
                            <div className="mb-2">
                                <input required={true} type='text' className="form-control" placeholder="Name" name="name" value={contact.name} onChange={updateInput}></input>
                            </div>
                            <div className="mb-2">
                                <input   required={true} name="photo" value={contact.photo} onChange={updateInput}type='text' className="form-control" placeholder="Photo Url"></input>
                            </div>
                            <div className="mb-2">
                                <input required={true} name="mobile" value={contact.mobile} onChange={updateInput} type='number' className="form-control" placeholder="Mobile"></input>
                            </div>
                            <div className="mb-2">
                                <input   required={true} name="email" value={contact.email} onChange={updateInput}type='email' className="form-control" placeholder="Email"></input>
                            </div>
                            <div className="mb-2">
                                <input required={true} name="company" value={contact.company} onChange={updateInput} type='text' className="form-control" placeholder="Company Name"></input>
                            </div>
                            <div className="mb-2">
                                <input  required={true} name="title" value={contact.title} onChange={updateInput}type='text' className="form-control" placeholder="Title"></input>
                            </div>
                            <div className="mb-2">
                                <select required={true} name="groupId" value={contact.groupId} onChange={updateInput} className="form-control">
                                    <option value="">Select a Group</option>
                                    {
                                        groups.length>0 && groups.map(group=>{
                                           return(
                                               <option key={group.id} value={group.id}>{group.name}</option>
                                           ) 
                                        })
                                    }

                                </select>
                            </div>
                            <div className="mb-2">
                                <input type='submit' className="btn btn-success" value="Create"></input>
                                <Link to={'/contacts/list'} className='btn btn-dark ms-2'> Cancel</Link>
                            </div>
                        </form>

                    </div>
                </div>
            </div>

        </section>
        </>
    )
}
export default AddContact;