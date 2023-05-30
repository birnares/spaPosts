import React from 'react'
import MyButton from '../components/UI/button/MyButton';
import { Route, Routes, Link } from 'react-router-dom';
import About from '../Pages/About';

const NotFound = () => {
 return <div>
    <h1 style={{color: 'red', marginTop:10}}>Вы перешли на несуществующую страницу</h1>
    <MyButton style={{margin:'20px 280px'}}>
        <Link style={{textDecoration: 'none', color: 'teal',textAlign:'center'}} to='about'>Стандартное положение</Link>
        <Routes>
            <Route path='/about' element={<About/>}/>
        </Routes>
    </MyButton>
 </div>
}

export default NotFound