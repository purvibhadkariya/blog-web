
import { IToast } from '@/models/models'
import styles from  './toast.module.css'

const Toast = (props:IToast) => {
    return (
        <div className={styles.toast_container_custom}>
            <div className={styles.toast_wrapper+  " "+ (props.type === "success"? styles.toast_success_msg : styles.toast_error_msg)}>{props.message}</div>
        </div>
      )
}

export default Toast