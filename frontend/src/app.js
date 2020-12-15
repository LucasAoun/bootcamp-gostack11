import React, {useState} from 'react'
import Header from './components/Header'
import './app.css'
import photo from './assets/Koala.jpg'


function App(){

  const [projects, setProjects] = useState(['Teste de desenvolvimento', 'Front-end'])

  function handleAddProject(){
    setProjects([...projects, `Novo projeto ${Date.now()}`])
  }
  console.log(projects)
  return(
    <Header title="project">
      <img src={photo} alt=""/>
      <ul>
        {projects.map(project=>{
          return(
          <li key={project}>{project}</li>
          )})}
      </ul>
      <button type="button" onClick={handleAddProject}>Adicionar</button>
    </Header>
  )
}
export default App