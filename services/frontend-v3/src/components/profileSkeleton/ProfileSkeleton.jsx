import React, { Component } from "react";
import { Skeleton } from "antd";
import ProfileSkeletonView from "./profileSkeletonView";

class ProfileSkeleton extends Component {
  render() {
    return <ProfileSkeletonView active />;
  }
}

export default ProfileSkeleton;
