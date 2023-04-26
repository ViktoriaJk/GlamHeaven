import { FC, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

type Props = {
  hasAccess: boolean;
  children: ReactNode;
};

export const Protected: FC<Props> = ({ children, hasAccess }) => {
  if (!hasAccess) return <Navigate to='/' />;

  return <>{children}</>;
};
