import { QuestionRender } from './components/QuestionRender'
import { QuestionForm } from './components/InputQuestion'
import './styles/global.scss'
import Header from './components/Header'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { UserManager } from './components/UserManager'
import { HomeRender } from './components/Home'
import { LoginForm } from './components/auth/LoginForm'

export function App(){

    return (
        <div>
    <BrowserRouter>
    <Header />
    <Routes>
    <Route path="/" element  = {<HomeRender />}/>
    <Route path="/answer" element = {<QuestionRender />}/>
    <Route path="/insert" element = {<QuestionForm />}/>
    <Route path="/user" element = {<UserManager />}/>
    <Route path="/login" element = {<LoginForm />}/>
    </Routes>
    </BrowserRouter>
       </div>
    )

}