

// function App() {
//   return (
//     <div className="App">
//       Hola Mundo
//     </div>
//   );
// }

// export default App;

import React from "react";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";

function App() {
  return (
    <div className="App">
      <NavBar />
      <ItemListContainer greeting="Hello, world!" />
    </div>
  );
}

export default App;

