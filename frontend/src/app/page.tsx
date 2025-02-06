"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface User {
  id: string;
  name: string;
  email: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    axios.get("http://localhost:3000/api/user")
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold">User Dashboard</h1>
      <ul className="mt-4 bg-white shadow-md rounded-lg p-4">
        {users.map(user => (
          <li key={user.id} className="border-b p-2">{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}
