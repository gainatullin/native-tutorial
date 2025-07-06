import React, { useState } from 'react';
import { ChevronDown, ChevronRight, Trophy, Star, Zap, Shield, Wallet, Lock, Users, CheckCircle } from 'lucide-react';

const App = () => {
  const [openQuestion, setOpenQuestion] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Set());
  const [score, setScore] = useState(0);

  const questions = [
    {
      id: 1,
      category: "Basics",
      icon: <Star className="w-5 h-5" />,
      question: "What is Native (GoNative)?",
      answer: "Native is a Web3 platform that allows using and earning on Bitcoin (BTC) in the Sui ecosystem, providing tools for decentralized finance (DeFi), cross-chain operations, and secure asset storage.",
      difficulty: "easy"
    },
    {
      id: 2,
      category: "Technology",
      icon: <Zap className="w-5 h-5" />,
      question: "What is 2PC-MPC?",
      answer: "2PC-MPC (Two-Party Computation — Multi-Party Computation) is a cryptographic protocol that allows multiple parties to jointly manage private keys without the need to trust a single party. This approach provides a high level of security when managing digital assets.",
      difficulty: "medium"
    },
    {
      id: 3,
      category: "Tokens",
      icon: <Wallet className="w-5 h-5" />,
      question: "What is nBTC?",
      answer: "nBTC is a tokenized version of Bitcoin on Sui, fully backed by real BTC. nBTC allows using Bitcoin in Sui DeFi applications, earning yield, and participating in new financial instruments while maintaining the ability to exchange back to original BTC.",
      difficulty: "easy"
    },
    {
      id: 4,
      category: "Security",
      icon: <Shield className="w-5 h-5" />,
      question: "Why is it secure?",
      answer: "Security is ensured through 2PC-MPC protocols that eliminate the possibility of single-party access to funds, as well as through the use of SPV (Simplified Payment Verification) - a technology that allows verifying Bitcoin transactions without downloading the entire blockchain.",
      difficulty: "medium"
    },
    {
      id: 5,
      category: "Decentralization",
      icon: <Users className="w-5 h-5" />,
      question: "What are dWallets and how do they ensure decentralization?",
      answer: "dWallets are decentralized wallets that allow users to manage their digital assets without trusting a single party. The key feature of dWallets is the use of multi-party computation (MPC), which eliminates the possibility of single control over private keys.",
      difficulty: "hard"
    },
    {
      id: 6,
      category: "Security",
      icon: <Lock className="w-5 h-5" />,
      question: "How does Zero Trust work in blockchain?",
      answer: "Zero Trust is a security principle according to which no one is considered trusted by default. Every access to data or operations requires separate verification and confirmation. In blockchain, Zero Trust is implemented through constant authentication of users, devices, and transactions.",
      difficulty: "hard"
    },
    {
      id: 7,
      category: "Technology",
      icon: <CheckCircle className="w-5 h-5" />,
      question: "What is permissionless proving?",
      answer: "Permissionless proving is the ability to confirm transactions and actions in the blockchain without needing permission from a central authority. In such systems, any user can participate in verification and validation of data, ensuring maximum openness and censorship resistance.",
      difficulty: "hard"
    },
    {
      id: 8,
      category: "Basics",
      icon: <Star className="w-5 h-5" />,
      question: "Why can Bitcoin be used on Sui?",
      answer: "Bitcoin on Sui is implemented through a tokenized version of BTC (like nBTC), which is fully backed by real Bitcoin. This allows users to use BTC in Sui DeFi applications, earn yield, participate in farming and other activities.",
      difficulty: "easy"
    }
  ];

  const handleQuestionClick = (questionId) => {
    if (openQuestion === questionId) {
      setOpenQuestion(null);
    } else {
      setOpenQuestion(questionId);
      if (!answeredQuestions.has(questionId)) {
        setAnsweredQuestions(new Set([...answeredQuestions, questionId]));
        const question = questions.find(q => q.id === questionId);
        const points = question.difficulty === 'easy' ? 10 : question.difficulty === 'medium' ? 20 : 30;
        setScore(prev => prev + points);
      }
    }
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

  const progress = (answeredQuestions.size / questions.length) * 100;

  return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              🎮 Native Knowledge Quest
            </h1>
            <p className="text-xl text-gray-300 mb-6">
              Learn about Native project and become a Web3 expert!
            </p>

            {/* Score and Progress */}
            <div className="flex justify-center items-center gap-8 mb-6">
              <div className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <span className="text-2xl font-bold text-yellow-400">{score}</span>
                <span className="text-gray-300">points</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-300">Progress:</span>
                <div className="w-32 bg-gray-700 rounded-full h-3">
                  <div
                      className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-300"
                      style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <span className="text-sm text-gray-300">{answeredQuestions.size}/{questions.length}</span>
              </div>
            </div>
          </div>

          {/* Questions Grid */}
          <div className="grid gap-4">
            {questions.map((q) => (
                <div
                    key={q.id}
                    className={`
                bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 
                transition-all duration-300 hover:bg-gray-700/50 hover:border-gray-600
                ${answeredQuestions.has(q.id) ? 'border-green-500/50 bg-green-900/20' : ''}
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
                      {answeredQuestions.has(q.id) && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
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
                        <div className="mt-3 text-sm text-gray-400">
                          +{q.difficulty === 'easy' ? 10 : q.difficulty === 'medium' ? 20 : 30} points
                        </div>
                      </div>
                  )}
                </div>
            ))}
          </div>

          {progress === 100 && (
              <div className="mt-8 text-center p-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl">
                <Trophy className="w-12 h-12 mx-auto mb-4 text-white" />
                <h2 className="text-2xl font-bold text-white mb-2">
                  🎉 Congratulations! Quest Complete!
                </h2>
                <p className="text-white opacity-90">
                  You've learned all aspects of the Native project and scored {score} points!
                </p>
              </div>
          )}

          <div className="mt-12 text-center text-gray-400">
            <p className="mb-4">Learn more about Native:</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a target="_blank" href="https://gonative.cc/" className="hover:text-white transition-colors">
                🌐 Website
              </a>
              <a target="_blank" href="https://x.com/gonativecc" className="hover:text-white transition-colors">
                🐦 Twitter
              </a>
              <a target="_blank" href="https://t.me/goNativecc" className="hover:text-white transition-colors">
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
