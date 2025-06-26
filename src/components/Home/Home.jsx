import React,{ useState, useEffect,useContext } from "react"
import "./Home.css"
import { Navigate } from "react-router-dom"
import Hero from "./Hero"
import Features from "./Features"
import { Context } from "../../main"
export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  // const { isAuthorized } = useContext(Context);
  // if (!isAuthorized) {
  //   return <Navigate to={"/login"} />;
  // }
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="landing-page">
      <main>
        <Hero />
        <Features />
      </main>
    </div>
  )
}
