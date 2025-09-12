import { fastify } from 'fastify'
import {DataBaseMemory} from './database-memory.js'
import path from 'path'
import { fileURLToPath } from 'url'
import ejs from 'ejs'
import fastifyView from '@fastify/view'

const app = fastify();
const database = new DataBaseMemory()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)

app.register(fastifyView, {
  engine: {
    ejs
  }
})

app.register(import('@fastify/static'), {
  root: path.join(__dirname, '..'),
  //prefix: '/public/', // optional: default '/'
 // constraints: { host: 'example.com' } // optional: default {}
})

app.get('/', (req,res)=>{
    res.view('views/index.ejs')
    //res.sendFile(path.join(__dirname, '..','views','index.html'))
})

app.get('/register', (req, res) => {
     res.view('views/register.ejs')

   // const register = database.list()
    //return register
})

app.post('/register',(req,res)=>{
    const {name,lastname,email,password} = req.body

    database.create({
        //Feito em short syntax, o nome da chave é igual ao nome do valor
        name,
        lastname,
        email,
        password
    })
    //Metodo http 201 retorna que algo foi criado
    return res.status(201).send()
})

app.put('/register/:id', (req,res)=>{
    const accountId = request.params.id
    const {name,lastname,email,password} = req.body

    const account = database.update(accountId,{
        name,
        lastname,
        email,
        password
    })
    //Metodo 204 manda uma resposta de confirmação, mas sem informações adicionais
    return res.status(204).send()
})

app.delete('/register', (req,res)=>{
    const accountId = request.params.id
    
    database.delete(accountId)
    return res.status(204)
})

app.listen({
    port:3000, function () {
        console.log(`Servidor rodando em http://localhost${port}`)
    }  
})