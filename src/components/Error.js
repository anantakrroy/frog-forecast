import "../styles/Error.css";

function Error({error}) {
    // {console.log(error)}
  return <h1>{error.error.message}</h1>;
}

export default Error;
