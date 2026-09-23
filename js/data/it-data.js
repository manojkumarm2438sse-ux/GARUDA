// ==========================================================================
// GARUDA OS - IT Career: Java Full Stack Curriculum & Measurable Daily Tasks
// Tailored for Final-Year B.Tech ECE Student
// ==========================================================================

export const IT_CURRICULUM = [
  {
    module: 'Java Core & OOP',
    topics: [
      { id: 'java-syntax', name: 'Variables, Data Types, Operators & Conditions', status: 'Completed', level: 'Beginner' },
      { id: 'java-loops', name: 'Loops (for, while, do-while) & Pattern Programs', status: 'Completed', level: 'Beginner' },
      { id: 'java-arrays', name: '1D/2D Arrays & String Manipulations', status: 'Completed', level: 'Intermediate' },
      { id: 'java-oop', name: 'OOP: Encapsulation, Inheritance, Polymorphism, Abstraction', status: 'In Progress', level: 'Core' },
      { id: 'java-collections', name: 'Collections Framework (ArrayList, LinkedList, HashMap, HashSet)', status: 'In Progress', level: 'High Yield' },
      { id: 'java-exceptions', name: 'Exception Handling (try-catch-finally, Custom Exceptions)', status: 'Pending', level: 'Intermediate' },
      { id: 'java-threads', name: 'Multithreading & Concurrency Basics (Runnable, Thread, Sync)', status: 'Pending', level: 'Advanced' }
    ]
  },
  {
    module: 'SQL & Database Systems',
    topics: [
      { id: 'sql-queries', name: 'Basic Queries: SELECT, WHERE, DISTINCT, ORDER BY', status: 'Completed', level: 'Beginner' },
      { id: 'sql-aggregation', name: 'Aggregate Functions, GROUP BY & HAVING Clauses', status: 'In Progress', level: 'Intermediate' },
      { id: 'sql-joins', name: 'Table Joins: INNER, LEFT, RIGHT, FULL OUTER & Self Join', status: 'Pending', level: 'High Yield' },
      { id: 'sql-subqueries', name: 'Nested Subqueries & Correlated Subqueries', status: 'Pending', level: 'Intermediate' },
      { id: 'sql-normalization', name: 'Database Normalization (1NF, 2NF, 3NF, BCNF) & Constraints', status: 'Pending', level: 'Theory' },
      { id: 'sql-transactions', name: 'ACID Properties, Transactions (COMMIT, ROLLBACK) & Indexing', status: 'Pending', level: 'Core' }
    ]
  },
  {
    module: 'Web Development & Frontend',
    topics: [
      { id: 'web-html', name: 'HTML5 Semantic Tags & Forms', status: 'Completed', level: 'Beginner' },
      { id: 'web-css', name: 'Modern CSS: Flexbox, Grid, Media Queries, Responsive Design', status: 'In Progress', level: 'Intermediate' },
      { id: 'web-js-basics', name: 'JavaScript: ES6+, Arrow Functions, Array Methods (map, filter)', status: 'In Progress', level: 'Intermediate' },
      { id: 'web-js-async', name: 'Async JavaScript: Promises, Async/Await, Fetch API', status: 'Pending', level: 'High Yield' }
    ]
  },
  {
    module: 'Backend & Spring Boot',
    topics: [
      { id: 'backend-spring-core', name: 'Spring Framework: Inversion of Control (IoC) & Dependency Injection', status: 'Pending', level: 'Core' },
      { id: 'backend-spring-boot', name: 'Spring Boot: Project Setup, Annotations (@RestController, @Autowired)', status: 'Pending', level: 'Core' },
      { id: 'backend-rest-api', name: 'Building RESTful APIs: GET, POST, PUT, DELETE with Status Codes', status: 'Pending', level: 'High Yield' },
      { id: 'backend-jpa', name: 'Spring Data JPA & Hibernate: Entity mapping & Repository interfaces', status: 'Pending', level: 'High Yield' }
    ]
  },
  {
    module: 'Career Essentials & Interview Readiness',
    topics: [
      { id: 'career-git', name: 'Git & GitHub: Branching, Pull Requests, Merge Conflicts, Commit Hygiene', status: 'Completed', level: 'Essential' },
      { id: 'career-project', name: 'Full Stack Capstone Project: Secure REST API with Database & UI', status: 'Pending', level: 'Portfolio' },
      { id: 'career-aptitude', name: 'Quantitative & Logical Aptitude Practice for Campus Drives', status: 'In Progress', level: 'Placement' },
      { id: 'career-mock', name: 'Top 50 Technical & HR Interview Questions for ECE graduates', status: 'In Progress', level: 'Placement' }
    ]
  }
];

export const IT_MEASURABLE_TASK_PRESETS = [
  {
    title: 'Java Collections Deep Dive',
    duration: '40 Minutes',
    theory: 'Learn internal working of HashMap and differences between ArrayList vs LinkedList.',
    codingTask: 'Write 3 programs: 1) Find character frequency using HashMap. 2) Detect duplicates in an array using HashSet. 3) Reverse an ArrayList in-place.',
    interviewQuestion: 'Explain why HashMap uses hashcode() and equals() contract in Java.'
  },
  {
    title: 'SQL Complex Joins & Aggregations',
    duration: '45 Minutes',
    theory: 'Study INNER vs LEFT JOIN execution order and difference between WHERE and HAVING.',
    codingTask: 'Write 3 SQL queries: 1) Find 2nd highest salary from Employee table. 2) Get department-wise employee count having > 3 employees. 3) Join Orders and Customers where order amount > 5000.',
    interviewQuestion: 'What is the performance difference between WHERE and HAVING clause in SQL?'
  },
  {
    title: 'Spring Boot REST Controller & Validation',
    duration: '45 Minutes',
    theory: 'Study HTTP status codes (200, 201, 400, 404, 500) and Spring @RequestBody / @PathVariable.',
    codingTask: 'Create a Spring Boot endpoint POST /api/students that validates email format, saves to H2 database, and returns 201 CREATED.',
    interviewQuestion: 'What is the difference between @Controller and @RestController in Spring Boot?'
  }
];
