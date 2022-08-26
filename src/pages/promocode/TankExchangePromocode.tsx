import React from "react";
import Promocode from "./list";
import Pagination from "../../components/pagination/Pagination";
import TankExchangePromocodeList from "./TankExhangePromocodeList";
import { getPromocodeActionThunk } from "../../store/promocode/promocode.actions.async";
import { useDispatch } from "react-redux";

const TankExchangePromocode = () => {
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
            ItemsComponent={TankExchangePromocodeList}
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
                  2
                )
              );
            }}
          />
        );
      }}
    </Promocode>
  );
};

export default TankExchangePromocode;
