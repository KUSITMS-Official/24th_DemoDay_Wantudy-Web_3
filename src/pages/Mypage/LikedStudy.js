import React, {useState, useEffect} from 'react'
import axios from 'axios';
import { withRouter, useLocation, useHistory } from 'react-router';
import NavbarWhite from '../Navbar/NavbarWhite';
import Footer from '../Footer/Footer';
import '../../css/mypageMore.css';

function LikedStudy() {
    const location = useLocation();
    const userInfo = location.state.userInfo;
    let history = useHistory();
    const [likedList,setLikedList]= useState(["",])

    useEffect(async()=>{
        const response = await axios.get(`http://13.209.66.117:8080/users/${userInfo.userId}/like-studylist`);
        console.log(response);
        setLikedList(response.data);
    },[]);

    return (
        <div>
            <img src="img/Group 414.png" className="likedStudyImg"/>
            <NavbarWhite userInfo={userInfo}/>
            <div className="myMorePageContainer">
            <div className="myMorePageBanner">
              <div className="myMorePageTitleText">
                <p>đ ę´ěŹ ěë ě¤í°ë<br/>{userInfo.nickname}ëě´ ě¤íŹëŠí ę´ěŹ ěë ě¤í°ëěëë¤.</p>
                
              </div>
            </div>

                {
                  (likedList[0] != "" && likedList.msg != "ě°í ě¤í°ëę° ěěľëë¤")
                  ? likedList.map((a,i)=>{
                      return <LikedList likedList = {likedList[i]} i={i} userInfo={userInfo}/>
                  })
                  : "ě°í ě¤í°ëę° ěěľëë¤"
                }

            
          </div>
            <Footer/>
        </div>
    )
}

function LikedList(props){

  let history = useHistory();

  function checkDeadline(deadline) {
    if (deadline.valueOf() > new Date().toISOString().valueOf()){
      return <div>ëŞ¨ě§ě¤</div>
    }
    else{
      return <div>ëŞ¨ě§ ěëŁ</div>
    }
  }

  function calculateDate(date){
    let year = date.slice(0, 4);
    let month = date.slice(5,7);
    let day = date.slice(8,10);
    var now = new Date();	// íěŹ ë ě§ ë° ěę°
    var newDay = day - now.getDate()
    if (newDay > 0) {return '- ' + newDay}
    else if (newDay == 0) { return '- Day'}
    else if (newDay < 0 ) {return '+ ' + Math.abs(newDay)}
  }

  function likedStudyClickHandler(){
    history.push({
      pathname: `post/${props.likedList.StudyId}`,
      state: {userInfo: props.userInfo}
    })
  }

  return(
    <>
      <div>
          <div className="likedListContainer">
            <div className="likedList" onClick={likedStudyClickHandler}>
              <img src="img/Vector.png" className="bookMarkVector"/>
              <div className="likedStudyName">
                {props.likedList.studyName}
              </div>

              <div className="likedStudyStatus">
                <div>
                  {checkDeadline(props.likedList.deadline)}
                </div>
                <div>ë§ę° D {calculateDate(props.likedList.deadline)}</div>
                <div>
                  ě¸ě ííŠ {`${props.likedList.currentNum}/${props.likedList.peopleNum}`} 
                </div>
              </div>
            </div>
            
          </div>
        </div>
    </>
  )
}

export default LikedStudy
