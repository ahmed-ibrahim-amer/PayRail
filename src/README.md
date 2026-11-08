# PayRail

### Payment Processing & Financial Ledger System

**PayRail** is a backend-focused payment processing system designed to simulate how modern financial platforms handle payments, maintain accurate account balances, and process asynchronous financial operations reliably.

Built with **Node.js, TypeScript, PostgreSQL, Prisma, and Redis**, PayRail focuses on financial data integrity, transaction consistency, fault tolerance, and reliable background processing.

> **Project Status:** Under Development 🚧

---

## Overview

Payment systems must handle more than simply creating transactions. They need to prevent duplicate charges, maintain accurate financial records, recover from failures, and ensure that asynchronous operations are processed reliably.

PayRail explores these engineering challenges through a modular backend architecture.

The system is designed around several core principles:

- **Financial Integrity:** Every financial transaction must preserve accurate and consistent records.
- **Idempotency:** Repeated requests must not result in duplicate financial operations.
- **Reliable Processing:** Background jobs must support retries and failure handling.
- **Transaction Consistency:** Related database operations must succeed or fail together.
- **Traceability:** Financial operations should be auditable and traceable.

## Core Features

The following features define the project's development scope.

### 1. Payment Processing
- Create and manage payment transactions.
- Track payment lifecycle states.
- Simulate payment provider responses.
- Handle successful and failed payment attempts.

### 2. Idempotency
- Prevent duplicate payment operations.
- Support idempotency keys for sensitive requests.
- Handle repeated requests safely.
- Protect against duplicate processing during retries.

### 3. Double-Entry Ledger
- Maintain financial records using debit and credit entries.
- Ensure every journal transaction remains balanced.
- Track account balances through ledger entries.
- Preserve an auditable financial history.

### 4. Refund Management
- Support full and partial refunds.
- Maintain relationships between original payments and refunds.
- Record refund operations in the ledger.
- Prevent invalid or duplicate refunds.

### 5. Asynchronous Webhooks
- Deliver payment event notifications.
- Track webhook delivery attempts.
- Implement automatic retries.
- Handle failed deliveries.

### 6. Background Job Processing
- Process asynchronous operations using Redis and BullMQ.
- Separate background workers from HTTP request handling.
- Support retry policies and failed-job handling.

### 7. Transaction Reconciliation
- Compare internal payment records with simulated provider records.
- Identify missing, inconsistent, or mismatched transactions.
- Generate reconciliation results.

---

## Technology Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Language | TypeScript |
| Backend Framework | Express.js |
| Database | PostgreSQL (Neon) |
| ORM | Prisma |
| Cache & Queue Storage | Redis |
| Background Jobs | BullMQ |
| Validation | Zod |
| Logging | Pino |
| Authentication | JWT |
| Testing | Jest & Supertest |
| API Documentation | Swagger |
| Containerization | Docker |

---

## Architecture

PayRail follows a **Modular Monolith** architecture.

Each business domain is organized into an independent module with clear responsibilities and boundaries.

```text
src/
├── config/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── accounts/
│   ├── payments/
│   ├── ledger/
│   ├── refunds/
│   ├── webhooks/
│   └── reconciliation/
│
├── infrastructure/
│   ├── database/
│   ├── redis/
│   ├── queue/
│   └── logger/
│
├── middlewares/
├── common/
├── workers/
├── docs/
├── app.ts
└── server.ts

prisma/
tests/
docker/
```

The architecture keeps business logic separate from infrastructure concerns, making the system easier to test, maintain, and extend.

---

## Payment Lifecycle

The intended payment lifecycle is:

```text
Client Request
      |
      v
Payment API
      |
      v
Idempotency Check
      |
      v
Payment Processing
      |
      v
Provider Simulator
      |
      v
Database Transaction
      |
      v
Ledger Entries
      |
      v
Payment Result
      |
      v
Webhook Event
      |
      v
Background Worker
      |
      v
Webhook Delivery
```

Each stage is designed to handle failures without compromising financial consistency.

---

## Engineering Challenges

PayRail is designed to explore real-world backend engineering challenges, including:

- Preventing duplicate financial operations.
- Managing concurrent payment requests.
- Maintaining atomic database transactions.
- Implementing safe retry mechanisms.
- Handling at-least-once message delivery.
- Designing balanced double-entry accounting.
- Recovering from asynchronous processing failures.
- Reconciling internal and external financial records.

---

## Project Roadmap

- [ ] Project foundation and configuration
- [ ] PostgreSQL and Prisma integration
- [ ] Authentication and authorization
- [ ] Account management
- [ ] Payment processing engine
- [ ] Idempotency implementation
- [ ] Double-entry ledger
- [ ] Refund management
- [ ] Redis and BullMQ integration
- [ ] Webhook delivery and retry mechanisms
- [ ] Transaction reconciliation
- [ ] Automated testing
- [ ] API documentation
- [ ] Docker and deployment

---

## Getting Started

### Prerequisites

- Node.js
- npm
- PostgreSQL database (Neon)
- Redis instance

### Installation

Clone the repository:

```bash
git clone https://github.com/ahmed-ibrahim-amer/PayRail.git
```

Navigate to the project:

```bash
cd PayRail
```

Install dependencies:

```bash
npm install
```

Configure your environment variables using `.env.example`.

Run the development server:

```bash
npm run dev
```

> Database migrations and additional setup instructions will be documented as the corresponding features are implemented.

---

## Environment Variables

Create a `.env` file in the project root.

```env
NODE_ENV=development
PORT=3000

DATABASE_URL=
DIRECT_URL=

REDIS_URL=

JWT_SECRET=
```

Never commit your `.env` file or expose database credentials and secrets.

---

## Testing

The project uses Jest and Supertest for automated testing.

Testing will focus on:

- Payment processing scenarios.
- Idempotency behavior.
- Database transaction consistency.
- Refund validation.
- Webhook retries.
- Failure handling and edge cases.

---

## Security & Financial Disclaimer

PayRail is an educational backend engineering project.

It uses simulated payment provider interactions and is not intended to process real financial transactions.

It does not store real card information or handle actual customer funds.

---

## Author

**Ahmed Ibrahim Amer**

Backend Developer | Node.js & TypeScript

- GitHub: [ahmed-ibrahim-amer](https://github.com/ahmed-ibrahim-amer)

---

## License

This project is intended for educational and portfolio purposes.