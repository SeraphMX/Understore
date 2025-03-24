import React, { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Button, InputOtp } from '@nextui-org/react';

interface OTPVerificationProps {
  phoneNumber: string;
  onVerify: (code: string) => void;
  onBack: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ phoneNumber, onVerify, onBack }) => {
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
   const [otp, setOtp] = useState('')
    const [error, setError] = useState<string | null>(null)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(event.target.value)
  }

   const handleComplete = (value?: string) => {
    if (value) {
      setOtp(value)
      setError(null)
    }
  }

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const handleResend = () => {
    setTimeLeft(60);
    setCanResend(false);
    // Here you would implement the actual resend logic
    console.log('Resending OTP...');
  };

  const handleVerify = () => {
    onVerify(otp);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-gray-100 rounded-full mr-4"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold">Verificación OTP</h2>
      </div>

      <p className="text-gray-600 mb-6">
        Hemos enviado un código de verificación al número{' '}
        <span className="font-medium">{phoneNumber}</span>
      </p>

      <div className="mb-6 flex justify-center">
        <InputOtp
          length={6}
         value={otp}
            onChange={handleChange}
            onComplete={handleComplete}
          classNames={{
            input: "w-12 h-12 text-center text-lg font-semibold",
            inputWrapper: "border-2 rounded-lg focus:border-green-500"
          }}
        />
      </div>

      <Button
        color="primary"
        className="w-full mb-4 bg-green-600 hover:bg-green-700"
        onClick={handleVerify}
        isDisabled={otp.length !== 6}
      >
        Verificar
      </Button>

      <div className="text-center">
        {timeLeft > 0 ? (
          <p className="text-gray-600">
            Reenviar código en {timeLeft} segundos
          </p>
        ) : (
          <button
            onClick={handleResend}
            disabled={!canResend}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Reenviar código
          </button>
        )}
      </div>
    </div>
  );
};

export default OTPVerification;