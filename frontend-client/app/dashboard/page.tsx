'use client';

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardDescription,
 } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { user, isAuthenticated, loading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // If user is not authenticated and not loading, redirect to login
        if (!isAuthenticated && !loading) {
            router.push('/login');
        }
    }, [isAuthenticated, loading, router]);

    const handleLogout = async () => {
        await logout();
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-2">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Will redirect to login
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="py-8">
                <div className="max-w-4xl mx-auto px-4">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600">Welcome back, {user?.name}!</p>
                        </div>
                        <Button 
                            variant="outline" 
                            onClick={handleLogout}
                            className="flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            Logout
                        </Button>
                    </div>

                {/* User Profile Card */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle>User Profile</CardTitle>
                        <CardDescription>
                            Your account information and authentication details
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Name</label>
                                    <p className="text-lg font-semibold">{user?.name}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Email</label>
                                    <p className="text-lg">{user?.email}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Provider</label>
                                    <p className="text-lg capitalize">{user?.provider}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-500">User ID</label>
                                    <p className="text-sm font-mono bg-gray-100 p-2 rounded">{user?.id}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Account Created</label>
                                    <p className="text-sm">{new Date(user?.createdAt || '').toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <label className="text-sm font-medium text-gray-500">Last Updated</label>
                                    <p className="text-sm">{new Date(user?.updatedAt || '').toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6">
                            <label className="text-sm font-medium text-gray-500">Profile Picture</label>
                            <div className="mt-2">
                                {user?.picture ? (
                                    <img 
                                        src={user.picture} 
                                        alt="Profile" 
                                        className="w-20 h-20 rounded-full border-2 border-gray-200"
                                        onError={(e) => {
                                            // Fallback to initials if image fails to load
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            const parent = target.parentElement;
                                            if (parent) {
                                                const fallback = document.createElement('div');
                                                fallback.className = 'w-20 h-20 rounded-full border-2 border-gray-200 bg-blue-500 flex items-center justify-center text-white text-lg font-medium';
                                                fallback.textContent = user.name?.charAt(0).toUpperCase() || 'U';
                                                parent.appendChild(fallback);
                                            }
                                        }}
                                    />
                                ) : (
                                    <div className="w-20 h-20 rounded-full border-2 border-gray-200 bg-blue-500 flex items-center justify-center text-white text-lg font-medium">
                                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                                    </div>
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Authentication Status */}
                <Card>
                    <CardHeader>
                        <CardTitle>Authentication Status</CardTitle>
                        <CardDescription>
                            Current session and security information
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                            <span className="text-green-700 font-medium">Authenticated</span>
                        </div>
                        <p className="text-sm text-gray-600 mt-2">
                            You are currently logged in via Google OAuth. Your session is secure and encrypted.
                        </p>
                    </CardContent>
                </Card>
                </div>
            </div>
        </div>
    );
}
