import Pizzacard from "./Pizzacard";

import pizza_img from "./assets/images/pizza_img.jpg";

const pizzas = [
  { id: 1, name: "Opera Special", price: 14.95 },
  { id: 2, name: "Mozzarella", price: 12.95 },
  { id: 3, name: "Americano", price: 13.49 },
];

const Pizzamenu = () => {
  return (
    <div id="pizzamenu">
      <h1>Pizza Menu</h1>
      <div id="pizzacards-container">
        {pizzas.map((pizza) => (
          <Pizzacard key={pizza.id} pizza={pizza} />
        ))}
      </div>
    </div>
  );
};

export default Pizzamenu;
