const express = require('express')
const {uuid, isUuid} = require('uuidv4')

const app = express()

/**
 * Métodos HTTP
 * GET: Buscar informações do back-end
 * POST: Enviar informações no back-end
 * PUT/PATCH: Alterar informações no back-end
 * DELETE: Deletar informações no back-end
 */

 /**
  * Tipos de parâmetros:
  * 
  * Query params: Filtros e paginação
  * Route params: Identificador recursos (atualizar/deletar)
  * Req body: Conteúdo na hora de criar ou editar um recurso (json)
  */

  /**
   * Middleware
   * 
   * Interceptador de requisições que interrompe totalmente a requisição ou altera dados da requisição
   */

app.use(express.json())
app.use(logRequests)
app.use('/projects/:id', isValidate) //aplicando isValidate em todas as rotas que contenham projects/:id

const projects = []

function logRequests(req, res, next){
  const {method, url} = req
  const logLabel = `[${method.toUpperCase()}] ${url}`
  console.log(logLabel)
  return next()
}

function isValidate(req, res, next){
  const {id} = req.params
  if(!isUuid(id)){
    return res.status(404).json({error: "Not found project ID"})
  }
  return next()
}


app.get('/projects', (req, res)=>{
  const {title} = req.query
  const results = title
  ? projects.filter(project => project.title.includes(title)) 
  : projects

  return res.json(results)
})

app.post('/projects', (req,res)=>{
  const {title, owner} = req.body

  const project = {id: uuid(), title, owner}
  projects.push(project)

  console.log(title)
  console.log(owner)
  return res.json(project)
})

app.put('/projects/:id', (req,res)=>{
  const {id} = req.params
  const {title, owner} = req.body

  const project = {
    id,
    title,
    owner
  }
  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex<0){
    return res.status(404).json({error: "project not found"})
  }

  projects[projectIndex]=project

  return res.json(project)
})

app.delete('/projects/:id', (req,res)=>{
  const {id} = req.params
  
  const projectIndex = projects.findIndex(project => project.id === id)

  if(projectIndex<0){
    return res.status(404).json({error: "project not found"})
  }

  projects.splice(projectIndex, 1)
  return res.status(204).send()
})

app.listen(3333, ()=>{
  console.log('back-end started!')
})