import { OrbitProgress } from "react-loading-indicators";

export const LoadingComponent = () => {
  return (
    <>
      <div
        style={{
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          backgroundColor: "#00000088",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <OrbitProgress color="#32cd32" size="medium" text="" textColor="" />
      </div>
    </>
  );
};
