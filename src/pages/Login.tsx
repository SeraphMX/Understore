import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RootState } from '../store/store';
import { loginStart, loginSuccess, loginFailure } from '../store/slices/authSlice';
import { Sprout, AlertCircle } from 'lucide-react';
import { Input, Button } from '@nextui-org/react';
import { loginSchema, type LoginFormData } from '../schemas/auth';
import { findUser } from '../data/users';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  });

  const onSubmit = async (data: LoginFormData) => {
    dispatch(loginStart());

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const user = findUser(data.identifier, data.password);
      
      if (!user) {
        throw new Error('Credenciales inválidas');
      }

      dispatch(loginSuccess(user));
      navigate('/');
    } catch (error) {
      dispatch(loginFailure('Usuario/teléfono o contraseña incorrectos'));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <Sprout className="h-12 w-12 text-green-600 mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mt-4">
            Iniciar Sesión
          </h1>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register('identifier')}
              type="text"
              label="Usuario o teléfono"
              placeholder="Ingresa tu usuario o teléfono"
              isInvalid={!!errors.identifier}
              errorMessage={errors.identifier?.message}
              variant="bordered"
            />
            <Input
              {...register('password')}
              type="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              variant="bordered"
            />
            {error && (
              <div className="flex items-center text-red-600 text-sm">
                <AlertCircle className="w-4 h-4 mr-2" />
                {error}
              </div>
            )}
            <Button
              type="submit"
              color="primary"
              className="w-full bg-green-600 hover:bg-green-700"
              isLoading={isLoading}
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              ¿No tienes una cuenta?{' '}
              <Link to="/" className="text-green-600 hover:text-green-700 font-medium">
                Regístrate aquí
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-gray-500 space-y-1">
          <p>Usuarios demo:</p>
          <p>Usuario normal: usuario "demo" / contraseña "demo"</p>
          <p>Administrador: usuario "admin" / contraseña "demo"</p>
          <p>Staff: usuario "staff" / contraseña "demo"</p>
          <p className="mt-2 text-gray-400">También puedes usar el número de teléfono en lugar del usuario</p>
        </div>
      </div>
    </div>
  );
};

export default Login;