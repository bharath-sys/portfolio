import {
  Card,
  CardBody,
  CardHeader,
} from "@chakra-ui/react";
import React from "react";
import ProfessionalBulletPoints from "./ProfessionalBulletPoints";
import CustomCardHeader from "./CustomCardHeader";

import { useQuery } from "@tanstack/react-query";
import { fetchDataByCondition } from "../FireBase/api";

const DetailCard = ({ page }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["fetchDetails", page],
    queryFn: () => fetchDataByCondition({ page: page, collection: 'TimelineDetails' }),
  });
  const sortedData = data?.sort((a, b) => a?.order-b?.order)
  return (
    <>
      {sortedData?.map((details) => {
        return <Card maxWidth={{ base: "100%", md: "500px", lg: "550px" }}>
          <CardHeader pb={0}>
            <CustomCardHeader data={details?.header} />
          </CardHeader>
          <CardBody>
            {details?.details && <ProfessionalBulletPoints data={details?.details} />}
          </CardBody>
        </Card>
      })}
    </>
  );
};

export default DetailCard;
