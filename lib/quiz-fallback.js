
const QUESTION_POOL = [
  {
    question: "You're given a task with an ambiguous or incomplete requirement. What's the best first step?",
    options: [
      "Start building immediately based on your best guess",
      "Ask clarifying questions before starting the work",
      "Wait silently until someone gives you more detail",
      "Skip the task and move to something else",
    ],
    correctAnswer: "Ask clarifying questions before starting the work",
    explanation:
      "Clarifying ambiguous requirements upfront avoids wasted effort and rework, and shows strong communication skills.",
  },
  {
    question: "You have three competing priorities due the same day. What's the most effective approach?",
    options: [
      "Work on whichever one you started first",
      "Assess impact and urgency, then communicate a plan to stakeholders",
      "Try to do all three at once without prioritizing",
      "Ignore two of them and hope no one notices",
    ],
    correctAnswer: "Assess impact and urgency, then communicate a plan to stakeholders",
    explanation:
      "Prioritizing by impact and urgency, then communicating trade-offs, is a core skill for managing competing demands.",
  },
  {
    question: "A teammate gives you critical feedback on your work. What's the best response?",
    options: [
      "Get defensive and explain why they're wrong",
      "Ignore the feedback and continue as before",
      "Listen, ask questions to understand it, and evaluate it objectively",
      "Agree immediately without thinking it through",
    ],
    correctAnswer: "Listen, ask questions to understand it, and evaluate it objectively",
    explanation:
      "Treating feedback as information to evaluate — rather than a personal attack or an instruction to blindly follow — leads to better outcomes and growth.",
  },
  {
    question: "You're assigned a task using a tool or skill you've never used before. What should you do first?",
    options: [
      "Refuse the task outright",
      "Break the task down and identify what you need to learn first",
      "Guess your way through without any research",
      "Wait for someone else to do it for you",
    ],
    correctAnswer: "Break the task down and identify what you need to learn first",
    explanation:
      "Breaking unfamiliar work into smaller, learnable pieces is a reliable way to make progress on anything new.",
  },
  {
    question: "What best describes effective collaboration in a cross-functional team?",
    options: [
      "Working in isolation and sharing results only at the end",
      "Regularly sharing context and aligning on shared goals",
      "Assuming everyone already understands your perspective",
      "Avoiding disagreement even when it affects the outcome",
    ],
    correctAnswer: "Regularly sharing context and aligning on shared goals",
    explanation:
      "Cross-functional collaboration works best when people proactively share context, since team members often have different assumptions and information.",
  },
  {
    question: "You realize partway through a project that your original approach won't work. What should you do?",
    options: [
      "Keep going anyway to avoid admitting a mistake",
      "Quietly abandon the project",
      "Raise it early, explain why, and propose an alternative",
      "Blame the requirements instead of adjusting",
    ],
    correctAnswer: "Raise it early, explain why, and propose an alternative",
    explanation:
      "Surfacing problems early — with a proposed alternative — minimizes wasted time and builds trust, compared to hiding or ignoring the issue.",
  },
  {
    question: "How should you approach reviewing your own work before calling it 'done'?",
    options: [
      "Submit immediately once it technically runs or looks finished",
      "Check it against the original requirements and edge cases",
      "Assume it's correct because you wrote it carefully",
      "Let someone else find all the problems for you",
    ],
    correctAnswer: "Check it against the original requirements and edge cases",
    explanation:
      "Deliberately reviewing work against requirements and edge cases before handing it off catches issues earlier and more cheaply.",
  },
  {
    question: "What's the best way to handle a repeated mistake you keep making?",
    options: [
      "Keep doing the same thing and hope it improves on its own",
      "Identify the root cause and change your process to prevent it",
      "Blame external factors each time it happens",
      "Avoid the task entirely going forward",
    ],
    correctAnswer: "Identify the root cause and change your process to prevent it",
    explanation:
      "Fixing the underlying process, rather than repeating the same approach, is what actually prevents a mistake from recurring.",
  },
];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}


export function getFallbackQuiz(count = 3) {
  return shuffle(QUESTION_POOL).slice(0, count);
}
