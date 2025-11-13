import PropTypes from "prop-types";

const Greeting = (props) => {
  console.log(props);
  const { name, age, isTeacher } = props;
  const teacherText = isTeacher ? "Olet opettaja." : "Et ole opettaja.";

  return (
    <>
      <div>
        Greetings {name}! Ikäsi on {age} vuotta. {teacherText}
      </div>
    </>
  );
};

// Type checks:
Greeting.propTypes = {
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  isTeacher: PropTypes.bool,
};

export default Greeting;
