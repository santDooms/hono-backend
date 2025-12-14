interface User {
  userId: string;
  email: string;
  role: "ADMIN" | "USER";
  brokerKey: string;
}

const USERS: User[] = [
  {
    userId: "user-123",
    email: "admin@demo.com",
    role: "ADMIN",
    brokerKey: "123",
  },
  {
    userId: "user-456",
    email: "user@demo.com",
    role: "USER",
    brokerKey: "456",
  }
];
