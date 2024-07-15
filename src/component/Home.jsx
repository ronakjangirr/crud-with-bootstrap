import React, { useState, useEffect, Suspense } from "react";
import axios from "axios";
// import Price from "./Price";
// Lazy load the Price component
const Price = React.lazy(() => import("./Price"));

function Home() {
  const [add, setAdd] = useState(0);
  const handleIncrease = () => {
    setAdd(add + 1);
  };
  return (
    <>
      <h2>Home</h2>
      Count:{add}
      {add > 2 && (   // Here we are using lazy loading component to show Price componsnt only when add will be more that 2
        <Suspense fallback={<div>Loading Price...</div>}>
          <Price />
        </Suspense>
      )}
      <button onClick={handleIncrease}>Increase</button>
    </>
  );
}

export default Home;
