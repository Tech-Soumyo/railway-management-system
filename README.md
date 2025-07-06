`Features`
1> User registration and login with JWT-based authentication.
2> Admin ability to add trains (protected by API key).
3> Check seat availability between source and destination.
4> Book seats for authenticated users with race condition handling.
4> Retrieve booking details for authenticated users.
6> Global error handling and input validation.
7> Secure password hashing and endpoint protection.

`Technologies`
1> Node.js, 2> Express.js, 3> PostgreSQL, 4> TypeScript, 5> bcrypt, 6> jsonwebtoken, 7> express-validator, 8> Zod

`ENV`
DATABASE_URL=postgresql://user:password@localhost:5432/railway_db?schema=public
JWT_SECRET=yourJwtSecret
ADMIN_API_KEY=yourAdminApiKey
PORT=3000

`API EndPoints`
1> Register -> POST /api/auth/register
Body
{
"email": "user10@example.com",
"password": "Password123!"
}

2> Login -> POST /api/auth/login
{
"email": "user10@example.com",
"password": "Password123!"
}

3> Add Train -> POST /api/trains

3.1> Headers: x-api-key: <admin_api_key> (from .env)
3.2> Body:
{
"name": "Express 105",
"source": "Kolkata",
"destination": "Bengalore",
"totalSeats": 100
}

4> Check Availability -> GET /api/trains/availability?source=<source>&destination=<destination>
source= Kolkata
destination= Bengalore

5> Book Seat -> POST /api/bookings
5.1> Authorization: Bearer <jwt_token> (from /api/auth/login)
5.2> {
"trainId": <trainId> (trainId from GET /api/trains/availability?source=<source>&destination=<destination>)
}

6> Get Booking Details -> GET /api/bookings/:bookingId
6.1> Authorization: Bearer <jwt_token> (from /api/auth/login)
6.2> bookingId (from /api/bookings)

`Race Conditions`
1> The booking endpoint uses Prisma transactions with Serializable isolation and optimistic locking to prevent overbooking.
2> Retries transient transaction failures (e.g., write conflicts) up to 3 times with exponential backoff.
3> Returns user-friendly errors like "No seats available" instead of raw transaction errors.
