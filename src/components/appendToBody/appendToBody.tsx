// @ts-nocheck

import { componentWillAppendToBody } from "react-append-to-body";

const MyComponent: React.FC = ({ children }) => {
  return (
    <div className="table-field-actions">
      {" "}
      <div className="btn-group dropdown">{children}</div>{" "}
    </div>
  );
};

export const AppendedMyComponent = componentWillAppendToBody(MyComponent);
