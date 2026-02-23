const quizConfig = {
  intro: {
    headline: "How Well Do You Know the Roman Empire?",
    subheadline:
      "Answer 10 questions and find out your history IQ. Your score will be sent straight to your inbox.",
    ctaLabel: "Start Quiz",
  },

  questions: [
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Tee Shot Decision",
      summary:
        "Tight par-4, water left, OB right. The landing zone is narrow and the margin for error is razor thin.",
      question: "What do you hit off the tee?",
      answers: [
        { text: "Driver, trust your swing", correct: false },
        { text: "3-wood to the wider part", correct: true },
        { text: "Aim at the water-side edge", correct: false },
        { text: "Fairway wood, avoid all trouble", correct: false },
      ],
    },
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Into the Breeze",
      summary:
        "180 yards out, into the breeze, with a front pin and a deep bunker guarding the front. You can't reach the back.",
      question: "What's your play?",
      answers: [
        { text: "Fire at the flag", correct: false },
        { text: "Club up, aim center green", correct: true },
        { text: "Lay up and take your medicine", correct: false },
        { text: "Low punch, hope it releases", correct: false },
      ],
    },
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Back-to-Back Bogeys",
      summary:
        "Two bogeys in a row, pressure is building. You're on the tee of a reachable par-5.",
      question: "What's your mindset?",
      answers: [
        { text: "Go for it, make up ground", correct: false },
        { text: "Routine first, play your game", correct: true },
        { text: "Play extra conservative", correct: false },
        { text: "Pick a more aggressive line", correct: false },
      ],
    },
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Short Game",
      summary:
        "40 yards out, clean lie, fast green sloping away.",
      question: "What shot do you play?",
      answers: [
        { text: "High lob, land it soft", correct: false },
        { text: "Bump-and-run, land it short", correct: true },
        { text: "Full wedge swing for spin", correct: false },
        { text: "Putt it from off the green", correct: false },
      ],
    },
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Match Play",
      summary:
        "Match play, 1-up with two holes left. Your opponent is in trouble.",
      question: "What's your strategy?",
      answers: [
        { text: "Play aggressively, close it out", correct: false },
        { text: "Play safe, make them beat you", correct: true },
        { text: "Mirror your opponent's shot", correct: false },
        { text: "Go for the pin, apply pressure", correct: false },
      ],
    },
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Pressure Putt",
      summary:
        "6-foot downhill par putt, subtle left-to-right break.",
      question: "Where do you aim?",
      answers: [
        { text: "Left edge, let it fall", correct: false },
        { text: "Straight at the center", correct: false },
        { text: "High side with a firm stroke", correct: false },
        { text: "Outside left, dying pace", correct: true },
      ],
    },
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Long Par-3",
      summary:
        "Long par-3 over water, your 7-iron is 10 yards short.",
      question: "What do you do?",
      answers: [
        { text: "7-iron at the flag, risk it", correct: false },
        { text: "Extra club, aim center green", correct: true },
        { text: "Hit the 7-iron harder", correct: false },
        { text: "Lay up to the drop zone", correct: false },
      ],
    },
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Fairway Bunker",
      summary:
        "Fairway bunker, 160 out, low lip. You can reach the green but it's risky.",
      question: "What's the priority?",
      answers: [
        { text: "Get out clean, first priority", correct: true },
        { text: "Go for the green, lip is low", correct: false },
        { text: "Aim just short of the green", correct: false },
        { text: "More loft, even if short", correct: false },
      ],
    },
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Breaking 80",
      summary:
        "Last hole, need a par to break 80 for the first time. Water short-right of the green.",
      question: "What do you do?",
      answers: [
        { text: "Play it like any other hole", correct: false },
        { text: "Aim well left, avoid water", correct: true },
        { text: "Lay up, wedge from 50 yards", correct: false },
        { text: "Go at the flag, risk it", correct: false },
      ],
    },
    {
      image: "/golf-strategy-placeholder.png",
      smallHeadline: "Two-Putt to Finish",
      summary:
        "15-foot uphill first putt with big right-to-left break. Two-putt to finish.",
      question: "What's your focus?",
      answers: [
        { text: "Be aggressive, make the putt", correct: false },
        { text: "Control speed, easy second putt", correct: true },
        { text: "Aim at the hole, see what happens", correct: false },
        { text: "Play big break, die it in", correct: false },
      ],
    },
  ],

  capture: {
    headline: "Ready to see your score?",
    subheadline:
      "Drop your email below and we'll send your results — plus a breakdown of every answer.",
    submitLabel: "Send My Score",
    successMessage:
      "✓ You're in! Check your inbox for your results.",
    errorMessage: "Something went wrong. Please try again.",
    submitEndpoint: "/api/subscribe",
  },

  // Used as tag slugs: quiz:taken:{quizSlug} and quiz:result:{tier-slug}
  quizSlug: "golf-iq",

  options: {
    showAnswerFeedback: true,
    feedbackDurationMs: 800,
    showQuestionLabel: true,
  },
};

export default quizConfig;
