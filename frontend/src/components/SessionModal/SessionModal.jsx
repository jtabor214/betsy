import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import * as modalActions from '../../store/modals';
import './SessionModal.css';

function SessionModal({ onSuccess }) {
  const dispatch = useDispatch();
  const modalType = useSelector(state => state.modals.type);
  const sessionUser = useSelector(state => state.session.user);


  if(!modalType) return null;
  if(sessionUser) return null;

  const goBack = (e) => {
    e.preventDefault();
    dispatch(modalActions.hideModal());
  };

  return (
    <Modal >
      <div className="session-modal">
        <button className='back-button' onClick={goBack}><i id="close-icon" className="fa-solid fa-x"></i></button>
        <div className="session-modal-header">
          <h1 id='title'>{modalType === "login" ? "Sign In" : "Create your account"}</h1>
          <button id="register-button" onClick={() => dispatch(modalActions.showModal(modalType === "login" ? "signup" : "login"))}>
            {modalType === "login" ? "Register" : "Log in" }
          </button>
        </div>
        {modalType === "login" ? (
          <LoginForm onSuccess={onSuccess} />
        ) : (
          <SignupForm onSuccess={onSuccess} />
        )}
      </div>
    </Modal>
  );
}

export default SessionModal;