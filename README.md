This is starter template for [Learn Next.js](https://nextjs.org/learn).

# Autumn TCSS 460 Front End Project
## Group Members
- Jeremiah Brenio
- Edison Chen
- Luke Chung
- Dalton Miltimore

# Back End Guide

## Backend used - Group 6
https://github.com/HuyHuynh2k2/Back-End
#### Documentation
https://huyhuynh2k2.github.io/Back-End/


## Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/HuyHuynh2k2/Back-End
    ```
2. Navigate to the project directory:
    ```sh
    cd Back-End
    ```
3. Install dependencies:
    ```sh
    npm install
    ```
4. Start the application using Docker:
    ```sh
    docker compose up
    ```

## Docker Installation Guide

If you don't have Docker installed, follow these steps:

1. Download and install Docker from the official website: [Docker](https://www.docker.com/get-started)
2. Follow the installation instructions for your operating system.
3. Verify the installation by running:
    ```sh
    docker --version
    ```

# Front End Guide

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/NeonAfro/TCSS460_FrontEnd
    ```
2. Navigate to the project directory:
    ```sh
    cd TCSS460_FrontEnd
    ```
3. Install dependencies:
    ```sh
    yarn install
    ```

## Usage

1. Start the development server:
    ```sh
    yarn dev
    ```
    **OR**
    ```sh
    npm run dev
    ```
2. Open your browser and navigate to `http://localhost:8081`.

# Notes
## Routes Implemented
### Auth 3/3
- Request to change a user's password in the system
- Request to register a user
- Request to sign a user in the system

### Books 8/10
- Request to add a new book
- Request to delete a book by ISBN
- Request to retrieve a book by ISBN
- Request to retrieve all books with pagination
- Request to retrieve books by author
- Request to retrieve books by original title
- Request to retrieve books by publication year
- Request to update the ratings of an existing book

## Routes not Implemented
## Books
- Request to delete multiple books by ID range
    - We thought this was hard to implement. From the backend's response format, we have no way to recieve a books ID and we don't want to arbitrarily delete books by IDs that we don't know.
- Request to retrieve books by average rating
    - The documentation wants an exact average rating, their tolerance is too low to properly grab books around a certain average rating. So Searching for 1, 2, 3, 4, 5 star books wouldn't properly show all books around those ranges.