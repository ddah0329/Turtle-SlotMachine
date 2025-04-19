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
            <div className="game-images">
              {selectedGames.map((game, index) => (
                <div
                  key={index}
                  className={`game-slot ${
                    isSpinning && stoppingIndex < index ? "spinning" : ""
                  }`}
                >
                  {game && game.src ? (
                    <img
                      src={game.src}
                      alt={game.alt}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div className="placeholder">?</div>
                  )}
                </div>
              ))}
            </div>
            <div className="controls">
              <button
                className="start-button"
                onClick={isSpinning ? stopSpinning : startSpinning}
              >
                {isSpinning ? "STOP" : "START"}
              </button>
            </div>
          </div>
        </div>
        <div>
          {showDetails && (
            <div className="game-details">
              {selectedGames.map((game, index) => (
                <div key={index} className="game-card">
                  {/* <img
                    src={process.env.PUBLIC_URL + "/assets/detail-frame.png"}
                    alt="Game Detail Frame"
                    className="detail-frame-img"
                  /> */}

                  <img
                    src={game.src}
                    alt={game.alt}
                    style={{
                      width: "90%",
                      height: "70%",
                      objectFit: "cover",
                    }}
                  />

                  <div className="game-title">
                    {game ? game.alt : "게임 제목"}
                  </div>
                  {game && game.videoUrl !== "영상이 없습니다." && (
                    <a
                      href={game.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="video-button"
                    >
                      게임 방법
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default App;
