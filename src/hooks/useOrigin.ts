import useIsMounted from "./useIsMounted";

const useOrigin = () => {
  const isMounted = useIsMounted();

  if (!isMounted) return "";

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return origin;
};

export default useOrigin;
