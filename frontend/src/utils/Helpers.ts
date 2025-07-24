

export const ErrorDisplay = (error: any | unknown , toast: any) => {
    const err = error.response?.data?.error;
    const message = typeof err === 'string' ? err : err.message;
    toast.error(message || 'Failed to create account');
}

