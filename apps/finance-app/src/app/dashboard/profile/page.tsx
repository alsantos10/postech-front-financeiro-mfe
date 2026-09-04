"use client";

import { useAuth } from "@dash/auth/context/AuthContext";

export default function ProfilePage() {
    const { user } = useAuth();

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-900">Perfil</h1>

            <div className="mt-6 p-6 rounded-lg border border-gray-300 bg-white shadow">
                <div className="grid gap-4">
                    <div>
                        <span className="mt-2 text-sm text-gray-600">Nome:</span>
                        <p className="font-medium mt-2 text-gray-600">{user?.name || "-"}</p>
                    </div>
                    <div>
                        <span className="mt-2 text-sm text-gray-600">Email:</span>
                        <p className="font-medium mt-2 text-gray-600">{user?.email || "-"}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}