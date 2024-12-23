import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [games, setGames] = useState([]);
  const [selectedGames, setSelectedGames] = useState([null, null, null]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [stoppingIndex, setStoppingIndex] = useState(-1);
  const [showDetails, setShowDetails] = useState(false);
  const [intervalId, setIntervalId] = useState(null); // Store the interval ID

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
          // description: record.fields["한줄 설명"] || "설명이 없습니다.",
          videoUrl: record.fields["영상 설명"] || "영상이 없습니다.",
          // hashtag: record.fields["장르"],
          // whatGame: record.fields["어떤 게임 좋아해요?"],
          // numberOfPeople: record.fields["인원수"],
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
    setShowDetails(false); // slot이 돌아가는 동안 게임 데이터 숨기기

    const interval = setInterval(() => {
      setSelectedGames((prev) =>
        prev.map(() => games[Math.floor(Math.random() * games.length)])
      );
    }, 100);

    setIntervalId(interval); // Store the interval ID
  };

  const stopSpinning = () => {
    if (!isSpinning) return; // Prevent further actions if already stopped

    clearInterval(intervalId); // Stop the spinning interval

    stopSlotMachine(0); // 차근차근 슬롯 멈추기
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
        setShowDetails(true); // Show details when spinning stops
      }
    }, 1000); // Delay between each slot stopping
  };

  return (
    <div className="container">
      <div className="black-section">
        <div className="slot-machine-outter">
          <div className="slot-machine-inner">
            <div className="game-course">
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
                          objectFit: "cover", // 슬롯 사이즈에 맞추기
                        }}
                      />
                    ) : (
                      <div className="placeholder">?</div>
                    )}
                  </div>
                ))}
              </div>
              <button
                className="start-button"
                onClick={isSpinning ? stopSpinning : startSpinning}
              >
                {isSpinning ? "STOP" : "START"}
              </button>
            </div>
            {showDetails && ( // Conditionally render game details based on showDetails state
              <div className="game-details">
                {selectedGames.map((game, index) => (
                  <div key={index} className="game-card">
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
      </div>
      <div className="grid-section"></div>
    </div>
  );
};

export default App;
