import React from "react";

export default function ProfileSkeleton() {
  return (
    <div className="flex items-center bg-gray-900 text-white p-4 rounded-lg gap-8 max-w-5xl mx-auto">
      {/* Avatar placeholder */}
      <div className="rounded-full bg-gray-700 animate-pulse w-16 h-16 flex-shrink-0" />

      {/* Username placeholder */}
      <div className="bg-gray-700 animate-pulse rounded-full w-48 h-10 flex items-center px-4">
        <div className="bg-gray-600 rounded-full w-10 h-10 mr-3" />
        <div className="bg-gray-600 rounded h-5 w-32" />
      </div>

      {/* Summoner Level */}
      <div className="bg-gray-700 animate-pulse rounded w-28 h-6" />

      {/* Rank */}
      <div className="bg-gray-700 animate-pulse rounded w-20 h-6" />

      {/* LP */}
      <div className="bg-gray-700 animate-pulse rounded w-16 h-6" />

      {/* Buttons placeholders */}
      <div className="flex gap-4 ml-auto">
        <div className="bg-gray-700 animate-pulse rounded-md w-36 h-10" />
        <div className="bg-gray-700 animate-pulse rounded-md w-36 h-10" />
      </div>
    </div>
  );
}
