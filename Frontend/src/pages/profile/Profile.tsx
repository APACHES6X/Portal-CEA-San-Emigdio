import React from 'react';
import { useAuth } from '../../hooks/useAuth';

const Profile: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className="divide-y divide-gray-200">
              <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <h1 className="text-2xl font-bold mb-4">Perfil de Usuario</h1>
                {user ? (
                  <div className="space-y-4">
                    <p><span className="font-bold">Nombre:</span> {user.name}</p>
                    <p><span className="font-bold">Email:</span> {user.email}</p>
                    <p><span className="font-bold">Tipo de Usuario:</span> {user.userType}</p>
                  </div>
                ) : (
                  <p>Cargando información del usuario...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;