import { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);

  const [name, setName] = useState("Guest");

  const handleClickRight = () => {
    setCount(count + 1);
    console.log(count);
  };

  const handleTyping = (event) => {
    setName(event.target.value);
    console.log(name);
  };

  return (
    <>
      <div>
        <p>You clicked {count} times</p>
        <button onClick={handleClickRight}>Click me</button>
      </div>

      <input
        type="text"
        placeholder="Anna nimesi"
        value={name}
        onChange={handleTyping}
      />
    </>
  );
};

export default Counter;
