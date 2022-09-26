import { useNavigate } from "react-router";
import { motion } from "framer-motion";
export default function GameCard({ title, icon, description, id,route }) {
    const navigate = useNavigate();
    const games_view_item = {
      hidden: { opacity: 0 },
      show: { opacity: 1 },
    };
    const card_image_variant = {
      hidden: { opacity: 0 },
      show: { opacity: 1, transition: {} },
    };
    function openGame(e) {
      e.preventDefault();
      navigate(route);
    }
    return (
      <motion.div
        className="game-card"
        variants={games_view_item}
        onClick={openGame}
      >
        <p className="game-card-title">{title}</p>
        <motion.div
          className="game-card-image"
          variants={card_image_variant}
          animate={{
            rotateY: 180,
            transition: {
              duration: 1,
              repeat: Infinity,
              repeatDelay: Math.floor(Math.random() * (Math.floor(Math.random() * 15)) + 10),
              ease: Math.floor(Math.random() * 15) > 7 ? "circInOut" : "anticipate"
            },
          }}
        >
          {icon}
        </motion.div>
        <motion.canvas
            onDragEnter={(canvasEvent)=>{
                console.log("canvasEvent ", canvasEvent)
            }}
        >

        </motion.canvas>
      </motion.div>
    );
  }
  