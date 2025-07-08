import React, {useEffect, useState} from 'react';
import { ChevronDown, ChevronRight, Trophy, Star, Zap, Shield, Wallet, Lock, Users, CheckCircle, Brain, Play } from 'lucide-react';

const App = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [viewedQuestions, setViewedQuestions] = useState(new Set());
  const [score, setScore] = useState(0);
  const [quizMode, setQuizMode] = useState(false);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [answeredQuizQuestions, setAnsweredQuizQuestions] = useState(new Set());
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [showAnswer, setShowAnswer] = useState(false);
  const [isAllQuestionViewedFromLs, setIsAllQuestionViewedFromLs] = useState(false);

  const questions = [
    {
      id: 1,
      category: "Basics",
      icon: <Star className="w-5 h-5" />,
      question: "What is Native (GoNative)?",
      answer: "Native is a Web3 platform that allows using and earning on Bitcoin (BTC) in the Sui ecosystem, providing tools for decentralized finance (DeFi), cross-chain operations, and secure asset storage.",
      difficulty: "easy",
      quizQuestion: "What is the main purpose of Native (GoNative)?",
      quizOptions: [
        "Mining Bitcoin on Sui blockchain",
        "Using and earning on Bitcoin in the Sui ecosystem",
        "Creating new cryptocurrencies",
        "Trading NFTs on Sui"
      ],
      correctAnswer: 1
    },
    {
      id: 2,
      category: "Tokens",
      icon: <Wallet className="w-5 h-5" />,
      question: "What is nBTC?",
      answer: "nBTC is a tokenized version of Bitcoin on Sui, fully backed by real BTC. nBTC allows using Bitcoin in Sui DeFi applications, earning yield, and participating in new financial instruments while maintaining the ability to exchange back to original BTC.",
      difficulty: "easy",
      quizQuestion: "What is nBTC backed by?",
      quizOptions: [
        "Sui tokens",
        "Real Bitcoin (BTC)",
        "Ethereum",
        "USD reserves"
      ],
      correctAnswer: 1
    },
    {
      id: 3,
      category: "Basics",
      icon: <Star className="w-5 h-5" />,
      question: "Why can Bitcoin be used on Sui?",
      answer: "Bitcoin on Sui is implemented through a tokenized version of BTC (like nBTC), which is fully backed by real Bitcoin. This allows users to use BTC in Sui DeFi applications, earn yield, participate in farming and other activities.",
      difficulty: "easy",
      quizQuestion: "How is Bitcoin implemented on Sui?",
      quizOptions: [
        "Direct Bitcoin transactions",
        "Through a tokenized version like nBTC",
        "Bitcoin mining on Sui",
        "Cross-chain bridges only"
      ],
      correctAnswer: 1
    },
    {
      id: 4,
      category: "Technology",
      icon: <Zap className="w-5 h-5" />,
      question: "What is 2PC-MPC?",
      answer: "2PC-MPC (Two-Party Computation — Multi-Party Computation) is a cryptographic protocol that allows multiple parties to jointly manage private keys without the need to trust a single party. This approach provides a high level of security when managing digital assets.",
      difficulty: "medium",
      quizQuestion: "What does 2PC-MPC stand for?",
      quizOptions: [
        "Two-Party Computation — Multi-Party Computation",
        "Two-Phase Crypto — Multi-Phase Crypto",
        "Two-Point Connection — Multi-Point Connection",
        "Two-Party Contract — Multi-Party Contract"
      ],
      correctAnswer: 0
    },
    {
      id: 5,
      category: "Security",
      icon: <Shield className="w-5 h-5" />,
      question: "Why is it secure?",
      answer: "Security is ensured through 2PC-MPC protocols that eliminate the possibility of single-party access to funds, as well as through the use of SPV (Simplified Payment Verification) - a technology that allows verifying Bitcoin transactions without downloading the entire blockchain.",
      difficulty: "medium",
      quizQuestion: "What technology is used to verify Bitcoin transactions without downloading the entire blockchain?",
      quizOptions: [
        "SPV (Simplified Payment Verification)",
        "PoW (Proof of Work)",
        "PoS (Proof of Stake)",
        "DPoS (Delegated Proof of Stake)"
      ],
      correctAnswer: 0
    },
    {
      id: 6,
      category: "Decentralization",
      icon: <Users className="w-5 h-5" />,
      question: "What are dWallets and how do they ensure decentralization?",
      answer: "dWallets are decentralized wallets that allow users to manage their digital assets without trusting a single party. The key feature of dWallets is the use of multi-party computation (MPC), which eliminates the possibility of single control over private keys.",
      difficulty: "hard",
      quizQuestion: "What is the key feature of dWallets?",
      quizOptions: [
        "Cloud storage",
        "Multi-party computation (MPC)",
        "Biometric authentication",
        "Hardware security modules"
      ],
      correctAnswer: 1
    },
    {
      id: 7,
      category: "Security",
      icon: <Lock className="w-5 h-5" />,
      question: "How does Zero Trust work in blockchain?",
      answer: "Zero Trust is a security principle according to which no one is considered trusted by default. Every access to data or operations requires separate verification and confirmation. In blockchain, Zero Trust is implemented through constant authentication of users, devices, and transactions.",
      difficulty: "hard",
      quizQuestion: "What is the main principle of Zero Trust?",
      quizOptions: [
        "Trust everyone by default",
        "Trust only verified parties",
        "No one is considered trusted by default",
        "Trust based on reputation"
      ],
      correctAnswer: 2
    },
    {
      id: 8,
      category: "Technology",
      icon: <CheckCircle className="w-5 h-5" />,
      question: "What is permissionless proving?",
      answer: "Permissionless proving is the ability to confirm transactions and actions in the blockchain without needing permission from a central authority. In such systems, any user can participate in verification and validation of data, ensuring maximum openness and censorship resistance.",
      difficulty: "hard",
      quizQuestion: "What does permissionless proving allow?",
      quizOptions: [
        "Only authorized users to verify transactions",
        "Central authority to control all verifications",
        "Any user to participate in verification without permission",
        "Faster transaction processing"
      ],
      correctAnswer: 2
    }
  ];

  const handleQuestionClick = (questionId) => {
    if (openQuestion === questionId) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(questionId);
      if (!viewedQuestions.has(questionId)) {
        setViewedQuestions(new Set([...viewedQuestions, questionId]));
      }
    }
  };

  const startQuiz = () => {
    setQuizMode(true);
    setCurrentQuizQuestion(0);
    setAnsweredQuizQuestions(new Set());
    setScore(0);
    setSelectedAnswer('');
    setShowAnswer(false);
  };

  const handleAnswerSelect = (answerIndex) => {
    if (showAnswer) return;
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === '') return;

    const currentQuestion = questions[currentQuizQuestion];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    setShowAnswer(true);

    if (isCorrect) {
      const points = 30; // currentQuestion.difficulty === 'easy' ? 10 : currentQuestion.difficulty === 'medium' ? 20 : 30;
      setScore(prev => prev + points);
      setAnsweredQuizQuestions(new Set([...answeredQuizQuestions, currentQuestion.id]));
    }
  };

  const nextQuestion = () => {
    if (currentQuizQuestion < questions.length - 1) {
      setCurrentQuizQuestion(prev => prev + 1);
      setSelectedAnswer('');
      setShowAnswer(false);
    }
  };

  const restartQuiz = () => {
    setCurrentQuizQuestion(0);
    setAnsweredQuizQuestions(new Set());
    setScore(0);
    setSelectedAnswer('');
    setShowAnswer(false);
  };

  const exitQuiz = () => {
    setQuizMode(false);
    setCurrentQuizQuestion(0);
    setSelectedAnswer('');
    setShowAnswer(false);
  };

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'easy': return 'bg-green-500';
      case 'medium': return 'bg-yellow-500';
      case 'hard': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getCategoryColor = (category) => {
    switch(category) {
      case 'Basics': return 'bg-blue-100 text-blue-800';
      case 'Technology': return 'bg-purple-100 text-purple-800';
      case 'Tokens': return 'bg-green-100 text-green-800';
      case 'Security': return 'bg-red-100 text-red-800';
      case 'Decentralization': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const learningProgress = (viewedQuestions.size / questions.length) * 100;
  const allQuestionsViewed = viewedQuestions.size === questions.length;

  async function setAllQuestionViewed() {
    await localStorage.setItem('allQuestionsViewed', 1)
  };

  async function checkAllQuestionViewed() {
    const isViewed = await localStorage.getItem('allQuestionsViewed');

    if (Boolean(isViewed)) {
      setIsAllQuestionViewedFromLs(true);
    }
  }

  useEffect(() => {
    checkAllQuestionViewed().then().catch()
  }, [])

  useEffect(() => {
    if (allQuestionsViewed) {
      setAllQuestionViewed().then().catch();
    }
  }, [allQuestionsViewed])

  if (quizMode) {
    const currentQuestion = questions[currentQuizQuestion];
    const isLastQuestion = currentQuizQuestion === questions.length - 1;
    const quizCompleted = isLastQuestion && showAnswer;

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
          <div className="max-w-4xl mx-auto">
            {/* Quiz Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                🧠 Native Knowledge Quiz
              </h1>
              <div className="flex justify-center items-center gap-8 mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">{score}</span>
                  <span className="text-gray-300">points</span>
                </div>
                <div className="text-gray-300">
                  Question {currentQuizQuestion + 1} of {questions.length}
                </div>
              </div>
            </div>

            {!quizCompleted ? (
                <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`p-2 rounded-lg ${getCategoryColor(currentQuestion.category).replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 text-')}`}>
                      {currentQuestion.icon}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(currentQuestion.category)}`}>
                  {currentQuestion.category}
                </span>
                    <div className={`w-3 h-3 rounded-full ${getDifficultyColor(currentQuestion.difficulty)}`}></div>
                  </div>

                  <h2 className="text-2xl font-bold mb-6 text-white">
                    {currentQuestion.quizQuestion}
                  </h2>

                  <div className="space-y-3 mb-6">
                    {currentQuestion.quizOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleAnswerSelect(index)}
                            disabled={showAnswer}
                            className={`
                      w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                      ${selectedAnswer === index
                                ? showAnswer
                                    ? index === currentQuestion.correctAnswer
                                        ? 'border-green-500 bg-green-500/20'
                                        : 'border-red-500 bg-red-500/20'
                                    : 'border-blue-500 bg-blue-500/20'
                                : showAnswer && index === currentQuestion.correctAnswer
                                    ? 'border-green-500 bg-green-500/20'
                                    : 'border-gray-600 bg-gray-800/30 hover:border-gray-500'
                            }
                      ${showAnswer ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                        >
                          <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm">
                        {String.fromCharCode(65 + index)}
                      </span>
                            <span>{option}</span>
                            {showAnswer && index === currentQuestion.correctAnswer && (
                                <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                            )}
                          </div>
                        </button>
                    ))}
                  </div>

                  {showAnswer && (
                      <div className="mb-6 p-4 bg-gray-900/50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-300 mb-2">
                          {selectedAnswer === currentQuestion.correctAnswer ? (
                              <span className="text-green-400 font-semibold">✅ Correct!</span>
                          ) : (
                              <span className="text-red-400 font-semibold">❌ Incorrect</span>
                          )}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {currentQuestion.answer}
                        </p>
                        {selectedAnswer === currentQuestion.correctAnswer && (
                            <div className="mt-2 text-sm text-yellow-400">
                              +30 points
                            </div>
                        )}
                      </div>
                  )}

                  <div className="flex justify-between items-center">
                    <button
                        onClick={exitQuiz}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Exit Quiz
                    </button>

                    <div className="flex gap-3">
                      {!showAnswer ? (
                          <button
                              onClick={submitAnswer}
                              disabled={selectedAnswer === ''}
                              className={`
                        px-6 py-3 rounded-lg transition-colors
                        ${selectedAnswer === ''
                                  ? 'bg-gray-600 cursor-not-allowed'
                                  : 'bg-blue-600 hover:bg-blue-700'
                              }
                      `}
                          >
                            Submit Answer
                          </button>
                      ) : (
                          <button
                              onClick={nextQuestion}
                              disabled={isLastQuestion}
                              className={`
                        px-6 py-3 rounded-lg transition-colors
                        ${isLastQuestion
                                  ? 'bg-gray-600 cursor-not-allowed'
                                  : 'bg-green-600 hover:bg-green-700'
                              }
                      `}
                          >
                            {isLastQuestion ? 'Quiz Complete' : 'Next Question'}
                          </button>
                      )}
                    </div>
                  </div>
                </div>
            ) : (
                <div className="text-center">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-8 mb-6">
                    <Trophy className="w-16 h-16 mx-auto mb-4 text-white" />
                    <h2 className="text-3xl font-bold text-white mb-2">
                      🎉 Quiz Complete!
                    </h2>
                    <p className="text-white text-xl mb-4">
                      You scored {score} out of {questions.length * 30} points!
                    </p>
                    <p className="text-white opacity-90">
                      Correct answers: {answeredQuizQuestions.size}/{questions.length}
                    </p>
                  </div>

                  <div className="flex justify-center gap-4">
                    <button
                        onClick={restartQuiz}
                        className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
                    >
                      Restart Quiz
                    </button>
                    <button
                        onClick={exitQuiz}
                        className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Back to Learning
                    </button>
                  </div>
                </div>
            )}
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🎮 Native Knowledge Quest
            </h1>

            {!allQuestionsViewed && (
                <div className="mt-8 mb-4 text-center p-6 bg-gray-800/50 rounded-xl border border-gray-700">
                  <Brain className="w-12 h-12 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Explore all the questions
                  </h3>
                  <p className="text-gray-300">
                    View all {questions.length} questions to unlock the quiz and start earning points!                  </p>
                </div>
            )}


            {/* Progress */}
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Learning Progress:</span>
                <div className="w-32 bg-gray-700 rounded-full h-3">
                  <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${isAllQuestionViewedFromLs ? 100 : learningProgress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-300"> {isAllQuestionViewedFromLs ? '8/8' : (viewedQuestions.size  + "/" + questions.length)} </span>
              </div>
            </div>

            {/* Quiz Button */}
            {(allQuestionsViewed || isAllQuestionViewedFromLs) && (
                <div className="mb-8">
                  <button
                      onClick={startQuiz}
                      className="px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold rounded-xl hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 flex items-center gap-3 mx-auto"
                  >
                    <Brain className="w-6 h-6" />
                    Start Quiz & Earn Points!
                    <Play className="w-5 h-5" />
                  </button>
                </div>
            )}
          </div>

          {/* Questions Grid */}
          <div className="grid gap-4">
            {questions.map((q) => (
                <div
                    key={q.id}
                    className={`
                bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 
                transition-all duration-300 hover:bg-gray-700/50 hover:border-gray-600
                ${viewedQuestions.has(q.id) ? 'border-blue-500/50 bg-blue-900/20' : ''}
                cursor-pointer
              `}
                    onClick={() => handleQuestionClick(q.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(q.category).replace('text-', 'bg-').replace('bg-', 'bg-opacity-20 text-')}`}>
                        {q.icon}
                      </div>
                      <div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(q.category)}`}>
                      {q.category}
                    </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getDifficultyColor(q.difficulty)}`}></div>
                      {(viewedQuestions.has(q.id) || isAllQuestionViewedFromLs) && (
                          <CheckCircle className="w-5 h-5 text-blue-400" />
                      )}
                      {openQuestion === q.id ? (
                          <ChevronDown className="w-5 h-5 text-gray-400" />
                      ) : (
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-3 text-white">
                    {q.question}
                  </h3>

                  {openQuestion === q.id && (
                      <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border-l-4 border-blue-500">
                        <p className="text-gray-300 leading-relaxed">
                          {q.answer}
                        </p>
                      </div>
                  )}
                </div>
            ))}
          </div>

          <div className="mt-12 text-center text-gray-400">
            <p className="mb-4">Learn more about Native:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a target="_blank" href="https://gonative.cc/" className="hover:text-white transition-colors">
                🌐 Website
              </a>
              <a target="_blank" href="https://x.com/gonativecc" className="hover:text-white transition-colors">
                🐦 Twitter
              </a>
              <a target="_blank" href="https://t.me/Native_Announcement" className="hover:text-white transition-colors">
                📱 Telegram
              </a>
              <a target="_blank" href="https://discord.com/invite/gonative" className="hover:text-white transition-colors">
                💬 Discord
              </a>
            </div>
          </div>
        </div>
      </div>
  );
};

export default App;
