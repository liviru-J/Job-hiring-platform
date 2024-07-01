import { NextFunction, Request, Response } from "express";
import ForbiddenError from "../../domain/errors/Forbidden-error";

interface AuthClaims {
  metadata: {
    role: string;
  };
}

interface AuthenticatedRequest extends Request {
  auth: {
    claims: AuthClaims;
  };
}

function isAuthenticatedRequest(req: Request): req is AuthenticatedRequest {
  return (
    (req as AuthenticatedRequest).auth !== undefined &&
    (req as AuthenticatedRequest).auth.claims !== undefined &&
    (req as AuthenticatedRequest).auth.claims.metadata !== undefined &&
    typeof (req as AuthenticatedRequest).auth.claims.metadata.role === 'string'
  );
}

const AuthorizationMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!isAuthenticatedRequest(req) || req.auth.claims.metadata.role !== "admin") {
    throw new ForbiddenError("Admin only route");
  }
  next();
};

export default AuthorizationMiddleware;



// const AuthorizationMiddleware = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   //@ts-ignore
//   console.log(req.auth.claims.metadata)
//     //@ts-ignore
//   if (req.auth.claims.metadata.role !== "admin") {
//     throw new ForbiddenError("Admin Only Route!");
//   }

//   next();
// };

// export default AuthorizationMiddleware;