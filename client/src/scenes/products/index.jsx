import React from "react";
import { Box, useMediaQuery } from "@mui/material";
import { useGetproductsQuery } from "state/api";
import Header from "components/Header";
import Product from "components/Product";

const Products = () => {
  const { data, isLoading } = useGetproductsQuery();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");

  return (
    <Box mx="2.5rem" mt="1.5rem" pb="3rem">
      <Header title="PRODUCTS" subtitle="See your list of products" />
      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": {
              gridColumn: isNonMobile ? undefined : "span 4",
            },
          }}
        >
          {data?.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat[0]}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
