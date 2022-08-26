import { Bars } from "react-loader-spinner";

export const BarsLoader = () => {
  const overlay: Record<string, string> = {
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    position: "fixed",
    background: "rgba(255, 255, 255,0.9)",
    zIndex: "99999",
  };

  const overlayInner: Record<string, string> = {
    left: "0",
    top: "0",
    width: "100%",
    height: "100%",
    position: "absolute",
  };

  const overlayContent: Record<string, string> = {
    left: "50%",
    position: "absolute",
    top: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={overlay}>
      <div style={overlayInner}>
        <div style={overlayContent}>
          <Bars color="#cc5300" height={50} width={50} ariaLabel="loading" />
        </div>
      </div>
    </div>
  );
};
