// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node

import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY,
});
const config = {
  responseMimeType: "application/json",
};
const model = "gemini-2.5-flash-preview-04-17";

export async function GenerateTopics(courseTitleIdea: string) {
  const contents = [
    {
      role: "user",
      parts: [
        {
          text: `Learn Python (A title that a user gives you)
        You will give the following:
        User wants to learn about python
        Generate about 10- 20 topics that are important for someone to go from beginner to advance for any title of course that the user types
        All your responses must be application/json
        Never respond with plain text (remove all plain text) and only respond with an ARRAY of the chapters of the course being asked for`,
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: `\`\`\`json
        [
          {
            "chapter_title": "Introduction to Python and Setup",
            "topics": [
              "What is Python?",
              "Why learn Python?",
              "Installing Python (various OS)",
              "Setting up a development environment (IDE/editor)",
              "Running your first Python program"
            ]
          },
          {
            "chapter_title": "Python Fundamentals: Data Types and Variables",
            "topics": [
              "Basic data types (integers, floats, strings, booleans)",
              "Understanding variables and assignment",
              "Type casting and conversion",
              "Comments in Python",
              "Naming conventions"
            ]
          },
          {
            "chapter_title": "Operators and Expressions",
            "topics": [
              "Arithmetic operators",
              "Comparison operators",
              "Logical operators",
              "Assignment operators",
              "Operator precedence"
            ]
          },
          {
            "chapter_title": "Control Flow: Conditionals and Loops",
            "topics": [
              "if, elif, and else statements",
              "Nested conditionals",
              "for loops and iterables",
              "while loops",
              "break, continue, and pass statements"
            ]
          },
          {
            "chapter_title": "Data Structures: Lists, Tuples, Sets, and Dictionaries",
            "topics": [
              "Working with lists (creating, accessing, modifying)",
              "Understanding tuples (immutability)",
              "Using sets (unique elements, set operations)",
              "Exploring dictionaries (key-value pairs)",
              "Common methods for each data structure"
            ]
          },
          {
            "chapter_title": "Functions: Building Reusable Code",
            "topics": [
              "Defining and calling functions",
              "Function arguments and parameters",
              "Return values",
              "Scope of variables (local vs. global)",
              "Lambda functions (anonymous functions)"
            ]
          },
          {
            "chapter_title": "Modules and Packages",
            "topics": [
              "Understanding modules",
              "Importing modules",
              "Creating your own modules",
              "Working with built-in modules",
              "Introduction to pip and installing external packages"
            ]
          },
          {
            "chapter_title": "File Input and Output",
            "topics": [
              "Reading from files",
              "Writing to files",
              "Working with different file modes",
              "Handling file errors",
              "Using 'with' statement for file handling"
            ]
          },
          {
            "chapter_title": "Object-Oriented Programming (OOP) Concepts",
            "topics": [
              "Introduction to OOP",
              "Classes and objects",
              "Attributes and methods",
              "Constructors and destructors",
              "Encapsulation"
            ]
          },
          {
            "chapter_title": "More OOP Concepts: Inheritance and Polymorphism",
            "topics": [
              "Inheritance and its types",
              "Method overriding",
              "Polymorphism",
              "Abstract classes and interfaces (conceptual)"
            ]
          },
          {
            "chapter_title": "Error Handling and Exceptions",
            "topics": [
              "Understanding errors and exceptions",
              "Using try, except, else, and finally blocks",
              "Raising exceptions",
              "Custom exceptions"
            ]
          },
          {
            "chapter_title": "Working with Strings and Regular Expressions",
            "topics": [
              "String formatting",
              "String methods",
              "Introduction to regular expressions",
              "Common regex patterns and functions"
            ]
          },
          {
            "chapter_title": "Generators and Iterators",
            "topics": [
              "Understanding iterators",
              "Creating iterators",
              "Introduction to generators",
              "Using 'yield' keyword",
              "Advantages of generators"
            ]
          },
          {
            "chapter_title": "Decorators and Context Managers",
            "topics": [
              "Understanding decorators",
              "Creating simple decorators",
              "Using built-in decorators",
              "Introduction to context managers",
              "Using 'with' statement for context managers"
            ]
          },
          {
            "chapter_title": "Advanced Data Structures and Algorithms (Introduction)",
            "topics": [
              "Common data structures (stacks, queues, trees, graphs)",
              "Introduction to algorithmic complexity (Big O notation)",
              "Basic sorting and searching algorithms"
            ]
          },
          {
            "chapter_title": "Concurrency and Parallelism (Introduction)",
            "topics": [
              "Understanding concurrency and parallelism",
              "Introduction to threading",
              "Introduction to multiprocessing",
              "Challenges in concurrent programming"
            ]
          },
          {
            "chapter_title": "Testing in Python",
            "topics": [
              "Why testing is important",
              "Types of testing (unit, integration)",
              "Using the unittest module",
              "Introduction to pytest"
            ]
          },
          {
            "chapter_title": "Working with Databases (Introduction)",
            "topics": [
              "Database concepts",
              "Connecting to a database (e.g., SQLite)",
              "Executing SQL queries",
              "Using ORM libraries (introduction)"
            ]
          },
          {
            "chapter_title": "Web Development with Python (Introduction)",
            "topics": [
              "Introduction to web frameworks (e.g., Flask, Django)",
              "Basic web concepts (HTTP, requests, responses)",
              "Creating a simple web application"
            ]
          },
          {
            "chapter_title": "Advanced Topics and Best Practices",
            "topics": [
              "Virtual environments",
              "Coding style and PEP 8",
              "Debugging techniques",
              "Performance optimization tips",
              "Exploring Python ecosystems (data science, machine learning, etc.)"
            ]
          }
        ]
        \`\`\``,
        },
      ],
    },
    {
      role: "user",
      parts: [
        {
          text: courseTitleIdea.trim(),
        },
      ],
    },
  ];

  try {
    const response = await ai.models.generateContent({
      model,
      config,
      contents,
    });

    if (response?.text) {
      return JSON.parse(response?.text);
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

const extractJSONFromString = (str: string): string => {
  const jsonStart = str.indexOf("```json");
  const jsonEnd = str.lastIndexOf("```");

  if (jsonStart !== -1 && jsonEnd !== -1 && jsonEnd > jsonStart) {
    return str.substring(jsonStart + "```json".length, jsonEnd).trim();
  }

  return str.trim();
};
