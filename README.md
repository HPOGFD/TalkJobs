# JobSaver

A full-stack application to search, save, and manage job listings. Built with React, Apollo Client, GraphQL, Node.js, and MongoDB, JobSaver lets users pull job postings from the Adzuna API, save their favorites, and view them in a clean, responsive UI—all with secure user authentication.

## Topics

React Apollo-Client GraphQL Node.js MongoDB Job-Search Authentication Adzuna-API Full-Stack Web-Development

## Features

- **Job Search**: Fetch job listings using the Adzuna API.
- **Save Jobs**: Authenticated users can save jobs to their profile.
- **View Saved Jobs**: Display saved jobs in a card-based layout.
- **User Authentication**: Secure login and signup with JWT.
- **Responsive UI**: Built with React and Bootstrap for a smooth experience.

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [MongoDB](https://www.mongodb.com/) (local or Atlas)
- [Adzuna API Key](https://developer.adzuna.com/) (sign up for free)

## Installation

1. **Clone the Repo**
git clone https://github.com/yourusername/jobsaver.git
cd jobsaver

text

Collapse

Wrap

Copy

2. **Install Dependencies**
- Server:
cd server
npm install

text

Collapse

Wrap

Copy
- Client:
cd ../client
npm install

text

Collapse

Wrap

Copy

3. **Set Up Environment Variables**
- Create a `.env` file in the `server` folder:
MONGODB_URI=mongodb://localhost/jobsaver # or your MongoDB Atlas URI
JWT_SECRET=your-secret-key-here
ADZUNA_APP_ID=your-adzuna-app-id
ADZUNA_APP_KEY=your-adzuna-app-key

text

Collapse

Wrap

Copy
- Update `client/.env` if needed:
REACT_APP_GRAPHQL_URI=http://localhost:3000/graphql

text

Collapse

Wrap

Copy

4. **Run the App**
- Start the Server:
cd server
npm run dev

text

Collapse

Wrap

Copy
- Start the Client:
cd ../client
npm start

text

Collapse

Wrap

Copy
- Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- **Sign Up / Log In**: Create an account or log in to access job-saving features.
- **Search Jobs**: Use the search bar to find jobs via Adzuna’s API.
- **Save Jobs**: Click "Save" on a job card to add it to your list.
- **View Saved Jobs**: Head to the "Saved Jobs" page to see your collection.

## Project Structure

- **/server**: Node.js backend with GraphQL API, MongoDB models, and resolvers.
- **/client**: React frontend with Apollo Client for GraphQL queries and mutations.

## Contributing

Feel free to fork, submit PRs, or open issues. Let’s make job hunting easier together!

## License

MIT License—do what you want with it, just give a shoutout.

## Acknowledgements

- Built with help from [xAI’s Grok, ChatGPT](https://x.ai/)—big thanks for the assist!
- Powered by [Adzuna API](https://developer.adzuna.com/).
- You, for checking this out!

## Author
- Harry P Oyarvide 