import { Skeleton } from "@material-ui/lab";
import React from "react";

const SkeletonItem = () => {
  return (
    <div className="products py-3">
      <div className="card">
        <Skeleton width={210} height={118} />
        <Skeleton />
        <Skeleton width={40} height={40} />
      </div>
    </div>
  );
};

export default SkeletonItem;
