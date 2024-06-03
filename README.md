# Course Review apis

## set up this project locally following few step

##### as a package manager i am use yarn

##### step 1 create .env file in root and this code into .env file

```bash
PORT=5000
DATABASE_URL=database url here
BCRYPT_SALT_ROUNDS=12
JWT_ACCESS_SECRET=your jwt secret

JWT_ACCESS_EXPIRES_IN=jwt expired time
```

##### step 2 install

```bash
    yarn
```

##### step 3 run with ts-node-dev

```bash
    yarn dev
```

<hr/>

## All Api end point and request, response where auth token needed

### 1. User Registration

- **Route:** `/api/auth/register`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "username": "john_doe",
    "email": "john@example.com",
    "password": "123456",
    "role": "user"
  }
  ```
- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "User registered successfully",
    "data": {
      "_id": "54321abcde67890fghij",
      "username": "john_doe",
      "email": "john@example.com",
      "role": "user",
      "createdAt": "2023-01-01T12:00:00.000Z",
      "updatedAt": "2023-01-01T12:00:00.000Z"
    }
  }
  ```

### 2. User Login

- **Route:** `/api/auth/login`
- **Method:** POST
- **Request Body:**
  ```json
  {
    "username": "john_doe",
    "password": "123456"
  }
  ```
- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "User login successful",
    "data": {
      "user": {
        "_id": "54321abcde67890fghij",
        "username": "john_doe",
        "email": "john@example.com",
        "role": "user"
      },
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    }
  }
  ```

### **3. Change Password**

- **Route:** **`/api/auth/change-password`**
- **Method:** POST
- **Request Headers:**

```markdown
Authorization: <JWT_TOKEN>
```

- **Request Body:**

```json
{
  "currentPassword": "123456",
  "newPassword": "new123456"
}
```

- **`currentPassword`**: The user's current password for verification.
- **`newPassword`**: The new password the user wants to set.

- **Response:**

```json
{
  "success": true,
  "statusCode": 200,
  "message": "Password changed successfully",
  "data": {
    "_id": "54321abcde67890fghij",
    "username": "john_doe",
    "email": "john@example.com",
    "role": "user",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-02T12:30:00.000Z"
  }
}
```

### 4**. Create a Course (Only Admin can do this)**

- **Endpoint:** **`/api/courses`**
- **Method:** **POST**
- **Request Headers:**
  ```markdown
  Authorization: <ADMIN_JWT_TOKEN>
  ```
- **Request Body:**
  ```json
  {
    "title": "Introduction to Web Development",
    "instructor": "John Smith",
    "categoryId": "12345abcde67890fghij",
    "price": 49.99,
    "tags": [
      { "name": "Programming", "isDeleted": false },
      { "name": "Web Development", "isDeleted": false }
    ],
    "startDate": "2023-02-01",
    "endDate": "2023-04-01",
    "language": "English",
    "provider": "Tech Academy",
    "durationInWeeks": 8,
    "details": {
      "level": "Beginner",
      "description": "A comprehensive introduction to web development."
    }
  }
  ```
- **Response:**
  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Course created successfully",
    "data": {
      "_id": "67890fghij54321abcde",
      "title": "Introduction to Web Development",
      "instructor": "John Smith",
      "categoryId": "12345abcde67890fghij",
      "price": 49.99,
      "tags": [
        { "name": "Programming", "isDeleted": false },
        { "name": "Web Development", "isDeleted": false }
      ],
      "startDate": "2023-02-01",
      "endDate": "2023-04-01",
      "language": "English",
      "provider": "Tech Academy",
      "durationInWeeks": 8,
      "details": {
        "level": "Beginner",
        "description": "A comprehensive introduction to web development."
      },
      "createdBy": "adminUserId",
      "createdAt": "2023-01-15T12:00:00.000Z",
      "updatedAt": "2023-01-15T12:00:00.000Z"
    }
  }
  ```

### 5. Get Paginated and Filtered Courses.

- **Endpoint:** **`/api/courses`**
- **Method:** **GET**

### Query Parameters for API Requests:

When interacting with the API, you can utilize the following query parameters to customize and filter the results according to your preferences.

- page: (Optional) Specifies the page number for paginated results. Default is 1.
  Example: ?page=2
- limit: (Optional) Sets the number of items per page. Default is a predefined limit.
  Example: ?limit=10
- sortBy: (Optional) Specifies the field by which the results should be sorted. Only applicable to the following fields: `title`, `price`, `startDate`, `endDate`, `language`, `durationInWeeks`.
  Example: ?sortBy=startDate
