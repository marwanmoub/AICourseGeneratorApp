export const PracticeOption = [
  {
    name: "Quiz",
    image: require("./../assets/images/quizz.png"),
    icon: require("./../assets/images/quiz.png"),
    path: "/quiz",
  },
  {
    name: "Flashcards",
    image: require("./../assets/images/flashcard.png"),
    icon: require("./../assets/images/layers.png"),
    path: "/flashcards",
  },
  {
    name: "Question & Ans",
    image: require("./../assets/images/notes.png"),
    icon: require("./../assets/images/qa.png"),
    path: "/questionAnswer",
  },
];

export const imageAssets: any = {
  "/banner1.png": require("./../assets/images/banner1.png"),
  "/banner2.png": require("./../assets/images/banner5.png"),
  "/banner3.png": require("./../assets/images/banner3.png"),
  "/banner4.png": require("./../assets/images/banner4.png"),
  "/banner5.png": require("./../assets/images/banner5.png"),
};

export const courseCategory = [
  "Tech & Coding",
  "Business & Finance",
  "Health & Fitness",
  "Science & Engineering",
  "Arts & Creativity",
  "Others",
];

//The Icons here are ionic icons
export const ProfileMenu = [
  {
    name: "Add Course",
    icon: "add-outline",
    path: "/addCourse",
  },
  {
    name: "My Course",
    icon: "book",
    path: "/(tabs)/home",
  },
  {
    name: "Course Progress",
    icon: "analytics-outline",
    path: "/(tabs)/progress",
  },
  {
    name: "My Subscription",
    icon: "shield-checkmark",
    path: "",
  },
  {
    name: "Logout",
    icon: "log-out",
    path: "/login",
  },
];

export interface Plan {
  id: string;
  tier: "Standard" | "Premium";
  cycle: "Monthly" | "Annual";
  price: string;
  features: string[];
  bestValue?: boolean;
}

export const subscriptionPlans: Plan[] = [
  {
    id: "standard_monthly",
    tier: "Standard",
    cycle: "Monthly",
    price: "$9.99",
    features: [
      "Access to Free Courses",
      "Limited AI Course Generation",
      "Standard Community Support",
    ],
  },
  {
    id: "premium_monthly",
    tier: "Premium",
    cycle: "Monthly",
    price: "$19.99",
    features: [
      "Access to All Courses",
      "Unlimited AI Course Generation",
      "Priority Support",
      "Offline Access",
    ],
  },
  {
    id: "standard_annual",
    tier: "Standard",
    cycle: "Annual",
    price: "$99.99",
    features: [
      "Access to Free Courses",
      "Limited AI Course Generation",
      "Standard Community Support",
      "Annual Savings",
    ],
  },
  {
    id: "premium_annual",
    tier: "Premium",
    cycle: "Annual",
    price: "$199.99",
    features: [
      "Access to All Courses",
      "Unlimited AI Course Generation",
      "Priority Support",
      "Offline Access",
      "Annual Savings",
    ],
    bestValue: true,
  },
];
