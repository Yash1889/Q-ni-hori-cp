# API Contract

This document outlines the suggested API endpoints for future backend integration. Currently, the application uses client-side static data.

## Base URL

`/api/v1`

## Endpoints

### Companies

#### `GET /companies`

Returns a list of all companies.

**Response:**

```json
[
  {
    "name": "Google",
    "slug": "google",
    "problemCount": 150
  },
  ...
]
```

#### `GET /company/:slug/problems`

Returns problems for a specific company.

**Response:**

```json
[
  {
    "id": "a1b2c3d4",
    "title": "Two Sum",
    "slug": "two-sum",
    "difficulty": "EASY",
    "acceptanceRate": 0.48,
    "frequency": 95.5,
    "url": "https://leetcode.com/problems/two-sum",
    "topics": ["Array", "Hash Table"]
  },
  ...
]
```

### Topics

#### `GET /topics`

Returns a list of all topics.

**Response:**

```json
[
  {
    "name": "Dynamic Programming",
    "slug": "dynamic-programming",
    "problemCount": 300
  },
  ...
]
```

#### `GET /topic/:slug/problems`

Returns problems for a specific topic.

**Response:**

```json
[
  {
    "id": "a1b2c3d4",
    "title": "Climbing Stairs",
    "slug": "climbing-stairs",
    "difficulty": "EASY",
    ...
  }
]
```

### User Progress (Future)

#### `POST /user/:userId/progress`

Mark a problem as completed.

**Request:**

```json
{
  "problemId": "a1b2c3d4",
  "isCompleted": true
}
```

#### `GET /user/:userId/progress`

Get list of completed problem IDs.

**Response:**

```json
{
  "completedProblemIds": ["a1b2c3d4", "e5f6g7h8"]
}
```
