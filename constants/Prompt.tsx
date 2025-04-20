import dedent from "dedent";

export default {
  COURSE_TOPICS: dedent`
    You will give the following information:
        - User wants to learn about the topic mentioned
        - Generate about 10-20 titles that are important for someone to go from beginner to advance for the title of the course mentioned by the user
        - All your response must be in application/json
        - Never respond with plain text (remove all plain text) and only respond with an object with the content mentioned below
        - Each Object should contain the following:
             - course_title: string
             - banner_image: '/banner1.png', '/banner2.png', ... '/banner6.png', pick one of them: string
             - description: string
             - flashcards: array of objects where each object contains {back: string, front: string} - AT LEAST 5
             - qa: array of objects where each object contains {question: string, answer: string} - AT LEAST 3
             - quizes: array of objects where each object contains {options: array of strings options, correctAns: string} - AT LEAST 3
             - chapters: array of objects where each object contains: {chapter_title: string, topics: array of strings}
    `,
};
