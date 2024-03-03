# Hotels SearchAPI Test Script

This is a simple Express.js application designed to provide a RESTful API for searching hotels based on various parameters. It utilizes Axios for making HTTP requests and serves static files using Express's static middleware.

## Prerequisites
- Node.js installed on your machine.

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Daniel-Musunza/searchapp-nodejs.git
   ```
2. Navigate to the project directory:

```bash
cd searchapp-nodejs
```

3. Install dependencies:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm run index

```
The server will start listening on port 3000 by default.

## Endpoints
GET / - Serves the static HTML file.
GET /search - Endpoint to search hotels based on provided parameters.


## Parameters
Rooms [Adults, Children, ChildrenAge] - Filter hotels by the number of available rooms.
Language - Filter hotels by language.
Location - Filter hotels by location.
HotelType - Filter hotels by type.
Rating - Filter hotels by rating.
Country - Filter hotels by country.
DateFrom and DateTo - Filter hotels by available dates.




