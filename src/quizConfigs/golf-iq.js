const golfIQ = {
  intro: {
    headline: "The Golf IQ Test",
    subheadline: "10 questions. No gimmes.",
    body: "You know the game. But do you actually know golf — the data, the rules, the stuff that separates how good players think from how everyone else thinks?\n\nFind out in under 3 minutes.",
    ctaLabel: "Start the Test",
  },

  questions: [
    {
      image: "/image-1.jpeg",
      smallHeadline: "Strokes Gained",
      summary:
        "Strokes gained is one of the most powerful tools in modern golf analysis — but the baseline matters.",
      question:
        "In strokes gained analysis, what is the baseline everything is measured against?",
      answers: [
        { text: "PGA Tour season average", correct: false },
        { text: "Scratch golfers (0 handicap)", correct: false },
        { text: "The field average for that week", correct: true },
        { text: "A theoretical perfect round", correct: false },
      ],
    },
    {
      image: "/image-2.jpeg",
      smallHeadline: "Where Strokes Are Lost",
      summary:
        "Data has changed how we understand the gap between amateurs and tour pros.",
      question:
        "Where do amateur golfers lose the most strokes compared to tour pros?",
      answers: [
        { text: "Putting", correct: false },
        { text: "Driving distance", correct: false },
        { text: "Approach shots", correct: true },
        { text: "Short game (50 yards and in)", correct: false },
      ],
    },
    {
      image: "/image-3.jpeg",
      smallHeadline: "Shot Dispersion",
      summary:
        "Understanding dispersion is key to making smarter club and target decisions.",
      question:
        "What does \"dispersion\" refer to in golf performance analysis?",
      answers: [
        { text: "Average carry distance per club", correct: false },
        { text: "The spread of shot outcomes around a target", correct: true },
        { text: "Carry vs. total distance difference", correct: false },
        { text: "Scoring variance round to round", correct: false },
      ],
    },
    {
      image: "/image-4.jpeg",
      smallHeadline: "Rules of Golf",
      summary:
        "Penalty situations are a regular part of the game — knowing the rules can save you strokes.",
      question:
        "How many penalty strokes are added when you take stroke and distance for a lost ball?",
      answers: [
        { text: "None — just re-hit", correct: true },
        { text: "1", correct: false },
        { text: "2", correct: false },
        { text: "Drop where the ball was lost, 1 stroke", correct: false },
      ],
    },
    {
      image: "/image-5.jpeg",
      smallHeadline: "Shot Shape",
      summary:
        "Research has a clear answer on whether you should try to play a straight ball versus your natural shape.",
      question:
        "What does research say about fighting your natural shot shape?",
      answers: [
        {
          text: "Eliminate it — a straight ball is always more accurate",
          correct: true,
        },
        { text: "Play it — fighting it increases dispersion", correct: false },
        { text: "Depends on the course setup", correct: false },
        { text: "Fades are statistically better", correct: false },
      ],
    },
    {
      image: "/image-6.png",
      smallHeadline: "Handicap System",
      summary:
        "The World Handicap System introduced a specific rule for capping hole scores when posting a round.",
      question:
        "Under the World Handicap System, what is a \"net double bogey\"?",
      answers: [
        { text: "The max score you can post on any hole", correct: false },
        {
          text: "Double bogey plus any handicap strokes on that hole",
          correct: true,
        },
        { text: "Two over par, adjusted for course rating", correct: false },
        {
          text: "The score at which a hole is conceded in match play",
          correct: false,
        },
      ],
    },
    {
      image: "/image-7.jpeg",
      smallHeadline: "Strokes Gained Origins",
      summary:
        "One person is credited with developing the strokes gained methodology that changed how golf is analyzed.",
      question: "Who developed the strokes gained methodology?",
      answers: [
        { text: "Dave Pelz", correct: false },
        { text: "Bob Rotella", correct: false },
        { text: "Mark Broadie", correct: true },
        { text: "Lou Stagner", correct: false },
      ],
    },
    {
      image: "/image-8.jpeg",
      smallHeadline: "Tour Proximity",
      summary:
        "Knowing how close tour pros actually hit it can reframe how you think about your own approach game.",
      question:
        "From 150 yards, what is the average proximity to the hole for a PGA Tour player?",
      answers: [
        { text: "12 feet", correct: false },
        { text: "20 feet", correct: false },
        { text: "30 feet", correct: true },
        { text: "40 feet", correct: false },
      ],
    },
    {
      image: "/image-9.jpeg",
      smallHeadline: "Equipment Rules",
      summary:
        "One of the most basic rules of golf — and one that's easy to overlook.",
      question:
        "What is the maximum number of clubs allowed in your bag during a round?",
      answers: [
        { text: "12", correct: false },
        { text: "14", correct: true },
        { text: "16", correct: false },
        { text: "No limit", correct: false },
      ],
    },
    {
      image: "/image-10.jpeg",
      smallHeadline: "Putting Stats",
      summary:
        "Even tour pros miss more putts than you might think — understanding the make percentage curve matters.",
      question:
        "From what distance do PGA Tour players make approximately 50% of their putts?",
      answers: [
        { text: "6 feet", correct: false },
        { text: "8 feet", correct: true },
        { text: "10 feet", correct: false },
        { text: "12 feet", correct: false },
      ],
    },
  ],

  capture: {
    headline: "Ready to see your Golf IQ score?",
    subheadline:
      "Drop your email below and we'll send your results — plus a breakdown of every answer.",
    submitLabel: "Send My Score",
    successMessage: "✓ You're in! Check your inbox for your results.",
    errorMessage: "Something went wrong. Please try again.",
    submitEndpoint: "/api/subscribe",
  },

  quizSlug: "golf-iq",

  options: {
    showAnswerFeedback: true,
    feedbackDurationMs: 800,
    showQuestionLabel: true,
  },
};

export default golfIQ;
