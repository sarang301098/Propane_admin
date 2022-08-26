import React from "react";
import { useDispatch } from "react-redux";
import Pagination from "../../components/pagination/Pagination";
import { getPromocodeActionThunk } from "../../store/promocode/promocode.actions.async";
import FuelDeliveryPromocodeList from "./FuelDeliveryPromocodeList";
import Promocode from "./list";

const FuelDeliveryPromocode = () => {
  const dispatch = useDispatch();

  return (
    <Promocode>
      {(
        search: string,
        categoryId: string,
        productId: string,
        status: string,
        count: number,
        itemsPerpage: number,
        page: number,
        setPage: Function
      ) => {
        return (
          <Pagination
            ItemsComponent={FuelDeliveryPromocodeList}
            pageCount={count}
            page={page}
            setPage={setPage}
            dispatchAction={(page: number) => {
              dispatch(
                getPromocodeActionThunk(
                  page || 1,
                  itemsPerpage,
                  categoryId,
                  productId,
                  status,
                  search,
                  1
                )
              );
            }}
          />
        );
      }}
    </Promocode>
  );
};

export default FuelDeliveryPromocode;
