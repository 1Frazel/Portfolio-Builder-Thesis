import { useEffect, useState, type ReactNode } from "react";
import type { User } from "firebase/auth";
import { logout, onAuthChange, signInWithGoogle } from "../utils/authService";
import { AuthContext } from "./useAuth";
import { useToast } from "./useToast";
import { ensureUserDocument } from "../utils/cvService";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthChange((u) => {
      setUser(u);
      setLoading(false);

      if (u) {
        void ensureUserDocument().catch((err: unknown) => {
          const code =
            err && typeof err === "object" && "code" in err
              ? String((err as { code?: string }).code ?? "")
              : "";

          if (
            code === "permission-denied" ||
            code === "firestore/permission-denied" ||
            (err instanceof Error &&
              /permission|insufficient/i.test(err.message))
          ) {
            console.warn(
              "Skipping user profile initialization due to Firestore permissions.",
            );
            return;
          }

          const message =
            err instanceof Error
              ? err.message
              : "Failed to initialize user profile";
          showToast(message, "error");
        });
      }
    });
    return unsubscribe;
  }, [showToast]);

  const handleLogin = async () => {
    setLoading(true);
    // immediate feedback and prevent duplicate clicks
    showToast("Opening Google sign-in…", "info");
    try {
      await signInWithGoogle();
      showToast("Signed in successfully", "success");
    } catch (err: unknown) {
      const code = (
        err && typeof err === "object" && "code" in err
          ? (err as { code?: string }).code
          : undefined
      ) as string | undefined;
      const msg =
        (err && typeof err === "object" && "message" in err
          ? ((err as { message?: string }).message ?? String(err))
          : String(err)) || "Failed to sign in";
      if (
        code === "auth/popup-closed-by-user" ||
        code === "auth/cancelled-popup-request"
      ) {
        showToast("Sign-in cancelled", "error");
      } else {
        showToast(msg, "error");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
