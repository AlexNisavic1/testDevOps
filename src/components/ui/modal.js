import classes from './modal.module.css'
function Modal (props) {
    return (
      <div className={classes.modal}>
        {props.children}
      </div>
    )
}

export default Modal;