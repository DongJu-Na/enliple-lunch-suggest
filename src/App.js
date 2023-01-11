import React, { useEffect, useState } from 'react';
import logo from './asset/enliple_logo.png';
import data from './data/dataSet';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './App.css'

function App() {
  const [titleMsg ,setTitleMsg] = useState('');
  const [subMsg ,setSubMsg] = useState('');
  const [menu,setMenu] = useState('');
  const [webUrl , setWebUrl] = useState('');

  useEffect(()=>{

  })

  const suggestFn = () =>{
    const randomNum = Math.floor(Math.random() * data.length)
    const dumpData = data[randomNum];
    let _url = "";
    setMenu(`오늘의 메뉴 ${dumpData.name}`);
    console.log(process.env.NODE_ENV);
    

    if(process.env.NODE_ENV !== "development")
      _url = webUrl;
    else
      _url = '/api/';
    
      const req = axios({
        method: 'post',
        url: _url,
        withCredentials: true,
        data: {
          "text" : `오늘의 메뉴는 ${dumpData.name} 입니다. \n페이코 식권 사용여부 ${dumpData.paycoYn === "Y" ? "예" : "아니요"} \n${titleMsg} \n${subMsg}`
        }
      }).then((res)=>{
        console.log(res);
      }).catch((err)=>{
        console.log(err);
      });
    


  }

  return (

    <div className="bg-contact100">
        <div className="container-contact100">
            <div className="wrap-contact100">
                <div className="contact100-pic js-tilt" data-tilt>
                    <img src="https://i.imgur.com/VRFiMzM.png" alt="IMG" />
                    <br/>
                </div>
                <form className="contact100-form validate-form" onSubmit={(e)=>{e.preventDefault()}}>
                    <span className="contact100-form-title">
                      <img src={logo} alt="IMG" />
                      {menu}
                    </span>
                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" placeholder="Web Hook url" value={webUrl} onChange={(e)=>setWebUrl(e.target.value)} />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-user" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="wrap-input100 validate-input">
                        <input className="input100" type="text" placeholder="메세지" value={titleMsg} onChange={(e)=>{setTitleMsg(e.target.value)}} />
                        <span className="focus-input100"></span>
                        <span className="symbol-input100">
                            <i className="fa fa-envelope" aria-hidden="true"></i>
                        </span>
                    </div>
                    <div className="wrap-input100 validate-input">
                        <textarea className="input100" placeholder="추가 메세지" value={subMsg} onChange={(e)=>{setSubMsg(e.target.value)}}></textarea>
                        <span className="focus-input100"></span>
                    </div>
                    <div className="container-contact100-form-btn">
                        <button className="contact100-form-btn" onClick={suggestFn}>
                            전송
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

  );
}

export default App;
