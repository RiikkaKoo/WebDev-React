const Pizzacard = ({ pizza }) => {
  console.log(pizza);
  return (
    <>
      <div className="card">
        <h2>{pizza.name}</h2>
        <p>{pizza.price}</p>
        <div>Pizza info tulee tähän</div>
      </div>
    </>
  );
};

export default Pizzacard;
