import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Navbar, Button } from 'react-bootstrap';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import IndexCV from './Pages/CV/index';
import CreateCV from './Pages/CV/create';
import EditCV from './Pages/CV/edit';
import IndexWorkExperience from './Pages/WorkExperience/index';
import CreateWorkExperience from './Pages/WorkExperience/create';
import EditWorkExperience from './Pages/WorkExperience/edit';
import IndexEducation from './Pages/Education/index';
import CreateEducation from './Pages/Education/create';
import EditEducation from './Pages/Education/edit';
import IndexOtherExperience from './Pages/OtherExperience/index';
import CreateOtherExperience from './Pages/OtherExperience/create';
import EditOtherExperience from './Pages/OtherExperience/edit';
import IndexSkill from './Pages/Skills/index';
import CreateSkill from './Pages/Skills/create';
import EditSkill from './Pages/Skills/edit';
import PreviewCV from './Pages/CV/preview';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
    console.log(sidebarOpen);
  };

  return (
    <Router>
      <div className={"App"}>
        <ToastContainer position="top-right" autoClose={3000} />
        {/* Sidebar */}
        <Navbar className="Navbar">
          <a href="/" style={{textDecoration: "none"}}>
            <h1 className="text-white my-3">Online Resume Builder</h1>
          </a>
        </Navbar>
        <main>
          <div id="content">
            {/* Page content */}
            <Routes>
              <Route path="/" element={<IndexCV />} />
              <Route path="CreateCV" element={<CreateCV />} />
              <Route path="EditCV/:id" element={<EditCV />} />
              <Route path="PreviewCV/:id" element={<PreviewCV />} />
              <Route path=":id/IndexWorkExperience" element={<IndexWorkExperience />} />
              <Route path=":id/IndexWorkExperience/CreateWorkExperience" element={<CreateWorkExperience />} />
              <Route path="EditWorkExperience/:id" element={<EditWorkExperience />} />
              <Route path=":id/IndexEducation" element={<IndexEducation />} />
              <Route path=":id/IndexEducation/CreateEducation" element={<CreateEducation />} />
              <Route path="EditEducation/:id" element={<EditEducation />} />
              <Route path=":id/IndexOtherExperience" element={<IndexOtherExperience />} />
              <Route path=":id/IndexOtherExperience/CreateOtherExperience" element={<CreateOtherExperience />} />
              <Route path="EditOtherExperience/:id" element={<EditOtherExperience />} />
              <Route path=":id/IndexSkill" element={<IndexSkill />} />
              <Route path=":id/IndexSkill/CreateSkill" element={<CreateSkill />} />
              <Route path="EditSkill/:id" element={<EditSkill />} />
              {/* Add more routes as needed */}
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
