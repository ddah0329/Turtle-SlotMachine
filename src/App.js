import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

const App = () => {
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([null, null, null]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [stoppingIndex, setStoppingIndex] = useState(-1);
  const [showDetails, setShowDetails] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  const apiKey = process.env.REACT_APP_AIRTABLE_API_KEY;
  const baseId = process.env.REACT_APP_AIRTABLE_BASE_ID;
  const tableName = process.env.REACT_APP_AIRTABLE_TABLE_NAME;

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/${baseId}/${tableName}`,
          {
            headers: {
              Authorization: `Bearer ${apiKey}`,
            },
          }
        );
        const gameData = response.data.records.map((record) => ({
          src: record.fields.image[0].url,
          alt: record.fields["게임 명"],
          videoUrl: record.fields["영상 설명"] || "영상이 없습니다.",
        }));
        setGames(gameData);
      } catch (error) {
        console.error("데이터를 가져오는데 실패하였습니다.", error);
      }
    };

    fetchGames();
  }, [apiKey, baseId, tableName]);

  const startSpinning = () => {
    setIsSpinning(true);
    setStoppingIndex(-1);
    setSelectedGames([null, null, null]);
    setShowDetails(false);

    const interval = setInterval(() => {
      setSelectedGames((prev) =>
        prev.map(() => games[Math.floor(Math.random() * games.length)])
      );
    }, 100);

    setIntervalId(interval);
  };

  const stopSpinning = () => {
    if (!isSpinning) return;
    clearInterval(intervalId);
    stopSlotMachine(0);
  };

  const stopSlotMachine = (index) => {
    setTimeout(() => {
      setStoppingIndex(index);
      setSelectedGames((prev) => {
        const updated = [...prev];
        updated[index] = games[Math.floor(Math.random() * games.length)];
        return updated;
      });

      if (index < 2) {
        stopSlotMachine(index + 1);
      } else {
        setIsSpinning(false);
        setShowDetails(true);
      }
    }, 1000);
  };

  return (
    <div className="container">
      <Navbar />
      <div className="black-section" />
      <div className="yellow-section" />
      <div className="grid-section" />
      <div className="slot-machine">
        <div className="circle-section">
          {["1인", "2인", "3인", "4인", "5인", "6인", "7+인"].map(
            (text, idx) => (
              <div className="circle" key={idx}>
                {text}
              </div>
            )
          )}
        </div>
        <div className="inner-contents">
          <div className="machine-frame">
            <img
              src={process.env.PUBLIC_URL + "/assets/machine-frame.png"}
              alt="Slot Machine Frame"
              className="machine-frame-img"
            />
          </div>
          <div className="game-detail">
            {[0, 1, 2].map((_, idx) => (
              <div className="detail-frame" key={idx}>
                <img
                  src={process.env.PUBLIC_URL + "/assets/detail-frame.png"}
                  alt="Game Detail Frame"
                  className="detail-frame-img"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
