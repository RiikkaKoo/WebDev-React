import "./App.css";
import Greeting from "./components/greeting";
import Footer from "./components/Footer";
import Pizzamenu from "./components/Pizzamenu";

const App = () => {
  const sitename = "Minun Vite sivu";
  const styles = {
    backgroundColor: "darkgoldenrod",
    color: "white",
  };

  return (
    <>
      <h1 style={styles}>{sitename}</h1>
      <Greeting name="Riikka" />
      <Greeting name="Joku" age={25} isTeacher={false} />
      <Greeting name="Ope" age={40} isTeacher={true} />
      <p>Ylempi tuli komponenttina</p>
      <Pizzamenu></Pizzamenu>
      <Footer />
    </>
  );
};
export default App;
