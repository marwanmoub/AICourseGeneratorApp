import dedent from "dedent";

export default {
  COURSE_TOPICS: dedent`
    You will give the following information:
        - User wants to learn about the topic mentioned
        - Generate about 10-20 titles that are important for someone to go from beginner to advance for the title of the course mentioned by the user
        - All your response must be in application/json
        - Never respond with plain text (remove all plain text) and only respond with an object with the content mentioned below
        - Each Object MUST CONTAIN the following:
             - course_title: string
             - banner_image: '/banner1.png', '/banner2.png', ... '/banner6.png', pick one of them: string
             - description: string
             - category: string (tag the course with one of the following categories: "Tech & Coding", "Business & Finance", "Health & Fitness", "Science & Engineering", "Arts & Creativity", "Others")
             - flashcards: array of objects where each object contains {back: string, front: string} - AT LEAST 5
             - qa: array of objects where each object contains {question: string, answer: string} - AT LEAST 5
             - quizes: array of objects where each object MUST CONTAIN {options: array of strings options, correctAns: string, question: string} - AT LEAST 10
             - chapters: array of objects where each object contains: {chapter_title: string (without numbering it), topics: array of objects (add as much topics as needs to explain the concept well, even if it took more than 10) where each object contains {topicName: string, code: string of a code example if the topic was about programming and a real life example of the topic name usage if its not about code, definition: string (a definition of the topicName), explain: string (explanation of the defintion), description: string (a description of the topic)}}
    `,
};
