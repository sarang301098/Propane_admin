import { status } from "../../utils/constants/orderStatus";

interface Prop {
  status: string;
  className?: string;
}

const OrderStatus: React.FC<Prop> = (props) => {
  return (
    <>
      {status.map((val) =>
        props.status === val.StatusName ? (
          <span
            key={val.id}
            className={`badge badge-pill badge-${val.color} ${
              props.className ? props.className : ""
            }`}
          >
            {val.name}
          </span>
        ) : null
      )}
    </>
  );
};
export default OrderStatus;
