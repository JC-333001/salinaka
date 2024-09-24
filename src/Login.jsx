import React, { useState } from 'react';  
import { useNavigate } from 'react-router-dom';  

function LoginPage() {  
  const [username, setUsername] = useState('');  
  const [password, setPassword] = useState('');  
  const navigate = useNavigate();  
  
  const handleLogin = () => {  
    // 从本地拿到getItem
    const savedUsername = localStorage.getItem('username');  
    const savedPassword = localStorage.getItem('password');  
    if(savedUsername&&savedPassword){
      if ( savedUsername == username && savedPassword == password) {  
        // 登录成功  
        // 在本地添加内容
        localStorage.setItem('isLoggedIn', 'true');  
        navigate('/home'); // 页面跳转到 home 页面  
      } else{
        alert('error')
      }
    }else {  
      // setItem('添加到本地的属性'，'属性值')
      localStorage.setItem('username',username)
      localStorage.setItem('password',password)
      localStorage.setItem('isLoggedIn', 'true');  
      navigate('/home');
      // alert('登录失败，请检查用户名和密码');  
    }  
  };  

  // 在加载页面时，如果用户已经登录，直接跳转到首页  
  // if (localStorage.getItem('isLoggedIn')) {  
  //   navigate('/home');  
  // }  

  return (  
    <div>  
      <input  
        type="text"  
        // value={username}  
        onChange={(e) => setUsername(e.target.value)}  
        placeholder="用户名"  
      />  
      <input  
        type="password"  
        // value={password}  
        onChange={(e) => setPassword(e.target.value)}  
        placeholder="密码"  
      />  
      <button onClick={handleLogin}>登录</button>  
    </div>  
  );  
}  

export default LoginPage;