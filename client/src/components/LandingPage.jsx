import React from "react";
import { Link } from "react-router-dom";
//import styles from "./LandingPage.module.css";
import Button from './Button'

export default function LandingPage() {
  return (
      <div className="Landing">
        <Link to="/home">
          <Button>¡Let's play!</Button>
        </Link>
      </div>
  );
}
