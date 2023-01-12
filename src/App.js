import React, { useEffect, useRef, useState } from 'react';
import logo from './asset/enliple_logo.png';
import data from './data/dataSet';
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import './App.css';
import Swal from "sweetalert2";

function App() {
  const [webUrl , setWebUrl] = useState('');
  const [titleMsg ,setTitleMsg] = useState('');
  const [subMsg ,setSubMsg] = useState('');
  const [menu,setMenu] = useState('');
  
  const radioRef = useRef([]);

  useEffect(()=>{
    console.log("dom refresh");
  })

  const suggestFn = () =>{
    const randomNum = Math.floor(Math.random() * data.length)
    const dumpData = data[randomNum];
    let _url = "";
    
    for(let x=0; x < radioRef.current.length; x++){
      if(radioRef.current[x].checked){
        _url =  `/${radioRef.current[x].value}/${webUrl}`;
        break;
      }
    }

      axios({
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
        if(err.response.status !== 200)
        Swal.fire('[Web Hook 전송 실패] \n Web Hook url 확인 해주세요.');
      });

      setMenu(`오늘의 메뉴 ${dumpData.name}`);
  }

  const saveFn = ()=>{
    localStorage.setItem("webUrl",webUrl);
    localStorage.setItem("titleMsg",titleMsg);
    localStorage.setItem("subMsg",subMsg);
  }

  const loadFn = () => {
    setWebUrl(localStorage.getItem("webUrl"));
    setTitleMsg(localStorage.getItem("titleMsg"));
    setSubMsg(localStorage.getItem("subMsg"));
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
                        
                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="radio" id="flexRadioDefault1"  value="hiworks" ref={(el)=> radioRef.current[0] = el}    defaultChecked={true}/>
                          <label className="form-check-label" htmlFor="flexRadioDefault1">
                            hiworks
                          </label>
                        </div>

                        <div className="form-check form-check-inline">
                          <input className="form-check-input" type="radio" name="radio" id="flexRadioDefault2" value="slack" ref={(el)=> radioRef.current[1] = el} />
                          <label className="form-check-label" htmlFor="flexRadioDefault2">
                            slack
                          </label>
                        </div>
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

                    <div className="container-contact100-form-btn">
                        <button className="contact100-form-btn" onClick={saveFn}>
                            저장
                        </button>
                    </div>

                    <div className="container-contact100-form-btn">
                        <button className="contact100-form-btn" onClick={loadFn}>
                            불러오기
                        </button>
                    </div>

                </form>
            </div>
        </div>
    </div>

  );
}

export default App;
 