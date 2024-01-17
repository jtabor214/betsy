import { useSelector, useDispatch } from "react-redux";
// import { useNavigate, useParams } from "react-router-dom";
import Modal from "../Modal/Modal";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import * as modalActions from '../store/modals';

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
        <button className='back-button' onClick={goBack}>Back</button>
        <h1>{modalType === "login" ? "Log In" : "Sign Up"}</h1>
        {modalType === "login" ? (
          <LoginForm onSuccess={onSuccess} />
        ) : (
          <SignupForm onSuccess={onSuccess} />
        )}
        <button
          className="link"
          onClick={() => dispatch(modalActions.showModal(modalType === "login" ? "signup" : "login"))}
        >
          {modalType === "login" ? "Sign up" : "Log in" } instead
        </button>
      </div>
    </Modal>
  );
}

export default SessionModal;