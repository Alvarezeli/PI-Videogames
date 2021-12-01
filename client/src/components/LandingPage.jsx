import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Y buuuueno... Aca deberia ir algo súper ocurrente e inteligente</h1>
      <Link to="/home">
        <button>¡Let's play!</button>
      </Link>
    </div>
  );
}
