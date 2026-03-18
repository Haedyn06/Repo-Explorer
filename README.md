# Github-Repo-Explorer

## Setup & Run
1. Download ZIP
2. Extract the zip into a folder
3. Open terminal according to the project's directory (ex. `cd path/to/repo`)
4. Install dependencies by executing `npm install` in the terminal
5. Run The Development Server by executing `npm run dev` in the terminal
6. Enter the address given into the browser's url 

## Key Design & Architectural Decisions

- **Vue 3 Composition API**  
  Used for better organization of logic and state within components.

- **Fetch API for HTTP Requests**  
  Used the Fetch API for HTTP requests to the GitHub REST API.

- **Component-Based Structure**  
  Split UI into reusable components such as:
  - NavBar
  - RepoCard

- **Routing with Vue Router**  
  Implemented dynamic routes for navigation found in (`src/router/index.js`) which can include:
    - `/repo/:owner/:name`
    - `/search=:query`

- **API Layer Separation**  
  Created a service file (`githubService.js`) to handle all GitHub API requests.

- **Responsive Layout with Flexbox**  
  Used Flexbox and media queries to ensure the app works on both desktop and mobile devices.

- **Error & Loading Handling**  
  Added loading states and error messages during API requests.

- **LocalStorage (Planned)**  
  Intended to store favorite repositories locally for the favorites management functionality.

## Known Limitations (To Be Completed)

## Potential Future Improvements (To Be Completed)
