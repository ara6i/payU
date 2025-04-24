# PayU Money Payment Gateway Integration

A full-stack TypeScript application demonstrating the integration of PayU Money payment gateway with a Node.js backend and React frontend.

## Project Overview

This project showcases how to integrate PayU Money payment gateway into a modern web application. It includes:

- **Backend**: Node.js with Express and TypeScript
- **Frontend**: React with TypeScript and Tailwind CSS
- **Payment Gateway**: PayU Money integration for processing payments

## Project Structure

```
.
├── backend/             # TypeScript Node.js backend
│   ├── src/            # Source files
│   ├── dist/           # Compiled files
│   ├── node_modules/   # Node.js modules
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── .env            # Environment variables
│   └── .env.example    # Example environment variables
├── frontend/           # TypeScript React frontend
│   ├── src/            # Source files
│   ├── node_modules/   # Node.js modules
│   ├── package.json
│   ├── package-lock.json
│   └── tsconfig.json
└── README.md
```

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- PayU Money merchant account

## Environment Setup

### Backend Environment Variables

Create a `.env` file in the backend directory:

```
MERCHANT_KEY=<YOUR MERCHANT KEY>
MERCHANT_SALT=<YOUR MERCHANT SALT>
PAYU_ENVIRONMENT=TEST
PORT=4000
```

## Installation

### Backend Setup

```bash
cd backend
npm install
```

### Frontend Setup

```bash
cd frontend
npm install
```

## Development

### Running the Backend

```bash
cd backend
npm run dev
```

The backend server will start at `http://localhost:4000`.

### Running the Frontend

```bash
cd frontend
npm run dev
```

The frontend development server will start at `http://localhost:5173`.

## Building for Production

### Backend Build

```bash
cd backend
npm run build
```

### Frontend Build

```bash
cd frontend
npm run build
```

## API Documentation

### Payment Initiation

**Endpoint**: `POST /get-payment`

**Request Body**:
```typescript
{
  amount: number;
  productInfo: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}
```

**Response**: HTML form for PayU payment gateway

### Payment Verification

**Endpoint**: `POST /verify/:txnid`

**Parameters**:
- `txnid`: Transaction ID

**Response**: Redirects to frontend with payment status

## Frontend Routes

- `/`: Home page with product listing
- `/payment/:status/:id`: Payment status page

## TypeScript Implementation

### Backend TypeScript

The backend uses TypeScript for type safety and better developer experience:

- Custom type definitions for PayU SDK
- Type-safe request/response handling
- Proper error typing

### Frontend TypeScript

The frontend leverages TypeScript for:

- Component props typing
- API response typing
- Route parameter typing

## Payment Flow

1. User selects a product and clicks "Buy"
2. Frontend sends payment request to backend
3. Backend generates transaction ID and hash
4. Backend initiates payment with PayU
5. User completes payment on PayU gateway
6. PayU redirects to backend verification endpoint
7. Backend verifies payment and redirects to frontend status page
8. Frontend displays payment status




