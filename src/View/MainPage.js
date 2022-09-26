import "../assets/scss/mainApp.scss";
import { SocketService } from "../services/SocketServices/SocketService";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import MediaRTC from "../services/MediaRTC";
import { ALL_GAMES } from "../assets/LiteralAssets";
import GameCard from "../components/showcard/GameCard";

function MainPage() {
  //states
  const [serverDetails, setServerDetails] = useState({
    host: "127.0.0.1",
    port: 8000,
    nsp: "",
  });
  const [userName, setUserName] = useState("winston");
  const [games, setGames] = useState(ALL_GAMES);
  //refs
  let videoRef = useRef();
  //
  const mrtc = new MediaRTC();

  //framer-variants
  const games_vd_variant = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        staggerDirection: -1,
        when: "beforeChildren",
      },
    },
  };

  async function playVideoFromCamera() {
    try {
      const constraints = { video: true, audio: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      // videoRef.current.srcObject = stream
      console.dir(videoRef.current);
    } catch (error) {
      console.error("Error opening video camera.", error);
    }
  }

  function checkNewDevices(type) {
    mrtc.MD.addEventListener("devicechange", (event) => {
      mrtc.getConnectedDevices(type).then((newDevices) => {
        console.log("newDevices ", newDevices);
      });
    });
  }

  return (
    <div className="App">
      
      <main>
        <p className="options-pick"></p>
        <motion.div
          className="games-view-display"
          variants={games_vd_variant}
          initial="hidden"
          animate="show"
        >
          {games.map((game, id) => (
            <GameCard
              key={game.id + id}
              title={game.title}
              icon={game.icon}
              description={game.description}
              id={game.id}
              route={game.route}
            />
          ))}
        </motion.div>
      </main>
    </div>
  );
}

export default MainPage;
