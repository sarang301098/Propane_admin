import { toast } from "react-toastify";

const errorToast = (msg: string) => {
  toast.error(msg);
  toast.clearWaitingQueue();
};
const successToast = (msg: string) => toast.success(msg);
const warningToast = (msg: string) => toast.warning(msg);
export { errorToast, successToast, warningToast };
