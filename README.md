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

  **GitHub Service File (API Functions)**
    Found in `src/services/gitHubService.js`, this mostly contains logic of API calls which include methods such as:
    - Fetching list of repositories (Including Sorting & Filtering).
    - Fetching a repository metadata (Used for Repository Details Page).
    - Fetching a list of contributors dedicated to that specific repository (Displays Top Contributors and Many More).

  **Favorites Service File (Local Storage Functions)**
    Found in `src/service/favoritesService.js`, the file contains logic that handles local storages such as managing favorites where methods can include:
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

  - **Pagination**: Search results are paginated, allowing users to navigate through multiple pages of repositories efficiently.



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


## Potential Future Improvements (To Be Completed)

- **Debounced search input**
- **Caching**
- **Basic unit tests**
- **Page Navigation Controls**
- **Contributor Handling Improvements**
- **Improved Variable and Code Consistency**
- **UI**
- **Performance Optimization**
- **Better Error Handling**
