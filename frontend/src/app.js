import React, {useState, useEffect} from 'react'
import Header from './components/Header'
import "core-js/stable";
import "regenerator-runtime/runtime";
import './app.css'
import api from './services/api'


function App(){
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    api.get('projects').then(response=>{
      setProjects(response.data)
    })
  }, [])

  async function handleAddProject(){
   const response = await api.post('projects', {
      title: `Front End Developeeeeeeeer ${Date.now()}`,
      owner: "Aoun"
      })
      
    const project = response.data
    setProjects([...projects, project])
  }
  return(
    <Header title="project">
      <ul>
        {projects.map(project=>{
          return(
          <li key={project.id}>{project.title}</li>
          )})}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar</button>
    </Header>
  )
}
export default App