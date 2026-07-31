import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../FireBase/api";

/**
 * Reads a single page's copy from the `Contents` collection in Firestore.
 * Every section pulls its own heading / subHeading from the same
 * configuration the old multi-page site used, so nothing in the CMS
 * has to change for the single-page layout.
 */
export default function useContents(page) {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchData", page],
    queryFn: () => fetchDataByCondition({ page, collection: "Contents" }),
  });

  return {
    heading: data?.[0]?.contents?.heading,
    subHeading: data?.[0]?.contents?.subHeading,
    isLoading,
  };
}
