import './App.css';
import {Routes,Route,Navigate} from 'react-router-dom'
import Navbar from './Components/Navbar/Navbar';
import ContactList from './Components/Contacts/ContactList/ContactList';
import AddContact from './Components/Contacts/AddContact/AddContact';
import ViewContact from './Components/Contacts/ViewContact/ViewContact';
import Editcontact from './Components/Contacts/EditContact/EditContact';
import Spinner from './Components/Spinner/Spinner';

function App() {
  return (
   <>
   <Navbar/>
   
   <Routes>
     <Route path={'/'} element={<Navigate to = {'/contacts/list'}/>}/>
     <Route path={'/contacts/list'} element={<ContactList/>}/>
     <Route path={'/contacts/add'} element={<AddContact/>}/>
     <Route path={'/contacts/view/:contactId'} element={<ViewContact/>}/>
     <Route path={'/contacts/edit/:contactId'} element={<Editcontact/>}/>
     
   </Routes>

   </>
  );
}

export default App;
