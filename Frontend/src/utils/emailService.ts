interface EmailConfig {
  to: string;
  subject: string;
  template: string;
  data: Record<string, any>;
}

interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export const sendEmail = async (config: EmailConfig): Promise<EmailResponse> => {
  try {
    const response = await fetch(`${process.env.VITE_API_URL}/api/email/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(config),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error al enviar el email');
    }

    return {
      success: true,
      message: 'Email enviado correctamente',
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Error desconocido al enviar el email',
    };
  }
};

export const sendVerificationCode = async (email: string, code: string): Promise<EmailResponse> => {
  return sendEmail({
    to: email,
    subject: 'Código de Verificación - Portal CEA San Emigdio',
    template: 'verification-code',
    data: {
      code,
      expiry: '10 minutos', // Este valor podría venir de una constante
    },
  });
};

export const sendWelcomeEmail = async (email: string, name: string): Promise<EmailResponse> => {
  return sendEmail({
    to: email,
    subject: 'Bienvenido al Portal CEA San Emigdio',
    template: 'welcome',
    data: {
      name,
    },
  });
};

export const sendPasswordResetEmail = async (email: string, resetLink: string): Promise<EmailResponse> => {
  return sendEmail({
    to: email,
    subject: 'Restablecer Contraseña - Portal CEA San Emigdio',
    template: 'password-reset',
    data: {
      resetLink,
      expiry: '1 hora', // Este valor podría venir de una constante
    },
  });
};