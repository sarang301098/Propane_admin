import { action } from "typesafe-actions";
import PaginationActionTypeEnum from "./pagination.enum";

/**
 * auth login action creator
 * @param token
 * @returns
 */
const paginationPerPage = (perPageItems: number) =>
  action(PaginationActionTypeEnum.PAGINATION_PER_PAGE_ITEMS, perPageItems);

export { paginationPerPage };
