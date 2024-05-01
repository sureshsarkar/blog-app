import './App.css';
import Header from './components/Header';
import Blogs from './pages/Blogs';
import Login from './pages/Login';
import Signup from './pages/Signup';
import About from './pages/About';
import Contact from './pages/Contact';
import { Routes, Route } from 'react-router-dom'
import UserBlogs from './pages/UserBlogs';
import CreateBlog from './pages/CreateBlog';
import BlogDetails from './pages/BlogDetails';
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<Blogs />}></Route>
        <Route path='/blogs' element={<Blogs />}></Route>
        <Route path='/my-blogs' element={<UserBlogs />}></Route>
        <Route path='/create-blog' element={<CreateBlog />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/signup' element={<Signup />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/contact' element={<Contact />}></Route>
        <Route path='/blog-details/:id' element={<BlogDetails />}></Route>
      </Routes>
    </>
  );
}

export default App;
