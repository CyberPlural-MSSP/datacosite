import { useRouter } from "next/router";

export function useRoute() {
  const router = useRouter();
  
  return router.pathname;
}
