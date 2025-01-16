import React from 'react'
import Login from "../components/Login/login"
import { useNavigate } from "react-router-dom";

export default function LoginPage({ onLogin }) {
  return (
    <div>
      <Login onLogin={onLogin}/>
    </div>
  )
}