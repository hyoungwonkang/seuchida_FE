import React from 'react';
import styled from 'styled-components'
import Image from '../elements/Image';
import Modal from "../components/Modal/Modal"; //모달 창
import ModalPortal from "../components/Modal/Portal"; 
import FooterMenu from '../shared/FooterMenu';
import { useDispatch , useSelector} from 'react-redux';
import { actionCreators as postActions } from "../redux/modules/post";

const ReviewList = () => {
  const review_list = useSelector(state => state.post.review)
  const dispatch = useDispatch()
  const [modalOn, setModalOn] = React.useState(false);
  const openModal = (e) => {
    e.stopPropagation();
    setModalOn(true);
  };

  const closeModal = (e) => {
    setModalOn(false);
  };
  React.useEffect(() =>{
    dispatch(postActions.getReviewlistDB())

  },[])

  if(!review_list) return


  return (
    <>

<div style={{marginBottom:"80px"}}>
    {review_list?.map((review, index) => {
      return( 
        <div  key={review._id}>
      <ModalPortal>{modalOn && <Modal />}</ModalPortal>
        
        
        <ProfileBox>
         <Image
           margin="5px 15px 0px 0px"
             shape="circle"
             src={review.userImg}
             size={36}
             _onClick={openModal}
           />
 
           <User>
             <Master>{review.nickName}</Master>
             <div style={{color:"rgba(120, 120, 120, 1)"}}> {review.createdAt}</div>
           </User>
         </ProfileBox>
      {review.reviewImg? <Image
       shape="rectangle"
       size={390}
       src={review.reviewImg}
       />: null} 
       <Desc>{review.content} </Desc>
       <Info>
       <div><Icon>아이콘</Icon><span>{review.spot}</span></div>
       <div><Icon>아이콘</Icon><span>{review.postCategory}</span></div>
       
 </Info>
     </div>

      )
    } )}
   
    
    </div>  
    <FooterMenu/></>
  );
};

export default ReviewList;


const ProfileBox = styled.div`
  padding: 24px 24px 10px 24px;
  display: flex;
  flex-direction: row;
`;

const Master = styled.div`
font-weight: bold;

`
const Desc = styled.div`
max-width: 390px;
min-height: 60px;
padding: 12px 24px;

`

const Icon = styled.span`
margin-right: 8px;


`
const Info = styled.div`
display: flex;
flex-direction: column;
padding: 0px 24px 24px 24px;
border-bottom:  1px solid rgba(227, 227, 227, 1);
`

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;