import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Coins, ShoppingBag, Mic, MicOff } from 'lucide-react';
import Confetti from 'react-confetti';
import {
  playBackgroundMusic,
  stopBackgroundMusic,
  playCorrectSound,
  playIncorrectSound,
  playTimerSound,
  stopTimerSound,
  playCelebrationSound,
} from '../utils/audio';

const Game: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [celebration, setCelebration] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    generateQuestion();
    playBackgroundMusic();
    return () => {
      stopBackgroundMusic();
      stopTimerSound();
      stopSpeechRecognition();
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 3 && prevTime > 0) {
          playTimerSound();
        }
        if (prevTime <= 0) {
          stopTimerSound();
          handleSubmit();
        }
        return prevTime > 0 ? prevTime - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [question]);

  const generateQuestion = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setQuestion(`${num1} + ${num2}`);
    setAnswer('');
    setTimeLeft(10);
    setIsCorrect(null);
    setCelebration('');
    setShowConfetti(false);
  };

  const handleSubmit = () => {
    const correctAnswer = eval(question);
    if (parseInt(answer) === correctAnswer) {
      const earnedPoints = Math.max(10, timeLeft * 10);
      setScore(score + earnedPoints);
      setIsCorrect(true);
      playCorrectSound();
      celebrateAnswer(timeLeft);
    } else {
      setIsCorrect(false);
      playIncorrectSound();
      setCelebration('Oops! Try again!');
    }
    setTimeout(generateQuestion, 3000);
  };

  const celebrateAnswer = (timeLeft: number) => {
    if (timeLeft >= 8) {
      setCelebration('Insane!');
      setShowConfetti(true);
      playCelebrationSound();
    } else if (timeLeft >= 6) {
      setCelebration('You rock!');
      setShowConfetti(true);
      playCelebrationSound();
    } else if (timeLeft >= 4) {
      setCelebration('Awesome!');
    } else {
      setCelebration('Good!');
    }
  };

  const startSpeechRecognition = () => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.lang = user?.language === 'sv' ? 'sv-SE' : 'en-US';
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = false;

      recognitionRef.current.onresult = (event) => {
        const last = event.results.length - 1;
        const number = event.results[last][0].transcript.trim();
        if (/^\d+$/.test(number)) {
          setAnswer(number);
          setTimeout(() => {
            handleSubmit();
          }, 1000);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };

      recognitionRef.current.start();
      setIsListening(true);
    } else {
      console.error('Speech recognition not supported');
    }
  };

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const toggleSpeechRecognition = () => {
    if (isListening) {
      stopSpeechRecognition();
    } else {
      startSpeechRecognition();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300">
      {showConfetti && <Confetti />}
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-3xl font-bold mb-4 text-purple-600">Math Challenge</h2>
        <p className="mb-2 text-lg">Welcome, {user?.username}! 🎉</p>
        <p className="mb-4 text-md">Difficulty: {user?.difficulty} 🌟</p>
        <div className="flex justify-between mb-4">
          <div className="flex items-center">
            <Coins className="w-6 h-6 text-yellow-500 mr-2" />
            <span className="text-xl font-bold">{score}</span>
          </div>
          <button
            onClick={() => navigate('/store')}
            className="flex items-center bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition duration-200"
          >
            <ShoppingBag className="w-4 h-4 mr-2" />
            Store
          </button>
        </div>
        <div className="mb-6">
          <p className="text-3xl font-bold mb-2">{question}</p>
          <p className="text-lg">Time left: {timeLeft}s ⏳</p>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-200"
              style={{ width: `${(timeLeft / 10) * 100}%` }}
            ></div>
          </div>
        </div>
        <div className="mb-4">
          <input
            type="number"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            className="w-full p-3 mb-4 border-2 border-purple-300 rounded-lg text-xl"
            placeholder="Your answer"
          />
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200 text-xl"
          >
            Submit
          </button>
        </div>
        <button
          onClick={toggleSpeechRecognition}
          className={`w-full p-3 rounded-lg transition duration-200 text-xl flex items-center justify-center ${
            isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
          } text-white`}
        >
          {isListening ? <MicOff className="mr-2" /> : <Mic className="mr-2" />}
          {isListening ? 'Stop Voice Input' : 'Start Voice Input'}
        </button>
        {celebration && (
          <p className={`mt-4 text-2xl font-bold ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
            {celebration}
          </p>
        )}
      </div>
    </div>
  );
};

export default Game;