# Github-Repo-Explorer

## Setup & Run
1. Download ZIP
2. Extract the zip into a folder
3. Open terminal according to the project's directory (ex. `cd path/to/repo`)
4. Install dependencies by executing `npm install` in the terminal
5. Run The Development Server by executing `npm run dev` in the terminal
6. Enter the address given into the browser's url 



## Key Design & Architectural Decisions

### Overall Architecture
  The application is developed with Vue 3. The UI is separated into different components for easy readability and maintainability. These components include repository cards, a navigation bar, and sections that are dedicated to each page. Routing is handled using Vue Router, this allows navigation between different pages. An API layer is used to manage all communication with the GitHub API which separates data fetching logic from the UI.


### API Layer
  Fetch API is used for HTTP requests to the GitHub REST API. This allows access to every public GitHub repository by having it retrieved with its metadata. These API calls are usually handled in a dedicated service file found in `src/services/gitHubService.js`.   
  This helps avoid mixing both data logic with UI components and it allows reusability of API functions and maintainability.  


### Routing
  Routing is handled using Vue Router to provide navigation between the main pages of the application. Static routes are used for pages such as the home page and favorites page, while dynamic routes are used for search results and repository details.

### Caching
  A simple caching method is implemented within the API service layer to reduce unnecessary API calls. When searching for a list of repositories are performed. A unique cache key is generated based on the parameters defined in the searchRepos function. This helps speed up loading and reduces the amount of API fetch requests. It is stored temporarily and is cleared once the page is refreshed.

### Unit Testing
  Unit tests were implemented using a testing framework known as Vitest. The components and compositions that have been tested were:
  
  - **RepoStats**: To ensure that repository metadata is displayed correctly in the repository details page while checking if missing properties were handled correctly with its own placeholder.

  - **GitHub Service**: Tested for API error handling. These tests simulate failed fetch requests with different status codes to confirm if the application would throw the correct error messages such as "404" and "403", as well as unidentified error codes.
  
### Component Design
  The UI is divided into reusable components like RepoCard, SortRepos, FilterRepos, etc. This improves code organization, readability, and makes it easier to maintain or add in new features.

  - **Navigation Bar**: Uses routing methods and features to navigate through different pages (Vue Router).
  
  - **Repository Cards**: A reusable component that is used in both the search results page and the favorites page, as a way to display a list of repositories.
  
  - **Repository Statistics**: A component that displays key statistics and metadata from its selected repository which is then displayed in the Repository Details Page. 
  
  - **Repository Contributions**: Displays a list of contributors for a repository which is implemented in the Repository Details Page.
  
  - **Filtered Repositories**: A panel that manages and filters in the desired program language to refine search results.
  
  - **Sorted Repositories**: Manages and sorts the list of repositories displayed in the search results.


### Services Folder
  The services folder is used for handling and managing data through scripts and logic, and then implemented onto the UI.
  This is used as a way to easily seperate data logic and UI functions.

  **GitHub Service File (API Functions)**:
      Found in `src/services/gitHubService.js`, this mostly contains logic of API calls which include methods such as:
  - A list that defines and manages fetch request errors based on their status codes. 
  - Fetching a list of repositories with methods that include (Sorting, Filtering, Caching, etc).
  - Fetching a repository metadata (Used for Repository Details Page).
  - Fetching a list of contributors dedicated to that specific repository (Displays Top Contributors and Many More).

  **Favorites Service File (Local Storage Functions)**:
      Found in `src/services/favoritesService.js`, the file contains logic that handles local storages such as managing favorites where methods can include:
  - Initiation of the local storage
  - Gets a list of repositories that have been favorited
  - Checking whther the repository is favorited 
  - Adding a repository to favorites
  - Removing a favorited repository from the local storage.


### Features & Handling
  The application implements several core features to allow users to interact with GitHub repository data efficiently:

  - **Repository Search**: Users can search for repositories using keywords. The application sends requests to the GitHub API and displays matching results dynamically.

  - **Repository Details View**: Users can select a repository to view detailed information such as description, statistics, contributors, and other metadata.

  - **Favorites Management**: Users can save and remove repositories from a favorites list. This data is stored locally, allowing quick access to selected repositories.

  - **Sorting & Filtering**: Users can sort repositories by relevance, stars, or last updated, and filter results by programming language to refine searches.

  - **Pagination**: Search results and favorites are paginated, which allows users to navigate through multiple pages of repositories efficiently.



## Known Limitations

### Limited Filtering Options
  Filtering by programming language is limited to only a selected handful of commonly used languages. This would restrict users from selecting a less common or custom languages, as there is currently no support for freely entering or selecting all available languages.

### Pagination Constraints
  Pagination is limited by the GitHub Search API, which restricts access to a capped number of search results. Adding to that, the application does not display the total number of available pages or allow users to jump directly to a specific page by entering a page number, limiting navigation flexibility.

### Missing Repository Data
  Some repositories may have incomplete or missing values from their metadata such as descriptions, language, etc. which limits what can be displayed consistently across all repositories. This may affect how repositories are displayed when sorting or filtering is applied.

### Basic Error Feedback
  When fetching data from an API, errors are mostly shown by their status code and does not always provide a detailed explanation of the reason. This would mean that while most common errors are being handled correctly, some may not be clearly communicated to the user.

### API Rate Limits
  The application mainly uses the GitHub API meaning it sends requests without further authentication, meaning frequent requests may result in temporary failures such as rate limit errors.

### Large Contributor List
  When fetching contributor data, it is possible that it would fail due to limited number of requests where repositories containing a large sum of contributors will result in a fetch error when API usage limits are reached.

### Limited Caching
  The caching method is limited only to the search results. While some repository data is already available from the search response, the application still has to perform additional API requests to fetch the complete repository details (eg. list of contributors) when navigating to the repository page.



## Potential Future Improvements

- **Page Navigation Controls**  
  Add more flexible pagination controls such as displaying page numbers, showing the total number of pages, and navigate directly to a specific page through input.

- **Contributor Handling Improvements**  
  Improve handling of large contributor lists by optimizing data fetching and providing strategies to solve rate limit requests or API restrictions. 
  
- **Improved Variable and Code Consistency**  
  Refactor parts of the codebase to make variable naming, component structure, and general formatting more consistent across all files for better readability and maintainability.

- **UI Enhancements**  
  Further improve the visual design of the application by refining spacing, responsiveness, color schemes, and an overall polished layout.

- **Performance Optimization**  
  Optimize rendering and data handling by reducing unnecessary API requests, improving state updates, and minimizing repeated implementation across components.

- **Better Error Handling**
  Add more detailed error messages to explain issues such as invalid searches, failed API requests, or rate limit errors.

- **Improved Caching**  
  Expand the current caching system to include other API fetch calls and sections such as repository details and fetching a list of contributors. 