- sortOrder: (Optional) Determines the sorting order, either 'asc' (ascending) or 'desc' (descending).
  Example: ?sortOrder=desc
- minPrice, maxPrice: (Optional) Filters results by a price range.
  Example: ?minPrice=20.00&maxPrice=50.00
- tags: (Optional) Filters results by the name of a specific tag.
  Example: ?tags=Programming
- startDate, endDate: (Optional) Filters results by a date range.
  Example: ?startDate=2023-01-01&endDate=2023-12-31
- language: (Optional) Filters results by the language of the course.
  Example: ?language=English
- provider: (Optional) Filters results by the course provider.
  Example: ?provider=Tech Academy
- durationInWeeks: (Optional) Filters results by the duration of the course in weeks.
  Example: ?durationInWeeks=8
- level: (Optional) Filters results by the difficulty level of the course.
  Example: ?level=Intermediate
- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 200,
    "message": "Courses retrieved successfully",
    "meta": {
      "page": 1,
      "limit": 10,
      "total": 50
    },
    "data": {
      "courses": [
        {
          "_id": "67890fghij54321abcde",
          "title": "Introduction to Web Development",
          "instructor": "John Smith",
          "categoryId": "12345abcde67890fghij",
          "price": 49.99,
          "tags": [
            { "name": "Programming", "isDeleted": false },
            { "name": "Web Development", "isDeleted": false }
          ],
          "startDate": "2023-02-01",
          "endDate": "2023-04-01",
          "language": "English",
          "provider": "Tech Academy",
          "durationInWeeks": 8,
          "details": {
            "level": "Beginner",
            "description": "A comprehensive introduction to web development."
          },
          "createdBy": {
            "_id": "adminUserId",
            "username": "adminUser",
            "email": "admin@example.com",
            "role": "admin"
          },
          "createdAt": "2023-01-15T12:00:00.000Z",
          "updatedAt": "2023-01-15T12:00:00.000Z"
        }
      ]
    }
  }
  ```

### 6**. Create a Category (Only Admin can do this)**

- **Endpoint:** **`/api/categories`**
- **Method:** **POST**
- **Request Headers:**
  ```markdown
  Authorization: <ADMIN_JWT_TOKEN>
  ```
- **Request Body:**
  ```json
  {
    "name": "Web Development"
  }
  ```
- **Response:**

  ```json
  {
    "success": true,
    "statusCode": 201,
    "message": "Category created successfully",
    "data": {
      "_id": "12345abcde67890fghij",
      "name": "Web Development",
      "createdBy": "adminUserId",
      "createdAt": "2023-01-15T12:00:00.000Z",
      "updatedAt": "2023-01-15T12:00:00.000Z"
    }
  }
  ```

  ### 7**. Get All Categories**

  - **Endpoint:** **`/api/categories`**
  - **Method:** **GET**
  - **Response:**

    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Categories retrieved successfully",
      "data": {
        "categories": [
          {
            "_id": "12345abcde67890fghij",
            "name": "Web Development",
            "createdBy": {
              "_id": "adminUserId",
              "username": "adminUser",
              "email": "admin@example.com",
              "role": "admin"
            },
            "createdAt": "2023-01-15T12:00:00.000Z",
            "updatedAt": "2023-01-15T12:00:00.000Z"
          }
        ]
      }
    }
    ```

  ### 8**. Create a Review (Only the user can do this)**

  - **Endpoint:** **`/api/reviews`**
  - **Method:** **POST**
  - **Request Headers:**
    ```markdown
    Authorization: <USER_JWT_TOKEN>
    ```
  - **Request Body:**
    ```json
    {
      "courseId": "67890fghij54321abcde",
      "rating": 4,
      "review": "Great course, very informative and well-structured."
    }
    ```
  - **Response:**

    ```json
    {
      "success": true,
      "statusCode": 201,
      "message": "Review created successfully",
      "data": {
        "_id": "98765fghij43210lkji",
        "courseId": "67890fghij54321abcde",
        "rating": 4,
        "review": "Great course, very informative and well-structured.",
        "createdBy": {
          "_id": "UserId",
          "username": "username",
          "email": "user@example.com",
          "role": "user"
        },
        "createdAt": "2023-01-15T12:00:00.000Z",
        "updatedAt": "2023-01-15T12:00:00.000Z"
      }
    }
    ```

  ### 9**. Update a Course (Only Admin can do this)**

  - **Endpoint:** **`/api/courses/:courseId`**
  - **Method:** **PUT**
  - **Request Headers:**
    ```markdown
    Authorization: <ADMIN_JWT_TOKEN>
    ```
  - **Request Body:**
    ```json
    {
      "price": 59.99,
      "tags": [
        { "name": "Programming", "isDeleted": false },
        { "name": "Web Development", "isDeleted": false },
        { "name": "JavaScript", "isDeleted": false }
      ],
      "details": {
        "level": "Intermediate",
        "description": "A comprehensive course on web development with a focus on JavaScript."
      }
    }
    ```
  - **Response:**

    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Course updated successfully",
      "data": {
        "_id": "67890fghij54321abcde",
        "title": "Introduction to Web Development",
        "instructor": "John Smith",
        "categoryId": "12345abcde67890fghij",
        "price": 59.99,
        "tags": [
          { "name": "Programming", "isDeleted": false },
          { "name": "Web Development", "isDeleted": false },
          { "name": "JavaScript", "isDeleted": false }
        ],
        "startDate": "2023-02-01",
        "endDate": "2023-04-01",
        "language": "English",
        "provider": "Tech Academy",
        "durationInWeeks": 8,
        "details": {
          "level": "Intermediate",
          "description": "A comprehensive course on web development with a focus on JavaScript."
        },
        "createdBy": {
          "_id": "adminUserId",
          "username": "adminUser",
          "email": "admin@example.com",
          "role": "admin"
        },
        "createdAt": "2023-01-15T12:00:00.000Z",
        "updatedAt": "2023-01-16T12:30:00.000Z"
      }
    }
    ```

  ### 10**. Get Course by ID with Reviews**

  - **Endpoint:** **`/api/courses/:courseId/reviews`**
  - **Method:** **GET**
  - **Response:**

    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Course with reviews retrieved successfully",
      "data": {
        "course": {
          "_id": "67890fghij54321abcde",
          "title": "Introduction to Web Development",
          "instructor": "John Smith",
          "categoryId": "12345abcde67890fghij",
          "price": 59.99,
          "tags": [
            { "name": "Programming", "isDeleted": false },
            { "name": "Web Development", "isDeleted": false },
            { "name": "JavaScript", "isDeleted": false }
          ],
          "startDate": "2023-02-01",
          "endDate": "2023-04-01",
          "language": "English",
          "provider": "Tech Academy",
          "durationInWeeks": 8,
          "details": {
            "level": "Intermediate",
            "description": "A comprehensive course on web development with a focus on JavaScript."
          },
          "createdBy": {
            "_id": "adminUserId",
            "username": "adminUser",
            "email": "admin@example.com",
            "role": "admin"
          },
          "createdAt": "2023-01-15T12:00:00.000Z",
          "updatedAt": "2023-01-16T12:30:00.000Z"
        },
        "reviews": [
          {
            "_id": "98765fghij43210lkji",
            "courseId": "67890fghij54321abcde",
            "rating": 4,
            "review": "Great course, very informative and well-structured.",
            "createdBy": {
              "_id": "userid",
              "username": "username",
              "email": "user@example.com",
              "role": "user"
            },
            "createdAt": "2023-01-15T12:00:00.000Z",
            "updatedAt": "2023-01-15T12:00:00.000Z"
          }
          // ... other reviews
        ]
      }
    }
    ```

  ### 11**. Get the Best Course Based on Average Review (Rating)**

  - **Endpoint:** **`/api/course/best`**
  - **Method:** **GET**
  - **Response:**
    ```json
    {
      "success": true,
      "statusCode": 200,
      "message": "Best course retrieved successfully",
      "data": {
        "course": {
          "_id": "23245dsfd453242348rFcg",
          "title": "Best Book Title",
          "instructor": "New Instructor",
          "categoryId": "123456789012345678901234",
          "price": 59.99,
          "tags": [
            {
              "name": "Programming",
              "isDeleted": false
            },
            {
              "name": "Web Development",
              "isDeleted": false
            }
          ],
          "startDate": "2023-02-01",
          "endDate": "2023-03-14",
          "language": "Spanish",
          "provider": "Code Masters",
          "durationInWeeks": 6,
          "details": {
            "level": "Intermediate",
            "description": "Detailed description of the course"
          },
          "createdBy": {
            "_id": "userid",
            "username": "username",
            "email": "user@example.com",
            "role": "user"
          },
          "createdAt": "2023-01-15T12:00:00.000Z",
          "updatedAt": "2023-01-15T12:00:00.000Z"
        },
        "averageRating": 4.8,
        "reviewCount": 50
      }
    }
    ```
