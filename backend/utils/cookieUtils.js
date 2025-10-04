export const createTokenCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + (process.env.JWT_COOKIE_EXPIRES_IN || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', 
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  console.log('Creating cookie with options:', {
    ...cookieOptions,
    token: token ? 'Present' : 'Missing',
    environment: process.env.NODE_ENV
  });

  res.cookie('token', token, cookieOptions);
};


export const clearTokenCookie = (res) => {
  res.cookie('token', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
};