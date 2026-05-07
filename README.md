# Task Tracker - Frontend

A React Native mobile application built with Expo and TypeScript for managing daily tasks.

## Tech Stack

- React Native (Expo)
- TypeScript
- TanStack Query (server state management)
- Axios (HTTP client)
- AsyncStorage (token persistence)

## Features

- Signup and Login with JWT authentication
- Create, view, delete tasks
- Mark tasks as completed
- Pull to refresh
- Empty and error states handled
- Token persisted across sessions

## Project Structure

src/
api/          # Axios client and API functions
context/      # Auth context for global token state
hooks/        # TanStack Query hooks
screens/      # Login, Signup, Tasks screens

## Prerequisites

- Node.js v18+
- Expo Go app installed on your Android/iOS device
- Backend server running (see backend repo)

## Setup and Installation

1. Clone the repository
```bash
git clone https://github.com/Azam0221/Task-Tracker-Frontend.git
cd frontend
```

2. Install dependencies
```bash
npm install
```

3. Update the base URL in `src/api/client.ts` with your machine's local IP
```typescript
baseURL: 'http://YOUR_LOCAL_IP:3001'
```

To find your local IP run:
```bash
ipconfig getifaddr en0
```

## Running the App

1. Make sure the backend server is running first

2. Start the Expo development server
```bash
npx expo start --clear
```

3. Open Expo Go on your phone and scan the QR code

Note: Your phone and computer must be on the same WiFi network.

## Backend Repository

https://github.com/Azam0221/task-tracker
