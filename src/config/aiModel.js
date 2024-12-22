/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_PUBLIC_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

export const GenerateCourseLayout = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: 'Generate a Course Tutorial on following Detail with field as Course Name, Description, along with Chapter Name, about, Duration: Category: "Programming", Topic: Python, Level: Basic, Duration: 1 hours, No. of Chapters: 5, in JSON format',
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n{\n  "courseName": "Python Programming Fundamentals",\n  "description": "This beginner-friendly course introduces you to the world of Python programming. You will learn the fundamentals of Python syntax, data types, variables, operators, control flow, and functions. By the end of the course, you\'ll have a solid foundation to build upon and start creating your own Python programs.",\n  "chapters": [\n    {\n      "chapterName": "Introduction to Python",\n      "about": "This chapter covers the basics of Python, including its history, applications, and how to set up your programming environment.",\n      "duration": "15 minutes"\n    },\n    {\n      "chapterName": "Data Types and Variables",\n      "about": "Learn about different data types in Python, such as integers, floats, strings, and booleans. You\'ll also discover how to declare and use variables to store data.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapterName": "Operators and Expressions",\n      "about": "Explore various operators in Python, including arithmetic, comparison, logical, and assignment operators. Understand how to create and evaluate expressions.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapterName": "Control Flow Statements",\n      "about": "Learn about conditional statements (if, elif, else) and loops (for, while) to control the flow of execution in your Python programs.",\n      "duration": "20 minutes"\n    },\n    {\n      "chapterName": "Functions",\n      "about": "Discover how to define and use functions to modularize your code, making it reusable and organized.",\n      "duration": "15 minutes"\n    }\n  ],\n  "category": "Programming",\n  "topic": "Python",\n  "level": "Basic",\n  "duration": "1 hour",\n  "noOfChapters": 5\n}\n```\n',
        },
      ],
    },
  ],
});

export const generateChapterContent_AI = model.startChat({
  generationConfig,
  // safetySettings: Adjust safety settings
  // See https://ai.google.dev/gemini-api/docs/safety-settings
  history: [
    {
      role: "user",
      parts: [
        {
          text: "Explain the concept in Detail on Topic: SQL,Chapter: Advanced Query Techniques, in JSON format with list of array with field as title, explanation on given chapter in detail, Code example(Code Field in <precode> format) if applicable",
        },
      ],
    },
    {
      role: "model",
      parts: [
        {
          text: '```json\n[\n  {\n    "title": "Subqueries",\n    "explanation": "Subqueries, also known as nested queries, are queries embedded within another query. They act as a way to filter or modify data based on the results of the inner query.",\n    "codeExample": "<precode>SELECT * FROM employees WHERE salary > (SELECT AVG(salary) FROM employees);</precode>"\n  },\n  {\n    "title": "Correlated Subqueries",\n    "explanation": "Correlated subqueries depend on the outer query for their execution. They are evaluated for each row of the outer query, allowing you to compare data within the same table or across different tables.",\n    "codeExample": "<precode>SELECT e.emp_id, e.name FROM employees e WHERE e.salary > (SELECT AVG(salary) FROM employees WHERE dept_id = e.dept_id);</precode>"\n  },\n  {\n    "title": "Common Table Expressions (CTEs)",\n    "explanation": "CTEs are temporary named result sets used to break down complex queries into smaller, reusable units. They improve readability and allow for recursive operations.",\n    "codeExample": "<precode>WITH EmployeeSales AS ( \\n SELECT e.emp_id, SUM(o.amount) AS total_sales \\n FROM employees e \\n JOIN orders o ON e.emp_id = o.emp_id \\n GROUP BY e.emp_id \\n ) \\n SELECT * FROM EmployeeSales WHERE total_sales > 1000;</precode>"\n  },\n  {\n    "title": "Window Functions",\n    "explanation": "Window functions operate on a set of rows related to the current row and return a single value. They are useful for calculating running totals, rankings, and percentiles.",\n    "codeExample": "<precode>SELECT emp_id, name, salary, \\n ROW_NUMBER() OVER (ORDER BY salary DESC) AS rank \\n FROM employees;</precode>"\n  },\n  {\n    "title": "Set Operators",\n    "explanation": "Set operators combine the results of multiple queries, allowing you to perform operations like union, intersection, difference, and except.",\n    "codeExample": "<precode>SELECT * FROM employees WHERE dept_id = 1 \\n UNION \\n SELECT * FROM employees WHERE dept_id = 2;</precode>"\n  },\n  {\n    "title": "Joins",\n    "explanation": "Joins combine data from multiple tables based on related columns. Different join types exist, including inner join, left join, right join, and full join.",\n    "codeExample": "<precode>SELECT e.name, d.dept_name \\n FROM employees e \\n INNER JOIN departments d ON e.dept_id = d.dept_id;</precode>"\n  },\n  {\n    "title": "Conditional Aggregation",\n    "explanation": "Conditional aggregation allows you to apply aggregate functions based on specific conditions within the data.",\n    "codeExample": "<precode>SELECT dept_id, \\n SUM(CASE WHEN gender = \'M\' THEN 1 ELSE 0 END) AS male_count, \\n SUM(CASE WHEN gender = \'F\' THEN 1 ELSE 0 END) AS female_count \\n FROM employees \\n GROUP BY dept_id;</precode>"\n  },\n  {\n    "title": "Recursive Queries",\n    "explanation": "Recursive queries allow you to process data in a hierarchical or tree-like structure. They are typically used for navigating parent-child relationships.",\n    "codeExample": "<precode>WITH RECURSIVE EmployeeHierarchy AS ( \\n SELECT emp_id, name, manager_id \\n FROM employees \\n WHERE manager_id IS NULL \\n UNION ALL \\n SELECT e.emp_id, e.name, e.manager_id \\n FROM employees e \\n JOIN EmployeeHierarchy eh ON e.manager_id = eh.emp_id \\n ) \\n SELECT * FROM EmployeeHierarchy;</precode>"\n  }\n]\n```',
        },
      ],
    },
  ],
});
