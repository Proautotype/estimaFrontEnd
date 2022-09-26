import { GiAbstract038, GiAce, GiCloudRing, GiDominoTiles, GiDonkey, GiPokerHand, Gi3DHammer } from "react-icons/gi";

export const ALL_GAMES = [
  {
    title: "Score Card",
    icon: <GiAbstract038 className="game-card-icon" size="small" />,
    description: "",
    id: 0,
    route: "games/showcard"
  },
  {
    title: "I Doubt It",
    icon: <GiPokerHand className="game-card-icon" size="small" />,
    description: "",
    id: 1,
    route: "games/doubtit"
  },
  {
    title: "31 Scat",
    icon: <GiAce className="game-card-icon" size="small" />,
    description: "",
    id: 2,
    route: "/"
  },
  {
    title: "Domino | Fan tan",
    icon: <GiDominoTiles className="game-card-icon" size="small" />,
    description: "",
    id: 3,
    route: "/"
  },
  {
    title: "Spoons",
    icon: <GiDonkey className="game-card-icon" size="small" />,
    description: "",
    id: 4,
    route: "/"
  },
  {
    title: "Hammer",
    icon: <Gi3DHammer className="game-card-icon" size="small" />,
    description: "",
    id: 5,
    route: "/"
  },
  {
    title: "Chat",
    icon: <GiCloudRing className="game-card-icon" size="small" />,
    description: "Link up",
    id: 6,
    route: "chat"
  },
]