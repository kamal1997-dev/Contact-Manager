
import spinnerImage from '../../assets/images/spinning-loading.gif'
let Spinner=()=>{
    return(
        <>
        <div className="container">
            <img src={spinnerImage}alt="" className="d-block m-auto" style={{width:'200px'}} />
        </div>
        </>
    )
}
export default Spinner;