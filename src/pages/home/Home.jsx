import React from "react";
import "./Home.css";
import Topbar from "../../components/topbar/Topbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import Timeline from "../../components/Timeline/Timeline";
import Rightbar from "../../components/Rightbar/Rightbar";

function Home() {
  return (
    <>
      <Topbar />
      <div className="homeContainer">
        <Sidebar />
        <Timeline toHome={true} />
        <Rightbar />
      </div>
    </>
  );
}

export default Home;
