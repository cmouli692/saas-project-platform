const required = ["DB_HOST", "DB_PORT", "DB_USER", "DB_PASSWORD", "JWT_SECRET"];


export const validateEnv = () => {
    const missing = required.filter((k) => !process.env[k]);
    if(missing.length > 0 ) {
        throw new Error(`Missing env vars: ${missing.join(", ")}`);
    }
}
