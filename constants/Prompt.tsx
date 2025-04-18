import dedent from "dedent";

export default {
  COURSE_TOPICS: dedent`
    You will give the following information:
        - User wants to learn about the topic mentioned
        - Generate about 10-20 titles that are important for someone to go from beginner to advance for the title of the course mentioned by the user
        - All your response must be in application/json
        - Never respond with plain text (remove all plain text) and only respond with an ARRAY of the chapters of the course being asked for
    `,
};
